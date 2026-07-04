import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Inbox, BarChart2, Award, CopyPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LetterPreviewModal from './LetterPreviewModal';
import Stepper from './Stepper';

const CoordinatorDashboard = ({ hackathons, requests, students, token, fetchData }) => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [viewLetterReq, setViewLetterReq] = useState(null);
  
  // Participant & Certificate Management States
  const [selectedEventId, setSelectedEventId] = useState('');
  const [eventParticipants, setEventParticipants] = useState([]);
  const [generatingCerts, setGeneratingCerts] = useState(false);

  useEffect(() => {
    // Select first hackathon by default if none selected
    if (hackathons.length > 0 && !selectedEventId) {
      // Find the first active or completed event
      const activeEvents = hackathons.filter(h => h.status !== 'pending' && h.status !== 'rejected');
      if (activeEvents.length > 0) {
        setSelectedEventId(activeEvents[0]._id);
      }
    }
  }, [hackathons]);

  useEffect(() => {
    if (selectedEventId) {
      fetchEventParticipants(selectedEventId);
    }
  }, [selectedEventId]);

  const fetchEventParticipants = async (eventId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/attendance/event/${eventId}`, {
        headers: { 'x-auth-token': token }
      });
      setEventParticipants(res.data);
    } catch (err) {
      console.error('Error fetching event participants:', err);
    }
  };

  const handleAdvanceAttendance = async (participantId) => {
    try {
      await axios.patch(`http://localhost:5000/api/attendance/${participantId}/advance`, {}, {
        headers: { 'x-auth-token': token }
      });
      fetchEventParticipants(selectedEventId);
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to advance status');
    }
  };

  const handleGenerateCertificates = async (eventId) => {
    if (!window.confirm('Are you sure you want to end this event and generate e-certificates? This will email all present participants.')) return;
    setGeneratingCerts(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/certificates/generate/${eventId}`, {}, {
        headers: { 'x-auth-token': token }
      });
      alert(res.data.msg);
      fetchData(); // refresh hackathons & requests
      fetchEventParticipants(eventId);
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to generate certificates');
    } finally {
      setGeneratingCerts(false);
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'Pending');

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${id}`, { status }, { headers: { 'x-auth-token': token } });
      fetchData();
    } catch(err) {
      alert('Failed to update status.');
    }
  };

  // Add Hackathon form state
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [newPrize, setNewPrize] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAddHackathon = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/hackathons', {
        title: newTitle, domain: newDomain, prize: newPrize, deadline: newDeadline, desc: newDesc
      }, { headers: { 'x-auth-token': token }});
      alert('Hackathon published!');
      fetchData();
      setNewTitle(''); setNewDomain(''); setNewPrize(''); setNewDeadline(''); setNewDesc('');
    } catch (err) {
      alert('Failed to add hackathon.');
    }
  };

  const getLeaderboard = () => {
    const participantMap = {};
    requests.forEach(r => {
      [r.rollNo, ...r.team].forEach(roll => {
        if (!participantMap[roll]) participantMap[roll] = { roll, points: 0, badges: [], name: roll === r.rollNo ? r.studentName : (students.find(s=>s.username === roll)?.name || 'Student') };
        participantMap[roll].points += 10;
        if (r.status === 'Approved') participantMap[roll].points += 20;
        if (r.attendance === 'Resolved') participantMap[roll].points += 100;
      });
    });

    const board = Object.values(participantMap).sort((a,b) => b.points - a.points);
    board.forEach(u => {
      if (u.points >= 100) u.badges.push({ name: 'Hackathon Finisher', color: 'var(--success)' });
      if (u.points >= 250) u.badges.push({ name: 'Elite Achiever', color: 'var(--warning)' });
    });
    return board;
  };

  const leaderboard = getLeaderboard();

  return (
    <>
      <div className="dashboard-header mb-4">
        <div>
           <h2>Resource Coordinator Portal</h2>
           <p className="text-muted">Manage hackathon pipelines, verify attendance, and rank students.</p>
        </div>
      </div>

      <div className="tabs glass-panel" style={{ padding: '0.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', gap: '0.5rem' }}>
         <div className={`tab ${activeTab === 'inbox' ? 'active' : ''}`} onClick={() => setActiveTab('inbox')}><Inbox size={16}/> Pending Inbox</div>
         <div className={`tab ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}><BarChart2 size={16}/> Master Registry & Dispatch</div>
         <div className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboard')}><Award size={16}/> Global Leaderboard</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          
          {activeTab === 'inbox' && (
            <div className="grid-container">
               <div className="card glass-panel" style={{ gridColumn: '1 / -1' }}>
                 <h3>Inbox: Pending Requests</h3>
                 <table className="table" style={{ marginTop: '1rem' }}>
                    <thead><tr><th>Student</th><th>Event</th><th>Date</th><th>Letter</th><th>Actions</th></tr></thead>
                    <tbody>
                      {pendingRequests.map(r => (
                        <tr key={r._id}>
                          <td><strong>{r.studentName}</strong><br/><span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{r.rollNo}</span></td>
                          <td>{r.event}</td>
                          <td>{new Date(r.date).toLocaleDateString()}</td>
                          <td><button className="btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }} onClick={() => setViewLetterReq(r)}>View Formal Letter</button></td>
                          <td>
                            <button className="btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', background: 'var(--success)', marginRight: '0.5rem' }} onClick={() => handleUpdateStatus(r._id, 'Approved')}>Approve</button>
                            <button className="btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)' }} onClick={() => handleUpdateStatus(r._id, 'Rejected')}>Reject</button>
                          </td>
                        </tr>
                      ))}
                      {pendingRequests.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center' }}>No pending requests!</td></tr>}
                    </tbody>
                 </table>
               </div>
               
               <div className="card glass-panel" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CopyPlus size={20}/> Publish New Hackathon</h3>
                    <form onSubmit={handleAddHackathon} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start', marginTop: '1rem' }}>
                       <input type="text" className="form-control" style={{ flex: 1, minWidth: '200px' }} placeholder="Event Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
                       <input type="text" className="form-control" style={{ flex: 1, minWidth: '150px' }} placeholder="Domain (e.g. AI)" value={newDomain} onChange={e => setNewDomain(e.target.value)} required />
                       <input type="date" className="form-control" style={{ flex: 1, minWidth: '150px' }} value={newDeadline} onChange={e => setNewDeadline(e.target.value)} required />
                       <input type="text" className="form-control" style={{ width: '100%' }} placeholder="Prize (e.g. $10,000)" value={newPrize} onChange={e => setNewPrize(e.target.value)} required />
                       <input type="text" className="form-control" style={{ width: '100%' }} placeholder="Description" value={newDesc} onChange={e => setNewDesc(e.target.value)} required />
                       <button type="submit" className="btn-primary">Add Event to Flash News</button>
                    </form>
                 </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="card glass-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ margin: 0 }}>Attendance Lifecycle & Dispatch</h3>
                
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <label style={{ margin: 0, whiteSpace: 'nowrap' }}>Select Event:</label>
                  <select 
                    className="form-control" 
                    style={{ margin: 0, width: 'auto', padding: '0.3rem 0.5rem' }} 
                    value={selectedEventId} 
                    onChange={e => setSelectedEventId(e.target.value)}
                  >
                    <option value="">-- Choose Event --</option>
                    {hackathons
                      .filter(h => h.status !== 'pending' && h.status !== 'rejected')
                      .map(h => (
                        <option key={h._id} value={h._id}>{h.title} ({h.status.toUpperCase()})</option>
                      ))
                    }
                  </select>
                </div>
              </div>

              {selectedEventId ? (
                <>
                  {(() => {
                    const currentEvent = hackathons.find(h => h._id === selectedEventId);
                    if (!currentEvent) return null;
                    
                    const presentCount = eventParticipants.filter(p => p.attendance_status === 'present').length;
                    
                    return (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                        <div>
                          <strong>Event Status: </strong>
                          <span className={`badge ${currentEvent.status === 'completed' ? 'badge-success' : 'badge-primary'}`}>
                            {currentEvent.status.toUpperCase()}
                          </span>
                          <span style={{ marginLeft: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            Certificates Sent: <strong>{currentEvent.certificates_sent || 0}</strong>
                          </span>
                        </div>
                        
                        {currentEvent.status !== 'completed' && presentCount > 0 && (
                          <button 
                            className="btn-primary" 
                            style={{ background: 'var(--success)' }} 
                            onClick={() => handleGenerateCertificates(selectedEventId)}
                            disabled={generatingCerts}
                          >
                            {generatingCerts ? 'Generating PDF & Emailing...' : 'Complete Event & Generate Certificates'}
                          </button>
                        )}
                      </div>
                    );
                  })()}

                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Participant</th>
                          <th>Attendance Status Stepper</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventParticipants.map(p => (
                          <tr key={p._id}>
                            <td>
                              <strong>{p.studentName}</strong>
                              <br />
                              <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.rollNo}</span>
                            </td>
                            <td>
                              <Stepper currentStage={p.attendance_status} />
                            </td>
                            <td>
                              {p.attendance_status !== 'certificate-issued' ? (
                                <button 
                                  className="btn-primary" 
                                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                  onClick={() => handleAdvanceAttendance(p._id)}
                                >
                                  Advance Stage
                                </button>
                              ) : (
                                <a 
                                  href={p.certificate_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  style={{ color: 'var(--success)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                  📄 View Certificate
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                        {eventParticipants.length === 0 && (
                          <tr>
                            <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">
                              No approved participants found for this event yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <p className="text-muted text-center" style={{ padding: '2rem' }}>Please select an event to manage attendance.</p>
              )}
            </div>
          )}

          {activeTab === 'leaderboard' && (
             <div className="card glass-panel">
                <h3 className="mb-4">🏆 College Hackathon Leaderboard</h3>
                <div className="table-responsive">
                    <table className="table">
                        <thead><tr><th>Rank</th><th>Roll Number / Name</th><th>Total Score</th><th>Badges</th></tr></thead>
                        <tbody>
                          {leaderboard.map((u, i) => (
                            <tr key={u.roll}>
                                <td><strong>{i+1}</strong></td>
                                <td><span className="text-primary" style={{fontFamily: 'monospace', fontWeight: 'bold'}}>{u.roll}</span><br/><small className="text-muted">{u.name}</small></td>
                                <td><span style={{fontSize:'1.5rem', fontWeight:'bold', color:'var(--primary)'}}>{u.points}</span></td>
                                <td>{u.badges.map((b, idx) => <span key={idx} className="badge" title={b.name} style={{background:'transparent', border:`1px solid ${b.color}`, color:b.color, marginRight:'5px'}}>{b.name === 'Hackathon Finisher' ? '🏅' : '⭐'}</span>)}</td>
                            </tr>
                          ))}
                          {leaderboard.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center' }}>No participants yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
             </div>
          )}

        </motion.div>
      </AnimatePresence>

      {viewLetterReq && (
        <LetterPreviewModal 
          request={viewLetterReq} 
          hackathon={hackathons.find(h => h.title === viewLetterReq.event)} 
          onClose={() => setViewLetterReq(null)} 
        />
      )}
    </>
  );
};

export default CoordinatorDashboard;
