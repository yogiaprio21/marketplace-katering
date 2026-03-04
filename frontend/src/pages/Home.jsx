import '../styles/Home.css'

import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    api.get('/auth/user').then(setUser).catch(() => setUser(null))
  }, [])

  return (
    <div className="hero">
      <h1>Selamat Datang di Marketplace Katering</h1>
      <p>
        Temukan katering terbaik untuk setiap acaramu, atau bergabunglah sebagai mitra
        untuk mengembangkan bisnismu bersama kami.
      </p>
      <div className="hero-buttons">
        {!user && (
          <>
            <a href="#/register-merchant" className="btn-hero-primary">
              Daftar Sebagai Mitra
            </a>
            <a href="#/login" className="btn-hero-secondary">
              Login Sekarang
            </a>
          </>
        )}

        {user?.role === 'customer' && (
          <>
            <a href="#/customer/search" className="btn-hero-primary">
              Cari Katering Sekarang
            </a>
            <a href="#/customer/orders" className="btn-hero-secondary">
              Riwayat Pesanan
            </a>
          </>
        )}

        {user?.role === 'merchant' && (
          <>
            <a href="#/merchant/orders" className="btn-hero-primary">
              Cek Order Masuk
            </a>
            <a href="#/merchant/menus" className="btn-hero-secondary">
              Kelola Menu
            </a>
          </>
        )}
      </div>
    </div>
  )
}
