import { Link } from 'react-router-dom'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import { readOrders } from '../data/orders.js'

export default function MyCourses() {
  const courses = readOrders().filter((order) => order.status === 'Berhasil')
  return <><Navbar /><main className="container orders-page"><div className="orders-sidebar"><h1>Daftar Kelas</h1><p>Akses kelas yang sudah kamu beli.</p><Link to="/courses">Cari Kelas</Link></div><section className="content-panel orders-list"><h2>Kelas Saya</h2>{courses.length ? courses.map((course) => <article className="class-card" key={course.invoice}><img src={course.image} alt="" /><div><strong>{course.title}</strong><p>Materi dan video pembelajaran tersedia di kelas ini.</p></div><Link className="btn btn--primary" to={`/learn/${course.courseId}`}>Lanjutkan Belajar</Link></article>) : <div className="empty-state"><p>Belum ada kelas yang dibeli.</p><Link className="btn btn--primary" to="/courses">Jelajahi Kelas</Link></div>}</section></main><Footer /></>
}
