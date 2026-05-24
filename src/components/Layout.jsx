import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const icons = {
  home: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  jobs: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  bookmark: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>,
  apps: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  logout: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  moon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>,
  sun: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>,
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
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => { logout(); navigate('/login'); };
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div style={s.shell}>
      <header style={s.header}>
        <Link to="/" style={s.brand}>JobBoard</Link>
        <div style={s.headerRight}>
          <button style={s.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? icons.sun : icons.moon}
          </button>
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
              <Link key={item.path} to={item.path} style={{ ...s.navItem, color: active ? 'var(--text)' : 'var(--muted)' }}>
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
                  background: active ? 'var(--surface-soft)' : 'transparent',
                  color: active ? 'var(--text)' : 'var(--muted)',
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
  shell:     { minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column' },
  header:    { position: 'sticky', top: 0, zIndex: 100, background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 12px 28px rgba(15,23,42,0.08)' },
  brand:     { fontSize: '22px', fontWeight: '800', color: 'var(--text)', letterSpacing: '-0.75px' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  userName:  { fontSize: '14px', fontWeight: '500', color: 'var(--muted)', display: 'none' },
  logoutBtn: { background: 'none', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--muted)', display: 'flex', alignItems: 'center', padding: '10px 12px', borderRadius: '12px' },
  themeBtn:  { background: 'var(--surface-soft)', border: '1px solid var(--border)', borderRadius: '12px', padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text)' },
  main:      { flex: 1, width: '100%', paddingBottom: '80px' },
  navMobile: { position: 'sticky', top: 72, background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', zIndex: 100, padding: '10px 0', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)' },
  navDesktop: { position: 'sticky', top: 72, display: 'flex', gap: '10px', padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', zIndex: 100, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.03)' },
  navItem:   { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 0 8px', textDecoration: 'none', position: 'relative', gap: '3px', transition: 'all 0.2s' },
  navItemDesktop: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer' },
  navLabel:  { fontSize: '11px', letterSpacing: '0.2px' },
  navDot:    { position: 'absolute', bottom: '6px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text)' },
};
