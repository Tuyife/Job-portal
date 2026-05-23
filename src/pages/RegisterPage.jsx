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
        <div style={s.brand}>JobBoard</div>
        <h1 style={s.title}>Create account</h1>
        <p style={s.sub}>Start finding your dream job today</p>

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
          <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={s.footer}>
          Already have an account?{' '}
          <Link to="/login" style={s.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const s = {
  page:  { minHeight: '100vh', background: 'linear-gradient(135deg, #F7F6F3 0%, #FFFBF8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  card:  { background: 'white', borderRadius: '20px', padding: '48px 40px', width: '100%', maxWidth: '450px', border: '1px solid #E5E3DC', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' },
  brand: { fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '32px', letterSpacing: '-0.5px' },
  title: { fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '8px', letterSpacing: '-0.3px' },
  sub:   { fontSize: '15px', color: '#6B7280', marginBottom: '32px', lineHeight: '1.5' },
  error: { background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', borderRadius: '10px', padding: '14px 16px', fontSize: '14px', marginBottom: '22px', lineHeight: '1.5' },
  form:  { display: 'flex', flexDirection: 'column', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#374151' },
  input: { padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '15px', color: '#111827', outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit' },
  btn:   { marginTop: '8px', padding: '14px', background: '#111827', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  footer:{ marginTop: '28px', textAlign: 'center', fontSize: '14px', color: '#6B7280' },
  link:  { color: '#111827', fontWeight: '600', cursor: 'pointer' },
};
