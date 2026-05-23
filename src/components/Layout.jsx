import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const icons = {
  home: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  jobs: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  bookmark: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>,
  apps: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  logout: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  menu: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
};

const navItems = [
  { path: '/',            label: 'Home',         icon: icons.home },
  { path: '/jobs',        label: 'Jobs',         icon: icons.jobs },
  { path: '/bookmarks',   label: 'Saved',        icon: icons.bookmark },
  { path: '/applications',label: 'Applied',      icon: icons.apps },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={s.shell}>
      <header style={s.header}>
        <Link to="/" style={s.brand}>JobBoard</Link>
        <div style={s.headerRight}>
          <span style={s.userName}>{user?.name}</span>
          <button style={s.logoutBtn} onClick={handleLogout}>
            {icons.logout}
          </button>
        </div>
      </header>

      {isMobile ? (
        <nav style={s.navMobile}>
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} style={{ ...s.navItem, color: active ? '#111827' : '#9CA3AF' }}>
                {item.icon}
                <span style={{ ...s.navLabel, fontWeight: active ? '600' : '400' }}>{item.label}</span>
                {active && <span style={s.navDot} />}
              </Link>
            );
          })}
        </nav>
      ) : (
        <nav style={s.navDesktop}>
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                style={{ 
                  ...s.navItemDesktop,
                  background: active ? '#F7F6F3' : 'transparent',
                  color: active ? '#111827' : '#6B7280',
                  fontWeight: active ? '600' : '400'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}

      <main style={s.main}>
        {children}
      </main>
    </div>
  );
}

const s = {
  shell:     { minHeight: '100vh', background: '#F7F6F3', display: 'flex', flexDirection: 'column' },
  header:    { position: 'sticky', top: 0, zIndex: 100, background: 'white', borderBottom: '1px solid #E5E3DC', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brand:     { fontSize: '20px', fontWeight: '700', color: '#111827', letterSpacing: '-0.5px' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  userName:  { fontSize: '14px', fontWeight: '500', color: '#6B7280', display: 'none' },
  logoutBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', alignItems: 'center', padding: '4px' },
  main:      { flex: 1, width: '100%', paddingBottom: '80px' },
  navMobile: { position: 'sticky', top: 72, background: 'white', borderBottom: '1px solid #E5E3DC', display: 'flex', zIndex: 100, padding: '10px 0', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)' },
  navDesktop: { position: 'sticky', top: 72, display: 'flex', gap: '10px', padding: '16px 24px', borderBottom: '1px solid #E5E3DC', background: 'white', zIndex: 100, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.03)' },
  navItem:   { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 0 8px', textDecoration: 'none', position: 'relative', gap: '3px', transition: 'all 0.2s' },
  navItemDesktop: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer' },
  navLabel:  { fontSize: '11px', letterSpacing: '0.2px' },
  navDot:    { position: 'absolute', bottom: '6px', width: '4px', height: '4px', borderRadius: '50%', background: '#111827' },
};
