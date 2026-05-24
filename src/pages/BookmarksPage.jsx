import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

const API = import.meta.env.VITE_API_URL || '/api';

const icons = {
  bookmark: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>,
  location: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  dollar: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  x: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
};

export default function BookmarksPage() {
  const navigate = useNavigate();
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(`${API}/users/bookmarks`);
        setBookmarkedJobs(res.data || []);
      } catch (err) {
        console.error(err);
        setBookmarkedJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const removeBookmark = async (jobId) => {
    try {
      await axios.post(`${API}/users/bookmarks/${jobId}`);
      setBookmarkedJobs(prev => prev.filter(job => job._id !== jobId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div style={s.header}>
        <h1 style={s.title}>Saved Jobs</h1>
        <p style={s.subtitle}>Jobs you've bookmarked</p>
      </div>

      {loading ? (
        <div style={s.loading}>Loading your bookmarks...</div>
      ) : bookmarkedJobs.length === 0 ? (
        <div style={s.empty}>
          <div style={s.emptyIcon}>🔖</div>
          <div style={s.emptyTitle}>No bookmarks yet</div>
          <div style={s.emptySub}>
            Start bookmarking jobs to save them for later
          </div>
          <button style={s.browseBtn} onClick={() => navigate('/jobs')}>
            Browse Jobs
          </button>
        </div>
      ) : (
        <div style={s.listContainer}>
          {bookmarkedJobs.map(job => (
            <div key={job._id} style={s.jobCard}>
              <div style={s.cardHeader}>
                <div style={{ flex: 1 }} onClick={() => navigate(`/jobs/${job._id}`)}>
                  <div style={s.jobTitle}>{job.title}</div>
                  <div style={s.company}>{job.company}</div>
                </div>
                <button 
                  style={s.unbookmarkBtn} 
                  onClick={() => removeBookmark(job._id)}
                  title="Remove bookmark"
                >
                  {icons.x}
                </button>
              </div>

              <div style={s.cardMeta}>
                <span style={s.metaItem}>{icons.location} {job.location}</span>
                <span style={s.metaItem}>{icons.dollar} {job.salary}</span>
              </div>

              <div style={s.cardBottom}>
                <span style={s.badge}>{job.category}</span>
                <span style={s.badge}>{job.type}</span>
              </div>

              <button 
                style={s.viewBtn} 
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

const s = {
  header: { background: 'white', padding: '24px', borderBottom: '1px solid #E5E3DC', maxWidth: '1200px', margin: '0 auto', width: '100%' },
  title: { fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '4px' },
  subtitle: { fontSize: '14px', color: '#6B7280' },
  loading: { textAlign: 'center', padding: '80px 20px', color: '#9CA3AF', fontSize: '15px' },
  empty: { textAlign: 'center', padding: '80px 24px', maxWidth: '600px', margin: '0 auto' },
  emptyIcon: { fontSize: '56px', marginBottom: '16px' },
  emptyTitle: { fontSize: '20px', fontWeight: '700', color: '#374151', marginBottom: '8px' },
  emptySub: { fontSize: '14px', color: '#9CA3AF', marginBottom: '24px', lineHeight: '1.5' },
  browseBtn: { padding: '12px 24px', background: '#111827', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  listContainer: { maxWidth: '1200px', margin: '0 auto', padding: '20px 24px', width: '100%' },
  jobCard: { background: 'white', borderRadius: '12px', border: '1px solid #E5E3DC', padding: '18px', marginBottom: '14px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '12px', cursor: 'pointer' },
  jobTitle: { fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '3px' },
  company: { fontSize: '14px', color: '#6B7280', fontWeight: '500' },
  unbookmarkBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', padding: '4px', flexShrink: 0 },
  cardMeta: { display: 'flex', gap: '14px', marginBottom: '12px', flexWrap: 'wrap' },
  metaItem: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#9CA3AF' },
  cardBottom: { display: 'flex', gap: '8px', marginBottom: '14px' },
  badge: { fontSize: '11px', fontWeight: '600', background: '#F3F4F6', color: '#374151', padding: '4px 10px', borderRadius: '6px' },
  viewBtn: { width: '100%', padding: '10px', background: '#F3F4F6', color: '#111827', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
};
