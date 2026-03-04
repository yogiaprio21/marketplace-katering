import { useState } from 'react'
import { api } from '../utils/api'
import Field from '../components/Field'
import '../styles/Auth.css'

const INITIAL_FORM = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  company_name: '',
  address: '',
  contact_phone: '',
  location: '',
  description: '',
}

export default function RegisterCustomer() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [msg, setMsg] = useState('')

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/register/customer', form)
      setMsg('Registrasi customer berhasil! Mengalihkan...')
      setTimeout(() => { window.location.hash = '#/customer/search' }, 1000)
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div className="auth-container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Register Customer</h2>
        <div className="auth-form-grid">
          <Field label="Nama" value={form.name} onChange={(v) => set('name', v)} />
          <Field label="Email" value={form.email} onChange={(v) => set('email', v)} />
          <Field label="Password" type="password" value={form.password} onChange={(v) => set('password', v)} />
          <Field label="Konfirmasi Password" type="password" value={form.password_confirmation} onChange={(v) => set('password_confirmation', v)} />
          <div className="auth-form-span-2">
            <Field label="Nama Perusahaan" value={form.company_name} onChange={(v) => set('company_name', v)} />
          </div>
          <div className="auth-form-span-2">
            <Field label="Alamat" value={form.address} onChange={(v) => set('address', v)} />
          </div>
          <Field label="Kontak" value={form.contact_phone} onChange={(v) => set('contact_phone', v)} />
          <Field label="Lokasi" value={form.location} onChange={(v) => set('location', v)} />
          <div className="auth-form-span-2">
            <Field label="Deskripsi" value={form.description} onChange={(v) => set('description', v)} />
          </div>
        </div>
        <button type="submit">Daftar</button>
        {msg && <p className={`msg ${msg.includes('berhasil') ? 'msg-success' : 'msg-error'}`}>{msg}</p>}
      </form>
    </div>
  )
}
