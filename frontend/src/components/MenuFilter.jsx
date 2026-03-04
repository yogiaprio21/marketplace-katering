import { useState } from 'react'
import { api } from '../utils/api'

/**
 * Form filter menu berdasarkan kategori, harga min, dan harga max.
 * Dipindahkan dari CustomerSearch.jsx ke file terpisah.
 */
export default function MenuFilter({ onResult }) {
    const [category, setCategory] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (category) params.append('category', category)
        if (minPrice) params.append('min_price', minPrice)
        if (maxPrice) params.append('max_price', maxPrice)
        const data = await api.get('/customer/search/menus?' + params.toString())
        onResult(data)
    }

    return (
        <form className="card form-grid-filter" onSubmit={handleSubmit}>
            <div className="field field--compact">
                <label>Kategori</label>
                <input
                    className="input"
                    placeholder="Cth: Nasi Kotak"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div className="field field--compact">
                <label>Min Harga</label>
                <input
                    className="input"
                    type="number"
                    placeholder="Rp 0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
            </div>
            <div className="field field--compact">
                <label>Max Harga</label>
                <input
                    className="input"
                    type="number"
                    placeholder="Rp ~"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>
            <button type="submit" className="btn-filter">Terapkan</button>
        </form>
    )
}
