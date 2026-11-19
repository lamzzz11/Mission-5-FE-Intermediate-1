import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import { readOrders } from '../data/orders.js'

const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
const filters = [['Semua Pesanan', 'all'], ['Menunggu', 'waiting'], ['Berhasil', 'Berhasil'], ['Gagal', 'Gagal']]

function AccountSidebar() {
  return (
    <aside className="account-sidebar">
      <h1>Daftar Pesanan</h1>
      <p>Informasi terperinci mengenai pembelian</p>
      <nav>
        <Link to="/profile">♙ &nbsp; Profil Saya</Link>
        <Link to="/my-courses">▣ &nbsp; Kelas Saya</Link>
        <Link className="is-active" to="/orders">♧ &nbsp; Pesanan Saya</Link>
      </nav>
    </aside>
  )
}

export default function Orders() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')
  const orders = useMemo(() => {
    const filtered = readOrders().filter((order) =>
      (filter === 'all' || (filter === 'waiting' ? ['Menunggu', 'Belum Bayar'].includes(order.status) : order.status === filter)) &&
      (order.title.toLowerCase().includes(query.toLowerCase()) || order.invoice.toLowerCase().includes(query.toLowerCase())),
    )
    return sort === 'oldest' ? [...filtered].reverse() : filtered
  }, [filter, query, sort])

  return <>
    <Navbar />
    <main className="container orders-page">
      <AccountSidebar />
      <section className="content-panel orders-list">
        <div className="orders-toolbar">
          <div className="orders-tabs">{filters.map(([label, value]) => <button className={filter === value ? 'is-active' : ''} type="button" onClick={() => setFilter(value)} key={value}>{label}</button>)}</div>
          <label className="field__control"><span className="sr-only">Cari Kelas</span><input className="field__input" placeholder="Cari Kelas" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <label className="field__control"><span className="sr-only">Urutkan</span><select className="field__input" value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Urutkan</option><option value="oldest">Terlama</option></select></label>
        </div>
        {orders.length ? orders.map((order) => (
          <article className="order-card" key={order.invoice}>
            <div className="order-card__meta"><span>No. Invoice: <a href="#invoice">{order.invoice}</a></span><span>Waktu Pembayaran: {order.date || '10 Juni 2023, 14.17'}</span><span className={'order-status order-status--' + order.status.replaceAll(' ', '-').toLowerCase()}>{order.status}</span></div>
            <div className="order-card__course"><img src={order.image} alt="" /><strong>{order.title}</strong><span><small>Harga</small><b>{rupiah(order.amount)}</b></span></div>
            <div className="order-card__total">Total Pembayaran <strong>{rupiah(order.amount)}</strong></div>
          </article>
        )) : <p className="empty-state">Tidak ada pesanan.</p>}
        <nav className="pagination" aria-label="Halaman pesanan"><button type="button">‹</button>{[1, 2, 3, 4, 5, 6].map((page) => <button className={page === 1 ? 'is-active' : ''} type="button" key={page}>{page}</button>)}<button type="button">›</button></nav>
      </section>
    </main>
    <Footer />
  </>
}
