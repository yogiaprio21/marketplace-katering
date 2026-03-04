import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import '../styles/CustomerSearch.css'
import MenuFilter from '../components/MenuFilter'
import MenuPhoto from '../components/MenuPhoto'

export default function CustomerSearch() {
  const [location, setLocation] = useState('')
  const [company, setCompany] = useState('')
  const [merchantList, setMerchantList] = useState([])
  const [menuList, setMenuList] = useState([])

  useEffect(() => {
    api.get('/customer/search/menus').then(setMenuList).catch(() => { })
    api.get('/customer/search/caterings').then(setMerchantList).catch(() => { })
  }, [])

  const handleSearchMerchant = async (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.append('location', location)
    if (company) params.append('company_name', company)
    const data = await api.get('/customer/search/caterings?' + params.toString())
    setMerchantList(data)
  }

  return (
    <div className="grid">
      <div className="stack--lg">

        {/* Merchant Search Section */}
        <section>
          <div className="section-header">
            <h2>Cari Mitra Katering</h2>
            <p>Temukan penyedia katering terbaik di lokasi Anda</p>
          </div>

          <form className="card form-grid-search" onSubmit={handleSearchMerchant}>
            <div className="field field--compact">
              <label>Lokasi</label>
              <input
                className="input"
                placeholder="Contoh: Jakarta Selatan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="field field--compact">
              <label>Nama Perusahaan</label>
              <input
                className="input"
                placeholder="Contoh: Catering Berkah"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-filter">Cari</button>
          </form>

          {merchantList.length === 0 ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>
              Tidak ada mitra katering yang ditemukan.
            </p>
          ) : (
            <div className="merchant-grid">
              {merchantList.map((m) => (
                <div
                  key={m.id}
                  className="card merchant-card"
                  onClick={() => { window.location.hash = `#/customer/order?merchant=${m.id}` }}
                >
                  <h3 className="merchant-card__name">{m.company_name}</h3>
                  <div className="merchant-card__location">
                    <span>📍</span> {m.location || 'Lokasi tidak diset'}
                  </div>
                  <p className="merchant-card__desc">
                    {m.description || 'Tidak ada deskripsi'}
                  </p>
                  <div className="merchant-card__cta">Buat Pesanan &rarr;</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Menu Search Section */}
        <section>
          <div className="section-header">
            <h2>Jelajahi Menu Makanan</h2>
            <p>Filter berdasarkan harga atau kategori</p>
          </div>

          <MenuFilter onResult={setMenuList} />

          {menuList.length === 0 ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>
              Tidak ada menu yang sesuai kriteria pencarian.
            </p>
          ) : (
            <div className="menu-grid">
              {menuList.map((m) => (
                <div key={m.id} className="card menu-search-card">
                  <MenuPhoto url={m.photo_url} alt={m.name} />
                  <div className="menu-search-card__body">
                    <h4 className="menu-search-card__name">{m.name}</h4>
                    <span className="menu-search-cat">{m.category || 'Umum'}</span>
                    <strong style={{ color: 'var(--color-primary)' }}>
                      Rp {Number(m.price).toLocaleString('id-ID')}
                    </strong>
                    <div className="menu-search-meta">
                      Menu ID: {m.id} &bull; Merchant ID: {m.merchant_id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
