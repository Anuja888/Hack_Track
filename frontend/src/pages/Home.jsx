import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Code2, LogIn, LayoutDashboard } from 'lucide-react';
import FlashNews from '../components/FlashNews';
import { AuthContext } from '../context/AuthContext';

const DEFAULT_HACKATHONS = [
  { _id: '1', title: 'Global AI Innovators 2026', domain: 'AI/ML', prize: '$15,000', deadline: '2026-05-15', desc: 'Build next-gen AI agents to solve real-world problems. Open to all domains.' },
  { _id: '2', title: 'Web3 Builders Summit', domain: 'Blockchain', prize: '$10,000', deadline: '2026-05-20', desc: 'Create decentralized applications for the modern web economy.' },
  { _id: '3', title: 'CyberDefend 2026', domain: 'Cybersecurity', prize: '$8,000', deadline: '2026-05-25', desc: '48-hour CTF to find and patch vulnerabilities.' },
  { _id: '4', title: 'AppBrew Mobile 2026', domain: 'Mobile Dev', prize: '$12,000', deadline: '2026-06-01', desc: 'Develop impactful mobile applications for social good.' },
  { _id: '5', title: 'EcoTech Challenge', domain: 'Sustainability', prize: '$7,500', deadline: '2026-06-10', desc: 'Build tech solutions for climate change and environmental protection.' },
  { _id: '6', title: 'FinTech Revolution', domain: 'Finance', prize: '$20,000', deadline: '2026-06-15', desc: 'Innovative solutions for banking, payments, and financial inclusion.' },
  { _id: '7', title: 'HealthTech Innovators', domain: 'Healthcare', prize: '$9,000', deadline: '2026-06-20', desc: 'Technology solutions for better healthcare delivery.' },
  { _id: '8', title: 'GameDev Arena', domain: 'Gaming', prize: '$5,000', deadline: '2026-06-25', desc: 'Build immersive games using any engine or technology.' }
];

const Home = () => {
  const [hackathons, setHackathons] = useState(DEFAULT_HACKATHONS);
  const { token } = React.useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:5000/api/hackathons')
      .then(res => { if (res.data.length > 0) setHackathons(res.data); })
      .catch(err => { console.log('Using default hackathons'); });
  }, []);

  return (
    <div className="app-container">
      <nav className="navbar glass-panel">
        <div className="nav-brand">
          <Code2 size={24} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} />
          HackTrack
        </div>
        <div>
          {!token ? (
            <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>
              <LogIn size={18} /> Login
            </Link>
          ) : (
            <Link to="/dashboard" className="btn-primary" style={{ textDecoration: 'none', background: 'var(--success)' }}>
              <LayoutDashboard size={18} /> Open Dashboard
            </Link>
          )}
        </div>
      </nav>

      <FlashNews />

      <div style={{ marginTop: '3rem' }}>
        <h2>Live Hackathons for Everyone</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Browse all active hackathon opportunities across domains.</p>
        <div className="grid-container">
           {hackathons.map(h => (
             <div key={h._id} className="card glass-panel">
                <span className="badge badge-primary" style={{ width: 'fit-content' }}>{h.domain}</span>
                <h3 style={{ margin: '0.5rem 0' }}>{h.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{h.desc}</p>
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
                  <strong>Prize:</strong> {h.prize} <br/>
                  <strong style={{ marginTop: '0.25rem', display: 'inline-block' }}>Deadline:</strong> {new Date(h.deadline).toLocaleDateString()}
                </div>
             </div>
           ))}
           {hackathons.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No hackathons published yet. Log in as a Coordinator to add one!</p>}
        </div>
      </div>
    </div>
  );
};
export default Home;
