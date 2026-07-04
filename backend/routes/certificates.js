const express = require('express');
const router = express.Router();
const Hackathon = require('../models/Hackathon');
const Participant = require('../models/Participant');
const User = require('../models/User');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/email');
const puppeteer = require('puppeteer');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper: Upload PDF buffer to Cloudinary
const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { 
        folder: 'hacktrack_certificates', 
        resource_type: 'raw', 
        format: 'pdf' 
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    stream.end(buffer);
  });
};

// Elegant HTML template for Certificate
const getCertificateTemplate = (participantName, eventName, dateString) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Montserrat:wght@400;500;600&display=swap');
    body {
      margin: 0;
      padding: 0;
      background-color: #0d1117;
      color: #c9d1d9;
      font-family: 'Montserrat', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      -webkit-print-color-adjust: exact;
    }
    .certificate-container {
      width: 800px;
      height: 550px;
      padding: 40px;
      position: relative;
      background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
      border: 8px double #d29922;
      border-radius: 12px;
      box-sizing: border-box;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .gold-accent {
      color: #d29922;
      font-family: 'Cinzel', serif;
    }
    .header {
      font-size: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 20px;
    }
    .title {
      font-family: 'Cinzel', serif;
      font-size: 2.8rem;
      font-weight: 800;
      margin: 15px 0;
      background: linear-gradient(to right, #58a6ff, #bc8cff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      font-size: 1.1rem;
      color: #8b949e;
      margin-bottom: 30px;
    }
    .recipient-name {
      font-family: 'Cinzel', serif;
      font-size: 2.2rem;
      font-weight: 700;
      color: #ffffff;
      border-bottom: 2px solid rgba(210, 153, 34, 0.4);
      display: inline-block;
      padding-bottom: 5px;
      margin-bottom: 20px;
    }
    .event-details {
      font-size: 1.1rem;
      line-height: 1.8;
      max-width: 600px;
      margin: 0 auto 40px auto;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: absolute;
      bottom: 50px;
      left: 80px;
      right: 80px;
    }
    .signature-section {
      width: 200px;
      text-align: center;
    }
    .signature-line {
      border-top: 1px dashed #d29922;
      margin-top: 10px;
      padding-top: 5px;
      font-size: 0.9rem;
      color: #8b949e;
    }
    .signature-font {
      font-family: 'Cinzel', serif;
      font-size: 1.1rem;
      color: #ffffff;
      font-style: italic;
    }
    .date-section {
      font-size: 0.95rem;
      color: #8b949e;
    }
  </style>
</head>
<body>
  <div class="certificate-container">
    <div class="header gold-accent">Certificate of Achievement</div>
    <div class="subtitle">This is proudly presented to</div>
    <div class="recipient-name">${participantName}</div>
    <div class="event-details">
      for successfully participating and showcasing outstanding dedication in the college event 
      <strong class="gold-accent" style="display:block; font-size:1.4rem; margin-top:5px;">${eventName}</strong> 
      organized by Vasavi College of Engineering.
    </div>
    <div class="footer">
      <div class="date-section">
        Date: <strong>${dateString}</strong>
      </div>
      <div class="signature-section">
        <div class="signature-font">Ram Mohan Rao</div>
        <div class="signature-line">Head of Department</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

// @route   POST /api/certificates/generate/:eventId
// @desc    Generate certificates for all present participants of an event
// @access  Private (Coordinator/HOD only)
router.post('/generate/:eventId', auth, async (req, res) => {
  if (req.user.role !== 'coordinator' && req.user.role !== 'hod') {
    return res.status(403).json({ msg: 'Access denied. Organizer or Admin role required.' });
  }

  try {
    const hackathon = await Hackathon.findById(req.params.eventId);
    if (!hackathon) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Set hackathon status to completed
    hackathon.status = 'completed';
    await hackathon.save();

    // Find all participants with status 'present'
    const participants = await Participant.find({
      eventId: hackathon._id,
      attendance_status: 'present'
    });

    if (participants.length === 0) {
      return res.json({ msg: 'No present participants found to generate certificates for.', count: 0 });
    }

    // Launch puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    let sentCount = 0;

    for (const participant of participants) {
      try {
        const page = await browser.newPage();
        
        // Use event deadline or current date for the certificate
        const dateString = new Date(hackathon.deadline).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        // Set content and render
        const html = getCertificateTemplate(participant.studentName, hackathon.title, dateString);
        await page.setContent(html);

        // Generate PDF buffer (Landscape)
        const pdfBuffer = await page.pdf({
          width: '800px',
          height: '550px',
          printBackground: true
        });

        await page.close();

        // Upload to Cloudinary
        const uploadResult = await uploadFromBuffer(pdfBuffer);
        const url = uploadResult.secure_url;

        // Find user email (default to roll number email)
        const user = await User.findById(participant.studentId);
        const email = (user && user.email) || `${participant.rollNo.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;

        // Send email via NodeMailer
        await sendEmail({
          to: email,
          subject: `📜 E-Certificate of Participation: ${hackathon.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #58a6ff; text-align: center;">Congratulations, ${participant.studentName}!</h2>
                <p>We are thrilled to present you with the certificate of participation for <strong>${hackathon.title}</strong>.</p>
                <p>Your certificate has been successfully generated and is attached to this email.</p>
                <div style="text-align: center; margin: 20px 0;">
                  <a href="${url}" style="background-color: #58a6ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">View Certificate Online</a>
                </div>
                <p style="font-size: 0.9rem; color: #666;">If you have any issues, please contact the hackathon coordinator.</p>
                <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; text-align: center; font-size: 0.8rem; color: #999;">HackTrack Platform &bull; Vasavi College of Engineering</p>
              </div>
            </div>
          `,
          attachments: [
            {
              filename: `${participant.studentName.replace(/\s+/g, '_')}_Certificate.pdf`,
              content: pdfBuffer,
              contentType: 'application/pdf'
            }
          ]
        });

        // Update participant details
        participant.certificate_url = url;
        participant.certificate_sent_at = new Date();
        participant.attendance_status = 'certificate-issued';
        await participant.save();

        sentCount++;
      } catch (err) {
        console.error(`Failed to generate certificate for participant ${participant.rollNo}:`, err);
      }
    }

    await browser.close();

    // Update Hackathon count
    hackathon.certificates_sent += sentCount;
    await hackathon.save();

    res.json({ msg: `Successfully generated and delivered ${sentCount} certificates!`, count: sentCount });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
