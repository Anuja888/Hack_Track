import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { LogOut, Code2 } from 'lucide-react';
import StudentDashboard from '../components/StudentDashboard';
import CoordinatorDashboard from '../components/CoordinatorDashboard';
import HODDashboard from '../components/HODDashboard';
import AttendanceDashboard from '../components/AttendanceDashboard';

const Dashboard = () => {
  const { user, logout, token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [requests, setRequests] = useState([]);
  const [teamPosts, setTeamPosts] = useState([]);

  const now = new Date();
  const currentMonthYear = now.toLocaleString('default', { month: 'long', year: 'numeric' });

  useEffect(() => {
    fetchData();
  }, [user.role, token]);

  const fetchData = async () => {
    try {
      const config = { headers: { 'x-auth-token': token } };
      const hRes = await axios.get('http://localhost:5000/api/hackathons', config);
      setHackathons(hRes.data);
      
      const rRes = await axios.get('http://localhost:5000/api/requests', config);
      setRequests(rRes.data);

      const tRes = await axios.get('http://localhost:5000/api/team-posts', config);
      setTeamPosts(tRes.data);

      if (user.role !== 'student') {
        const sRes = await axios.get('http://localhost:5000/api/students', config);
        setStudents(sRes.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar glass-panel">
        <div className="nav-brand">
          <Code2 size={24} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} />
          HackTrack Base
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontWeight: 'bold' }}>{user.name}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
               {user.role === 'hod' ? 'Head of Department' : user.role === 'attendance' ? 'Attendance Manager' : user.role.toUpperCase()} | {currentMonthYear}
            </span>
          </div>
          <button onClick={logout} className="btn-outline" style={{ padding: '0.5rem 1rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      {user.role === 'student' && <StudentDashboard user={user} token={token} hackathons={hackathons} requests={requests} teamPosts={teamPosts} fetchData={fetchData} />}
      {user.role === 'coordinator' && <CoordinatorDashboard hackathons={hackathons} requests={requests} students={students} token={token} fetchData={fetchData} />}
      {user.role === 'hod' && <HODDashboard requests={requests} token={token} />}
      {user.role === 'attendance' && <AttendanceDashboard requests={requests} />}
    </div>
  );
};

export default Dashboard;
