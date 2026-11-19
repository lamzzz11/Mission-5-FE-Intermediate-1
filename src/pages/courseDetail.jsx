import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import Button from '../components/button.jsx'
import { courses } from '../data/courses.jsx'
import hero from '../assets/images/hero.jpg'
import avatar from '../assets/avatars/avatar-1.png'

const title = 'Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.'
const description = 'Foundations of User Experience (UX) Design adalah yang pertama dari rangkaian tujuh kursus yang akan membekali Anda dengan keterampilan yang dibutuhkan untuk melamar pekerjaan tingkat pemula dalam desain pengalaman pengguna. Desainer UX fokus pada interaksi yang dilakukan orang dengan produk seperti web, aplikasi seluler, dan objek fisik. Desainer UX membuat interaksi sehari-hari itu dapat digunakan, menyenangkan, dan dapat diakses. Peran seorang desainer UX tingkat pemula mungkin beragam tergantung pengguna, menentukan poin-poin rasa sakit mereka, menemukan ide untuk solusi desain, membuat wireframe, prototipe, dan maket, dan menguji desain untuk mendapatkan umpan balik.'
const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

function TutorCard() {
  return (
    <article className="detail-person-card">
      <div className="tutor-row"><img src={avatar} alt="" /><div><strong>Gregorius Edik Larwanto</strong><p>Senior Talent Acquisition di WingsGroup</p></div></div>
      <p>Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.</p>
    </article>
  )
}

export default function CourseDetail() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const course = courses.find((item) => item.id === Number(courseId))
  if (!course) return <main className="container empty-state"><h1>Kelas tidak ditemukan</h1><Link to="/courses">Lihat semua kelas</Link></main>

  return <>
    <Navbar />
    <main className="container detail-page">
      <p className="breadcrumb"><Link to="/home">Beranda</Link> / Desain / {title}</p>
      <section className="detail-hero" style={{ backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,.84), rgba(0,0,0,.5)), url(' + hero + ')' }}>
        <div><h1>{title}</h1><p>Belajar bersama tutor profesional di Video Course.<br />Kapanpun, di manapun.</p><div className="detail-rating">★★★☆☆ <span>3.5 (86)</span></div></div>
      </section>
      <div className="detail-layout">
        <div className="detail-content">
          <section className="content-panel"><h2>Deskripsi</h2><p>{description}</p></section>
          <section className="content-panel"><h2>Belajar bersama Tutor Profesional</h2><div className="detail-people"><TutorCard /><TutorCard /></div></section>
          <section className="content-panel">
            <h2>Kamu akan Mempelajari</h2>
            <details className="curriculum-section" open><summary>Introduction to Course 1: Foundations of User Experience Design</summary>
              <div className="lesson-row"><span>The basics of user experience design</span><small>Video &nbsp; ◷ 12 Menit</small></div>
              <div className="lesson-row"><span>Jobs in the field of user experience</span><small>Video &nbsp; ◷ 12 Menit</small></div>
              <div className="lesson-row"><span>The product development life cycle</span><small>Video &nbsp; ◷ 12 Menit</small></div>
            </details>
            <details className="curriculum-section"><summary>Universal design, inclusive design, and equity-focused design</summary></details>
            <details className="curriculum-section"><summary>Introduction to design sprints</summary></details>
            <details className="curriculum-section"><summary>Introduction to UX research</summary></details>
          </section>
          <section className="content-panel"><h2>Rating dan Review</h2><div className="detail-people"><TutorCard /><TutorCard /></div></section>
        </div>
        <aside className="course-purchase-card">
          <h2>{title}</h2>
          <p className="course-purchase-card__price">{rupiah(250000)} <del>{rupiah(500000)}</del><span>Diskon 50%</span></p>
          <p className="course-purchase-card__promo">Penawaran spesial tersisa 2 hari lagi!</p>
          <Button fullWidth onClick={() => navigate('/checkout/' + course.id)}>Beli Sekarang</Button>
          <h3>Kelas Ini Sudah Termasuk</h3>
          <ul><li>Ujian Akhir</li><li>49 Video</li><li>7 Dokumen</li><li>Sertifikat</li><li>Pretest</li></ul>
          <h3>Bahasa Pengantar</h3><p className="course-language">◎ &nbsp; Bahasa Indonesia</p>
        </aside>
      </div>
      <section className="related-courses"><h2>Video Pembelajaran Terkait Lainnya</h2><p>Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!</p><div className="course-grid">{courses.slice(6, 9).map((item) => <article className="course-card" key={item.id}><img className="course-card__image" src={item.image} alt="" /><div className="course-card__body"><h3 className="course-card__title">{item.title}</h3><p className="course-card__desc">{item.description}</p><div className="course-card__instructor"><img className="course-card__avatar" src={item.instructor.avatar} alt="" /><span><strong className="course-card__name">{item.instructor.name}</strong><small className="course-card__role">{item.instructor.role} di {item.instructor.company}</small></span></div><div className="course-card__footer"><span className="course-card__rating">★★★☆☆ <small>3.5 (86)</small></span><strong className="course-card__price">{rupiah(item.price)}</strong></div></div></article>)}</div></section>
    </main>
    <Footer />
  </>
}
