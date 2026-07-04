import React from 'react';

const LetterPreviewModal = ({ request, hackathon, onClose }) => {
  if (!request) return null;

  const eventDate = hackathon ? new Date(hackathon.deadline).toLocaleDateString() : 'TBD';
  const currentDate = new Date(request.date).toLocaleDateString();

  return (
    <div className="modal-overlay active" style={{ zIndex: 1000 }}>
      <div className="modal-content" style={{ maxWidth: '700px', width: '100%' }}>
        <div className="modal-header">
          <h3><i className='bx bx-file'></i> Student Request Letter</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="letter-preview" style={{ 
              fontFamily: '"Times New Roman", Times, serif', 
              background: '#f9f9f9', 
              color: 'black', 
              padding: '2rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              maxHeight: '60vh', 
              overflowY: 'auto',
              lineHeight: '1.6'
            }}>
            <div style={{ textAlign: 'right', marginBottom: '2rem' }}>Date: {currentDate}</div>
            <p>To,<br/>The Head of Department,<br/>Department of {request.dept},<br/>Vasavi College of Engineering (VCE).</p>
            <p>Respected Sir/Madam,</p>
            <div style={{ fontWeight: 'bold', textDecoration: 'underline', margin: '1.5rem 0', textAlign: 'center' }}>
              Subject: Request for permission to participate in {request.event}
            </div>
            <p>We, the students from {request.year}, Department of {request.dept}, humbly request your permission to officially participate in the technical event, <strong>{request.event}</strong>.</p>
            <p><strong>Primary Participant:</strong> {request.studentName} ({request.rollNo})<br/>
              <strong>Team Members:</strong> <br/>
              {request.team.length === 0 ? 
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;None (Solo Submission)</span> : 
                request.team.map((t, idx) => <span key={idx}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t}<br/></span>)
              }
            </p>
            <p><strong>Hackathon Date:</strong> {eventDate}</p>
            <p>This event will greatly enhance our technical skills and provide practical industry exposure. We assure you that we will cover up any missed academic work during the duration of the event.</p>
            <p>Thanking you,</p>
            <p style={{ marginTop: '2rem' }}>Yours sincerely,<br/><strong>{request.studentName}</strong><br/>{request.rollNo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPreviewModal;
