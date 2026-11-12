import Footer from '../components/footer.jsx'
import CourseSection from '../components/home/courseSection.jsx'
import HeroBanner from '../components/home/heroBanner.jsx'
import Newsletter from '../components/home/newsletter.jsx'
import Navbar from '../components/navbar.jsx'
import { categories, courses } from '../data/courses.jsx'

const COURSE_SECTION_ID = 'kategori'

export default function Home() {
  const scrollToCourses = () => {
    document.getElementById(COURSE_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <main className="container home">
        <HeroBanner
          title="Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!"
          description="Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda."
          ctaLabel="Temukan Video Course untuk Dipelajari!"
          onCtaClick={scrollToCourses}
        />
        <CourseSection
          id={COURSE_SECTION_ID}
          title="Koleksi Video Pembelajaran Unggulan"
          subtitle="Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!"
          categories={categories}
          courses={courses}
        />
        <Newsletter
          eyebrow="NEWSLETTER"
          title="Mau Belajar Lebih Banyak?"
          description="Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id"
          placeholder="Masukkan Emailmu"
          buttonLabel="Subscribe"
          successMessage="Terima kasih! Kamu sudah berlangganan newsletter."
        />
      </main>
      <Footer />
    </>
  )
}
