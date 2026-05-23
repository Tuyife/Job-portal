import React from 'react';
import './JobDetails.css';

const JobDetails = ({ job, onClose, onApply }) => {
  const handleApplyClick = () => {
    console.log('Apply Now clicked for:', job.title);
    console.log('onApply function exists?', typeof onApply);
    if (onApply) {
      onApply();
    } else {
      alert('Error: Apply function not available');
    }
  };

  return (
    <div className="job-details-overlay" onClick={onClose}>
      <div className="job-details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>
        
        <h2>{job.title}</h2>
        <h3>{job.company}</h3>
        
        <div className="job-details-info">
          <p><strong>📍 Location:</strong> {job.location}</p>
          <p><strong>💼 Type:</strong> {job.type}</p>
          <p><strong>💰 Salary:</strong> {job.salary}</p>
          <p><strong>📅 Posted:</strong> {job.posted}</p>
        </div>
        
        <div className="job-details-section">
          <h4>Description</h4>
          <p>{job.description}</p>
        </div>
        
        <div className="job-details-section">
          <h4>Requirements</h4>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
        
        <button className="apply-now-btn" onClick={handleApplyClick}>
          📝 Apply Now - Click Here
        </button>
      </div>
    </div>
  );
};

export default JobDetails;