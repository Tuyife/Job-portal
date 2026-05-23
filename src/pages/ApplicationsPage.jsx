import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const API = 'http://localhost:5050/api';

const icons = {
  briefcase: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  location: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  checkCircle: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  clock: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  alert: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};

const statusColors = {
  pending: { bg: '#FEF3C7', color: '#D97706', label: 'Pending' },
  accepted: { bg: '#DCFCE7', color: '#166534', label: 'Accepted' },
  rejected: { bg: '#FEE2E2', color: '#B91C1C', label: 'Rejected' },
  reviewing: { bg: '#DBEAFE', color: '#1E40AF', label: 'Reviewing' },
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${API}/applications`);
        setApplications(res.data || []);
      } catch (err) {
        console.error(err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const getStatusInfo = (status) => statusColors[status] || statusColors.pending;

  const StatusIcon = ({ status }) => {
    switch(status) {
      case 'accepted': return icons.checkCircle;
      case 'reviewing': return icons.clock;
      case 'rejected': return icons.alert;
      default: return icons.clock;
    }
  };

  return (
    <Layout>
      <div style={s.header}>
        <h1 style={s.title}>My Applications</h1>
        <p style={s.subtitle}>Track your job applications</p>
      </div>

      <div style={s.filterBar}>
        {['all', 'pending', 'reviewing', 'accepted', 'rejected'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              ...s.filterBtn,
              background: filter === status ? '#111827' : 'white',
              color: filter === status ? 'white' : '#374151',
              borderColor: filter === status ? '#111827' : '#E5E3DC',
              fontWeight: filter === status ? '600' : '500'
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={s.loading}>Loading your applications...</div>
      ) : filteredApplications.length === 0 ? (
        <div style={s.empty}>
          <div style={s.emptyIcon}>📋</div>
          <div style={s.emptyTitle}>
            {filter === 'all' ? "You haven't applied yet" : `No ${filter} applications`}
          </div>
          <div style={s.emptySub}>
            {filter === 'all' 
              ? 'Start exploring jobs and apply to positions that interest you'
              : `You don't have any ${filter} applications yet`}
          </div>
        </div>
      ) : (
        <div style={s.listContainer}>
          {filteredApplications.map(app => {
            const statusInfo = getStatusInfo(app.status);
            return (
              <div key={app._id} style={s.appCard}>
                <div style={s.cardTop}>
                  <div style={s.jobInfo}>
                    <div style={s.jobTitle}>{app.jobTitle || 'Applied Role'}</div>
                    <div style={s.company}>{app.company || 'Company'}</div>
                  </div>
                  <div style={{ ...s.statusBadge, background: statusInfo.bg, color: statusInfo.color }}>
                    {statusInfo.label}
                  </div>
                </div>

                <div style={s.cardBottom}>
                  <span style={s.appliedDate}>
                    {icons.clock} Applied {new Date(app.appliedDate || app.createdAt).toLocaleDateString()}
                  </span>
                  {app.status !== 'pending' && app.updatedAt && (
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                      Updated {new Date(app.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {app.coverLetter && (
                  <div style={s.coverLetterPreview}>
                    <div style={s.coverLetterLabel}>Cover Letter</div>
                    <p style={s.coverLetterText}>{app.coverLetter}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}

const s = {
  header: { background: 'white', padding: '24px', borderBottom: '1px solid #E5E3DC', maxWidth: '1200px', margin: '0 auto', width: '100%' },
  title: { fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '4px' },
  subtitle: { fontSize: '14px', color: '#6B7280' },
  filterBar: { display: 'flex', gap: '8px', padding: '16px 24px', background: 'white', borderBottom: '1px solid #E5E3DC', overflowX: 'auto', maxWidth: '1200px', margin: '0 auto', width: '100%', scrollBehavior: 'smooth' },
  filterBtn: { padding: '8px 16px', border: '1px solid', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0 },
  loading: { textAlign: 'center', padding: '80px 20px', color: '#9CA3AF', fontSize: '15px' },
  empty: { textAlign: 'center', padding: '60px 24px', maxWidth: '600px', margin: '0 auto' },
  emptyIcon: { fontSize: '48px', marginBottom: '16px' },
  emptyTitle: { fontSize: '18px', fontWeight: '700', color: '#374151', marginBottom: '8px' },
  emptySub: { fontSize: '14px', color: '#9CA3AF', lineHeight: '1.5' },
  listContainer: { maxWidth: '1200px', margin: '0 auto', padding: '20px 24px', width: '100%' },
  appCard: { background: 'white', borderRadius: '12px', border: '1px solid #E5E3DC', padding: '20px', marginBottom: '14px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '12px' },
  jobInfo: { flex: 1 },
  jobTitle: { fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '3px' },
  company: { fontSize: '14px', color: '#6B7280', fontWeight: '500' },
  statusBadge: { padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' },
  cardMeta: { display: 'flex', gap: '14px', marginBottom: '14px', flexWrap: 'wrap' },
  metaItem: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#9CA3AF' },
  cardBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #F3F4F6' },
  appliedDate: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#9CA3AF' },
  coverLetterPreview: { marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #F3F4F6' },
  coverLetterLabel: { fontSize: '12px', fontWeight: '600', color: '#9CA3AF', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.3px' },
  coverLetterText: { fontSize: '13px', color: '#374151', lineHeight: '1.6', margin: 0 },
};
