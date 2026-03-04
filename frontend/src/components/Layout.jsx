import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import Footer from './Footer'

export default function Layout({ route, children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    api.get('/auth/user').then(setUser).catch(() => setUser(null))
  }, [route])

  const handleLogout = async (e) => {
    e.preventDefault()
    await api.post('/auth/logout')
    setUser(null)
    window.location.hash = '#/login'
  }

  const navLink = (hash, label) => {
    const isActive = route === hash ? 'active' : ''
    return (
      <a className={`nav-item ${isActive}`} href={hash}>
        {label}
      </a>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="header">
        <div className="header-inner">
          <div className="brand">Marketplace Katering</div>
          <nav className="nav">
            {navLink('#/', 'Home')}

            {!user && (
              <>
                {navLink('#/login', 'Login')}
                {navLink('#/register-merchant', 'Register Merchant')}
                {navLink('#/register-customer', 'Register Customer')}
              </>
            )}

            {user?.role === 'merchant' && (
              <>
                {navLink('#/merchant/profile', 'Profil')}
                {navLink('#/merchant/menus', 'Merchant Menus')}
                {navLink('#/merchant/orders', 'Order Masuk')}
              </>
            )}

            {user?.role === 'customer' && (
              <>
                {navLink('#/customer/search', 'Cari Katering/Menu')}
                {navLink('#/customer/order', 'Buat Order')}
                {navLink('#/customer/orders', 'Riwayat Order')}
              </>
            )}

            {user && navLink('#/invoice', 'Lihat Invoice')}

            {user && (
              <a className="nav-item nav-item--danger" href="#" onClick={handleLogout}>
                Logout
              </a>
            )}
          </nav>
        </div>
      </header>
      <main className="container page" style={{ paddingBottom: '4rem' }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
