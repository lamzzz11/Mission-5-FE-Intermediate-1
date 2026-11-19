import { useMemo, useState } from 'react'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import CourseCard from '../components/courseCard.jsx'
import { courses } from '../data/courses.jsx'

const studyFilters = [
  { label: 'Pemasaran', value: 'Pemasaran' },
  { label: 'Digital & Teknologi', value: 'Desain' },
  { label: 'Pengembangan Diri', value: 'Pengembangan Diri' },
  { label: 'Bisnis Manajemen', value: 'Bisnis' },
]
const durations = [
  { label: 'Kurang dari 4 Jam', value: 'short' },
  { label: '4 - 8 Jam', value: 'medium' },
  { label: 'Lebih dari 8 Jam', value: 'long' },
]

export default function Products() {
  const [categories, setCategories] = useState([])
  const [prices, setPrices] = useState([])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')
  const [duration, setDuration] = useState('')
  const toggle = (value, list, setList) => setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
  const filteredCourses = useMemo(() => {
    const filtered = courses.filter((course) =>
      (!categories.length || categories.includes(course.category)) &&
      (!prices.length || prices.includes(course.category)) &&
      course.title.toLowerCase().includes(query.toLowerCase()) &&
      (!duration || (duration === 'short' ? course.durationHours < 4 : duration === 'medium' ? course.durationHours >= 4 && course.durationHours <= 8 : course.durationHours > 8)),
    )
    const sorters = {
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      az: (a, b) => a.title.localeCompare(b.title),
      za: (a, b) => b.title.localeCompare(a.title),
      ratingHigh: (a, b) => b.rating - a.rating,
      ratingLow: (a, b) => a.rating - b.rating,
    }
    return sorters[sort] ? [...filtered].sort(sorters[sort]) : filtered
  }, [categories, prices, query, sort, duration])
  const reset = () => { setCategories([]); setPrices([]); setDuration(''); setQuery(''); setSort('default') }

  return <>
    <Navbar />
    <main className="container products-page">
      <div className="section-heading">
        <h1 className="section-heading__title">Koleksi Video Pembelajaran Unggulan</h1>
        <p className="section-heading__subtitle">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
      </div>
      <div className="products-layout">
        <aside className="product-filters">
          <div className="product-filters__heading"><strong>Filter</strong><button type="button" onClick={reset}>Reset</button></div>
          <fieldset className="product-filter-group"><legend>Bidang Studi</legend>{studyFilters.map(({ label, value }) => <label key={label}><input type="checkbox" checked={categories.includes(value)} onChange={() => toggle(value, categories, setCategories)} />{label}</label>)}</fieldset>
          <fieldset className="product-filter-group"><legend>Harga</legend>{studyFilters.map(({ label, value }) => <label key={label}><input type="checkbox" checked={prices.includes(value)} onChange={() => toggle(value, prices, setPrices)} />{label}</label>)}</fieldset>
          <fieldset className="product-filter-group"><legend>Durasi</legend>{durations.map(({ label, value }) => <label key={value}><input type="radio" name="duration" checked={duration === value} onChange={() => setDuration(value)} />{label}</label>)}</fieldset>
        </aside>
        <div className="products-main">
          <div className="products-toolbar__controls">
            <label className="field__control products-toolbar__sort"><span className="sr-only">Urutkan kelas</span><select className="field__input" value={sort} onChange={(event) => setSort(event.target.value)}><option value="default">Urutkan</option><option value="low">Harga Rendah</option><option value="high">Harga Tinggi</option><option value="az">A to Z</option><option value="za">Z to A</option><option value="ratingHigh">Rating Tertinggi</option><option value="ratingLow">Rating Terendah</option></select></label>
            <label className="field__control products-toolbar__search"><span className="sr-only">Cari kelas</span><input className="field__input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari Kelas" /><span aria-hidden="true">⌕</span></label>
          </div>
          {filteredCourses.length ? <div className="course-grid">{filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)}</div> : <p className="empty-state">Kelas tidak ditemukan.</p>}
          <nav className="pagination" aria-label="Halaman katalog"><button type="button">‹</button>{[1, 2, 3, 4, 5, 6].map((page) => <button className={page === 1 ? 'is-active' : ''} type="button" key={page}>{page}</button>)}<button type="button">›</button></nav>
        </div>
      </div>
    </main>
    <Footer />
  </>
}
