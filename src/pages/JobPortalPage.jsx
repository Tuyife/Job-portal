import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiGrid, FiList } from "react-icons/fi";
import { jobsData } from "../data/jobsData";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";
import "./JobPortalPage.css";

function JobPortalPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    setJobs(jobsData);
    setFilteredJobs(jobsData);
    const uniqueCategories = ["All", ...new Set(jobsData.map((job) => job.category))];
    setCategories(uniqueCategories);
    
    const saved = localStorage.getItem("bookmarkedJobs");
    if (saved) {
      setBookmarkedJobs(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = jobs;
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter((job) => job.category === selectedCategory);
    }
    setFilteredJobs(filtered);
  }, [searchTerm, selectedCategory, jobs]);

  const handleBookmark = (jobId) => {
    let newBookmarks;
    if (bookmarkedJobs.includes(jobId)) {
      newBookmarks = bookmarkedJobs.filter(id => id !== jobId);
    } else {
      newBookmarks = [...bookmarkedJobs, jobId];
    }
    setBookmarkedJobs(newBookmarks);
    localStorage.setItem("bookmarkedJobs", JSON.stringify(newBookmarks));
  };

  const handleJobClick = (job) => {
    window.location.href = `/job/${job.id}`;
  };

  return (
    <div className="portal-container">
      <Header />
      <div className="portal-layout">
        <Sidebar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          bookmarkedJobs={bookmarkedJobs}
          jobs={jobs}
          onJobClick={handleJobClick}
        />
        <div className="portal-content">
          <div className="results-header">
            <div className="results-count">
              Found <span>{filteredJobs.length}</span> jobs
            </div>
            <div className="view-options">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FiGrid size={16} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FiList size={16} />
              </button>
            </div>
          </div>

          {loading ? (
            <p className="loading-text">Loading jobs...</p>
          ) : filteredJobs.length === 0 ? (
            <div className="empty-state">
              <p>No jobs found matching your criteria</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job}
                  isBookmarked={bookmarkedJobs.includes(job.id)}
                  onBookmark={handleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="jobs-list">
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job}
                  isBookmarked={bookmarkedJobs.includes(job.id)}
                  onBookmark={handleBookmark}
                  variant="list"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobPortalPage;
