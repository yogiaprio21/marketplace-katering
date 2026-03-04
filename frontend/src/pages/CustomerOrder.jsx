import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import '../styles/CustomerOrder.css'

export default function CustomerOrder() {
  const [merchantId, setMerchantId] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [items, setItems] = useState([{ menu_id: '', quantity: 1 }])
  const [msg, setMsg] = useState('')
  const [availableMenus, setAvailableMenus] = useState([])

  // Auto-fill merchant ID dari query param
  useEffect(() => {
    const syncMerchantId = () => {
      const hash = window.location.hash
      if (hash.includes('?merchant=')) {
        setMerchantId(hash.split('?merchant=')[1])
      }
    }

    syncMerchantId()
    window.addEventListener('hashchange', syncMerchantId)
    return () => window.removeEventListener('hashchange', syncMerchantId)
  }, [])

  // Muat menu saat merchant ID berubah
  useEffect(() => {
    if (!merchantId) {
      setAvailableMenus([])
      return
    }
    api.get(`/customer/search/menus?merchant_id=${merchantId}`)
      .then(setAvailableMenus)
      .catch(() => setAvailableMenus([]))
  }, [merchantId])

  const updateItem = (index, key, value) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)))
  }

  const addItem = () => setItems((prev) => [...prev, { menu_id: '', quantity: 1 }])

  const removeItem = (index) => {
    const next = items.filter((_, i) => i !== index)
    setItems(next.length > 0 ? next : [{ menu_id: '', quantity: 1 }])
  }

  const handleOrder = async (e) => {
    e.preventDefault()
    try {
      if (!merchantId) throw new Error('Silakan pilih ID Mitra (Merchant) terlebih dahulu.')
      if (!deliveryDate) throw new Error('Tanggal Pengiriman wajib diisi.')

      const validItems = items
        .filter((it) => it.menu_id && it.quantity > 0)
        .map((it) => ({ menu_id: parseInt(it.menu_id), quantity: parseInt(it.quantity) }))

      if (validItems.length === 0) throw new Error('Pilih setidaknya satu menu untuk dipesan.')

      const payload = {
        merchant_id: parseInt(merchantId),
        delivery_date: deliveryDate,
        items: validItems,
      }

      const res = await api.post('/customer/orders', payload)
      setMsg(`Berhasil! Pesanan terbuat. Invoice: ${res.invoice.invoice_number}`)
      setTimeout(() => {
        window.location.hash = `#/invoice?id=${res.invoice.order_id}`
      }, 2000)
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div className="order-page">
      <div className="order-page__header">
        <h2>Buat Order Baru</h2>
        <p>Lengkapi detail pesanan Anda di bawah ini.</p>
      </div>

      <div className="order-layout">
        <section className="card order-panel">
          <div className="order-panel__header">
            <h3>Informasi Pengiriman</h3>
            <span className="order-step">Langkah 1</span>
          </div>
          <p className="order-panel__subtitle">Isi detail pengiriman agar pesanan diproses dengan cepat.</p>
          <div className="field">
            <label>ID Merchant (Mitra Katering)</label>
            <input
              className="input"
              placeholder="Masukkan ID, cth: 1"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
            />
            <span className="msg-success order-hint">
              Kosongkan dan cari di menu "Cari Katering" jika Anda tidak tahu ID-nya.
            </span>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Tanggal Kirim</label>
            <input
              className="input"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
        </section>

        <section className="card card--muted order-panel">
          <div className="order-panel__header">
            <h3>Keranjang Menu</h3>
            <span className="order-step">Langkah 2</span>
          </div>
          <p className="order-panel__subtitle">Pilih menu dan jumlah porsi sesuai kebutuhan acara Anda.</p>

          {!merchantId ? (
            <p className="text-muted order-empty">
              Masukkan ID Merchant terlebih dahulu untuk memuat daftar menu.
            </p>
          ) : (
            <div className="stack">
              {items.map((item, idx) => (
                <div key={idx} className="order-item-row">
                  <div className="order-item-row__menu">
                    <span className="order-item-label">Pilih Menu</span>
                    {availableMenus.length > 0 ? (
                      <select
                        className="input"
                        value={item.menu_id}
                        onChange={(e) => updateItem(idx, 'menu_id', e.target.value)}
                      >
                        <option value="">-- Pilih Menu --</option>
                        {availableMenus.map((menu) => (
                          <option key={menu.id} value={menu.id}>
                            {menu.name} (Rp{menu.price})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="input"
                        placeholder="ID Menu"
                        value={item.menu_id}
                        onChange={(e) => updateItem(idx, 'menu_id', e.target.value)}
                      />
                    )}
                  </div>

                  <div className="order-item-row__qty">
                    <span className="order-item-label">Kuantitas</span>
                    <input
                      className="input"
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn-remove order-item-row__remove"
                    onClick={() => removeItem(idx)}
                    aria-label="Hapus baris menu"
                  >
                    ✖
                  </button>
                </div>
              ))}

              <button type="button" className="btn-add-row" onClick={addItem}>
                + Tambah Porsi/Menu Lain
              </button>

              <div className="order-actions">
                <button
                  type="button"
                  className="btn-full btn-lg"
                  onClick={handleOrder}
                >
                  Kirim Pesanan Sekarang
                </button>
              </div>

              {msg && (
                <p className={`msg ${msg.includes('Berhasil') ? 'msg-success' : 'msg-error'} order-message`}>
                  {msg}
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
