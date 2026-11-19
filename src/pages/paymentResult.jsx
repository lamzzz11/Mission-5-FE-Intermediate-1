import { Link, useParams } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { courses } from '../data/courses.jsx'

export default function PaymentResult({ pending = false }) {
  const { courseId } = useParams()
  const course = courses.find((item) => item.id === Number(courseId))
  return <>
    <header className="transaction-header"><Link to="/" aria-label="Beranda"><img src={logo} alt="videobelajar" /></Link><ol className="transaction-steps"><li className="is-active"><span>✓</span>Pilih Metode</li><li className="is-active"><span>✓</span>Bayar</li><li className="is-current"><span>3</span>Selesai</li></ol></header>
    <main className="container payment-result-page"><section className="payment-result-card"><div className={`payment-result-icon${pending ? ' payment-result-icon--pending' : ''}`} aria-hidden="true">{pending ? '!' : '✓'}</div><h1>Pembayaran {pending ? 'Tertunda' : 'Berhasil'}!</h1><p>{pending ? 'Pembayaranmu masih diproses. Silakan cek kembali halaman pesanan atau email untuk informasi terbaru.' : 'Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.'}</p>{course && <small>{course.title} · Simulasi pembayaran frontend</small>}<Link className="btn btn--primary" to="/orders">Lihat Detail Pesanan</Link></section></main>
  </>
}
