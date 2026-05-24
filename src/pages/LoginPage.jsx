import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.heroPanel}>
        <div style={s.heroBadge}>Fast, modern job search</div>
        <h1 style={s.heroTitle}>Welcome back.</h1>
        <p style={s.heroCopy}>Sign in to access personalized recommendations, saved jobs and quick apply features.</p>
      </div>

      <div style={s.card}>
        <button style={s.backBtn} onClick={() => navigate('/')}>
          ← Back to home
        </button>
        <div style={s.brandRow}>
          <div style={s.brand}>JobBoard</div>
          <span style={s.brandTag}>Pro</span>
        </div>
        <h2 style={s.title}>Log in to your account</h2>
        <p style={s.sub}>Enter your credentials below to continue.</p>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={submit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Email</label>
            <input
              style={s.input}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handle}
              required
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input
              style={s.input}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handle}
              required
            />
          </div>
          <button style={{ ...s.btn, opacity: loading ? 0.8 : 1 }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={s.helpText}>
          New here? <Link to="/register" style={s.link}>Create an account</Link>
        </div>
      </div>
    </div>
  );
}

const s = {
  page:  { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '32px', background: 'var(--page-bg)' },
  heroPanel: { minWidth: '320px', maxWidth: '420px', background: 'var(--surface-soft)', border: '1px solid rgba(255,255,255,0.35)', borderRadius: '28px', padding: '38px 28px', boxShadow: 'var(--shadow)', backdropFilter: 'blur(18px)' },
  heroBadge: { display: 'inline-flex', padding: '10px 16px', borderRadius: '999px', background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: '12px', fontWeight: '700', marginBottom: '18px' },
  heroTitle: { fontSize: '38px', lineHeight: '1.05', color: 'var(--text)', marginBottom: '16px' },
  heroCopy: { fontSize: '16px', lineHeight: '1.8', color: 'var(--muted)' },
  card:  { width: '100%', maxWidth: '420px', background: 'var(--surface)', borderRadius: '30px', padding: '40px 32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' },
  brandRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' },
  brand: { fontSize: '24px', fontWeight: '800', color: 'var(--text)' },
  brandTag: { fontSize: '12px', fontWeight: '700', color: 'var(--accent)', background: 'var(--accent-soft)', borderRadius: '999px', padding: '8px 12px' },
  title: { fontSize: '26px', fontWeight: '700', color: 'var(--text)', marginBottom: '8px' },
  sub:   { fontSize: '15px', color: 'var(--muted)', marginBottom: '24px', lineHeight: '1.7' },
  error: { background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '14px', padding: '14px 16px', fontSize: '14px', marginBottom: '22px', lineHeight: '1.5' },
  form:  { display: 'flex', flexDirection: 'column', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '10px' },
  label: { fontSize: '14px', fontWeight: '700', color: 'var(--muted)' },
  input: { padding: '14px 16px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--input-bg)', fontSize: '15px', color: 'var(--text)', outline: 'none', transition: 'all 0.2s' },
  btn:   { marginTop: '4px', padding: '15px', background: 'var(--button-bg)', color: 'var(--button-text)', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.2s ease' },
  helpText: { marginTop: '24px', fontSize: '14px', color: 'var(--muted)', textAlign: 'center' },
  link:  { color: 'var(--accent)', fontWeight: '700' },
  backBtn: { background: 'none', border: 'none', color: 'var(--accent)', fontSize: '15px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px 0', textAlign: 'left', transition: 'all 0.2s' },
};
