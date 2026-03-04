import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import Field from '../components/Field'

const INITIAL_FORM = {
    company_name: '',
    address: '',
    contact_phone: '',
    location: '',
    description: '',
}

export default function MerchantProfile() {
    const [form, setForm] = useState(INITIAL_FORM)
    const [msg, setMsg] = useState('')

    useEffect(() => {
        api.get('/merchant/profile')
            .then((data) => {
                if (data) {
                    setForm({
                        company_name: data.company_name || '',
                        address: data.address || '',
                        contact_phone: data.contact_phone || '',
                        location: data.location || '',
                        description: data.description || '',
                    })
                }
            })
            .catch((err) => setMsg(err.message))
    }, [])

    const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            await api.put('/merchant/profile', form)
            setMsg('Profil berhasil diperbarui!')
        } catch (err) {
            setMsg(err.message)
        }
    }

    return (
        <div className="grid">
            <div className="stack">
                <h2>Profil Merchant</h2>
                <form className="card" onSubmit={handleSave}>
                    <Field label="Nama Perusahaan" value={form.company_name} onChange={(v) => set('company_name', v)} />
                    <Field label="Alamat" value={form.address} onChange={(v) => set('address', v)} />
                    <Field label="Kontak" value={form.contact_phone} onChange={(v) => set('contact_phone', v)} />
                    <Field label="Lokasi" value={form.location} onChange={(v) => set('location', v)} />
                    <Field label="Deskripsi" value={form.description} onChange={(v) => set('description', v)} />
                    <button type="submit" className="btn-full" style={{ marginTop: '1rem' }}>
                        Simpan Perubahan
                    </button>
                    {msg && (
                        <p className={`msg ${msg.includes('berhasil') ? 'msg-success' : 'msg-error'}`}>
                            {msg}
                        </p>
                    )}
                </form>
            </div>

            <div>
                <div className="card card--muted">
                    <h3 style={{ marginTop: 0 }}>Informasi</h3>
                    <p className="text-muted">
                        Pastikan profil Anda selalu diperbarui agar Customer (pelanggan dari perkantoran)
                        dapat menghubungi Anda dengan mudah terkait pesanan katering mereka.
                    </p>
                </div>
            </div>
        </div>
    )
}
