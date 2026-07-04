const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hackathon = require('./models/Hackathon');

dotenv.config();

const hackathons = [
  { title: 'Global AI Hackathon', domain: 'AI/ML', prize: '$10,000', deadline: new Date('2026-06-10'), desc: 'Build the next generation of AI agents to solve real-world problems.' },
  { title: 'Web3 Innovators', domain: 'Blockchain', prize: '$5,000', deadline: new Date('2026-06-15'), desc: 'Create decentralized applications for the modern web.' },
  { title: 'CyberDefend 2026', domain: 'Cybersecurity', prize: '$8,000', deadline: new Date('2026-07-20'), desc: 'Find vulnerabilities and patch them in this 48hr CTF.' },
  { title: 'AppBrew 2026', domain: 'Mobile Dev', prize: '$15,000', deadline: new Date('2026-08-01'), desc: 'Develop impactful mobile software.' },
  { title: 'CloudNative Summit', domain: 'Cloud Comp', prize: '$12,000', deadline: new Date('2026-08-10'), desc: 'Architect scalable solutions using serverless.' },
  { title: 'Hack the Planet', domain: 'IoT', prize: '$7,000', deadline: new Date('2026-09-01'), desc: 'Connect hardware devices to the software web.' },
  { title: 'DataViz 2026', domain: 'Data Science', prize: '$9,000', deadline: new Date('2026-09-20'), desc: 'Create beautiful insights from raw data.' },
  { title: 'EdTech Innovate', domain: 'Education', prize: '$6,000', deadline: new Date('2026-10-05'), desc: 'Transform how students learn online.' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Hackathon.deleteMany(); // Clear existing
    await Hackathon.insertMany(hackathons);
    console.log('Successfully seeded 8 hackathons!');
    process.exit();
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
seed();
