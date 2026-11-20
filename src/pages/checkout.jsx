import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { courses } from '../data/courses.jsx'
import { saveOrder } from '../data/orders.js'
import bcaLogo from '../assets/images/payment-brands/figma-bca.png'
import bcaWordmark from '../assets/images/payment-brands/figma-bca-wordmark.png'
import bniLogo from '../assets/images/payment-brands/figma-bni.png'
import briLogo from '../assets/images/payment-brands/figma-bri.png'
import mandiriLogo from '../assets/images/payment-brands/figma-mandiri.png'
import danaLogo from '../assets/images/payment-brands/figma-dana.png'
import ovoLogo from '../assets/images/payment-brands/figma-ovo.png'
import linkajaLogo from '../assets/images/payment-brands/figma-linkaja.png'
import shopeePayLogo from '../assets/images/payment-brands/figma-shopeepay.png'
import mastercardLogo from '../assets/images/payment-brands/figma-mastercard.png'
import visaLogo from '../assets/images/payment-brands/figma-visa.png'
import jcbLogo from '../assets/images/payment-brands/figma-jcb.png'

const SUBTOTAL = 767500
const ADMIN_FEE = 7000
const TOTAL = SUBTOTAL + ADMIN_FEE
const PRODUCT_TITLE = 'Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.'
const paymentInstructionSections = (method) => {
  if (method === 'Bank BCA') return [
    { title: 'ATM BCA', steps: [
      'Masukkan kartu ATM dan PIN BCA Anda.',
      'Di menu utama, pilih “Transaksi Lainnya”, lalu “Transfer” dan “Ke BCA Virtual Account”.',
      'Masukkan nomor Virtual Account.',
      'Pastikan data Virtual Account benar. Masukkan jumlah pembayaran, kemudian pilih “Benar”.',
      'Periksa konfirmasi pembayaran di layar ATM. Pilih “Ya” jika benar atau “Tidak” jika masih salah.',
      'Transaksi selesai. Pilih “Tidak” untuk tidak melanjutkan transaksi lain.',
    ] },
    { title: 'Mobile Banking BCA', steps: [
      'Buka aplikasi BCA mobile.',
      'Pilih “m-BCA”, kemudian pilih “m-Transfer”.',
      'Pilih “BCA Virtual Account”.',
      'Masukkan nomor Virtual Account, lalu pilih “OK”.',
      'Klik tombol “Send” di sudut kanan atas aplikasi untuk melakukan transfer.',
      'Klik “OK” untuk melanjutkan pembayaran.',
      'Masukkan PIN untuk mengotorisasi transaksi.',
      'Transaksi selesai.',
    ] },
    { title: 'Internet Banking BCA', steps: [
      'Login ke KlikBCA Individual.',
      'Pilih “Transfer”, kemudian “Transfer ke BCA Virtual Account”.',
      'Masukkan nomor Virtual Account.',
      'Pilih “Lanjutkan” untuk melanjutkan pembayaran.',
      'Masukkan “RESPON KEYBCA APPLI 1” yang muncul pada Token BCA, lalu klik “Kirim”.',
      'Pembayaran selesai.',
    ] },
  ]

  if (method === 'Bank BNI') return [
    { title: 'ATM BNI', steps: [
      'Masukkan kartu ATM BNI dan PIN.',
      'Pilih “Transfer”, lalu “Transfer Virtual Account”.',
      'Masukkan nomor Virtual Account dari halaman pesanan.',
      `Periksa nama penerima dan total ${rupiah(TOTAL)}, lalu konfirmasi pembayaran.`,
    ] },
    { title: 'wondr by BNI', steps: [
      'Login ke aplikasi wondr by BNI.',
      'Pilih “Virtual Account”, lalu “Tujuan Baru”.',
      'Masukkan nomor Virtual Account dari halaman pesanan.',
      `Periksa tagihan ${rupiah(TOTAL)} pada layar konfirmasi.`,
      'Pilih sumber dana dan masukkan Password Transaksi untuk menyelesaikan pembayaran.',
    ] },
  ]

  if (method === 'Bank BRI') return [
    { title: 'ATM BRI', steps: [
      'Masukkan kartu ATM BRI dan PIN.',
      'Pilih “Transaksi Lain” > “Pembayaran” > “Lainnya” > “BRIVA”.',
      'Masukkan nomor BRIVA dari halaman pesanan.',
      `Periksa nama merchant dan total ${rupiah(TOTAL)}, lalu konfirmasi transaksi.`,
      'Simpan bukti pembayaran.',
    ] },
    { title: 'BRImo', steps: [
      'Login ke aplikasi BRImo.',
      'Pilih “Tagihan” > “BRIVA”.',
      'Masukkan nomor BRIVA dari halaman pesanan.',
      `Periksa detail dan total ${rupiah(TOTAL)}, lalu konfirmasi dengan PIN BRImo.`,
      'Simpan notifikasi transaksi berhasil.',
    ] },
  ]

  if (method === 'Bank Mandiri') return [
    { title: 'ATM Mandiri', steps: [
      'Masukkan kartu debit Mandiri dan PIN.',
      'Pilih “Bayar/Beli” > “Lainnya”.',
      'Masukkan kode biller dan nomor Virtual Account yang diberikan pada halaman pembayaran.',
      `Periksa detail dan total ${rupiah(TOTAL)}, lalu pilih “Ya” untuk membayar.`,
      'Simpan bukti transaksi.',
    ] },
    { title: 'Livin’ by Mandiri', steps: [
      'Login ke aplikasi Livin’ by Mandiri.',
      'Pilih “Bayar/VA”, lalu masukkan nomor Virtual Account pada kolom pencarian.',
      'Pilih penyedia jasa yang sesuai dengan nomor Virtual Account.',
      `Periksa detail dan total ${rupiah(TOTAL)}, lalu pilih “Lanjutkan” dan konfirmasi pembayaran.`,
      'Masukkan PIN Livin’ jika diminta, lalu cek status transaksi.',
    ] },
  ]

  if (method === 'Dana') return [{ title: 'DANA', steps: [
    'Pilih DANA pada halaman checkout dan lanjutkan ke aplikasi atau halaman pembayaran DANA.',
    'Login dengan nomor yang terdaftar jika diminta.',
    `Periksa nama merchant dan total ${rupiah(TOTAL)}.`,
    'Pilih Saldo DANA sebagai sumber dana, lalu tekan “Bayar”.',
    'Masukkan PIN atau selesaikan verifikasi di aplikasi DANA jika diminta, lalu kembali untuk melihat status pesanan.',
  ] }]

  if (method === 'OVO') return [{ title: 'OVO', steps: [
    'Pilih OVO saat checkout dan masukkan nomor ponsel yang terdaftar di OVO pada halaman pembayaran.',
    'Buka aplikasi OVO dan pilih notifikasi pembayaran yang masuk.',
    `Periksa nama merchant, total ${rupiah(TOTAL)}, dan sumber dana.`,
    'Konfirmasi pembayaran dengan Security Code di aplikasi OVO.',
    'Kembali ke halaman merchant untuk melihat status transaksi.',
  ] }]

  if (method === 'LinkAja') return [{ title: 'LinkAja', steps: [
    'Pilih LinkAja saat checkout dan lanjutkan pembayaran.',
    'Saat diarahkan ke aplikasi LinkAja, login dengan nomor ponsel dan PIN jika diminta.',
    `Periksa detail transaksi dan total ${rupiah(TOTAL)}.`,
    'Konfirmasi pembayaran di aplikasi LinkAja dan lakukan verifikasi yang diminta.',
    'Tunggu notifikasi berhasil, lalu kembali ke halaman merchant untuk memeriksa status pesanan.',
  ] }]

  if (method === 'Shopee Pay') return [{ title: 'ShopeePay', steps: [
    'Pilih ShopeePay saat checkout dan lanjutkan ke halaman pembayaran.',
    'Jika halaman menampilkan QRIS, buka aplikasi Shopee atau ShopeePay, pilih Scan QR/Barcode, lalu scan kode yang tampil.',
    `Periksa nama merchant dan total ${rupiah(TOTAL)} pada aplikasi.`,
    'Pilih metode sumber dana yang tersedia, lalu konfirmasi dengan PIN ShopeePay.',
    'Kembali ke halaman merchant dan periksa status pesanan.',
  ] }]

  return [{ title: 'Kartu Kredit/Debit', steps: [
    'Pilih kartu Mastercard, Visa, atau JCB pada halaman pembayaran.',
    'Lanjutkan ke halaman payment gateway resmi dan isi detail kartu di sana.',
    `Periksa nama merchant dan total ${rupiah(TOTAL)} sebelum menyetujui transaksi.`,
    'Selesaikan verifikasi dari bank penerbit jika diminta, lalu kembali untuk melihat status pembayaran.',
  ] }]
}
const methods = {
  'Transfer Bank': ['Bank BCA', 'Bank BNI', 'Bank BRI', 'Bank Mandiri'],
  'E-Wallet': ['Dana', 'OVO', 'LinkAja', 'Shopee Pay'],
  'Kartu Kredit/Debit': [],
}
const paymentLogos = {
  'Bank BCA': { image: bcaLogo, wordmark: bcaWordmark, key: 'bca' },
  'Bank BNI': { image: bniLogo, key: 'bni' },
  'Bank BRI': { image: briLogo, key: 'bri' },
  'Bank Mandiri': { image: mandiriLogo, key: 'mandiri' },
  Dana: { image: danaLogo, key: 'dana' },
  OVO: { image: ovoLogo, key: 'ovo' },
  LinkAja: { image: linkajaLogo, key: 'linkaja' },
  'Shopee Pay': { image: shopeePayLogo, key: 'shopee-pay' },
  Mastercard: { image: mastercardLogo, key: 'mastercard' },
  VISA: { image: visaLogo, key: 'visa' },
  JCB: { image: jcbLogo, key: 'jcb' },
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
  const image = display === 'wordmark' && brand.wordmark ? brand.wordmark : brand.image
  return (
    <span className={'payment-brand payment-brand--' + brand.key + (display === 'wordmark' ? ' payment-brand--wordmark' : '')} aria-hidden="true">
      <img src={image} alt="" />
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
              {method.startsWith('Bank ') && (method === 'Bank BCA'
                ? <div className="virtual-account__number">11739 081234567890 <button type="button" onClick={copyAccount}>{copied ? 'Tersalin' : 'Salin'}</button></div>
                : <p>Nomor Virtual Account {method.slice(5)} akan diberikan oleh penyedia pembayaran.</p>)}
            </div>
            <OrderSummary embedded submitLabel="Bayar Sekarang" onSubmit={() => finishPayment()} secondaryLabel="Ganti Metode Pembayaran" onSecondary={() => navigate('/checkout/' + course.id + '/change-method?method=' + encodeURIComponent(method))} />
          </section>
          <section className="content-panel">
            <h2>Tata Cara Pembayaran</h2>
            {paymentInstructionSections(method).map(({ title, steps }) => <details className="payment-help" key={title} open><summary>{title}</summary><ol>{steps.map((step) => <li key={step}>{step}</li>)}</ol></details>)}
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
