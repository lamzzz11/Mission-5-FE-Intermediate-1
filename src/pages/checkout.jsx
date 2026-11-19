import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { courses } from '../data/courses.jsx'
import { saveOrder } from '../data/orders.js'
import bcaLogo from '../assets/images/payment-brands/bca.svg'
import bniLogo from '../assets/images/payment-brands/bni.svg'
import briLogo from '../assets/images/payment-brands/bri.svg'
import mandiriLogo from '../assets/images/payment-brands/mandiri.svg'
import danaLogo from '../assets/images/payment-brands/dana.svg'
import ovoLogo from '../assets/images/payment-brands/ovo.svg'
import linkajaLogo from '../assets/images/payment-brands/linkaja.svg'
import shopeePayLogo from '../assets/images/payment-brands/shopee-pay.svg'
import mastercardLogo from '../assets/images/payment-brands/mastercard.svg'
import visaLogo from '../assets/images/payment-brands/visa.svg'
import jcbLogo from '../assets/images/payment-brands/jcb.svg'

const SUBTOTAL = 767500
const ADMIN_FEE = 7000
const TOTAL = SUBTOTAL + ADMIN_FEE
const PRODUCT_TITLE = 'Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.'
const methods = {
  'Transfer Bank': ['Bank BCA', 'Bank BNI', 'Bank BRI', 'Bank Mandiri'],
  'E-Wallet': ['Dana', 'OVO', 'LinkAja', 'Shopee Pay'],
  'Kartu Kredit/Debit': [],
}
const paymentLogos = {
  'Bank BCA': { image: bcaLogo, key: 'bca', width: 80, height: 26 },
  'Bank BNI': { image: bniLogo, key: 'bni', width: 80, height: 24 },
  'Bank BRI': { image: briLogo, key: 'bri', width: 80, height: 41 },
  'Bank Mandiri': { image: mandiriLogo, key: 'mandiri', width: 80, height: 25 },
  Dana: { image: danaLogo, key: 'dana', width: 80, height: 23 },
  OVO: { image: ovoLogo, key: 'ovo', width: 64, height: 65 },
  LinkAja: { image: linkajaLogo, key: 'linkaja', width: 68, height: 60 },
  'Shopee Pay': { image: shopeePayLogo, key: 'shopee-pay', width: 80, height: 36 },
  Mastercard: { image: mastercardLogo, key: 'mastercard', width: 80, height: 50 },
  VISA: { image: visaLogo, key: 'visa', width: 80, height: 26 },
  JCB: { image: jcbLogo, key: 'jcb', width: 80, height: 62 },
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

function PaymentLogo({ name, display = 'symbol' }) {
  const brand = paymentLogos[name]
  if (!brand) return null
  const scale = (display === 'wordmark' ? 34 : 24) / brand.height
  const width = brand.width * scale
  const height = brand.height * scale
  return (
    <span className={'payment-brand payment-brand--' + brand.key + (display === 'wordmark' ? ' payment-brand--wordmark' : '')} aria-hidden="true" style={display === 'wordmark' ? { width, height, flexBasis: width } : undefined}>
      <img src={brand.image} alt="" style={{ transform: 'scale(' + scale + ')' }} />
    </span>
  )
}

function PaymentChoices({ method, onChange, collapsed = false }) {
  return Object.entries(methods).map(([group, options]) => (
    <details className="payment-choice-group" key={group} open={!collapsed}>
      <summary>{group}</summary>
      <div className={group === 'Kartu Kredit/Debit' ? 'payment-choice-options payment-choice-options--cards' : 'payment-choice-options'}>
        {group === 'Kartu Kredit/Debit' ? (
          <label className={'payment-option payment-option--card' + (method === group ? ' payment-option--selected' : '')}>
            <input type="radio" name="payment" value={group} checked={method === group} onChange={() => onChange(group)} />
            <span className="sr-only">{group}</span>
            <span className="payment-card-logos"><PaymentLogo name="Mastercard" display="wordmark" /><PaymentLogo name="VISA" display="wordmark" /><PaymentLogo name="JCB" display="wordmark" /></span>
            {method === group && <strong aria-label="Terpilih">✓</strong>}
          </label>
        ) : options.map((option) => (
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
  const requestedMethod = searchParams.get('method')
  const availableMethods = [...Object.values(methods).flat(), 'Kartu Kredit/Debit']
  const [method, setMethod] = useState(availableMethods.includes(requestedMethod) ? requestedMethod : 'Bank BCA')
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
              {method === 'Kartu Kredit/Debit'
                ? <span className="payment-card-logos"><PaymentLogo name="Mastercard" display="wordmark" /><PaymentLogo name="VISA" display="wordmark" /><PaymentLogo name="JCB" display="wordmark" /></span>
                : <PaymentLogo name={method} display="wordmark" />}
              <p>{method.startsWith('Bank ') ? 'Bayar Melalui Virtual Account ' + method.slice(5) : 'Bayar Melalui ' + method}</p>
              {method.startsWith('Bank ') && <div className="virtual-account__number">11739 081234567890 <button type="button" onClick={copyAccount}>{copied ? 'Tersalin' : 'Salin'}</button></div>}
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
