import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const HODDashboard = ({ requests, token }) => {
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/feedbacks', { headers: { 'x-auth-token': token } });
      setRecentFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const totalReqs = requests.length;
  const approved = requests.filter(r => r.status === 'Approved').length;
  const approvalRate = totalReqs ? Math.round((approved / totalReqs) * 100) : 0;
  
  const participantSet = new Set();
  requests.forEach(r => { participantSet.add(r.rollNo); r.team.forEach(t => participantSet.add(t)); });
  const activeParticipants = participantSet.size;

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const sendFeedback = async () => {
    if (!feedbackMsg) return alert('Directive cannot be blank');
    try {
      await axios.post('http://localhost:5000/api/feedbacks', { msg: feedbackMsg }, { headers: { 'x-auth-token': token } });
      alert('Directive transmitted successfully over secure channel!');
      setFeedbackMsg('');
      fetchFeedbacks();
    } catch (err) {
      alert('Failed to send directive. Ensure you are logged in as Ram Mohan Rao.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="dashboard-header mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
              <h2>Institution Oversight Platform</h2>
              <p className="text-muted">High-level institutional metrics and departmental audit logs.</p>
          </div>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.5rem 1rem' }}>
              <i className='bx bx-buildings'></i> VCE Authority Access
          </span>
      </div>

      <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: '3rem' }}>
          <div className="card glass-panel" style={{ borderBottom: '3px solid var(--primary)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Gross Submissions</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalReqs}</div>
          </div>
          <div className="card glass-panel" style={{ borderBottom: '3px solid var(--success)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Approved Outbounds</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>{approved}</div>
          </div>
          <div className="card glass-panel" style={{ borderBottom: '3px solid var(--text-light)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Unique Students Active</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-light)' }}>{activeParticipants}</div>
          </div>
          <div className="card glass-panel" style={{ borderBottom: '3px solid #bc8cff', textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Acceptance Rate</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#bc8cff' }}>{approvalRate}%</div>
          </div>
      </div>

      <div className="grid-container" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="card glass-panel" style={{ minHeight: '400px' }}>
              <h3 className="mb-4">📈 Cohort Demographic Dispersion</h3>
              {years.map(y => {
                const yReqs = requests.filter(r => r.year === y);
                const yTotal = yReqs.length;
                const partWidth = totalReqs ? (yTotal / totalReqs) * 100 : 0;
                return (
                  <div className="mb-4" key={y} style={{ marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span className="text-light" style={{ fontWeight: 500 }}>{y} - Submission Volume</span>
                          <span className="text-primary">{yTotal} requests</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${partWidth}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
                      </div>
                  </div>
                );
              })}
          </div>
          
          <div className="card glass-panel" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
              <h3 className="mb-3">🕒 Real-Time Audit Feed</h3>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                 {requests.slice(0, 5).map(r => (
                    <div key={r._id} style={{ borderLeft: `2px solid ${r.status === 'Approved' ? 'var(--success)' : r.status === 'Rejected' ? 'var(--danger)' : 'var(--warning)'}`, paddingLeft: '1rem', marginBottom: '1.5rem', marginLeft: '0.5rem', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '-6px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: r.status === 'Approved' ? 'var(--success)' : r.status === 'Rejected' ? 'var(--danger)' : 'var(--warning)' }}></div>
                        <p style={{ marginBottom: '0.3rem' }}><strong className="text-light">{r.studentName}</strong> {r.status === 'Pending' ? 'applied for' : r.status === 'Approved' ? 'approved for' : 'was denied for'} <span className="text-primary">{r.event}</span></p>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(r.date).toLocaleDateString()} &bull; {r.year}</span>
                    </div>
                 ))}
                 {requests.length === 0 && <p className="text-muted text-center pt-3">No activity logs found.</p>}
              </div>
          </div>
      </div>
      
      <div className="card glass-panel mt-4" style={{ background: 'rgba(210, 153, 34, 0.05)', borderColor: 'rgba(210, 153, 34, 0.3)', marginTop: '2rem' }}>
          <h3 className="mb-3" style={{ color: 'var(--warning)' }}>📢 Broadcast Directive to Coordinators</h3>
          <div style={{ marginBottom: '1rem' }}>
              <textarea 
                 className="form-control" 
                 rows="3" 
                 placeholder="Enter formal instructions regarding policy changes..." 
                 style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(210, 153, 34, 0.2)' }}
                 value={feedbackMsg}
                 onChange={(e) => setFeedbackMsg(e.target.value)}
              ></textarea>
          </div>
          <button className="btn-primary w-100" style={{ background: 'var(--warning)', color: 'black' }} onClick={sendFeedback}>
             Transmit Directive
          </button>

          {recentFeedbacks.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
               <h5>Recent Directives Transmitted:</h5>
               {recentFeedbacks.map(f => (
                 <div key={f._id} style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                   <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(f.date).toLocaleDateString()}:</span> {f.msg}
                 </div>
               ))}
            </div>
          )}
      </div>
    </motion.div>
  );
};

export default HODDashboard;
