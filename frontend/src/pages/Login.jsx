import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Code2, ArrowRight } from 'lucide-react';

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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="glass-panel" 
        style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}
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
    </div>
  );
};

export default Login;
