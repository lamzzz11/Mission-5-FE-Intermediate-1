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

function PaymentLogo({ name }) {
  if (name === 'Bank BCA') return <span className="payment-brand payment-brand--bca" aria-hidden="true"><svg viewBox="0 0 40 28"><path d="M4 5h10v18H4zM17 5h6v18h-6z" fill="#0876bd"/><path d="m11 5 10 18" stroke="#e62e32" strokeWidth="3"/><text x="25" y="19" fill="#0876bd" fontSize="10" fontWeight="700">BCA</text></svg></span>
  if (name === 'Bank BNI') return <span className="payment-brand payment-brand--bni" aria-hidden="true"><svg viewBox="0 0 40 28"><path d="M2 5h14v18H2z" fill="#f15a24"/><path d="m3 7 11 14M14 7 3 21" stroke="white" strokeWidth="3"/><text x="19" y="19" fill="#f15a24" fontSize="12" fontWeight="700">BNI</text></svg></span>
  if (name === 'Bank BRI') return <span className="payment-brand payment-brand--bri" aria-hidden="true"><svg viewBox="0 0 40 28"><path d="M5 4h13v20H5l7-10z" fill="none" stroke="#0876bd" strokeWidth="3"/><text x="22" y="19" fill="#0876bd" fontSize="12" fontWeight="700">BRI</text></svg></span>
  if (name === 'Bank Mandiri') return <span className="payment-brand payment-brand--mandiri" aria-hidden="true"><svg viewBox="0 0 56 28"><path d="M2 8h15M2 12h15M2 16h15" stroke="#f3a92f" strokeWidth="2"/><text x="20" y="18" fill="#124b8a" fontSize="10" fontWeight="700">mandiri</text></svg></span>
  if (name === 'Dana') return <span className="payment-brand payment-brand--dana" aria-hidden="true"><svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" fill="#168bea"/><text x="14" y="19" textAnchor="middle" fill="white" fontSize="16" fontWeight="700">D</text></svg></span>
  if (name === 'OVO') return <span className="payment-brand payment-brand--ovo" aria-hidden="true"><svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="10" fill="none" stroke="#60459b" strokeWidth="5"/><circle cx="14" cy="14" r="3" fill="white"/></svg></span>
  if (name === 'LinkAja') return <span className="payment-brand payment-brand--linkaja" aria-hidden="true"><svg viewBox="0 0 28 28"><rect x="2" y="2" width="24" height="24" rx="3" fill="#e6262e"/><text x="14" y="12" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="700">Link</text><text x="14" y="19" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="700">Aja</text></svg></span>
  if (name === 'Shopee Pay') return <span className="payment-brand payment-brand--shopee" aria-hidden="true"><svg viewBox="0 0 28 28"><path d="M5 9h18l-1 16H6z" fill="#f15a32"/><path d="M9 9a5 5 0 0 1 10 0" fill="none" stroke="#f15a32" strokeWidth="2"/><text x="14" y="21" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">S</text></svg></span>
  if (name === 'Mastercard') return <span className="payment-brand payment-brand--mastercard" aria-hidden="true"><svg viewBox="0 0 42 28"><circle cx="16" cy="14" r="10" fill="#eb001b"/><circle cx="26" cy="14" r="10" fill="#f79e1b" fillOpacity=".95"/></svg></span>
  if (name === 'VISA') return <span className="payment-brand payment-brand--visa" aria-hidden="true"><svg viewBox="0 0 42 28"><text x="1" y="21" fill="#143b8f" fontSize="20" fontWeight="700" fontStyle="italic">VISA</text></svg></span>
  return <span className="payment-brand payment-brand--jcb" aria-hidden="true"><svg viewBox="0 0 42 28"><rect x="2" y="4" width="12" height="20" fill="#0879bd"/><rect x="14" y="4" width="12" height="20" fill="#dd2833"/><rect x="26" y="4" width="12" height="20" fill="#16934a"/><text x="20" y="18" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">JCB</text></svg></span>
}

function PaymentChoices({ method, onChange, collapsed = false }) {
  return Object.entries(methods).map(([group, options]) => (
    <details className="payment-choice-group" key={group} open={!collapsed}>
      <summary>{group}</summary>
      <div className="payment-choice-options">
        {options.map((option) => (
          <label className={'payment-option' + (method === option ? ' payment-option--selected' : '')} key={option}>
            <input type="radio" name="payment" value={option} checked={method === option} onChange={() => onChange(option)} />
            <PaymentLogo name={option} />
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
