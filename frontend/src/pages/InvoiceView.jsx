import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import '../styles/InvoiceView.css'
import { INVOICE_STATUS } from '../utils/constants'

export default function InvoiceView() {
  const [data, setData] = useState(null)
  const [msg, setMsg] = useState('')
  const [searchId, setSearchId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const syncInvoice = () => {
      const hash = window.location.hash
      if (hash.includes('?id=')) {
        const id = hash.split('?id=')[1]
        setLoading(true)
        setMsg('')
        setData(null)
        api.get('/invoices/' + id)
          .then(setData)
          .catch((err) =>
            setMsg('Gagal memuat invoice. Pastikan ID pesanan benar. (Detail: ' + err.message + ')')
          )
          .finally(() => setLoading(false))
        return
      }
      setLoading(false)
      setMsg('')
      setData(null)
    }

    syncInvoice()
    window.addEventListener('hashchange', syncInvoice)
    return () => window.removeEventListener('hashchange', syncInvoice)
  }, [])

  const handleManualSearch = (e) => {
    e.preventDefault()
    if (searchId) {
      window.location.hash = `#/invoice?id=${searchId}`
    }
  }

  // Error state
  if (msg) {
    return (
      <div className="grid">
        <div className="card" style={{ textAlign: 'center' }}>
          <strong className="msg-error">{msg}</strong>
          <br /><br />
          <button onClick={() => { setMsg(''); window.location.hash = '#/invoice' }}>
            Kembali
          </button>
        </div>
      </div>
    )
  }

  // Search state (no ID in URL)
  if (!data && !loading && !window.location.hash.includes('?id=')) {
    return (
      <div className="grid">
        <div className="invoice-search">
          <div className="invoice-search__header">
            <h2>Cari Invoice Manual</h2>
            <p>Masukkan ID order untuk menampilkan detail invoice.</p>
          </div>
          <form
            className="card invoice-search__form"
            onSubmit={handleManualSearch}
          >
            <div className="field field--compact">
              <label>Masukkan ID Order / Invoice</label>
              <input
                className="input"
                placeholder="Contoh: 12"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-filter">Cari</button>
          </form>
        </div>
      </div>
    )
  }

  // Loading state
  if (loading || !data) {
    return (
      <div className="grid">
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          Memuat Dokumen Invoice...
        </div>
      </div>
    )
  }

  // Data extraction
  const order = data.order || {}
  const customer = order.customer || {}
  const customerUser = customer.user || {}
  const merchant = order.merchant || {}
  const items = order.items || []

  const isUnpaid = data.status === INVOICE_STATUS.PENDING || data.status === INVOICE_STATUS.UNPAID
  const isPaid = data.status === INVOICE_STATUS.PAID
  const invoiceStatusClass = isPaid
    ? 'invoice-status--paid'
    : isUnpaid
      ? 'invoice-status--unpaid'
      : 'invoice-status--cancelled'
  const invoiceStatusText = isPaid
    ? 'LUNAS (PAID)'
    : isUnpaid
      ? 'BELUM LUNAS (UNPAID)'
      : 'DIBATALKAN'

  return (
    <div className="grid">
      <div className="card" style={{ padding: '2rem' }}>

        {/* Header */}
        <div className="invoice-header">
          <div>
            <h1 className="invoice-title">INVOICE</h1>
            <p className="invoice-number">
              Invoice #{data.invoice_number} | Order #{data.order_id}
            </p>
          </div>
          <div className="invoice-date">
            <strong>Tgl Pengiriman</strong>
            <p style={{ margin: '0.25rem 0 0 0' }}>{order.delivery_date}</p>
          </div>
        </div>

        {/* Parties */}
        <div className="invoice-parties">
          <div>
            <h3 className="invoice-party__label">Detail Pemesan (Customer)</h3>
            <p className="invoice-party__row"><strong>Nama Akun:</strong> {customerUser.name || '-'}</p>
            <p className="invoice-party__row"><strong>Perusahaan:</strong> {customer.company_name || '-'}</p>
            <p className="invoice-party__row"><strong>Kontak:</strong> {customer.contact_phone || '-'}</p>
            <p className="invoice-party__row"><strong>Email:</strong> {customerUser.email || '-'}</p>
          </div>
          <div>
            <h3 className="invoice-party__label">Detail Mitra (Merchant)</h3>
            <p className="invoice-party__row"><strong>Nama Pemilik:</strong> {merchant.user?.name || '-'}</p>
            <p className="invoice-party__row"><strong>Katering:</strong> {merchant.company_name || '-'}</p>
            <p className="invoice-party__row"><strong>Lokasi:</strong> {merchant.location || '-'}</p>
            <p className="invoice-party__row"><strong>Kontak:</strong> {merchant.contact_phone || '-'}</p>
          </div>
        </div>

        {/* Table */}
        <div className="invoice-table-wrap">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item Menu</th>
                <th>Porsi</th>
                <th>Harga / Porsi</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const menuName = item.menu?.name ?? `Menu #${item.menu_id}`
                const price = item.unit_price || item.menu?.price || 0
                const subtotal = item.subtotal || price * item.quantity
                return (
                  <tr key={idx}>
                    <td>{menuName}</td>
                    <td>{item.quantity}</td>
                    <td>Rp {Number(price).toLocaleString('id-ID')}</td>
                    <td>Rp {Number(subtotal).toLocaleString('id-ID')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="invoice-summary">
          <div>
            <span className="invoice-summary__status-label">Status Pembayaran / Invoice</span>
            <strong className={`invoice-status-text ${invoiceStatusClass}`}>
              {invoiceStatusText}
            </strong>
          </div>
          <div className="invoice-summary__total">
            <span className="invoice-summary__total-label">Total Keseluruhan</span>
            <strong className="invoice-total-amount">
              Rp {Number(data.amount || data.total_amount || data.total_price || 0).toLocaleString('id-ID')}
            </strong>
          </div>
        </div>

        <div className="invoice-footer">
          Dokumen ini sah diterbitkan oleh sistem Marketplace Katering secara elektronik.
        </div>
      </div>
    </div>
  )
}
