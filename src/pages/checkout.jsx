import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { courses } from '../data/courses.jsx'
import { saveOrder } from '../data/orders.js'

const ADMIN_FEE = 7000
const methods = {
  'Transfer Bank': ['Bank BCA', 'Bank BNI', 'Bank BRI', 'Bank Mandiri'],
  'E-Wallet': ['Dana', 'OVO', 'LinkAja', 'ShopeePay'],
  'Kartu Kredit/Debit': ['Visa / Mastercard'],
}
const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

function TransactionHeader({ current }) {
  const steps = ['Pilih Metode', 'Bayar', 'Selesai']
  return (
    <header className="transaction-header">
      <Link to="/" aria-label="Kembali ke beranda"><img src={logo} alt="videobelajar" /></Link>
      <ol className="transaction-steps">
        {steps.map((step, index) => (
          <li className={index <= current ? 'is-active' : ''} key={step}>
            <span>{index < current ? '✓' : index + 1}</span>{step}
          </li>
        ))}
      </ol>
    </header>
  )
}

function CourseSummary({ course }) {
  return (
    <aside className="transaction-course">
      <img src={course.image} alt={course.title} />
      <h2>{course.title}</h2>
      <p className="course-purchase-card__price">{rupiah(course.price)}</p>
      <h3>Kelas ini sudah termasuk</h3>
      <ul><li>Video pembelajaran</li><li>Dokumen materi</li><li>Ujian akhir</li><li>Sertifikat</li></ul>
      <p className="course-language">Bahasa pengantar: Bahasa Indonesia</p>
    </aside>
  )
}

function OrderSummary({ course, onSubmit, submitLabel, onSecondary, secondaryLabel, embedded = false }) {
  return (
    <section className={`transaction-summary${embedded ? ' transaction-summary--embedded' : ' content-panel'}`}>
      <h2>Ringkasan Pesanan</h2>
      <div className="summary-line"><span>{course.title}</span><strong>{rupiah(course.price)}</strong></div>
      <div className="summary-line"><span>Biaya Admin</span><strong>{rupiah(ADMIN_FEE)}</strong></div>
      <div className="summary-total"><strong>Total Pembayaran</strong><strong>{rupiah(course.price + ADMIN_FEE)}</strong></div>
      <div className={`summary-actions${onSecondary ? ' summary-actions--split' : ''}`}>
        {onSecondary && <button type="button" className="btn btn--outline" onClick={onSecondary}>{secondaryLabel}</button>}
        <button type="button" className="btn btn--primary" onClick={onSubmit}>{submitLabel}</button>
      </div>
    </section>
  )
}

export default function Checkout() {
  const { courseId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const course = courses.find((item) => item.id === Number(courseId))
  const isPaying = window.location.pathname.endsWith('/pay')
  const [method, setMethod] = useState(searchParams.get('method') || 'Bank BCA')
  const [copied, setCopied] = useState(false)
  if (!course) return <main className="container empty-state"><h1>Kelas tidak ditemukan</h1><Link to="/courses">Lihat semua kelas</Link></main>

  const finishPayment = (status = 'Berhasil') => {
    const invoice = `VB-${Date.now().toString().slice(-8)}`
    saveOrder({ invoice, courseId: course.id, title: course.title, image: course.image, amount: course.price + ADMIN_FEE, method, status, createdAt: new Date().toISOString() })
    navigate(`/checkout/${course.id}/${status === 'Berhasil' ? 'success' : 'pending'}`)
  }
  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText('11739081234567890')
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return <>
    <TransactionHeader current={isPaying ? 1 : 0} />
    {isPaying && <div className="payment-timer">Selesaikan pesanan dalam <strong>00 : 50 : 55</strong></div>}
    <main className="container transaction-page">
      <div className="transaction-main">
        {isPaying ? <>
          <section className="content-panel">
            <h1>Metode Pembayaran</h1>
            <div className="virtual-account">
              <strong>{method === 'Bank BCA' ? 'BCA' : method}</strong>
              <p>Bayar melalui metode pembayaran demo</p>
              <div className="virtual-account__number">11739 081234567890 <button type="button" onClick={copyAccount}>{copied ? 'Tersalin' : 'Salin'}</button></div>
              <small>Nomor ini hanya contoh untuk simulasi frontend.</small>
            </div>
            <OrderSummary
              course={course}
              embedded
              submitLabel="Bayar Sekarang"
              onSubmit={() => finishPayment()}
              secondaryLabel="Ganti Metode Pembayaran"
              onSecondary={() => navigate(`/checkout/${course.id}`)}
            />
          </section>
          <section className="content-panel">
            <h2>Tata Cara Pembayaran</h2>
            {Object.entries(methods).map(([group, options]) => (
              <details className="payment-help" key={group}>
                <summary>{group}</summary>
                <p>Metode yang tersedia: {options.join(', ')}. Pilih {method}, salin nomor pembayaran demo, lalu tekan tombol Bayar Sekarang untuk menyelesaikan simulasi.</p>
              </details>
            ))}
          </section>
          <button type="button" className="transaction-pending-link" onClick={() => finishPayment('Menunggu')}>Simulasikan pembayaran tertunda</button>
        </> : <>
          <section className="content-panel">
            <h1>Metode Pembayaran</h1>
            {Object.entries(methods).map(([group, options]) => (
              <fieldset className="payment-group" key={group}>
                <legend>{group}</legend>
                {options.map((option) => (
                  <label className={`payment-option${method === option ? ' payment-option--selected' : ''}`} key={option}>
                    <input type="radio" name="payment" value={option} checked={method === option} onChange={() => setMethod(option)} />
                    <span className="payment-option__mark">{option.split(' ')[option.startsWith('Bank') ? 1 : 0].slice(0, 1)}</span>
                    <span>{option}</span>{method === option && <strong aria-label="Terpilih">✓</strong>}
                  </label>
                ))}
              </fieldset>
            ))}
          </section>
          <OrderSummary course={course} submitLabel="Beli Sekarang" onSubmit={() => navigate(`/checkout/${course.id}/pay?method=${encodeURIComponent(method)}`)} />
        </>}
      </div>
      <CourseSummary course={course} />
    </main>
  </>
}
