import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const API = 'http://localhost:5050/api';

const icons = {
  back:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  location: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  dollar:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  bookmark: (f) => <svg width="20" height="20" viewBox="0 0 24 24" fill={f ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>,
  check:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  x:        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
};

export default function JobDetailPage() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { user }     = useAuth();
  const [job,         setJob]         = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [bookmarked,  setBookmarked]  = useState(false);
  const [applyOpen,   setApplyOpen]   = useState(false);
  const [applied,     setApplied]     = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [appError,    setAppError]    = useState('');
  const [form, setForm] = useState({ fullName: user?.name || '', email: user?.email || '', phone: '', coverLetter: '' });

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    axios.get(`${API}/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(() => navigate('/jobs'))
      .finally(() => setLoading(false));

    axios.get(`${API}/users/bookmarks`)
      .then(res => setBookmarked(res.data.some(j => j._id === id)))
      .catch(console.error);
  }, [id, navigate]);

  const toggleBookmark = async () => {
    try {
      await axios.post(`${API}/users/bookmarks/${id}`);
      setBookmarked(prev => !prev);
    } catch (err) { console.error(err); }
  };

  const submitApplication = async e => {
    e.preventDefault();
    setAppError('');
    setSubmitting(true);
    try {
      await axios.post(`${API}/applications`, {
        ...form,
        jobId: id,
        jobTitle: job?.title,
        company: job?.company,
      });
      setApplied(true);
      setApplyOpen(false);
    } catch (err) {
      setAppError(err.response?.data?.message || 'Failed to submit. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Layout><div style={s.loading}>Loading...</div></Layout>;
  if (!job)    return null;

  return (
    <Layout>
      <div style={s.topBar}>
        <button style={s.backBtn} onClick={() => navigate(-1)}>{icons.back}</button>
        <span style={s.topTitle}>Job Details</span>
        <button style={{ ...s.bookmarkBtn, color: bookmarked ? '#111827' : '#9CA3AF' }} onClick={toggleBookmark}>
          {icons.bookmark(bookmarked)}
        </button>
      </div>

      <div style={s.card}>
        <h1 style={s.title}>{job.title}</h1>
        <div style={s.company}>{job.company}</div>
        <div style={s.badges}>
          <span style={s.badge}>{job.category}</span>
          <span style={s.badge}>{job.type}</span>
        </div>
        <div style={s.metaGrid}>
          <div style={s.metaItem}><div style={s.metaLabel}>Location</div><div style={s.metaVal}>{job.location}</div></div>
          <div style={s.metaItem}><div style={s.metaLabel}>Salary</div><div style={s.metaVal}>{job.salary}</div></div>
          <div style={s.metaItem}><div style={s.metaLabel}>Type</div><div style={s.metaVal}>{job.type}</div></div>
          <div style={s.metaItem}><div style={s.metaLabel}>Posted</div><div style={s.metaVal}>{new Date(job.createdAt).toLocaleDateString()}</div></div>
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>About the Role</div>
        <p style={s.description}>{job.description}</p>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Requirements</div>
        {job.requirements.map((r, i) => (
          <div key={i} style={s.reqRow}>
            <div style={s.reqDot}>{icons.check}</div>
            <span style={s.reqText}>{r}</span>
          </div>
        ))}
      </div>

      <div style={s.applyWrap}>
        {applied ? (
          <div style={s.appliedMsg}>Application submitted successfully</div>
        ) : (
          <button style={s.applyBtn} onClick={() => setApplyOpen(true)}>Apply Now</button>
        )}
      </div>

      {applyOpen && (
        <div style={s.overlay} onClick={() => setApplyOpen(false)}>
          <div style={s.drawer} onClick={e => e.stopPropagation()}>
            <div style={s.drawerHead}>
              <span style={s.drawerTitle}>Apply for {job.title}</span>
              <button style={s.closeBtn} onClick={() => setApplyOpen(false)}>{icons.x}</button>
            </div>
            {appError && <div style={s.error}>{appError}</div>}
            <form onSubmit={submitApplication} style={s.form}>
              <div style={s.field}>
                <label style={s.label}>Full Name</label>
                <input style={s.input} value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Email</label>
                <input style={s.input} type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Phone</label>
                <input style={s.input} type="tel" placeholder="+1 234 567 8900" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Cover Letter (optional)</label>
                <textarea style={{ ...s.input, height: '100px', resize: 'none' }} placeholder="Tell them why you are a great fit..." value={form.coverLetter} onChange={e => setForm({...form, coverLetter: e.target.value})} />
              </div>
              <button style={{ ...s.submitBtn, opacity: submitting ? 0.7 : 1 }} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

const s = {
  loading:     { textAlign: 'center', padding: '80px', color: '#9CA3AF' },
  topBar:      { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'white', borderBottom: '1px solid #E5E3DC', position: 'sticky', top: '60px', zIndex: 50, maxWidth: '1200px', margin: '0 auto', width: '100%' },
  backBtn:     { background: 'none', border: 'none', cursor: 'pointer', color: '#374151', display: 'flex', padding: '6px' },
  topTitle:    { fontSize: '16px', fontWeight: '700', color: '#111827', flex: 1, textAlign: 'center' },
  bookmarkBtn: { background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '6px' },
  card:        { background: 'white', margin: '16px auto', borderRadius: '16px', padding: '24px', border: '1px solid #E5E3DC', maxWidth: '800px', width: 'calc(100% - 32px)' },
  title:       { fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '6px', letterSpacing: '-0.5px' },
  company:     { fontSize: '15px', color: '#6B7280', marginBottom: '16px', fontWeight: '500' },
  badges:      { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
  badge:       { fontSize: '12px', fontWeight: '600', background: '#F3F4F6', color: '#374151', padding: '6px 12px', borderRadius: '8px' },
  metaGrid:    { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' },
  metaItem:    { background: '#F7F6F3', borderRadius: '10px', padding: '12px' },
  metaLabel:   { fontSize: '11px', color: '#9CA3AF', fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.4px' },
  metaVal:     { fontSize: '14px', color: '#111827', fontWeight: '600' },
  section:     { margin: '0 auto 18px', background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #E5E3DC', maxWidth: '800px', width: 'calc(100% - 32px)' },
  sectionTitle:{ fontSize: '17px', fontWeight: '700', color: '#111827', marginBottom: '14px' },
  description: { fontSize: '15px', color: '#4B5563', lineHeight: '1.7' },
  reqRow:      { display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' },
  reqDot:      { width: '24px', height: '24px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#374151', marginTop: '2px' },
  reqText:     { fontSize: '14px', color: '#374151', lineHeight: '1.6', paddingTop: '3px' },
  applyWrap:   { padding: '0 24px 28px', maxWidth: '800px', margin: '0 auto', width: '100%' },
  applyBtn:    { width: '100%', padding: '16px', background: '#111827', color: 'white', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
  appliedMsg:  { width: '100%', padding: '16px', background: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0', borderRadius: '14px', fontSize: '15px', fontWeight: '600', textAlign: 'center' },
  overlay:     { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 },
  drawer:      { position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: 'white', borderRadius: '20px 20px 0 0', padding: '24px 20px 40px', maxHeight: '90vh', overflowY: 'auto' },
  drawerHead:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  drawerTitle: { fontSize: '17px', fontWeight: '700', color: '#111827' },
  closeBtn:    { background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', padding: '4px' },
  error:       { background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', borderRadius: '10px', padding: '14px', fontSize: '14px', marginBottom: '18px' },
  form:        { display: 'flex', flexDirection: 'column', gap: '16px' },
  field:       { display: 'flex', flexDirection: 'column', gap: '8px' },
  label:       { fontSize: '13px', fontWeight: '600', color: '#374151' },
  input:       { padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', color: '#111827', outline: 'none', fontFamily: 'inherit' },
  submitBtn:   { padding: '14px', background: '#111827', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
};
