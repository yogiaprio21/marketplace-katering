import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import '../styles/Orders.css'
import EmptyState from '../components/EmptyState'
import StatusBadge from '../components/StatusBadge'

export default function CustomerOrders() {
    const [orders, setOrders] = useState([])
    const [msg, setMsg] = useState('')

    useEffect(() => {
        api.get('/customer/orders')
            .then(setOrders)
            .catch((err) => setMsg(err.message))
    }, [])

    return (
        <div className="order-history">
            <div className="order-history__header">
                <div>
                    <h2>Riwayat Pesanan Anda</h2>
                    <p className="text-muted">Pantau status dan akses invoice pesanan sebelumnya.</p>
                </div>
            </div>

            {msg && <p className="msg msg-error">{msg}</p>}

            {orders.length === 0 && !msg ? (
                <EmptyState message="Anda belum memiliki riwayat pesanan." />
            ) : (
                <div className="order-history__grid">
                    {orders.map((order) => (
                        <div key={order.id} className="card order-card order-card--compact">
                            <div className="order-card__header">
                                <div className="order-card__title">
                                    <strong>Order #{order.id}</strong>
                                    <span className="order-card__subtitle">
                                        Tgl Pengiriman: {order.delivery_date}
                                    </span>
                                </div>
                                <StatusBadge status={order.status} />
                            </div>

                            <div className="order-card__footer order-card__footer--bordered">
                                <p className="text-muted order-card__hint">
                                    Lihat rincian tagihan dan status pembayaran.
                                </p>
                                <button
                                    className="btn-outline btn-sm"
                                    onClick={() => { window.location.hash = `#/invoice?id=${order.id}` }}
                                >
                                    Lihat Invoice
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
