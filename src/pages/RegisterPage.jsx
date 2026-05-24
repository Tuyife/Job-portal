import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form,    setForm]    = useState({ name: '', email: '', password: '', confirm: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      return setError('Passwords do not match');
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <button style={s.backBtn} onClick={() => navigate('/')}>
          ← Back to home
        </button>
        <div style={s.brandRow}>
          <div style={s.brand}>JobBoard</div>
          <span style={s.brandTag}>New</span>
        </div>
        <h1 style={s.title}>Create your account</h1>
        <p style={s.sub}>Get access to 50+ curated jobs, saved applications, and recommended matches.</p>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={submit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Full Name</label>
            <input
              style={s.input}
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handle}
              required
            />
          </div>
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
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handle}
              required
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Confirm Password</label>
            <input
              style={s.input}
              type="password"
              name="confirm"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={handle}
              required
            />
          </div>
          <button style={{ ...s.btn, opacity: loading ? 0.8 : 1 }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div style={s.helpText}>
          Already registered? <Link to="/login" style={s.link}>Sign in</Link>
        </div>
      </div>

      <div style={s.statsCard}>
        <div style={s.statTile}>
          <div style={s.statValue}>50+</div>
          <div style={s.statLabel}>Jobs ready</div>
        </div>
        <div style={s.statTile}>
          <div style={s.statValue}>250+</div>
          <div style={s.statLabel}>Companies hiring</div>
        </div>
        <div style={s.statTile}>
          <div style={s.statValue}>99%</div>
          <div style={s.statLabel}>Fast matches</div>
        </div>
      </div>
    </div>
  );
}

const backIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;

const s = {
  page:  { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '32px', background: 'var(--page-bg)' },
  card:  { width: '100%', maxWidth: '440px', background: 'var(--surface)', borderRadius: '30px', padding: '40px 36px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' },
  brandRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' },
  brand: { fontSize: '24px', fontWeight: '800', color: 'var(--text)' },
  brandTag: { fontSize: '12px', fontWeight: '700', color: 'var(--accent)', background: 'var(--accent-soft)', borderRadius: '999px', padding: '8px 12px' },
  title: { fontSize: '30px', fontWeight: '800', color: 'var(--text)', marginBottom: '10px' },
  sub:   { fontSize: '15px', color: 'var(--muted)', marginBottom: '28px', lineHeight: '1.8' },
  error: { background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '14px', padding: '14px 16px', fontSize: '14px', marginBottom: '22px', lineHeight: '1.5' },
  form:  { display: 'flex', flexDirection: 'column', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '10px' },
  label: { fontSize: '14px', fontWeight: '700', color: 'var(--muted)' },
  input: { padding: '14px 16px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--input-bg)', fontSize: '15px', color: 'var(--text)', outline: 'none', transition: 'all 0.2s' },
  btn:   { marginTop: '4px', padding: '15px', background: 'var(--button-bg)', color: 'var(--button-text)', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' },
  helpText: { marginTop: '26px', fontSize: '14px', color: 'var(--muted)', textAlign: 'center' },
  link:  { color: 'var(--accent)', fontWeight: '700' },
  backBtn: { background: 'none', border: 'none', color: 'var(--accent)', fontSize: '15px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px 0', textAlign: 'left', transition: 'all 0.2s' },
  statsCard: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px', width: '100%', maxWidth: '440px', padding: '30px', borderRadius: '28px', background: 'var(--surface-soft)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' },
  statTile: { display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px', borderRadius: '22px', background: 'var(--surface)', border: '1px solid var(--border)' },
  statValue: { fontSize: '24px', fontWeight: '800', color: 'var(--text)' },
  statLabel: { fontSize: '13px', color: 'var(--muted)' },
};
