import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import '../styles/MenuCard.css'
import Field from '../components/Field'
import MenuPhoto from '../components/MenuPhoto'
import EmptyState from '../components/EmptyState'
import StatusBadge from '../components/StatusBadge'

const EMPTY_FORM = {
  id: null,
  name: '',
  description: '',
  photo_url: '',
  category: '',
  price: '',
  is_active: true,
}

export default function MerchantMenus() {
  const [menus, setMenus] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/merchant/menus').then(setMenus).catch(() => { })
  }, [])

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const resetForm = () => setForm(EMPTY_FORM)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      price: parseFloat(form.price || '0'),
      is_active: !!form.is_active,
    }
    try {
      if (form.id) {
        const updated = await api.put(`/merchant/menus/${form.id}`, payload)
        setMenus((prev) => prev.map((m) => (m.id === form.id ? updated : m)))
        setMsg('Menu berhasil diperbarui')
      } else {
        const created = await api.post('/merchant/menus', payload)
        setMenus((prev) => [created, ...prev])
        setMsg('Menu berhasil ditambahkan')
      }
      resetForm()
    } catch (err) {
      setMsg(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus menu ini?')) return
    try {
      await api.del(`/merchant/menus/${id}`)
      setMenus((prev) => prev.filter((m) => m.id !== id))
      setMsg('Menu dihapus')
    } catch (err) {
      setMsg(err.message)
    }
  }

  const handleEdit = (menu) => {
    setForm({ ...menu })
    setMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="grid">
      {/* Form Tambah / Edit */}
      <div className="stack">
        <h2>{form.id ? 'Edit Menu' : 'Tambah Menu Baru'}</h2>
        <form className="card" onSubmit={handleSubmit}>
          <Field label="Nama Menu" value={form.name} onChange={(v) => set('name', v)} />
          <Field label="Deskripsi" value={form.description} onChange={(v) => set('description', v)} />
          <Field label="Foto URL" value={form.photo_url} onChange={(v) => set('photo_url', v)} />
          <Field label="Kategori" value={form.category} onChange={(v) => set('category', v)} />
          <Field label="Harga (Rp)" type="number" value={form.price} onChange={(v) => set('price', v)} />

          <div className="field field--row">
            <input
              type="checkbox"
              id="is_active"
              className="input--checkbox"
              checked={form.is_active}
              onChange={(e) => set('is_active', e.target.checked)}
            />
            <label htmlFor="is_active">Aktif / Tersedia</label>
          </div>

          <div className="row" style={{ marginTop: '1rem' }}>
            <button type="submit" style={{ flex: 1 }}>
              {form.id ? 'Simpan Perubahan' : 'Tambah Menu'}
            </button>
            {form.id && (
              <button type="button" className="btn-danger" onClick={resetForm}>
                Batal
              </button>
            )}
          </div>

          {msg && (
            <p className={`msg ${msg.includes('berhasil') || msg.includes('dihapus') ? 'msg-success' : 'msg-error'}`}>
              {msg}
            </p>
          )}
        </form>
      </div>

      {/* Daftar Menu */}
      <div className="stack">
        <h2>Daftar Menu Anda</h2>
        {menus.length === 0 ? (
          <EmptyState message="Belum ada menu yang didaftarkan." />
        ) : (
          <div className="stack">
            {menus.map((m) => (
              <div key={m.id} className="card menu-card">
                <MenuPhoto url={m.photo_url} alt={m.name} />
                <div className="menu-card__body">
                  <h3 className="menu-card__name">{m.name}</h3>
                  <p className="menu-card__price">Rp {m.price.toLocaleString('id-ID')}</p>
                  <p className="menu-card__desc">{m.description || 'Tidak ada deskripsi'}</p>
                  <div className="menu-card__footer">
                    <StatusBadge status={m.is_active ? 'active' : 'inactive'} />
                    <div className="menu-card__actions">
                      <button className="btn-outline btn-sm" onClick={() => handleEdit(m)}>
                        Edit
                      </button>
                      <button className="btn-outline-danger btn-sm" onClick={() => handleDelete(m.id)}>
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
