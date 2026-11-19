import { Link } from 'react-router-dom'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import { readOrders } from '../data/orders.js'

const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

export default function Orders() {
  const orders = readOrders()
  return <>
    <Navbar />
    <main className="container orders-page"><div className="orders-sidebar"><h1>Daftar Pesanan</h1><p>Informasi pembelian kelasmu</p><Link to="/courses">Belanja Kelas</Link></div><section className="content-panel orders-list"><h2>Semua Pesanan</h2>{orders.length ? orders.map((order) => <article className="order-card" key={order.invoice}><div className="order-card__meta"><span>No. Invoice: <strong>{order.invoice}</strong></span><span className="order-status">{order.status}</span></div><div className="order-card__course"><img src={order.image} alt="" /><strong>{order.title}</strong><span>{rupiah(order.amount)}</span></div><div className="order-card__total">Total Pembayaran <strong>{rupiah(order.amount)}</strong></div></article>) : <div className="empty-state"><p>Belum ada pesanan. Pilih kelas yang ingin kamu pelajari.</p><Link className="btn btn--primary" to="/courses">Cari Kelas</Link></div>}</section></main>
    <Footer />
  </>
}
