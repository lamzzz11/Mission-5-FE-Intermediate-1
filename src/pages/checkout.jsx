import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { courses } from '../data/courses.jsx'
import { saveOrder } from '../data/orders.js'

const SUBTOTAL = 767500
const ADMIN_FEE = 7000
const TOTAL = SUBTOTAL + ADMIN_FEE
const PRODUCT_TITLE = 'Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.'
const methods = {
  'Transfer Bank': ['Bank BCA', 'Bank BNI', 'Bank BRI', 'Bank Mandiri'],
  'E-Wallet': ['Dana', 'OVO', 'LinkAja', 'Shopee Pay'],
  'Kartu Kredit/Debit': ['Mastercard', 'VISA', 'JCB'],
}
const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

function TransactionHeader({ current }) {
  const steps = ['Pilih Metode', 'Bayar', 'Selesai']
  return (
    <header className="transaction-header">
      <Link to="/home" aria-label="Kembali ke beranda"><img src={logo} alt="videobelajar" /></Link>
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
      <img src={course.image} alt="" />
      <h2>{PRODUCT_TITLE}</h2>
      <p className="course-purchase-card__price">{rupiah(250000)} <del>{rupiah(500000)}</del><span>Diskon 50%</span></p>
      <h3>Kelas Ini Sudah Termasuk</h3>
      <ul><li>Ujian Akhir</li><li>49 Video</li><li>7 Dokumen</li><li>Sertifikat</li><li>Pretest</li></ul>
      <h3>Bahasa Pengantar</h3><p className="course-language">◎ &nbsp; Bahasa Indonesia</p>
    </aside>
  )
}

function OrderSummary({ onSubmit, submitLabel, onSecondary, secondaryLabel, embedded = false, title = 'Ringkasan Pesanan' }) {
  return (
    <section className={'transaction-summary' + (embedded ? ' transaction-summary--embedded' : ' content-panel')}>
      <h2>{title}</h2>
      <div className="summary-line"><span>Video Learning: {PRODUCT_TITLE}</span><strong>{rupiah(SUBTOTAL)}</strong></div>
      <div className="summary-line"><span>Biaya Admin</span><strong>{rupiah(ADMIN_FEE)}</strong></div>
      <div className="summary-total"><strong>Total Pembayaran</strong><strong>{rupiah(TOTAL)}</strong></div>
      <div className={'summary-actions' + (onSecondary ? ' summary-actions--split' : '')}>
        {onSecondary && <button type="button" className="btn btn--outline" onClick={onSecondary}>{secondaryLabel}</button>}
        <button type="button" className="btn btn--primary" onClick={onSubmit}>{submitLabel}</button>
      </div>
    </section>
  )
}

function PaymentChoices({ method, onChange, collapsed = false }) {
  return Object.entries(methods).map(([group, options]) => (
    <details className="payment-choice-group" key={group} open={!collapsed}>
      <summary>{group}</summary>
      <div className="payment-choice-options">
        {options.map((option) => (
          <label className={'payment-option' + (method === option ? ' payment-option--selected' : '')} key={option}>
            <input type="radio" name="payment" value={option} checked={method === option} onChange={() => onChange(option)} />
            <span className="payment-option__mark">{option.split(' ')[option.startsWith('Bank') ? 1 : 0].slice(0, 1)}</span>
            <span>{option}</span>{method === option && <strong aria-label="Terpilih">✓</strong>}
          </label>
        ))}
      </div>
    </details>
  ))
}

export default function Checkout() {
  const { courseId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const course = courses.find((item) => item.id === Number(courseId))
  const path = window.location.pathname
  const isPaying = path.endsWith('/pay')
  const isChanging = path.endsWith('/change-method')
  const [method, setMethod] = useState(searchParams.get('method') || 'Bank BCA')
  const [copied, setCopied] = useState(false)
  if (!course) return <main className="container empty-state"><h1>Kelas tidak ditemukan</h1><Link to="/courses">Lihat semua kelas</Link></main>

  const finishPayment = (status = 'Berhasil') => {
    const invoice = 'VB-' + Date.now().toString().slice(-8)
    saveOrder({ invoice, courseId: course.id, title: PRODUCT_TITLE, image: course.image, amount: TOTAL, method, status, createdAt: new Date().toISOString() })
    navigate('/checkout/' + course.id + '/' + (status === 'Berhasil' ? 'success' : 'pending'))
  }
  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText('11739081234567890')
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }
  const goToPay = () => navigate('/checkout/' + course.id + '/pay?method=' + encodeURIComponent(method))

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
              <p>Bayar Melalui Virtual Account BCA</p>
              <div className="virtual-account__number">11739 081234567890 <button type="button" onClick={copyAccount}>{copied ? 'Tersalin' : 'Salin'}</button></div>
            </div>
            <OrderSummary embedded submitLabel="Bayar Sekarang" onSubmit={() => finishPayment()} secondaryLabel="Ganti Metode Pembayaran" onSecondary={() => navigate('/checkout/' + course.id + '/change-method?method=' + encodeURIComponent(method))} />
          </section>
          <section className="content-panel">
            <h2>Tata Cara Pembayaran</h2>
            {Object.keys(methods).map((group) => <details className="payment-help" key={group}><summary>{group}</summary></details>)}
          </section>
        </> : isChanging ? <>
          <section className="content-panel">
            <h1>Ringkasan Belanja</h1>
            <div className="summary-line"><span>Total Harga (3 barang)</span><strong>{rupiah(SUBTOTAL)}</strong></div>
            <div className="summary-line"><span>Ongkos Kirim</span><strong>{rupiah(ADMIN_FEE)}</strong></div>
            <div className="summary-total"><strong>Total Pembayaran</strong><strong>{rupiah(TOTAL)}</strong></div>
          </section>
          <section className="content-panel change-payment">
            <h1>Ubah Metode Pembayaran</h1>
            <PaymentChoices method={method} onChange={setMethod} collapsed />
            <button className="btn btn--primary change-payment__submit" type="button" onClick={goToPay}>Bayar Sekarang</button>
          </section>
        </> : <>
          <section className="content-panel">
            <h1>Metode Pembayaran</h1>
            <PaymentChoices method={method} onChange={setMethod} />
          </section>
          <OrderSummary submitLabel="Beli Sekarang" onSubmit={goToPay} />
        </>}
      </div>
      <CourseSummary course={course} />
    </main>
  </>
}
