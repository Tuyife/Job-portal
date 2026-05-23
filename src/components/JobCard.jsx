import React from 'react';
import './JobCard.css';

const JobCard = ({ job, isBookmarked, onBookmark, onClick }) => {
  return (
    <div className="job-card" onClick={onClick}>
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <button
          className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onBookmark(job.id);
          }}
        >
          {isBookmarked ? '★' : '☆'}
        </button>
      </div>
      <div className="job-card-company">{job.company}</div>
      <div className="job-card-details">
        <span>📍 {job.location}</span>
        <span>💼 {job.type}</span>
        <span>💰 {job.salary}</span>
      </div>
      <div className="job-card-footer">
        <span>📅 {job.posted}</span>
        <span className="job-category">{job.category}</span>
      </div>
    </div>
  );
};

export default JobCard;
