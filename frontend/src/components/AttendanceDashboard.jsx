import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, Users } from 'lucide-react';

const AttendanceDashboard = ({ requests }) => {
  const [activeTab, setActiveTab] = useState('attendance-overview');
  const [filterYear, setFilterYear] = useState('All');
  const [filterDept, setFilterDept] = useState('All');

  const approvedRequests = requests.filter(r => r.status === 'Approved');
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const depts = [...new Set(approvedRequests.map(s => s.dept))];
  
  let filteredApproved = approvedRequests;
  if(filterYear !== 'All') filteredApproved = filteredApproved.filter(s => s.year === filterYear);
  if(filterDept !== 'All') filteredApproved = filteredApproved.filter(s => s.dept === filterDept);

  return (
    <>
      <div className="dashboard-header mb-4">
        <div>
           <h2>Attendance Manager Portal</h2>
           <p className="text-muted">Track and manage approved student attendance records.</p>
        </div>
      </div>

      <div className="tabs glass-panel" style={{ padding: '0.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', gap: '0.5rem' }}>
          <div className={`tab ${activeTab === 'attendance-overview' ? 'active' : ''}`} onClick={() => setActiveTab('attendance-overview')}><BarChart2 size={16}/> Overview</div>
          <div className={`tab ${activeTab === 'attendance-list' ? 'active' : ''}`} onClick={() => setActiveTab('attendance-list')}><Users size={16}/> Full List & Download</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          {activeTab === 'attendance-overview' && (
             <div className="card glass-panel">
                <h3>Attendance Manager Overview</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Breakdown of approved hackathon attendees by parameters.</p>
                
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                   <div style={{ flex: 1, background: 'var(--surface)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', borderBottom: '3px solid var(--primary)' }}>
                       <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Approved Students</div>
                       <div style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 'bold' }}>{approvedRequests.length}</div>
                   </div>
                   <div style={{ flex: 1, background: 'var(--surface)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', borderBottom: '3px solid var(--success)' }}>
                       <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Target Departments</div>
                       <div style={{ fontSize: '2rem', color: 'var(--success)', fontWeight: 'bold' }}>{depts.length}</div>
                   </div>
                </div>

                <div className="grid-container" style={{ gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr)' }}>
                   <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem' }}>
                     <h4>By Year</h4>
                     <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                       {years.map(y => (
                         <li key={y} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                           <span>{y}</span>
                           <strong>{approvedRequests.filter(s => s.year === y).length}</strong>
                         </li>
                       ))}
                     </ul>
                   </div>
                   <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem' }}>
                     <h4>By Department</h4>
                     <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                       {depts.map(d => (
                         <li key={d} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                           <span>{d}</span>
                           <strong>{approvedRequests.filter(s => s.dept === d).length}</strong>
                         </li>
                       ))}
                       {depts.length === 0 && <li className="text-muted">No data.</li>}
                     </ul>
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'attendance-list' && (
             <div className="card glass-panel">
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h3 style={{ margin: 0 }}>Approved Students List</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                     <select className="form-control" style={{ margin: 0, width: 'auto', padding: '0.3rem 0.5rem' }} value={filterYear} onChange={e => setFilterYear(e.target.value)}>
                        <option value="All">All Years</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                     </select>
                     <select className="form-control" style={{ margin: 0, width: 'auto', padding: '0.3rem 0.5rem' }} value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                        <option value="All">All Depts</option>
                        {depts.map(d => <option key={d} value={d}>{d}</option>)}
                     </select>
                     <button className="btn-primary" onClick={() => {
                        let csvContent = "data:text/csv;charset=utf-8,Name,Roll No,Year,Dept,Event\n";
                        filteredApproved.forEach(r => csvContent += `"${r.studentName}",${r.rollNo},${r.year},${r.dept},"${r.event}"\n`);
                        window.open(encodeURI(csvContent));
                     }}>Download CSV</button>
                  </div>
               </div>
               
               <div style={{ overflowX: 'auto' }}>
                 <table className="table">
                    <thead><tr><th>Name</th><th>Roll No</th><th>Year</th><th>Department</th><th>Event</th></tr></thead>
                    <tbody>
                      {filteredApproved.map(r => (
                        <tr key={r._id}>
                          <td><strong>{r.studentName}</strong></td>
                          <td style={{ fontFamily: 'monospace' }} className="text-primary">{r.rollNo}</td>
                          <td>{r.year}</td>
                          <td><span className="badge badge-info">{r.dept}</span></td>
                          <td>{r.event}</td>
                        </tr>
                      ))}
                      {filteredApproved.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center' }}>No students match filter.</td></tr>}
                    </tbody>
                 </table>
               </div>
               <div style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Showing {filteredApproved.length} of {approvedRequests.length} total.
               </div>
             </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AttendanceDashboard;
