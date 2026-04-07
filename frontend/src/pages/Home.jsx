import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Code2, LogIn, LayoutDashboard } from 'lucide-react';
import FlashNews from '../components/FlashNews';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [hackathons, setHackathons] = useState([]);
  const { token } = React.useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:5000/api/hackathons').then(res => setHackathons(res.data)).catch(err => console.error(err));
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
