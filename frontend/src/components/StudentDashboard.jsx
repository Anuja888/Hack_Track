import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Users, Award } from 'lucide-react';
import LetterPreviewModal from './LetterPreviewModal';

const StudentDashboard = ({ user, token, hackathons, requests, teamPosts, fetchData }) => {
  const [activeTab, setActiveTab] = useState('hackathons');
  
  // Application modal & letter states
  const [applyModalOpen, setApplyModalOpen] = useState('');
  const [appDept, setAppDept] = useState('IT');
  const [appYear, setAppYear] = useState('1st Year');
  const [newTeamMemberRoll, setNewTeamMemberRoll] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [viewLetterPreview, setViewLetterPreview] = useState(false);

  // Post team request states
  const [postEvent, setPostEvent] = useState('');
  const [postSkills, setPostSkills] = useState('');
  const [postMsg, setPostMsg] = useState('');

  const myReqs = requests.filter(r => r.studentId === user.id || r.rollNo === user.username || r.team.includes(user.username));
  let points = 0;
  myReqs.forEach(r => {
    points += 10;
    if (r.status === 'Approved') points += 20;
    if (r.attendance === 'Resolved') points += 100;
  });
  
  let badges = [];
  if (points >= 100) badges.push({ icon: '🏆', name: 'Hackathon Finisher', color: 'var(--success)' });
  if (points >= 250) badges.push({ icon: '⭐', name: 'Elite Achiever', color: 'var(--warning)' });
  if (myReqs.length >= 3) badges.push({ icon: '🚀', name: 'Enthusiast', color: 'var(--primary)' });

  const addTeamMember = () => {
    if (!newTeamMemberRoll.match(/^1602-(24|25|26|27|28)-(732|733|734|735|737)-\d{3}$/)) {
        return alert('Invalid Roll Number Format');
    }
    if (newTeamMemberRoll === user.username) return alert('You are already the primary applicant');
    if (teamMembers.includes(newTeamMemberRoll)) return alert('Member already added');
    
    setTeamMembers([...teamMembers, newTeamMemberRoll]);
    setNewTeamMemberRoll('');
    setViewLetterPreview(false);
  };

  const submitApplication = async () => {
    try {
      await axios.post('http://localhost:5000/api/requests', {
        year: appYear,
        dept: appDept,
        event: applyModalOpen,
        team: teamMembers
      }, { headers: { 'x-auth-token': token } });
      alert('Application formally submitted to Coordinator!');
      setApplyModalOpen('');
      setTeamMembers([]);
      fetchData();
    } catch(err) {
      alert('Failed to apply.');
    }
  };

  const handleUploadResult = async (id) => {
    const link = prompt('Provide Google Drive link to your Certificates/Proof:');
    if (!link) return;
    try {
      await axios.put(`http://localhost:5000/api/requests/${id}`, { attendance: 'Resolved' }, { headers: { 'x-auth-token': token } });
      alert('Certificates uploaded! Points awarded.');
      fetchData();
    } catch(err) {
      alert('Failed to upload result.');
    }
  };

  const handleAddTeamPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/team-posts', {
        event: postEvent, needed: postSkills, msg: postMsg
      }, { headers: { 'x-auth-token': token } });
      alert('Recruitment posted successfully!');
      fetchData();
      setPostEvent(''); setPostSkills(''); setPostMsg('');
    } catch(err) {
      alert('Failed to post.');
    }
  };

  return (
    <>
      <div className="tabs glass-panel" style={{ padding: '0.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', gap: '0.5rem' }}>
        <div className={`tab ${activeTab === 'hackathons' ? 'active' : ''}`} onClick={() => setActiveTab('hackathons')}><Code2 size={16}/> Hackathons</div>
        <div className={`tab ${activeTab === 'teamboard' ? 'active' : ''}`} onClick={() => setActiveTab('teamboard')}><Users size={16}/> Team Board</div>
        <div className={`tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><Award size={16}/> My Profile</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          
          {activeTab === 'hackathons' && (
            <div className="grid-container">
              <div className="card glass-panel" style={{ gridColumn: '1 / -1' }}>
                 <h3>Live Hackathons</h3>
                 <div className="grid-container mt-3">
                    {hackathons.map(h => (
                      <div key={h._id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', position: 'relative' }}>
                         <span className="badge badge-primary" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>{h.domain}</span>
                         <h4 style={{ margin: '0 0 1rem 0' }}>{h.title}</h4>
                         <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{h.desc}</p>
                         <button className="btn-primary" style={{ width: '100%' }} onClick={() => setApplyModalOpen(h.title)}>Apply Now</button>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="card glass-panel" style={{ gridColumn: '1 / -1', marginTop: '1.5rem' }}>
                 <h3>My Applications History</h3>
                 <div style={{ overflowX: 'auto' }}>
                    <table className="table" style={{ marginTop: '1rem' }}>
                        <thead><tr><th>Event</th><th>Lead</th><th>Date</th><th>Status</th><th>Results Status</th><th>Action</th></tr></thead>
                        <tbody>
                          {myReqs.map(r => (
                            <tr key={r._id}>
                              <td><strong>{r.event}</strong></td>
                              <td>{r.rollNo === user.username ? <span className="badge badge-primary">You</span> : r.studentName}</td>
                              <td>{new Date(r.date).toLocaleDateString()}</td>
                              <td><span className={`badge badge-${r.status==='Approved'?'success':r.status==='Rejected'?'danger':'warning'}`}>{r.status}</span></td>
                              <td><span className={`badge badge-${r.attendance==='Resolved'?'success':'primary'}`}>{r.attendance}</span></td>
                              <td>
                                {r.status === 'Approved' && r.attendance === 'Queued' && r.rollNo === user.username ? (
                                  <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleUploadResult(r._id)}>Upload Result</button>
                                ) : '-'}
                              </td>
                            </tr>
                          ))}
                          {myReqs.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>No applications yet. Start building!</td></tr>}
                        </tbody>
                    </table>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'teamboard' && (
            <div className="grid-container" style={{ gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 2fr)' }}>
              <div className="card glass-panel">
                 <h3>Post a Request</h3>
                 <form onSubmit={handleAddTeamPost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <input className="form-control" style={{ margin: 0 }} placeholder="Target Hackathon" value={postEvent} onChange={e=>setPostEvent(e.target.value)} required />
                    <input className="form-control" style={{ margin: 0 }} placeholder="Required Skills" value={postSkills} onChange={e=>setPostSkills(e.target.value)} required />
                    <textarea className="form-control" style={{ margin: 0, minHeight: '80px' }} placeholder="Explain what you need" value={postMsg} onChange={e=>setPostMsg(e.target.value)} required></textarea>
                    <button type="submit" className="btn-primary">Post to Board</button>
                 </form>
              </div>
              <div className="card glass-panel">
                 <h3>Team Formation Board</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                   {teamPosts.map(p => (
                     <div key={p._id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                           <strong>{p.name} <span style={{ color: 'var(--text-muted)', fontWeight: 'normal', fontSize: '0.8rem' }}>({p.authorRoll})</span></strong>
                           <span className="badge badge-primary">{p.event}</span>
                        </div>
                        <p style={{ color: 'var(--primary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Needs: {p.needed}</p>
                        <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>"{p.msg}"</p>
                        <button className="btn-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }} onClick={() => alert('Connect feature coming soon!')}>Connect</button>
                     </div>
                   ))}
                   {teamPosts.length === 0 && <p className="text-muted">No one is currently looking for teammates.</p>}
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="card glass-panel">
               <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h2>{user.name}</h2>
                  <p style={{ color: 'var(--text-muted)' }}>{user.username} &bull; Vasavi College of Engineering</p>
               </div>
               
               <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                 <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', minWidth: '150px' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Points</div>
                    <div style={{ fontSize: '2rem', color: 'var(--warning)', fontWeight: 'bold' }}>{points}</div>
                 </div>
                 <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', minWidth: '150px' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Hackathons Attended</div>
                    <div style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 'bold' }}>{myReqs.filter(r => r.attendance === 'Resolved').length}</div>
                 </div>
               </div>

               <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Earned Badges</h3>
               <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 {badges.map((b, i) => (
                   <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${b.color}`, padding: '1.5rem', borderRadius: '8px', textAlign: 'center', minWidth: '120px' }}>
                     <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{b.icon}</div>
                     <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{b.name}</div>
                   </div>
                 ))}
                 {badges.length === 0 && <p className="text-muted" style={{ fontStyle: 'italic' }}>"Every grand journey begins with a single commit. Apply for your first hackathon!"</p>}
               </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Application Form Modal */}
      {applyModalOpen && (
        <div className="modal-overlay active" style={{ zIndex: 900 }}>
          <div className="modal-content" style={{ maxWidth: viewLetterPreview ? '1000px' : '500px', width: '100%', transition: 'all 0.3s' }}>
            <div className="modal-header">
              <h3>Apply: {applyModalOpen}</h3>
              <button className="modal-close" onClick={() => { setApplyModalOpen(''); setViewLetterPreview(false); setTeamMembers([]); }}>✕</button>
            </div>
            
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Event</label>
                    <input type="text" className="form-control" value={applyModalOpen} readOnly />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Year of Study</label>
                        <select className="form-control" value={appYear} onChange={e => setAppYear(e.target.value)}>
                            <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Department</label>
                        <select className="form-control" value={appDept} onChange={e => setAppDept(e.target.value)}>
                            <option>IT</option><option>CSE</option><option>ECE</option>
                        </select>
                    </div>
                </div>
                
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Dynamic Team Members</label>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input type="text" className="form-control" style={{ margin: 0 }} placeholder="Roll Number (e.g. 1602-...)" value={newTeamMemberRoll} onChange={e => setNewTeamMemberRoll(e.target.value)} />
                        <button type="button" className="btn-primary" onClick={addTeamMember}>Add</button>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px', minHeight: '40px' }}>
                        {teamMembers.length === 0 ? <span className="text-muted" style={{ fontSize: '0.8rem' }}>None (Solo Submission)</span> : 
                           teamMembers.map((tm, idx) => (
                             <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                               <span style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>{tm}</span>
                               <button style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }} onClick={() => setTeamMembers(teamMembers.filter(t => t !== tm))}>✕</button>
                             </div>
                           ))
                        }
                    </div>
                </div>

                {!viewLetterPreview ? (
                    <button className="btn-outline w-100" onClick={() => setViewLetterPreview(true)}>Generate Letter Preview</button>
                ) : (
                    <button className="btn-primary w-100" style={{ background: 'var(--success)' }} onClick={submitApplication}>Submit Request To Coordinator</button>
                )}
              </div>
              
              {viewLetterPreview && (
                 <div style={{ flex: 1.5 }}>
                   <div style={{ position: 'relative', height: '100%', pointerEvents: 'none' }}>
                     <LetterPreviewModal 
                       request={{ event: applyModalOpen, year: appYear, dept: appDept, studentName: user.name, rollNo: user.username, team: teamMembers, date: new Date() }}
                       hackathon={hackathons.find(h => h.title === applyModalOpen)}
                       onClose={() => {}}
                     />
                   </div>
                 </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentDashboard;
