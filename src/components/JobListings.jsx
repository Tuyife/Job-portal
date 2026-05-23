import React from 'react';
import JobCard from './JobCard';
import './JobListings.css';

const JobListings = ({ jobs, bookmarkedJobs, onBookmark, onJobClick }) => {
  return (
    <main className="job-listings">
      <div className="results-header">
        <h2>{jobs.length} Jobs Found</h2>
      </div>
      
      <div className="jobs-grid">
        {jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            isBookmarked={bookmarkedJobs.includes(job.id)}
            onBookmark={onBookmark}
            onClick={() => onJobClick(job)}
          />
        ))}
      </div>
      
      {jobs.length === 0 && (
        <div className="no-results">
          <p>No jobs found matching your criteria.</p>
        </div>
      )}
    </main>
  );
};

export default JobListings;