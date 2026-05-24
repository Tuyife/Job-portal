import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';

const API = import.meta.env.VITE_API_URL || '/api';

const icons = {
  search:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  location: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  dollar:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  clock:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  filter:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  x:        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
};

export default function JobsPage() {
  const navigate         = useNavigate();
  const [searchParams]   = useSearchParams();
  const [jobs,        setJobs]        = useState([]);
  const [categories,  setCategories]  = useState(['All']);
  const [search,      setSearch]      = useState('');
  const [category,    setCategory]    = useState('All');
  const [filterOpen,  setFilterOpen]  = useState(false);
  const [selTypes,    setSelTypes]    = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    const categoryParam = searchParams.get('category') || 'All';
    setCategory(categoryParam);
  }, [searchParams]);

  useEffect(() => {
    axios.get(`${API}/jobs/categories`)
      .then(res => setCategories(['All', ...res.data]))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search)                params.search   = search;
    if (category !== 'All')    params.category = category;
    if (selTypes.length === 1) params.type     = selTypes[0];
    axios.get(`${API}/jobs`, { params })
      .then(res => setJobs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, category, selTypes]);

  const types = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];

  const toggleType = t => setSelTypes(prev =>
    prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
  );

  return (
    <Layout>
      <div style={s.jobsHeader}>
        <div>
          <span style={s.jobsLabel}>Job search</span>
          <h1 style={s.jobsTitle}>Explore open roles from top companies</h1>
          <p style={s.jobsSubtitle}>Search by title, location, category, or type. Your next opportunity is one click away.</p>
        </div>
        <div style={s.topActions}>
          <button style={s.filterBtn} onClick={() => setFilterOpen(true)}>
            {icons.filter} Filter
          </button>
        </div>
      </div>

      <div style={s.searchBar}>
        <div style={s.searchBox}>
          {icons.search}
          <input
            style={s.searchInput}
            placeholder="Search jobs, companies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button style={s.clearBtn} onClick={() => setSearch('')}>{icons.x}</button>}
        </div>
      </div>

      <div style={s.catsWrap}>
        {categories.map(c => (
          <button key={c} style={{ ...s.catChip, background: category === c ? '#111827' : 'white', color: category === c ? 'white' : '#374151', borderColor: category === c ? '#111827' : '#E5E3DC' }} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <div style={s.results}>
        <span style={s.resultsText}>{jobs.length} positions found</span>
      </div>

      {loading ? (
        <div style={s.loading}>Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div style={s.empty}>
          <div style={s.emptyTitle}>No jobs found</div>
          <div style={s.emptySub}>Try adjusting your search or filters</div>
        </div>
      ) : jobs.map(job => (
        <div key={job._id} style={s.jobCard} onClick={() => navigate(`/jobs/${job._id}`)}>
          <div style={s.jobTop}>
            <div style={{ flex: 1 }}>
              <div style={s.jobTitle}>{job.title}</div>
              <div style={s.jobCompany}>{job.company}</div>
            </div>
            <span style={s.jobType}>{job.type}</span>
          </div>
          <div style={s.jobMeta}>
            <span style={s.metaItem}>{icons.location} {job.location}</span>
            <span style={s.metaItem}>{icons.dollar} {job.salary}</span>
          </div>
          <div style={s.jobFooter}>
            <span style={s.catBadge}>{job.category}</span>
            <span style={s.jobDate}>{icons.clock} {new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}

      {filterOpen && (
        <div style={s.overlay} onClick={() => setFilterOpen(false)}>
          <div style={s.drawer} onClick={e => e.stopPropagation()}>
            <div style={s.drawerHead}>
              <span style={s.drawerTitle}>Filter Jobs</span>
              <button style={s.drawerClose} onClick={() => setFilterOpen(false)}>{icons.x}</button>
            </div>
            <div style={s.drawerSection}>
              <div style={s.drawerSectionTitle}>Job Type</div>
              <div style={s.typeGrid}>
                {types.map(t => (
                  <button key={t} style={{ ...s.typeChip, background: selTypes.includes(t) ? '#111827' : 'white', color: selTypes.includes(t) ? 'white' : '#374151', borderColor: selTypes.includes(t) ? '#111827' : '#E5E3DC' }} onClick={() => toggleType(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <button style={s.applyBtn} onClick={() => setFilterOpen(false)}>Apply Filters</button>
            {selTypes.length > 0 && (
              <button style={s.clearAllBtn} onClick={() => { setSelTypes([]); setFilterOpen(false); }}>Clear All</button>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

const s = {
  jobsHeader:   { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap', padding: '28px 24px 8px', maxWidth: '1200px', margin: '0 auto' },
  jobsLabel:    { fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F97316', fontWeight: '700' },
  jobsTitle:    { fontSize: '32px', lineHeight: '1.1', color: '#111827', maxWidth: '760px', margin: 0 },
  jobsSubtitle: { fontSize: '15px', color: '#6B7280', marginTop: '10px', maxWidth: '640px' },
  topActions:   { display: 'flex', alignItems: 'center', gap: '12px' },
  searchBar:    { display: 'flex', gap: '12px', padding: '16px 24px', background: 'white', borderRadius: '18px', border: '1px solid #E5E3DC', maxWidth: '1200px', margin: '0 auto', width: '100%' },
  searchBox:    { flex: 1, display: 'flex', alignItems: 'center', gap: '10px', background: '#F7F6F3', borderRadius: '14px', padding: '14px 16px' },
  searchInput:  { border: 'none', background: 'none', outline: 'none', fontSize: '14px', color: '#111827', flex: 1 },
  clearBtn:     { background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', padding: 0 },
  filterBtn:    { padding: '12px 18px', borderRadius: '14px', border: '1px solid #E5E3DC', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', color: 'white', fontWeight: '600' },
  catsWrap:     { display: 'flex', gap: '10px', padding: '14px 24px', overflowX: 'auto', scrollbarWidth: 'none', background: 'white', borderBottom: '1px solid #E5E3DC', maxWidth: '1200px', margin: '0 auto', width: '100%' },
  catChip:      { flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: '1px solid', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' },
  results:      { padding: '18px 24px 8px', maxWidth: '1200px', margin: '0 auto', width: '100%' },
  resultsText:  { fontSize: '14px', color: '#9CA3AF', fontWeight: '500' },
  loading:      { textAlign: 'center', padding: '80px 20px', color: '#9CA3AF', fontSize: '14px' },
  empty:        { textAlign: 'center', padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' },
  emptyTitle:   { fontSize: '18px', fontWeight: '700', color: '#374151', marginBottom: '8px' },
  emptySub:     { fontSize: '14px', color: '#9CA3AF' },
  jobCard:      { background: 'white', borderRadius: '12px', padding: '18px', margin: '0 auto 12px', border: '1px solid #E5E3DC', cursor: 'pointer', transition: 'all 0.2s', maxWidth: '1200px', width: '100%' },
  jobTop:       { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '12px' },
  jobTitle:     { fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '4px' },
  jobCompany:   { fontSize: '13px', color: '#6B7280' },
  jobType:      { fontSize: '11px', fontWeight: '600', background: '#F3F4F6', color: '#374151', padding: '5px 10px', borderRadius: '6px', whiteSpace: 'nowrap', flexShrink: 0 },
  jobMeta:      { display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' },
  metaItem:     { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#9CA3AF' },
  jobFooter:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F3F4F6' },
  catBadge:     { fontSize: '11px', fontWeight: '600', background: '#F3F4F6', color: '#374151', padding: '4px 10px', borderRadius: '6px' },
  jobDate:      { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#9CA3AF' },
  overlay:      { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200 },
  drawer:       { position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: 'white', borderRadius: '20px 20px 0 0', padding: '24px 20px 40px' },
  drawerHead:   { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  drawerTitle:  { fontSize: '17px', fontWeight: '700', color: '#111827' },
  drawerClose:  { background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex' },
  drawerSection:{ marginBottom: '24px' },
  drawerSectionTitle: { fontSize: '12px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' },
  typeGrid:     { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  typeChip:     { padding: '8px 14px', borderRadius: '10px', border: '1px solid', fontSize: '13px', fontWeight: '500', cursor: 'pointer' },
  applyBtn:     { width: '100%', padding: '14px', background: '#111827', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '10px' },
  clearAllBtn:  { width: '100%', padding: '14px', background: 'white', color: '#374151', border: '1px solid #E5E3DC', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
};
