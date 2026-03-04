import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import '../styles/Orders.css'
import StatusBadge from '../components/StatusBadge'
import EmptyState from '../components/EmptyState'
import { ORDER_STATUS } from '../utils/constants'

export default function MerchantOrders() {
    const [orders, setOrders] = useState([])
    const [msg, setMsg] = useState('')

    useEffect(() => {
        api.get('/merchant/orders')
            .then(setOrders)
            .catch((err) => setMsg(err.message))
    }, [])

    const updateStatus = async (id, newStatus) => {
        try {
            await api.put(`/merchant/orders/${id}`, { status: newStatus })
            setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)))
        } catch (err) {
            setMsg('Gagal mengupdate status: ' + err.message)
        }
    }

    return (
        <div className="order-inbox">
            <div className="order-inbox__header">
                <div>
                    <h2>Daftar Order Masuk</h2>
                    <p className="text-muted">Kelola pesanan terbaru dari customer dengan cepat.</p>
                </div>
            </div>
            {msg && <p className="msg msg-error">{msg}</p>}

            {orders.length === 0 && !msg ? (
                <EmptyState message="Belum ada order masuk saat ini." />
            ) : (
                <div className="order-inbox__grid">
                    {orders.map((order) => (
                        <div key={order.id} className="card order-card order-card--compact">
                            <div className="order-card__header">
                                <div className="order-card__title">
                                    <strong>Order #{order.id}</strong>
                                    <span className="order-card__subtitle">Customer ID: {order.customer_id}</span>
                                </div>
                                <StatusBadge status={order.status} />
                            </div>

                            <p className="order-card__meta">
                                Tanggal Kirim: {order.delivery_date}
                            </p>

                            <div className="order-card__footer order-card__footer--bordered">
                                <div className="row order-card__actions">
                                    {order.status === ORDER_STATUS.PENDING && (
                                        <>
                                            <button
                                                className="btn-info btn-sm"
                                                onClick={() => updateStatus(order.id, ORDER_STATUS.PROCESSING)}
                                            >
                                                Proses Pesanan
                                            </button>
                                            <button
                                                className="btn-outline-danger btn-sm"
                                                onClick={() => updateStatus(order.id, ORDER_STATUS.CANCELLED)}
                                            >
                                                Tolak
                                            </button>
                                        </>
                                    )}
                                    {order.status === ORDER_STATUS.PROCESSING && (
                                        <button
                                            className="btn-success btn-sm"
                                            onClick={() => updateStatus(order.id, ORDER_STATUS.COMPLETED)}
                                        >
                                            Tandai Selesai
                                        </button>
                                    )}
                                </div>
                                <button
                                    className="btn-ghost btn-sm"
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
