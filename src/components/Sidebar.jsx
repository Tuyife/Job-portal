import React from 'react';
import { FiSearch, FiCode, FiPenTool, FiBriefcase, FiStar, FiTrendingUp, FiUsers, FiSettings } from 'react-icons/fi';

const Sidebar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  categories, 
  bookmarkedJobs, 
  jobs, 
  onJobClick 
}) => {
  // Map categories to icons
  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'development':
        return <FiCode size={16} />;
      case 'design':
        return <FiPenTool size={16} />;
      case 'marketing':
        return <FiTrendingUp size={16} />;
      case 'sales':
        return <FiUsers size={16} />;
      case 'all':
        return <FiBriefcase size={16} />;
      default:
        return <FiBriefcase size={16} />;
    }
  };

  const styles = {
    sidebar: {
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      width: '280px',
      height: 'fit-content',
      position: 'sticky',
      top: '80px'
    },
    section: {
      marginBottom: '24px',
    },
    title: {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#111827',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    searchInput: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    categoryBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      padding: '10px 12px',
      marginBottom: '6px',
      background: '#F9FAFB',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      textAlign: 'left',
      fontSize: '14px',
      color: '#374151',
      transition: 'all 0.2s'
    },
    activeCategory: {
      background: '#2563EB',
      color: 'white',
    },
    bookmarkItem: {
      padding: '10px',
      background: '#F9FAFB',
      marginBottom: '8px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background 0.2s'
    }
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.section}>
        <h3 style={styles.title}>
          <FiSearch size={16} /> Search Jobs
        </h3>
        <input
          type="text"
          placeholder="Search by title, company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.section}>
        <h3 style={styles.title}>
          <FiBriefcase size={16} /> Categories
        </h3>
        {categories.map(category => (
          <button
            key={category}
            style={{
              ...styles.categoryBtn,
              ...(selectedCategory === category ? styles.activeCategory : {})
            }}
            onClick={() => setSelectedCategory(category)}
          >
            {getCategoryIcon(category)}
            {category}
          </button>
        ))}
      </div>

      <div style={styles.section}>
        <h3 style={styles.title}>
          <FiStar size={16} /> Bookmarked ({bookmarkedJobs.length})
        </h3>
        {bookmarkedJobs.length === 0 ? (
          <p style={{ color: '#9CA3AF', fontSize: '13px', textAlign: 'center', padding: '20px' }}>
            No bookmarked jobs yet
          </p>
        ) : (
          bookmarkedJobs.map(jobId => {
            const job = jobs.find(j => j.id === jobId);
            return job ? (
              <div key={jobId} style={styles.bookmarkItem} onClick={() => onJobClick(job)}>
                <div style={{ fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{job.title}</div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>{job.company}</div>
              </div>
            ) : null;
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;
