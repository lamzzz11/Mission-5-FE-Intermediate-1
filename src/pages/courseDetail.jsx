import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import Button from '../components/button.jsx'
import { courses } from '../data/courses.jsx'

const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

export default function CourseDetail() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const course = courses.find((item) => item.id === Number(courseId))
  if (!course) return <main className="container empty-state"><h1>Kelas tidak ditemukan</h1><Link to="/courses">Lihat semua kelas</Link></main>

  return (
    <>
      <Navbar />
      <main className="container detail-page">
        <p className="breadcrumb"><Link to="/">Beranda</Link> / <Link to="/courses">Semua Kelas</Link> / {course.title}</p>
        <section className="detail-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.82), rgba(0,0,0,.35)), url(${course.image})` }}>
          <div><span className="detail-eyebrow">{course.category}</span><h1>{course.title}</h1><p>{course.description}</p><div className="detail-rating">★★★★★ <span>{course.rating} ({course.reviews} ulasan)</span></div></div>
        </section>
        <div className="detail-layout">
          <div className="detail-content">
            <section className="content-panel"><h2>Deskripsi</h2><p>{course.description}. Pelajari materi secara bertahap melalui video, dokumen, dan latihan yang bisa diakses kapan saja.</p></section>
            <section className="content-panel"><h2>Belajar bersama tutor profesional</h2><div className="tutor-row"><img src={course.instructor.avatar} alt="" /><div><strong>{course.instructor.name}</strong><p>{course.instructor.role} di {course.instructor.company}</p></div></div><p>Materi dibawakan dengan contoh praktis agar mudah diterapkan dalam pekerjaan.</p></section>
            <section className="content-panel"><h2>Kamu akan mempelajari</h2>{['Pengenalan materi dan persiapan belajar','Konsep dasar yang perlu dikuasai','Latihan dan studi kasus','Rangkuman serta evaluasi akhir'].map((lesson, index) => <div className="lesson-row" key={lesson}><span>{lesson}</span><small>{index === 0 ? '4' : '3'} video · {12 + index * 3} menit</small></div>)}</section>
            <section className="content-panel"><h2>Rating dan Review</h2><p className="detail-rating">★★★★★ <span>{course.rating} dari 5 · {course.reviews} ulasan</span></p></section>
          </div>
          <aside className="course-purchase-card"><img src={course.image} alt={course.title} /><h2>{course.title}</h2><p className="course-purchase-card__price">{rupiah(course.price)}</p><ul><li>✓ Video pembelajaran</li><li>✓ Dokumen materi</li><li>✓ Akses kelas selamanya</li><li>✓ Sertifikat setelah selesai</li></ul><Button fullWidth onClick={() => navigate(`/checkout/${course.id}`)}>Beli Sekarang</Button><p className="course-purchase-card__note">Pembayaran di halaman berikutnya adalah simulasi untuk tugas frontend.</p></aside>
        </div>
        <p className="detail-back"><Link to="/courses">← Kembali ke semua kelas</Link></p>
      </main>
      <Footer />
    </>
  )
}
