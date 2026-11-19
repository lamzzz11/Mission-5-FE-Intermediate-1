import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import { courses } from '../data/courses.jsx'

const classItems = [100, 28, 28].map((progress, index) => ({
  course: courses[5],
  progress,
  completed: progress === 100 ? 12 : 2,
  id: index + 1,
}))

function AccountSidebar() {
  return (
    <aside className="account-sidebar">
      <h1>Daftar Kelas</h1>
      <p>Akses Materi Belajar dan Mulailah Meningkatkan Pengetahuan Anda!</p>
      <nav>
        <Link to="/profile">♙ &nbsp; Profil Saya</Link>
        <Link className="is-active" to="/my-courses">▣ &nbsp; Kelas Saya</Link>
        <Link to="/orders">♧ &nbsp; Pesanan Saya</Link>
      </nav>
    </aside>
  )
}

export default function MyCourses() {
  const [filter, setFilter] = useState('Semua Kelas')
  const [query, setQuery] = useState('')
  const visible = classItems.filter((item) =>
    (filter === 'Semua Kelas' || (filter === 'Selesai' ? item.progress === 100 : item.progress < 100)) &&
    item.course.title.toLowerCase().includes(query.toLowerCase()),
  )
  return <>
    <Navbar />
    <main className="container orders-page">
      <AccountSidebar />
      <section className="content-panel class-list">
        <div className="class-toolbar">
          <div className="orders-tabs">{['Semua Kelas', 'Sedang Berjalan', 'Selesai'].map((item) => <button className={filter === item ? 'is-active' : ''} type="button" onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
          <label className="field__control"><span className="sr-only">Cari Kelas</span><input className="field__input" placeholder="Cari Kelas" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        </div>
        {visible.map(({ course, progress, completed, id }) => (
          <article className="class-progress-card" key={id}>
            <div className="class-progress-card__top"><strong>{completed} / 12 Modul Terselesaikan</strong><span className={progress === 100 ? 'is-done' : ''}>{progress === 100 ? 'Selesai' : 'Sedang Berjalan'}</span></div>
            <div className="class-progress-card__body">
              <img src={course.image} alt="" />
              <div><h2>{course.title}</h2><p>{course.description}</p><div className="learning-instructor"><img src={course.instructor.avatar} alt="" /><span><strong>{course.instructor.name}</strong><small>{course.instructor.role} di <b>{course.instructor.company}</b></small></span></div><p className="class-progress-card__meta">▣ &nbsp;12 Modul &nbsp; ◷ &nbsp;360 Menit</p></div>
            </div>
            <div className="class-progress-card__bottom"><span>Progres Kelas: <b>{progress}%</b></span><div><i style={{ width: progress + '%' }} /></div>{progress === 100 && <Link className="btn btn--outline" to="/learn/1/certificate">Unduh Sertifikat</Link>}<Link className="btn btn--primary" to={'/learn/' + id}>{progress === 100 ? 'Lihat Detail Kelas' : 'Lanjutkan Pembelajaran'}</Link></div>
          </article>
        ))}
        <nav className="pagination" aria-label="Halaman kelas"><button type="button">‹</button>{[1, 2, 3, 4, 5, 6].map((page) => <button className={page === 1 ? 'is-active' : ''} type="button" key={page}>{page}</button>)}<button type="button">›</button></nav>
      </section>
    </main>
    <Footer />
  </>
}
