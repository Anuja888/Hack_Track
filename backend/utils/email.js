const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html, attachments }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: `"HackTrack Platform" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
      attachments
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Email sent: ${info.messageId} to ${to}`);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
