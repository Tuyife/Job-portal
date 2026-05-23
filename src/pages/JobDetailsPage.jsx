import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { jobsData } from "../data/jobsData";
import "./JobDetailsPage.css";

function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const foundJob = jobsData.find(j => j.id === parseInt(id));
    setJob(foundJob);
  }, [id]);

  if (!job) {
    return <div className="not-found">Job not found</div>;
  }

  return (
    <div className="details-container">
      <Link to="/" className="back-link">← Back to Jobs</Link>
      
      <div className="job-details-card">
        <h1 className="job-title">{job.title}</h1>
        <div className="company-info">{job.company} • {job.location}</div>
        <div className="category-badge">{job.category}</div>
        
        <div className="details-section">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>
        
        <div className="details-section">
          <h3>Requirements</h3>
          <p>{job.requirements}</p>
        </div>
        
        <button className="apply-button">Apply Now</button>
      </div>
    </div>
  );
}

export default JobDetailsPage;
