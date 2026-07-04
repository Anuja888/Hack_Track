import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Code2, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(role, username, password);
    if (!res.success) {
      setError(res.msg);
    }
  };

  const handleAutoFillAndLogin = async (selectedRole, selectedUser, selectedPass) => {
    setRole(selectedRole);
    setUsername(selectedUser);
    setPassword(selectedPass);
    setError('');
    const res = await login(selectedRole, selectedUser, selectedPass);
    if (!res.success) {
      setError(res.msg);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90vh', padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '950px' }}>
        
        {/* Left Side: Login Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="glass-panel" 
          style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', flex: '1 1 350px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Code2 size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h2>HackTrack Platform</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Vasavi College of Engineering</p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: '8px' }}>
            {['student', 'coordinator', 'hod', 'attendance'].map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '6px',
                  background: role === r ? 'var(--primary)' : 'transparent',
                  color: role === r ? 'white' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: role === r ? '600' : '400',
                  transition: 'all 0.2s',
                  fontSize: '0.8rem'
                }}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
            
            <div>
              <label>{role === 'student' ? 'Hall Ticket Number' : 'Username'}</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder={role === 'student' ? '1602-XX-XXX-XXX' : 'Enter username'} 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
            
            <div>
              <label>Password (Default: vce)</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Login To Portal <ArrowRight size={18} />
            </button>
          </form>
        </motion.div>

        {/* Right Side: Demo Logins Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel"
          style={{ width: '100%', maxWidth: '480px', padding: '2.5rem', flex: '1 1 400px', borderLeft: '3px solid var(--primary)' }}
        >
          <h3 className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)' }}>
            <Sparkles size={20} color="var(--primary)" /> Demo Logins
          </h3>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
            Explore the different portals of the platform. Click any card below to instantly auto-fill credentials, log in, and view their dashboard capabilities.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* HOD Card */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 25px rgba(210, 153, 34, 0.12)', borderColor: 'rgba(210, 153, 34, 0.3)' }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', transition: 'border-color 0.2s' }}
            >
              <div style={{ flex: 1 }}>
                <span className="badge badge-warning" style={{ fontSize: '0.7rem', display: 'inline-block', marginBottom: '0.25rem' }}>Admin / HOD</span>
                <strong style={{ display: 'block', color: 'white', fontSize: '0.95rem' }}>Dr. Ram Mohan Rao</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px', lineHeight: '1.3' }}>Approves proposed events, broadcasts directives, and reviews institutional audit charts.</span>
              </div>
              <button 
                type="button"
                className="btn-primary" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', whiteSpace: 'nowrap', width: 'auto', background: 'var(--warning)', color: 'black', fontWeight: 'bold' }}
                onClick={() => handleAutoFillAndLogin('hod', 'Ram Mohan Rao', 'vce')}
              >
                1-Click Login
              </button>
            </motion.div>

            {/* Coordinator Card */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 25px rgba(88, 166, 255, 0.12)', borderColor: 'rgba(88, 166, 255, 0.3)' }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', transition: 'border-color 0.2s' }}
            >
              <div style={{ flex: 1 }}>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem', display: 'inline-block', marginBottom: '0.25rem' }}>Organizer / Coordinator</span>
                <strong style={{ display: 'block', color: 'white', fontSize: '0.95rem' }}>Prof. K. Laxmi (coordinator1)</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px', lineHeight: '1.3' }}>Publishes new hackathons, approves student requests, advances attendance, and issues PDF certs.</span>
              </div>
              <button 
                type="button"
                className="btn-primary" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', whiteSpace: 'nowrap', width: 'auto', fontWeight: 'bold' }}
                onClick={() => handleAutoFillAndLogin('coordinator', 'coordinator1', 'vce')}
              >
                1-Click Login
              </button>
            </motion.div>

            {/* Attendance Gate Control Card */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 25px rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', transition: 'border-color 0.2s' }}
            >
              <div style={{ flex: 1 }}>
                <span className="badge" style={{ fontSize: '0.7rem', display: 'inline-block', marginBottom: '0.25rem', background: 'rgba(255,255,255,0.08)', color: 'var(--text-light)' }}>Attendance Desk</span>
                <strong style={{ display: 'block', color: 'white', fontSize: '0.95rem' }}>Attendance Guard (attendance1)</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px', lineHeight: '1.3' }}>Quick search registrations by roll number and toggle checked-in attendance status.</span>
              </div>
              <button 
                type="button"
                className="btn-primary" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', whiteSpace: 'nowrap', width: 'auto', background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 'bold' }}
                onClick={() => handleAutoFillAndLogin('attendance', 'attendance1', 'vce')}
              >
                1-Click Login
              </button>
            </motion.div>

            {/* Student Card */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 25px rgba(46, 160, 67, 0.12)', borderColor: 'rgba(46, 160, 67, 0.3)' }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', transition: 'border-color 0.2s' }}
            >
              <div style={{ flex: 1 }}>
                <span className="badge badge-success" style={{ fontSize: '0.7rem', display: 'inline-block', marginBottom: '0.25rem' }}>Participant / Student</span>
                <strong style={{ display: 'block', color: 'white', fontSize: '0.95rem' }}>Anuja Kuchipudi (1602-24-737-004)</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px', lineHeight: '1.3' }}>Forms teams, submits applications, views attendance steppers, and downloads official PDFs.</span>
              </div>
              <button 
                type="button"
                className="btn-primary" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', whiteSpace: 'nowrap', width: 'auto', background: 'var(--success)', fontWeight: 'bold' }}
                onClick={() => handleAutoFillAndLogin('student', '1602-24-737-004', 'vce')}
              >
                1-Click Login
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
