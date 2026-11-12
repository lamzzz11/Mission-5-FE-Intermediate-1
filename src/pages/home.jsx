import { useState } from 'react'
import Button from '../components/button.jsx'
import CourseCard from '../components/courseCard.jsx'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import { categories, courses } from '../data/courses.jsx'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const filteredCourses =
    activeCategory === categories[0] ? courses : courses.filter((course) => course.category === activeCategory)

  const scrollToCourses = () => {
    document.getElementById('kategori')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubscribe = (event) => {
    event.preventDefault()
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <>
      <Navbar />
      <main className="container home">
        <section className="hero">
          <div className="hero__content">
            <h1 className="hero__title">Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!</h1>
            <p className="hero__desc">
              Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak
              hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
            </p>
          </div>
          <Button onClick={scrollToCourses}>Temukan Video Course untuk Dipelajari!</Button>
        </section>

        <section className="courses" id="kategori">
          <div className="section-heading">
            <h2 className="section-heading__title">Koleksi Video Pembelajaran Unggulan</h2>
            <p className="section-heading__subtitle">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
          </div>

          <div className="tabs" role="tablist">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={`tabs__item${activeCategory === category ? ' tabs__item--active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="course-grid">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        <section className="newsletter">
          <div className="newsletter__text">
            <p className="newsletter__eyebrow">NEWSLETTER</p>
            <div className="newsletter__copy">
              <h2 className="newsletter__title">Mau Belajar Lebih Banyak?</h2>
              <p className="newsletter__desc">
                Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik
                hariesok.id
              </p>
            </div>
          </div>
          <form className="newsletter__form" onSubmit={handleSubscribe}>
            <input
              className="newsletter__input"
              type="email"
              placeholder="Masukkan Emailmu"
              aria-label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Button type="submit" variant="accent">
              Subscribe
            </Button>
          </form>
          {isSubscribed && <p className="newsletter__success">Terima kasih! Kamu sudah berlangganan newsletter.</p>}
        </section>
      </main>
      <Footer />
    </>
  )
}
