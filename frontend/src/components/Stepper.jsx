import React from 'react';
import { CheckCircle2, UserCheck, CalendarCheck, Award } from 'lucide-react';

const Stepper = ({ currentStage }) => {
  const stages = [
    { key: 'registered', label: 'Registered', icon: CheckCircle2 },
    { key: 'checked-in', label: 'Checked-In', icon: UserCheck },
    { key: 'present', label: 'Present', icon: CalendarCheck },
    { key: 'certificate-issued', label: 'Certificate Issued', icon: Award }
  ];

  const currentIdx = stages.findIndex(s => s.key === currentStage);

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', width: '100%' }}>
        {/* Background track line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '5%',
          right: '5%',
          height: '4px',
          background: 'rgba(255,255,255,0.08)',
          zIndex: 1,
          borderRadius: '2px'
        }}></div>

        {/* Active progress line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '5%',
          width: `${currentIdx >= 0 ? (currentIdx / (stages.length - 1)) * 90 : 0}%`,
          height: '4px',
          background: 'var(--gradient-1)',
          zIndex: 1,
          transition: 'width 0.4s ease',
          borderRadius: '2px',
          boxShadow: '0 0 10px var(--primary)'
        }}></div>

        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isCompleted = idx < currentIdx;
          const isActive = idx === currentIdx;
          
          let circleBg = 'rgba(255,255,255,0.05)';
          let borderColor = 'var(--border)';
          let iconColor = 'var(--text-muted)';
          let labelColor = 'var(--text-muted)';
          let glow = 'none';

          if (isActive) {
            circleBg = 'var(--surface)';
            borderColor = 'var(--primary)';
            iconColor = 'var(--primary)';
            labelColor = 'var(--text-light)';
            glow = '0 0 15px rgba(88, 166, 255, 0.4)';
          } else if (isCompleted || currentStage === 'certificate-issued') {
            circleBg = 'rgba(46, 160, 67, 0.1)';
            borderColor = 'var(--success)';
            iconColor = 'var(--success)';
            labelColor = 'var(--success)';
          }

          return (
            <div key={stage.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1, textAlign: 'center' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: circleBg,
                border: `2px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: glow,
                transition: 'all 0.3s ease'
              }}>
                <Icon size={20} color={iconColor} />
              </div>
              <span style={{
                marginTop: '0.6rem',
                fontSize: '0.8rem',
                fontWeight: isActive ? '600' : '500',
                color: labelColor,
                transition: 'color 0.3s ease'
              }}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
