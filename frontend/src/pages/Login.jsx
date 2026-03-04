import { useState } from 'react'
import { api } from '../utils/api'
import '../styles/Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/login', { email, password })
      const user = await api.get('/auth/user')
      if (user?.role === 'merchant') {
        setMsg('Login berhasil! Mengalihkan ke menu Merchant...')
        setTimeout(() => { window.location.hash = '#/merchant/menus' }, 1000)
      } else if (user?.role === 'customer') {
        setMsg('Login berhasil! Mengalihkan ke Cari Katering...')
        setTimeout(() => { window.location.hash = '#/customer/search' }, 1000)
      } else {
        setMsg('Login berhasil!')
        setTimeout(() => { window.location.hash = '#/' }, 1000)
      }
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div className="auth-container" style={{ maxWidth: '400px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>Selamat Datang 👋</h2>
        <p className="text-muted" style={{ lineHeight: '1.5' }}>Masuk ke akun Anda untuk melanjutkan pesanan atau mengelola sistem katering</p>
      </div>

      <form className="card" onSubmit={handleLogin} style={{ padding: '2.5rem' }}>
        <div className="field">
          <label>Alamat Email</label>
          <input
            className="input"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field" style={{ marginBottom: '1.5rem' }}>
          <label>Password</label>
          <input
            className="input"
            type="password"
            placeholder="Masukkan kata sandi Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-lg btn-info" style={{ width: '100%', marginBottom: '1.5rem' }}>
          Masuk Sekarang
        </button>

        <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          <p className="text-muted" style={{ margin: '0 0 0.5rem 0' }}>Belum punya akun?</p>
          <div className="row row--wrap" style={{ justifyContent: 'center', gap: '0.5rem' }}>
            <a href="#/register-customer" style={{ fontWeight: '600', color: 'var(--color-primary)', textDecoration: 'none' }}>Daftar Customer</a>
            <span className="text-muted">|</span>
            <a href="#/register-merchant" style={{ fontWeight: '600', color: 'var(--color-accent)', textDecoration: 'none' }}>Daftar Mitra Katering</a>
          </div>
        </div>

        {msg && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center', padding: '0.75rem', borderRadius: '8px', background: msg.includes('berhasil') ? '#dcfce7' : '#fee2e2' }}>
            <p className={`msg ${msg.includes('berhasil') ? 'msg-success' : 'msg-error'}`} style={{ margin: 0, fontWeight: '600' }}>
              {msg}
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
