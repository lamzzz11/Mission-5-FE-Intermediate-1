import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import CourseCard from '../components/courseCard.jsx'
import { categories, courses } from '../data/courses.jsx'

export default function Products() {
  const [category, setCategory] = useState('Semua Kelas')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('popular')
  const [price, setPrice] = useState('all')
  const [duration, setDuration] = useState('all')
  const filteredCourses = useMemo(() => {
    const filtered = courses.filter((course) =>
      (category === 'Semua Kelas' || course.category === category) &&
      course.title.toLowerCase().includes(query.toLowerCase()) &&
      (price === 'all' || (price === 'low' ? course.price <= 200000 : course.price > 200000)) &&
      (duration === 'all' || (duration === 'short' ? course.durationHours < 4 : duration === 'medium' ? course.durationHours >= 4 && course.durationHours <= 8 : course.durationHours > 8)),
    )
    if (sort === 'low') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'high') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [category, query, sort, price, duration])

  return (
    <>
      <Navbar />
      <main className="container products-page">
        <div className="section-heading">
          <h1 className="section-heading__title">Koleksi Video Pembelajaran Unggulan</h1>
          <p className="section-heading__subtitle">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
        </div>
        <div className="products-layout">
          <aside className="product-filters"><div className="product-filters__heading"><strong>Filter</strong><button type="button" onClick={() => { setCategory('Semua Kelas'); setPrice('all'); setDuration('all') }}>Reset</button></div>
            <fieldset className="product-filter-group"><legend>Bidang Studi</legend>{categories.map((item) => <label key={item}><input type="radio" name="category" checked={category === item} onChange={() => setCategory(item)} />{item}</label>)}</fieldset>
            <fieldset className="product-filter-group"><legend>Harga</legend><label><input type="radio" name="price" checked={price === 'all'} onChange={() => setPrice('all')} />Semua harga</label><label><input type="radio" name="price" checked={price === 'low'} onChange={() => setPrice('low')} />Di bawah Rp 200.000</label><label><input type="radio" name="price" checked={price === 'high'} onChange={() => setPrice('high')} />Rp 200.000 ke atas</label></fieldset>
            <fieldset className="product-filter-group"><legend>Durasi</legend><label><input type="radio" name="duration" checked={duration === 'all'} onChange={() => setDuration('all')} />Semua durasi</label><label><input type="radio" name="duration" checked={duration === 'short'} onChange={() => setDuration('short')} />Kurang dari 4 jam</label><label><input type="radio" name="duration" checked={duration === 'medium'} onChange={() => setDuration('medium')} />4–8 jam</label><label><input type="radio" name="duration" checked={duration === 'long'} onChange={() => setDuration('long')} />Lebih dari 8 jam</label></fieldset>
          </aside>
          <div className="products-main"><div className="products-toolbar__controls"><label className="field__control products-toolbar__search"><span className="sr-only">Cari kelas</span><input className="field__input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari Kelas" /><span aria-hidden="true">⌕</span></label><label className="field__control products-toolbar__sort"><span className="sr-only">Urutkan kelas</span><select className="field__input" value={sort} onChange={(event) => setSort(event.target.value)}><option value="popular">Urutkan</option><option value="low">Harga terendah</option><option value="high">Harga tertinggi</option></select></label></div>
            {filteredCourses.length ? <div className="course-grid">{filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)}</div> : <p className="empty-state">Kelas tidak ditemukan. Coba filter atau kata kunci lain.</p>}
          </div>
        </div>
        <Link className="products-back" to="/">Kembali ke Beranda</Link>
      </main>
      <Footer />
    </>
  )
}
