import { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/button.jsx'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import { courses } from '../data/courses.jsx'

const questions = [
  { prompt: 'Apa tujuan utama membuat persona pengguna?', options: ['Memahami kebutuhan pengguna', 'Memilih warna favorit tim', 'Menghitung biaya server'], answer: 0 },
  { prompt: 'Kapan sebuah desain perlu diuji?', options: ['Setelah produk dirilis saja', 'Sejak ide mulai dibuat', 'Tidak perlu diuji'], answer: 1 },
  { prompt: 'Apa yang sebaiknya dilakukan setelah mendapat masukan?', options: ['Mengabaikan semua masukan', 'Mencoba memperbaiki desain', 'Menghapus seluruh proyek'], answer: 1 },
]
const lessons = ['Pengenalan kelas', 'Dasar-dasar materi', 'Studi kasus', 'Rangkuman dan latihan']

function ProgressHeader({ course }) {
  return <div className="learning-heading"><p><Link to="/my-courses">Kelas Saya</Link> / {course.title}</p><h1>{course.title}</h1></div>
}

function CoursePlayer({ course, courseId }) {
  const [lessonIndex, setLessonIndex] = useState(0)
  const [complete, setComplete] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`videobelajar-progress-${courseId}`) || '[]') } catch { return [] }
  })
  const markComplete = () => {
    const updated = complete.includes(lessonIndex) ? complete : [...complete, lessonIndex]
    setComplete(updated)
    localStorage.setItem(`videobelajar-progress-${courseId}`, JSON.stringify(updated))
  }

  return (
    <>
      <ProgressHeader course={course} />
      <div className="learning-layout">
        <section className="learning-main content-panel">
          <div className="video-placeholder"><span aria-hidden="true">▶</span><p>Video pembelajaran · {lessons[lessonIndex]}</p><small>Video akan tersedia pada versi backend.</small></div>
          <div className="learning-lesson-heading"><div><h2>{lessons[lessonIndex]}</h2><p>Materi {lessonIndex + 1} dari {lessons.length}</p></div><Button variant="outline" onClick={markComplete}>{complete.includes(lessonIndex) ? 'Selesai ✓' : 'Tandai Selesai'}</Button></div>
          <p>{course.description}. Ikuti materi sesuai urutan, lalu kerjakan ujian akhir untuk mengukur pemahamanmu.</p>
          <div className="learning-actions"><Link className="btn btn--outline" to="/my-courses">Kembali ke Kelas Saya</Link><Link className="btn btn--primary" to={`/learn/${courseId}/quiz/rules`}>Mulai Ujian Akhir</Link></div>
        </section>
        <aside className="content-panel lesson-list"><h2>Materi Kelas</h2><p>{complete.length} dari {lessons.length} materi selesai</p>{lessons.map((lesson, index) => <button className={index === lessonIndex ? 'lesson-list__item is-active' : 'lesson-list__item'} type="button" onClick={() => setLessonIndex(index)} key={lesson}><span>{complete.includes(index) ? '✓' : '▶'}</span><span>{lesson}<small>Video · 12 menit</small></span></button>)}</aside>
      </div>
    </>
  )
}

function QuizRules({ courseId }) {
  return <section className="content-panel quiz-card"><p className="learning-eyebrow">Ujian Akhir</p><h1>Aturan Ujian</h1><p>Pastikan kamu sudah mempelajari materi sebelum memulai. Jawab semua pertanyaan, lalu kirim jawaban untuk melihat hasilnya.</p><ul><li>3 pertanyaan pilihan ganda</li><li>Pilih satu jawaban untuk setiap pertanyaan</li><li>Nilai minimal untuk lulus adalah 2 jawaban benar</li></ul><Link className="btn btn--primary" to={`/learn/${courseId}/quiz`}>Mulai Ujian</Link></section>
}

function Quiz({ courseId }) {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [error, setError] = useState('')
  const submitQuiz = (event) => {
    event.preventDefault()
    if (answers.includes(null)) { setError('Pilih jawaban untuk semua pertanyaan terlebih dahulu.'); return }
    const score = answers.reduce((total, answer, index) => total + Number(answer === questions[index].answer), 0)
    localStorage.setItem(`videobelajar-quiz-${courseId}`, JSON.stringify({ score, total: questions.length }))
    navigate(`/learn/${courseId}/quiz/result`)
  }

  return <form className="content-panel quiz-card" onSubmit={submitQuiz}><p className="learning-eyebrow">Ujian Akhir</p><h1>Uji Pemahamanmu</h1>{questions.map((question, index) => <fieldset className="quiz-question" key={question.prompt}><legend>{index + 1}. {question.prompt}</legend>{question.options.map((option, optionIndex) => <label key={option}><input type="radio" name={`question-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers((current) => current.map((answer, answerIndex) => answerIndex === index ? optionIndex : answer))} />{option}</label>)}</fieldset>)}{error && <p className="field__error" role="alert">{error}</p>}<Button type="submit">Kirim Jawaban</Button></form>
}

function QuizResult({ courseId }) {
  let result = { score: 0, total: questions.length }
  try { result = JSON.parse(localStorage.getItem(`videobelajar-quiz-${courseId}`) || '{}') } catch { /* Keep the empty result when storage is unavailable. */ }
  const passed = result.score >= 2
  return <section className="content-panel quiz-result"><div className={passed ? 'quiz-result__mark' : 'quiz-result__mark quiz-result__mark--retry'}>{passed ? '✓' : '!'}</div><h1>{passed ? 'Selamat, kamu lulus!' : 'Ujian belum lulus'}</h1><p>Skor kamu: <strong>{result.score ?? 0} / {result.total ?? questions.length}</strong></p><div className="learning-actions"><Link className="btn btn--outline" to={`/learn/${courseId}/quiz`}>Ulangi Ujian</Link>{passed && <Link className="btn btn--primary" to={`/learn/${courseId}/certificate`}>Lihat Sertifikat</Link>}<Link className="btn btn--outline" to={`/learn/${courseId}/review`}>Tulis Ulasan</Link></div></section>
}

function Review({ course }) {
  const [sent, setSent] = useState(false)
  return <form className="content-panel quiz-card" onSubmit={(event) => { event.preventDefault(); setSent(true) }}><p className="learning-eyebrow">Ulasan Kelas</p><h1>Bagaimana pengalaman belajarmu?</h1><label className="review-label">Rating<select required defaultValue="5">{[5, 4, 3, 2, 1].map((rating) => <option value={rating} key={rating}>{rating} bintang</option>)}</select></label><label className="review-label">Ulasan<textarea required rows="5" placeholder={`Ceritakan pengalamanmu mengikuti ${course.title}`} /></label><Button type="submit">Kirim Ulasan</Button>{sent && <p role="status" className="profile-saved">Terima kasih, ulasanmu sudah disimpan di halaman ini.</p>}</form>
}

function Certificate({ course }) {
  return <div className="certificate-wrap"><article className="certificate"><p>VIDEOBELAJAR</p><h1>Sertifikat Penyelesaian</h1><span>Diberikan kepada</span><h2>Student VideoBelajar</h2><p>Telah menyelesaikan kelas</p><h3>{course.title}</h3><div className="certificate__footer"><span>VideoBelajar<br /><small>Platform Pembelajaran</small></span><span>2026</span></div></article><button className="btn btn--primary" type="button" onClick={() => window.print()}>Cetak Sertifikat</button></div>
}

export default function Learning() {
  const { courseId } = useParams()
  const { pathname } = useLocation()
  const course = courses.find((item) => item.id === Number(courseId))
  if (!course) return <main className="container empty-state"><h1>Kelas tidak ditemukan</h1><Link to="/my-courses">Kembali ke Kelas Saya</Link></main>

  let screen
  if (pathname.endsWith('/quiz/rules')) screen = <QuizRules courseId={courseId} />
  else if (pathname.endsWith('/quiz/result')) screen = <QuizResult courseId={courseId} />
  else if (pathname.endsWith('/quiz')) screen = <Quiz courseId={courseId} />
  else if (pathname.endsWith('/review')) screen = <Review course={course} />
  else if (pathname.endsWith('/certificate')) screen = <Certificate course={course} />
  else screen = <CoursePlayer course={course} courseId={courseId} />

  return <><Navbar /><main className="container learning-page">{screen}</main><Footer /></>
}
