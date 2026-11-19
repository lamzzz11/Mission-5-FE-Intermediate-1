import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import successImage from '../assets/images/payment-success.png'
import pendingImage from '../assets/images/payment-pending.png'

export default function PaymentResult({ pending = false }) {
  return <>
    <header className="transaction-header"><Link to="/home" aria-label="Beranda"><img src={logo} alt="videobelajar" /></Link><button className="transaction-menu" type="button" aria-label="Buka menu">☰</button><ol className="transaction-steps"><li className="is-active"><span>✓</span>Pilih Metode</li><li className="is-active"><span>✓</span>Bayar</li><li className="is-current"><span>3</span>Selesai</li></ol></header>
    <main className="container payment-result-page">
      <section className="payment-result-card">
        <img className="payment-result-art" src={pending ? pendingImage : successImage} alt="" />
        <h1>Pembayaran {pending ? 'Tertunda' : 'Berhasil'}!</h1>
        <p>Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.</p>
        <Link className="btn btn--primary" to="/orders">Lihat Detail Pesanan</Link>
      </section>
    </main>
  </>
}
