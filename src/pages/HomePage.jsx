import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const API = '';

const icons = {
  briefcase: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  location:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  arrow:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
};

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentJobs, setRecentJobs] = useState([]);
  const [stats,      setStats]      = useState({ jobs: 0, categories: 0 });
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/jobs`),
      axios.get(`${API}/jobs/categories`)
    ]).then(([jobsRes, catsRes]) => {
      setRecentJobs(jobsRes.data.slice(0, 4));
      setStats({ jobs: jobsRes.data.length, categories: catsRes.data.length });
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { name: 'Development', sub: 'Frontend, Backend, Full Stack' },
    { name: 'Design',      sub: 'UI/UX, Product Design' },
    { name: 'DevOps',      sub: 'Cloud, Infrastructure' },
    { name: 'Data',        sub: 'ML, Analytics, AI' },
  ];

  return (
    <Layout>
      <div style={s.hero}>
        <div style={s.heroTop}>
          <span style={s.heroBadge}>Featured jobs, fresh opportunities</span>
          <h1 style={s.heroTitle}>Find your next<br />dream role fast.</h1>
          <p style={s.heroText}>Browse verified job listings, save favorites, and apply in one click from your dashboard.</p>
          <div style={s.heroActions}>
            <button style={s.ctaBtn} onClick={() => navigate('/jobs')}>Browse jobs</button>
            <button style={s.secondaryBtn} onClick={() => navigate('/applications')}>View applications</button>
          </div>
        </div>
        <div style={s.stats}>
          <div style={s.stat}>
            <span style={s.statNum}>{stats.jobs}+</span>
            <span style={s.statLabel}>Live Jobs</span>
          </div>
          <div style={s.statDivider} />
          <div style={s.stat}>
            <span style={s.statNum}>{stats.categories}+</span>
            <span style={s.statLabel}>Categories</span>
          </div>
          <div style={s.statDivider} />
          <div style={s.stat}>
            <span style={s.statNum}>200+</span>
            <span style={s.statLabel}>Companies</span>
          </div>
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionHeader}>
          <span style={s.sectionTitle}>Categories</span>
          <button style={s.seeAll} onClick={() => navigate('/jobs')}>See all</button>
        </div>
        <div style={s.catsGrid}>
          {categories.map(c => (
            <div key={c.name} style={s.catCard} onClick={() => navigate(`/jobs?category=${c.name}`)}>
              <div style={s.catName}>{c.name}</div>
              <div style={s.catSub}>{c.sub}</div>
              <div style={s.catArrow}>{icons.arrow}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionHeader}>
          <span style={s.sectionTitle}>Recent Jobs</span>
          <button style={s.seeAll} onClick={() => navigate('/jobs')}>See all</button>
        </div>
        {loading ? (
          <div style={s.loading}>Loading jobs...</div>
        ) : recentJobs.map(job => (
          <div key={job._id} style={s.jobCard} onClick={() => navigate(`/jobs/${job._id}`)}>
            <div style={s.jobTop}>
              <div>
                <div style={s.jobTitle}>{job.title}</div>
                <div style={s.jobCompany}>{job.company}</div>
              </div>
              <span style={s.jobType}>{job.type}</span>
            </div>
            <div style={s.jobMeta}>
              <span style={s.jobMetaItem}>{icons.location} {job.location}</span>
              <span style={s.jobMetaItem}>{icons.briefcase} {job.salary}</span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

const s = {
  hero:        { background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)', padding: '48px 24px 32px', color: 'white', borderRadius: '0 0 32px 32px', marginBottom: '20px' },
  heroTop:     { maxWidth: '780px', marginBottom: '32px' },
  heroBadge:   { display: 'inline-flex', padding: '8px 14px', borderRadius: '999px', background: '#111827', color: '#F9FAFB', fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '18px' },
  greeting:    { fontSize: '14px', color: '#D1D5DB', marginBottom: '8px' },
  heroTitle:   { fontSize: '44px', fontWeight: '800', lineHeight: '1.05', marginBottom: '18px', letterSpacing: '-1px' },
  heroText:    { fontSize: '16px', color: '#D1D5DB', lineHeight: '1.8', maxWidth: '620px', marginBottom: '28px' },
  heroActions: { display: 'flex', flexWrap: 'wrap', gap: '14px' },
  ctaBtn:      { background: '#F97316', color: 'white', border: 'none', borderRadius: '14px', padding: '14px 24px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 18px 40px rgba(249,115,22,0.18)' },
  secondaryBtn:{ background: 'rgba(255,255,255,0.14)', color: 'white', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '14px', padding: '14px 24px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  stats:       { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px', marginTop: '12px' },
  stat:        { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  statNum:     { fontSize: '28px', fontWeight: '700', color: 'white' },
  statLabel:   { fontSize: '12px', color: '#9CA3AF', marginTop: '4px' },
  statDivider: { display: 'none' },
  section:     { padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' },
  sectionTitle:  { fontSize: '20px', fontWeight: '700', color: '#111827' },
  seeAll:      { background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#6B7280', fontWeight: '500' },
  catsGrid:    { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '8px' },
  catCard:     { background: 'white', borderRadius: '14px', padding: '20px', border: '1px solid #E5E3DC', cursor: 'pointer', position: 'relative', transition: 'all 0.2s' },
  catName:     { fontSize: '15px', fontWeight: '700', color: '#111827', marginBottom: '6px' },
  catSub:      { fontSize: '13px', color: '#9CA3AF', lineHeight: '1.4' },
  catArrow:    { position: 'absolute', top: '18px', right: '18px', color: '#D1D5DB' },
  loading:     { textAlign: 'center', padding: '40px', color: '#9CA3AF', fontSize: '14px' },
  jobCard:     { background: 'white', borderRadius: '14px', padding: '18px', border: '1px solid #E5E3DC', marginBottom: '12px', cursor: 'pointer', transition: 'all 0.2s' },
  jobTop:      { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  jobTitle:    { fontSize: '15px', fontWeight: '700', color: '#111827', marginBottom: '3px' },
  jobCompany:  { fontSize: '13px', color: '#6B7280' },
  jobType:     { fontSize: '11px', fontWeight: '600', background: '#F3F4F6', color: '#374151', padding: '6px 10px', borderRadius: '6px', whiteSpace: 'nowrap' },
  jobMeta:     { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  jobMetaItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9CA3AF' },
};
