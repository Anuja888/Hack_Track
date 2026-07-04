import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ChevronLeft, BarChart2, PieChart, TrendingUp, Award, Users, AlertCircle } from 'lucide-react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const AnalyticsDashboard = ({ token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMetrics();
  }, [token]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/analytics/dashboard', {
        headers: { 'x-auth-token': token }
      });
      setData(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch analytics metrics. Please ensure you are logged in as Ram Mohan Rao (HOD).');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p className="text-muted">Loading institution oversight analytics...</p>
        <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card glass-panel" style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px', margin: '2rem auto' }}>
        <AlertCircle size={48} color="var(--danger)" style={{ marginBottom: '1rem' }} />
        <h3 className="mb-2">Access Denied</h3>
        <p className="text-muted mb-4">{error}</p>
        <Link to="/dashboard" className="btn-primary">
          <ChevronLeft size={16} /> Return to Dashboard
        </Link>
      </div>
    );
  }

  if (!data) return null;

  // Chart Global Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#c9d1d9',
          font: { family: 'Inter', size: 12 }
        }
      },
      tooltip: {
        backgroundColor: '#161b22',
        titleColor: '#ffffff',
        bodyColor: '#c9d1d9',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#8b949e', font: { family: 'Inter' } }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#8b949e', font: { family: 'Inter' } }
      }
    }
  };

  // 1. Registered vs Attended Bar Chart Data
  const regVsAttData = {
    labels: ['Registered', 'Attended (Present)'],
    datasets: [
      {
        label: 'Participants',
        data: [data.registeredVsAttended.registered, data.registeredVsAttended.attended],
        backgroundColor: ['rgba(88, 166, 255, 0.6)', 'rgba(46, 160, 67, 0.6)'],
        borderColor: ['#58a6ff', '#2ea043'],
        borderWidth: 1.5,
        borderRadius: 6
      }
    ]
  };

  // 2. Events by Status Pie Chart Data
  const eventsStatusData = {
    labels: ['Upcoming', 'Ongoing', 'Completed'],
    datasets: [
      {
        data: [
          data.eventsByStatus.upcoming,
          data.eventsByStatus.ongoing,
          data.eventsByStatus.completed
        ],
        backgroundColor: [
          'rgba(188, 140, 255, 0.6)',
          'rgba(210, 153, 34, 0.6)',
          'rgba(46, 160, 67, 0.6)'
        ],
        borderColor: ['#bc8cff', '#d29922', '#2ea043'],
        borderWidth: 1
      }
    ]
  };

  // 3. Registration Trend (Last 7 Days) Line Chart Data
  const trendData = {
    labels: data.registrationTrend.map(t => t.date),
    datasets: [
      {
        label: 'New Registrations',
        data: data.registrationTrend.map(t => t.count),
        fill: true,
        backgroundColor: 'rgba(88, 166, 255, 0.1)',
        borderColor: '#58a6ff',
        pointBackgroundColor: '#58a6ff',
        pointHoverRadius: 6,
        tension: 0.3,
        borderWidth: 2
      }
    ]
  };

  // 4. Top 3 Events Horizontal Bar Data
  const topEventsData = {
    labels: data.topEvents.map(e => e.event),
    datasets: [
      {
        label: 'Attendees present',
        data: data.topEvents.map(e => e.count),
        backgroundColor: 'rgba(210, 153, 34, 0.6)',
        borderColor: '#d29922',
        borderWidth: 1.5,
        borderRadius: 6
      }
    ]
  };

  // 5. Certificate Delivery Rate Donut Data
  const certDeliveryData = {
    labels: ['Delivered', 'Remaining'],
    datasets: [
      {
        data: [
          data.certificateDelivery.sent,
          Math.max(0, data.certificateDelivery.total - data.certificateDelivery.sent)
        ],
        backgroundColor: ['rgba(46, 160, 67, 0.6)', 'rgba(248, 81, 73, 0.6)'],
        borderColor: ['#2ea043', '#f85149'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <div className="dashboard-header mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>🏫 Institutional Audit Analytics</h2>
          <p className="text-muted">Interactive real-time metrics showing college-wide hackathon lifecycle statistics.</p>
        </div>
        <Link to="/dashboard" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.6rem 1.2rem' }}>
          <ChevronLeft size={16} /> Return to HOD Oversight
        </Link>
      </div>

      <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Stat Card: Average Participants per Event */}
        <div className="card glass-panel" style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(88, 166, 255, 0.05) 0%, rgba(22, 27, 34, 0.8) 100%)',
          borderBottom: '4px solid var(--primary)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2rem'
        }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Average Participants Per Event</span>
            <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-light)', fontFamily: 'var(--font-heading)' }}>
              {data.averageParticipants}
            </span>
          </div>
          <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Users size={36} color="var(--primary)" />
          </div>
        </div>

        {/* Stat Card: Total Registered */}
        <div className="card glass-panel" style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(46, 160, 67, 0.05) 0%, rgba(22, 27, 34, 0.8) 100%)',
          borderBottom: '4px solid var(--success)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2rem'
        }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Gross Participants Registered</span>
            <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--success)', fontFamily: 'var(--font-heading)' }}>
              {data.registeredVsAttended.registered}
            </span>
          </div>
          <div style={{ background: 'rgba(46, 160, 67, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <TrendingUp size={36} color="var(--success)" />
          </div>
        </div>

        {/* Stat Card: Certificates Dispatched */}
        <div className="card glass-panel" style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(210, 153, 34, 0.05) 0%, rgba(22, 27, 34, 0.8) 100%)',
          borderBottom: '4px solid var(--warning)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2rem'
        }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Certificates Dispatched</span>
            <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--warning)', fontFamily: 'var(--font-heading)' }}>
              {data.certificateDelivery.sent}
            </span>
          </div>
          <div style={{ background: 'rgba(210, 153, 34, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Award size={36} color="var(--warning)" />
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
        
        {/* Chart 1: Registered vs Attended Bar Chart */}
        <div className="card glass-panel" style={{ minHeight: '350px' }}>
          <h3 className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
            <BarChart2 size={18} color="var(--primary)" /> 1. Registration vs Attendance Dispersion
          </h3>
          <div style={{ flex: 1, position: 'relative' }}>
            <Bar data={regVsAttData} options={chartOptions} />
          </div>
        </div>

        {/* Chart 2: Events by Status Pie Chart */}
        <div className="card glass-panel" style={{ minHeight: '350px' }}>
          <h3 className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
            <PieChart size={18} color="var(--warning)" /> 2. Event Distribution by Lifecycle State
          </h3>
          <div style={{ flex: 1, position: 'relative' }}>
            <Pie 
              data={eventsStatusData} 
              options={{
                ...chartOptions,
                scales: { x: { display: false }, y: { display: false } }
              }} 
            />
          </div>
        </div>

        {/* Chart 3: Registration Trend Line Chart */}
        <div className="card glass-panel" style={{ minHeight: '350px' }}>
          <h3 className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
            <TrendingUp size={18} color="var(--primary)" /> 3. Enrollment Volume Trend (Last 7 Days)
          </h3>
          <div style={{ flex: 1, position: 'relative' }}>
            <Line data={trendData} options={chartOptions} />
          </div>
        </div>

        {/* Chart 4: Top 3 Most Attended Events Horizontal Bar */}
        <div className="card glass-panel" style={{ minHeight: '350px' }}>
          <h3 className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
            <BarChart2 size={18} color="var(--warning)" style={{ transform: 'rotate(90deg)' }} /> 4. Most Attended Events (Top 3)
          </h3>
          <div style={{ flex: 1, position: 'relative' }}>
            <Bar 
              data={topEventsData} 
              options={{
                ...chartOptions,
                indexAxis: 'y'
              }} 
            />
          </div>
        </div>

        {/* Chart 5: Certificate Delivery Rate Donut Chart */}
        <div className="card glass-panel" style={{ minHeight: '350px', gridColumn: 'span 1' }}>
          <h3 className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
            <Award size={18} color="var(--success)" /> 5. Certificate Delivery Rate
          </h3>
          <div style={{ flex: 1, position: 'relative' }}>
            <Doughnut 
              data={certDeliveryData} 
              options={{
                ...chartOptions,
                cutout: '70%',
                scales: { x: { display: false }, y: { display: false } }
              }} 
            />
            {/* Center rate label */}
            {data.certificateDelivery.total > 0 && (
              <div style={{
                position: 'absolute',
                top: '55%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none'
              }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--success)' }}>
                  {Math.round((data.certificateDelivery.sent / data.certificateDelivery.total) * 100)}%
                </span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>DELIVERED</span>
              </div>
            )}
          </div>
        </div>

        {/* Card 6: Insights Details Panel */}
        <div className="card glass-panel" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
            <Award size={18} color="var(--primary)" /> 6. Key Institutional Metrics
          </h3>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>Certificate Delivery Efficiency</span>
              <p style={{ margin: '0.25rem 0 0 0', fontWeight: 'bold' }}>
                {data.certificateDelivery.sent} out of {data.certificateDelivery.total} present participants received certificates.
              </p>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--warning)' }}>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>Active Events Count</span>
              <p style={{ margin: '0.25rem 0 0 0', fontWeight: 'bold' }}>
                There are {data.eventsByStatus.upcoming + data.eventsByStatus.ongoing} active events currently hosted on the platform.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--success)' }}>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>Audit Completion Status</span>
              <p style={{ margin: '0.25rem 0 0 0', fontWeight: 'bold' }}>
                {data.eventsByStatus.completed} events have successfully concluded with all certificates issued.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsDashboard;
