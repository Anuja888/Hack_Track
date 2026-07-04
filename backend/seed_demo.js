const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Hackathon = require('./models/Hackathon');
const Request = require('./models/Request');
const Participant = require('./models/Participant');
const TeamPost = require('./models/TeamPost');
const Feedback = require('./models/Feedback');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hacktrack_fallback';

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas for seeding');
  } catch (err) {
    console.error('❌ MongoDB Atlas connection failed:', err.message);
    console.log('🔄 Attempting local fallback connection for seeding...');
    const localUri = 'mongodb://127.0.0.1:27017/hacktrack_fallback';
    await mongoose.connect(localUri);
    console.log('✅ Connected to Local MongoDB Fallback for seeding');
  }
}

async function seed() {
  await connectDB();

  try {
    // 1. Clear existing collections to start fresh for demo
    await User.deleteMany();
    await Hackathon.deleteMany();
    await Request.deleteMany();
    await Participant.deleteMany();
    await TeamPost.deleteMany();
    await Feedback.deleteMany();
    console.log('🧹 Cleared existing database collections');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('vce', salt);

    // 2. Seed Users
    // HOD
    const hod = new User({
      username: 'Ram Mohan Rao',
      name: 'Dr. Ram Mohan Rao',
      role: 'hod',
      password: hashedPassword,
      department: 'IT'
    });
    await hod.save();

    // Coordinators
    const coord1 = new User({
      username: 'coordinator1',
      name: 'Prof. K. Laxmi',
      role: 'coordinator',
      password: hashedPassword,
      department: 'IT'
    });
    await coord1.save();

    const coord2 = new User({
      username: 'coordinator2',
      name: 'Dr. M. Sridhar',
      role: 'coordinator',
      password: hashedPassword,
      department: 'CSE'
    });
    await coord2.save();

    // 10 Students
    const studentsData = [
      { roll: '1602-24-737-001', name: 'AKSHAYA BHOOMIREDDY', batch: 2024 },
      { roll: '1602-24-737-004', name: 'ANUJA KUCHIPUDI', batch: 2024 },
      { roll: '1602-24-737-010', name: 'BLESSY EPPA', batch: 2024 },
      { roll: '1602-24-737-016', name: 'HRITHIK TADEPALLI', batch: 2024 },
      { roll: '1602-24-737-028', name: 'MOHAMMED KASHIF', batch: 2024 },
      { roll: '1602-25-737-001', name: 'AARAV REDDY KOTHAPALLI', batch: 2025 },
      { roll: '1602-25-737-002', name: 'ANANYA SREE GUDIPATI', batch: 2025 },
      { roll: '1602-25-737-003', name: 'ABHINAV KUMAR REDDY', batch: 2025 },
      { roll: '1602-25-737-007', name: 'CHANDANA REDDY KASIREDDY', batch: 2025 },
      { roll: '1602-25-737-012', name: 'FARHAN AHMED SHAIK', batch: 2025 }
    ];

    const studentUsers = [];
    for (const s of studentsData) {
      const user = new User({
        username: s.roll,
        name: s.name,
        role: 'student',
        password: hashedPassword,
        batchYear: s.batch,
        department: 'IT'
      });
      await user.save();
      studentUsers.push(user);
    }
    console.log('👤 Seeded 1 HOD, 2 Coordinators, and 10 Students');

    // 3. Seed 10 Hackathons
    const hackathonsData = [
      { title: 'Global AI Innovators 2026', domain: 'AI/ML', prize: '$15,000', deadline: new Date('2026-08-15'), desc: 'Build next-gen AI agents to solve real-world problems. Open to all domains.', status: 'active', creator: coord1._id },
      { title: 'Web3 Builders Summit', domain: 'Blockchain', prize: '$10,000', deadline: new Date('2026-08-20'), desc: 'Create decentralized applications for the modern web economy.', status: 'active', creator: coord1._id },
      { title: 'CyberDefend 2026', domain: 'Cybersecurity', prize: '$8,000', deadline: new Date('2026-05-25'), desc: '48-hour CTF to find and patch vulnerabilities.', status: 'completed', certificates_sent: 4, creator: coord1._id },
      { title: 'AppBrew Mobile 2026', domain: 'Mobile Dev', prize: '$12,000', deadline: new Date('2026-09-01'), desc: 'Develop impactful mobile applications for social good.', status: 'active', creator: coord2._id },
      { title: 'EcoTech Challenge', domain: 'Sustainability', prize: '$7,500', deadline: new Date('2026-09-10'), desc: 'Build tech solutions for climate change and environmental protection.', status: 'active', creator: coord2._id },
      { title: 'FinTech Revolution', domain: 'Finance', prize: '$20,000', deadline: new Date('2026-06-15'), desc: 'Innovative solutions for banking, payments, and financial inclusion.', status: 'completed', certificates_sent: 3, creator: coord2._id },
      { title: 'HealthTech Innovators', domain: 'Healthcare', prize: '$9,000', deadline: new Date('2026-10-20'), desc: 'Technology solutions for better healthcare delivery.', status: 'active', creator: coord1._id },
      { title: 'GameDev Arena', domain: 'Gaming', prize: '$5,000', deadline: new Date('2026-07-01'), desc: 'Build immersive games using any engine or technology.', status: 'active', creator: coord2._id },
      
      // Proposals awaiting HOD approval (Pending)
      { title: 'Robotics Assembly Hack', domain: 'IoT/Hardware', prize: '$6,000', deadline: new Date('2026-11-05'), desc: 'Design automated robotic grippers using Raspberry Pi and micro-controllers.', status: 'pending', creator: coord1._id },
      { title: 'CloudNative Serverless CTF', domain: 'Cloud Computing', prize: '$11,000', deadline: new Date('2026-11-20'), desc: 'Optimize container deployments in serverless architectures.', status: 'pending', creator: coord2._id }
    ];

    const hackathons = [];
    for (const h of hackathonsData) {
      const hack = new Hackathon({
        title: h.title,
        domain: h.domain,
        prize: h.prize,
        deadline: h.deadline,
        desc: h.desc,
        status: h.status,
        certificates_sent: h.certificates_sent || 0,
        createdBy: h.creator
      });
      await hack.save();
      hackathons.push(hack);
    }
    console.log('🏆 Seeded 10 Hackathons (2 pending, 6 active, 2 completed)');

    // 4. Seed Requests & Participants (Representing registrations in various stages)
    // Event: Global AI Innovators 2026 (Active)
    // Request 1: Approved, team has leader and 1 member
    const req1 = new Request({
      studentId: studentUsers[1]._id, // ANUJA KUCHIPUDI
      studentName: studentUsers[1].name,
      rollNo: studentUsers[1].username,
      year: '2nd Year',
      dept: 'IT',
      event: 'Global AI Innovators 2026',
      team: [studentUsers[0].username], // AKSHAYA BHOOMIREDDY
      status: 'Approved',
      attendance: 'Queued',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    });
    await req1.save();

    // Create Participants for req1: Anuja is Checked-In, Akshaya is Checked-In
    await Participant.create({
      studentId: studentUsers[1]._id,
      studentName: studentUsers[1].name,
      rollNo: studentUsers[1].username,
      event: 'Global AI Innovators 2026',
      eventId: hackathons[0]._id,
      attendance_status: 'checked-in'
    });
    await Participant.create({
      studentId: studentUsers[0]._id,
      studentName: studentUsers[0].name,
      rollNo: studentUsers[0].username,
      event: 'Global AI Innovators 2026',
      eventId: hackathons[0]._id,
      attendance_status: 'checked-in'
    });

    // Request 2: Approved, Solo applicant, status = present (ready for certs)
    const req2 = new Request({
      studentId: studentUsers[3]._id, // HRITHIK TADEPALLI
      studentName: studentUsers[3].name,
      rollNo: studentUsers[3].username,
      year: '2nd Year',
      dept: 'IT',
      event: 'Global AI Innovators 2026',
      team: [],
      status: 'Approved',
      attendance: 'Queued',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    });
    await req2.save();

    await Participant.create({
      studentId: studentUsers[3]._id,
      studentName: studentUsers[3].name,
      rollNo: studentUsers[3].username,
      event: 'Global AI Innovators 2026',
      eventId: hackathons[0]._id,
      attendance_status: 'present'
    });

    // Request 3: Pending Registration (awaiting coordinator approval)
    const req3 = new Request({
      studentId: studentUsers[5]._id, // AARAV REDDY
      studentName: studentUsers[5].name,
      rollNo: studentUsers[5].username,
      year: '1st Year',
      dept: 'IT',
      event: 'Global AI Innovators 2026',
      team: [],
      status: 'Pending',
      attendance: 'Queued',
      date: new Date()
    });
    await req3.save();

    // Event: Web3 Builders Summit (Active)
    // Request 4: Approved, Solo applicant, status = registered
    const req4 = new Request({
      studentId: studentUsers[2]._id, // BLESSY EPPA
      studentName: studentUsers[2].name,
      rollNo: studentUsers[2].username,
      year: '2nd Year',
      dept: 'IT',
      event: 'Web3 Builders Summit',
      team: [],
      status: 'Approved',
      attendance: 'Queued',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    });
    await req4.save();

    await Participant.create({
      studentId: studentUsers[2]._id,
      studentName: studentUsers[2].name,
      rollNo: studentUsers[2].username,
      event: 'Web3 Builders Summit',
      eventId: hackathons[1]._id,
      attendance_status: 'registered'
    });

    // Event: CyberDefend 2026 (Completed)
    // Request 5: Approved & completed, status = certificate-issued
    const req5 = new Request({
      studentId: studentUsers[6]._id, // ANANYA SREE
      studentName: studentUsers[6].name,
      rollNo: studentUsers[6].username,
      year: '1st Year',
      dept: 'IT',
      event: 'CyberDefend 2026',
      team: [studentUsers[7].username], // ABHINAV KUMAR
      status: 'Approved',
      attendance: 'Resolved',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    });
    await req5.save();

    await Participant.create({
      studentId: studentUsers[6]._id,
      studentName: studentUsers[6].name,
      rollNo: studentUsers[6].username,
      event: 'CyberDefend 2026',
      eventId: hackathons[2]._id,
      attendance_status: 'certificate-issued',
      certificate_url: 'https://res.cloudinary.com/demo/image/upload/v1580210000/sample.pdf',
      certificate_sent_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    });

    await Participant.create({
      studentId: studentUsers[7]._id,
      studentName: studentUsers[7].name,
      rollNo: studentUsers[7].username,
      event: 'CyberDefend 2026',
      eventId: hackathons[2]._id,
      attendance_status: 'certificate-issued',
      certificate_url: 'https://res.cloudinary.com/demo/image/upload/v1580210000/sample.pdf',
      certificate_sent_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    });

    // 5. Seed Team Recruitment Posts
    await TeamPost.create({
      authorRoll: studentUsers[1].username,
      name: studentUsers[1].name,
      event: 'Global AI Innovators 2026',
      needed: 'React, Node.js, Express',
      msg: 'We are building a smart healthcare agent that uses LLMs. Looking for a strong full-stack developer who can handle backend deployment.',
      date: new Date()
    });

    await TeamPost.create({
      authorRoll: studentUsers[4].username,
      name: studentUsers[4].name,
      event: 'CyberDefend 2026',
      needed: 'Kali Linux, Wireshark, Cryptography',
      msg: 'Need one more teammate for the CTF who is good at web security vulnerabilities and network packet analysis.',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    });

    // 6. Seed HOD Broadcast Directives
    await Feedback.create({
      msg: 'IMPORTANT: All students participating in external hackathons must advance their attendance stages on the dashboard to Checked-In on day one, and Present at completion to receive academic credits.',
      date: new Date()
    });

    await Feedback.create({
      msg: 'Policy update: PDF certificate generation is now automated. Ensure your profile emails are accurate to receive your official credentials upon coordinator completion.',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    });

    console.log('📊 Seeded Registrations, Participants, Team Posts, and Directives successfully!');
    console.log('🚀 Seeding complete! Database is populated with rich demo data.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
