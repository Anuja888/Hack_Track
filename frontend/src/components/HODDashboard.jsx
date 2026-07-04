import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HODDashboard = ({ requests, token }) => {
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/feedbacks', { headers: { 'x-auth-token': token } });
      setRecentFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPendingEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/hackathons/pending', {
        headers: { 'x-auth-token': token }
      });
      setPendingEvents(res.data);
    } catch (err) {
      console.error('Error fetching pending events:', err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchPendingEvents();
  }, []);

  const handleApproveEvent = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/hackathons/${id}/approve`, {}, {
        headers: { 'x-auth-token': token }
      });
      alert('Event approved successfully! The organizer has been notified via email.');
      fetchPendingEvents();
    } catch (err) {
      alert('Failed to approve event');
    }
  };

  const handleRejectEvent = async (id) => {
    const reason = prompt('Please enter the reason for rejection:');
    if (!reason) return;
    try {
      await axios.patch(`http://localhost:5000/api/hackathons/${id}/reject`, { reason }, {
        headers: { 'x-auth-token': token }
      });
      alert('Event rejected successfully! The organizer has been notified of the reason.');
      fetchPendingEvents();
    } catch (err) {
      alert('Failed to reject event');
    }
  };

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
      <div className="dashboard-header mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
              <h2>Institution Oversight Platform</h2>
              <p className="text-muted">High-level institutional metrics and departmental audit logs.</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {pendingEvents.length > 0 && (
                <span className="badge badge-warning" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '6px', animation: 'pulse 2s infinite' }}>
                  🔔 {pendingEvents.length} Pending Event Request(s)
                </span>
              )}
              <Link to="/dashboard/analytics" className="btn-primary" style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--gradient-1)', border: 'none' }}>
                📊 Institutional Analytics
              </Link>
          </div>
      </div>

      {/* Pending Event Approvals Table */}
      <motion.div 
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="card glass-panel mb-4" 
        style={{ marginTop: '1rem', borderTop: '4px solid var(--primary)' }}
      >
          <h3 className="mb-3">📋 Event Proposals Awaiting HOD Approval</h3>
          <div className="table-responsive">
              <table className="table">
                  <thead>
                      <tr>
                          <th>Event</th>
                          <th>Domain</th>
                          <th>Prize Pool</th>
                          <th>Deadline</th>
                          <th>Description</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {pendingEvents.map(e => (
                          <tr key={e._id}>
                              <td><strong>{e.title}</strong></td>
                              <td><span className="badge badge-primary">{e.domain}</span></td>
                              <td><strong>{e.prize}</strong></td>
                              <td>{new Date(e.deadline).toLocaleDateString()}</td>
                              <td style={{ maxWidth: '300px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{e.desc}</td>
                              <td>
                                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                                      <button className="btn-primary" style={{ background: 'var(--success)', padding: '0.4rem 0.8rem', fontSize: '0.8rem', width: 'auto' }} onClick={() => handleApproveEvent(e._id)}>Approve</button>
                                      <button className="btn-outline" style={{ border: '1px solid var(--danger)', color: 'var(--danger)', padding: '0.4rem 0.8rem', fontSize: '0.8rem', width: 'auto' }} onClick={() => handleRejectEvent(e._id)}>Reject</button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                      {pendingEvents.length === 0 && (
                          <tr>
                              <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">
                                  No proposed event requests are currently pending approval.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </motion.div>

      <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <motion.div whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 25px rgba(88, 166, 255, 0.1)' }} className="card glass-panel" style={{ borderBottom: '4px solid var(--primary)', textAlign: 'center', padding: '1.75rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Gross Submissions</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>{totalReqs}</div>
          </motion.div>
          
          <motion.div whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 25px rgba(46, 160, 67, 0.1)' }} className="card glass-panel" style={{ borderBottom: '4px solid var(--success)', textAlign: 'center', padding: '1.75rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Approved Outbounds</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success)', fontFamily: 'var(--font-heading)' }}>{approved}</div>
          </motion.div>
          
          <motion.div whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 25px rgba(255, 255, 255, 0.05)' }} className="card glass-panel" style={{ borderBottom: '4px solid var(--text-light)', textAlign: 'center', padding: '1.75rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Unique Students Active</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-light)', fontFamily: 'var(--font-heading)' }}>{activeParticipants}</div>
          </motion.div>
          
          <motion.div whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 25px rgba(188, 140, 255, 0.1)' }} className="card glass-panel" style={{ borderBottom: '4px solid #bc8cff', textAlign: 'center', padding: '1.75rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Acceptance Rate</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#bc8cff', fontFamily: 'var(--font-heading)' }}>{approvalRate}%</div>
          </motion.div>
      </div>

      <div className="grid-container" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <motion.div whileHover={{ y: -2 }} className="card glass-panel" style={{ minHeight: '400px', padding: '2rem' }}>
              <h3 className="mb-4">📈 Cohort Demographic Dispersion</h3>
              {years.map(y => {
                const yReqs = requests.filter(r => r.year === y);
                const yTotal = yReqs.length;
                const partWidth = totalReqs ? (yTotal / totalReqs) * 100 : 0;
                return (
                  <div className="mb-4" key={y} style={{ marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span className="text-light" style={{ fontWeight: 500 }}>{y} - Submission Volume</span>
                          <span className="text-primary" style={{ fontWeight: 600 }}>{yTotal} requests</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${partWidth}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
                      </div>
                  </div>
                );
              })}
          </motion.div>
          
          <motion.div whileHover={{ y: -2 }} className="card glass-panel" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
              <h3 className="mb-3">🕒 Real-Time Audit Feed</h3>
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
                 {requests.slice(0, 5).map(r => (
                    <div key={r._id} style={{ borderLeft: `2px solid ${r.status === 'Approved' ? 'var(--success)' : r.status === 'Rejected' ? 'var(--danger)' : 'var(--warning)'}`, paddingLeft: '1.25rem', marginBottom: '1.5rem', marginLeft: '0.5rem', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '-6px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: r.status === 'Approved' ? 'var(--success)' : r.status === 'Rejected' ? 'var(--danger)' : 'var(--warning)', boxShadow: r.status === 'Approved' ? '0 0 8px var(--success)' : r.status === 'Rejected' ? '0 0 8px var(--danger)' : '0 0 8px var(--warning)' }}></div>
                        <p style={{ marginBottom: '0.3rem', fontSize: '0.95rem' }}><strong className="text-light">{r.studentName}</strong> {r.status === 'Pending' ? 'applied for' : r.status === 'Approved' ? 'approved for' : 'was denied for'} <span className="text-primary" style={{ fontWeight: 500 }}>{r.event}</span></p>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(r.date).toLocaleDateString()} &bull; {r.year}</span>
                    </div>
                 ))}
                 {requests.length === 0 && <p className="text-muted text-center pt-3">No activity logs found.</p>}
              </div>
          </motion.div>
      </div>
      
      <motion.div 
        whileHover={{ y: -2 }}
        className="card glass-panel mt-4" 
        style={{ background: 'rgba(210, 153, 34, 0.03)', borderColor: 'rgba(210, 153, 34, 0.2)', marginTop: '2rem', padding: '2rem' }}
      >
          <h3 className="mb-3" style={{ color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '8px' }}>📢 Broadcast Directive to Coordinators</h3>
          <div style={{ marginBottom: '1.25rem' }}>
              <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Enter formal instructions regarding policy changes..." 
                  style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(210, 153, 34, 0.15)', padding: '1rem' }}
                  value={feedbackMsg}
                  onChange={(e) => setFeedbackMsg(e.target.value)}
              ></textarea>
          </div>
          <button className="btn-primary w-100" style={{ background: 'var(--warning)', color: 'black', fontWeight: 'bold' }} onClick={sendFeedback}>
             Transmit Directive
          </button>

          {recentFeedbacks.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
               <h5 className="mb-3" style={{ color: 'var(--text-light)' }}>Recent Directives Transmitted:</h5>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                 {recentFeedbacks.map(f => (
                   <div key={f._id} style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                     <span style={{ fontSize: '0.8rem', color: 'var(--warning)', marginRight: '0.5rem', fontWeight: 600 }}>{new Date(f.date).toLocaleDateString()}:</span> 
                     <span className="text-light">{f.msg}</span>
                   </div>
                 ))}
               </div>
            </div>
          )}
      </motion.div>
      <style dangerouslySetInnerHTML={{ __html: '@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }' }} />
    </motion.div>
  );
};

export default HODDashboard;

