import { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import { courses } from '../data/courses.jsx'
import avatar from '../assets/avatars/avatar-1.png'
import certificatePreview from '../assets/images/certificate-preview.png'
import quizSubmit from '../assets/images/quiz-submit.png'

const courseName = 'Foundations of User Experience Design'
const lessons = Array(5).fill('Video: Introduction to HR')
const questionText = 'Memikirkan dan mengantisipasi secara teliti adanya user secara tidak sengaja mengutak-atik konfigurasi, namun dapat diatasi dengan membuat default yang mengurangi kepanikan pada user adalah pengertian dari ...'
const answersText = [
  'Memikirkan tentang default *',
  'Mempertimbangkan page layout berdasarkan suatu tujuan tertentu',
  'Memastikan bahwa sistem berjalan sesuai dengan apa yang terjadi saat itu juga',
  'Menciptakan konsistensi dan menggunakan elemen UI umum',
]
const questions = Array.from({ length: 10 }, (_, index) => ({ number: index + 1, prompt: questionText, answers: answersText }))

function LearningHeader({ completed = false, courseId }) {
  return (
    <header className="learning-topbar">
      <Link to="/my-courses" className="learning-topbar__back"><span aria-hidden="true">←</span><span>{courseName}</span></Link>
      {completed ? <Link className="learning-topbar__trophy" to={'/learn/' + courseId + '/certificate'} aria-label="Ambil Sertifikat">🏆 <span>⌄</span></Link> : <div className="learning-topbar__progress"><span /><strong>10/12</strong><span aria-hidden="true">⌄</span></div>}
      <img className="learning-topbar__avatar" src={avatar} alt="Profil" />
    </header>
  )
}

function ModuleSidebar({ courseId, active }) {
  const base = '/learn/' + courseId
  return (
    <aside className="learning-modules">
      <h2>Daftar Modul</h2>
      <details open>
        <summary>Introduction to HR</summary>
        <div className="learning-module-list">
          <Link className={active === 'pretest' ? 'learning-module is-active' : 'learning-module'} to={base + '/pretest/rules'}><span className="learning-module__icon">▧</span><span>Pre-Test: Introduction to HR<small>10 Pertanyaan</small></span></Link>
          {lessons.map((lesson, index) => (
            <Link className={active === 'video-' + index ? 'learning-module is-active' : 'learning-module'} to={base} key={lesson + index}>
              <span className="learning-module__check">✓</span><span>{lesson}<small>12 Menit</small></span>
            </Link>
          ))}
          <Link className={active === 'summary' ? 'learning-module is-active' : 'learning-module'} to={base + '/summary'}>
            <span className="learning-module__icon">▧</span><span>Rangkuman: Introduction to HR<small>12 Menit</small></span>
          </Link>
          <Link className={active === 'quiz' ? 'learning-module is-active' : 'learning-module'} to={base + '/quiz/rules'}>
            <span className="learning-module__icon">♧</span><span>Quiz: Introduction to HR<small>10 Pertanyaan</small></span>
          </Link>
          <Link className={active === 'exam' ? 'learning-module is-active' : 'learning-module'} to={base + '/exam/rules'}>
            <span className="learning-module__icon">▧</span><span>Ujian Akhir: Introduction to HR<small>10 Pertanyaan</small></span>
          </Link>
        </div>
      </details>
      <details><summary>Introduction to HR</summary></details>
      <details><summary>Introduction to HR</summary></details>
      <Link className="learning-review-link" to={base + '/review'}>☆ Beri Review & Rating</Link>
    </aside>
  )
}

function LearningFooter({ courseId, previous = '/my-courses', next = '/learn/' + courseId + '/pretest/rules' }) {
  return (
    <nav className="learning-footer" aria-label="Navigasi kelas">
      <Link to={previous}><span aria-hidden="true">‹</span><span>{courseName}</span></Link>
      <Link to={next}><span>{courseName}</span><span aria-hidden="true">›</span></Link>
    </nav>
  )
}

function LearningShell({ children, courseId, active, className = '', completed = false }) {
  return (
    <div className={'learning-shell ' + className}>
      <LearningHeader completed={completed} courseId={courseId} />
      <div className="learning-shell__content">{children}</div>
      <ModuleSidebar courseId={courseId} active={active} />
      <LearningFooter courseId={courseId} />
    </div>
  )
}

function Player({ courseId, summary = false }) {
  return (
    <LearningShell courseId={courseId} active={summary ? 'summary' : 'video-0'} className="learning-player">
      <main className="learning-main">
        <div className="learning-video"><span aria-hidden="true">▶</span></div>
        {summary ? (
          <section className="learning-description">
            <h1>Download Rangkuman Modul</h1>
            <p>Silakan download rangkuman modul dari materi yang telah kamu pelajari</p>
            <button className="btn btn--outline" type="button">⇩ &nbsp; Download Rangkuman</button>
          </section>
        ) : (
          <section className="learning-description">
            <h1>Praktikkan Skill dengan Technical Book</h1>
            <p>Pelajari dan praktikkan skill teknis dalam berbagai industri dengan Technical Book Rislearn</p>
            <div className="learning-instructor">
              <img src={avatar} alt="" />
              <span><strong>Jenna Ortega</strong><small>Senior Accountant di <b>Gojek</b></small></span>
            </div>
            <p className="learning-rating">★★★☆☆ <span>3.5 (86)</span></p>
          </section>
        )}
      </main>
    </LearningShell>
  )
}

function Rules({ courseId, pretest, exam }) {
  const base = '/learn/' + courseId + (pretest ? '/pretest' : exam ? '/exam' : '/quiz')
  return (
    <LearningShell courseId={courseId} active={pretest ? 'pretest' : exam ? 'exam' : 'quiz'} className="learning-rules">
      <main className="learning-main">
        <div className="rules-banner"><span>RULES</span></div>
        <section className="learning-description learning-rules__copy">
          <h1>Aturan</h1>
          <p>Kerjakan {pretest ? 'pretest' : exam ? 'ujian akhir' : 'quiz'} dengan sebaik mungkin untuk mengukur pemahamanmu terkait materi yang akan kamu pelajari.</p>
          <p>Syarat Nilai Kelulusan -<br />Durasi Ujian: 5 Menit</p>
          <p>Jangan khawatir, total skor tidak akan memengaruhi kelulusan dan penilaian akhir dalam rangkaian kelas ini.</p>
          <Link className="btn btn--primary" to={base}>{pretest ? 'Mulai Pre-Test' : exam ? 'Mulai Ujian Akhir' : 'Mulai Quiz'}</Link>
        </section>
      </main>
    </LearningShell>
  )
}

function Quiz({ courseId, pretest, exam }) {
  const navigate = useNavigate()
  const mode = pretest ? 'Pretest' : exam ? 'UjianAkhir' : 'Quiz'
  const base = '/learn/' + courseId + (pretest ? '/pretest' : exam ? '/exam' : '/quiz')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(() => {
    const initial = [0, null, null, null, null, null, null, null, null, null]
    try {
      const stored = JSON.parse(localStorage.getItem('videobelajar-' + mode + '-' + courseId) || 'null')
      return Array.isArray(stored) && stored.length === 10 && stored.every((answer) => answer === null || Number.isInteger(answer) && answer >= 0 && answer < 4) ? stored : initial
    } catch { return initial }
  })
  const [confirm, setConfirm] = useState(false)
  const [missing, setMissing] = useState(false)
  const question = questions[current]
  const updateAnswer = (value) => {
    const updated = answers.map((answer, index) => index === current ? value : answer)
    setAnswers(updated)
    try { localStorage.setItem('videobelajar-' + mode + '-' + courseId, JSON.stringify(updated)) } catch { /* Keep the answers for this session. */ }
    setMissing(false)
  }
  const finish = () => {
    if (answers.some((answer) => answer === null)) { setConfirm(false); setMissing(true); return }
    const score = Math.round(answers.filter((answer) => answer === 0).length / questions.length * 100)
    try { localStorage.setItem('videobelajar-result-' + mode + '-' + courseId, JSON.stringify({ score, total: questions.length, correct: Math.round(score / 10) })) } catch { /* Keep the result on this screen. */ }
    navigate(base + '/result', { state: { score, total: questions.length, correct: Math.round(score / 10) } })
  }

  return (
    <LearningShell courseId={courseId} active={pretest ? 'pretest' : exam ? 'exam' : 'quiz'} className="learning-quiz">
      <aside className="quiz-index">
        <h1>List Soal</h1>
        <div className="quiz-index__grid">
          {questions.map((item, index) => (
            <button className={(current === index ? 'is-current ' : '') + (answers[index] !== null && index !== current ? 'is-answered' : '')} type="button" onClick={() => setCurrent(index)} key={item.number}>{item.number}</button>
          ))}
        </div>
        <p>Selesaikan semua soal untuk mengakhiri {pretest ? 'pretest' : exam ? 'ujian akhir' : 'quiz'}</p>
      </aside>
      <main className="learning-main quiz-question">
        <h1>Pertanyaan {question.number}</h1>
        <p>{question.prompt}</p>
        <fieldset>
          <legend className="sr-only">Pilih jawaban</legend>
          {question.answers.map((answer, index) => (
            <label className={answers[current] === index ? 'is-selected' : ''} key={answer}>
              <input type="radio" name={'question-' + current} checked={answers[current] === index} onChange={() => updateAnswer(index)} />
              <span>{answer}</span>
            </label>
          ))}
        </fieldset>
        {missing && <p className="quiz-missing" role="alert">Selesaikan semua soal untuk mengakhiri {pretest ? 'pretest' : exam ? 'ujian akhir' : 'quiz'}.</p>}
        <div className="quiz-actions">
          <button className="btn btn--outline" type="button" disabled={current === 0} onClick={() => setCurrent((value) => value - 1)}>← &nbsp; Sebelumnya</button>
          {current < questions.length - 1
            ? <button className="btn btn--primary" type="button" onClick={() => setCurrent((value) => value + 1)}>Selanjutnya &nbsp; →</button>
            : <button className="btn btn--accent" type="button" onClick={() => setConfirm(true)}>Submit &nbsp; →</button>}
        </div>
        {confirm && <div className="learning-modal-backdrop">
          <section className="learning-modal" role="dialog" aria-modal="true" aria-labelledby="finish-title">
            <img src={quizSubmit} alt="" />
            <h2 id="finish-title">Selesaikan {pretest ? 'Pretest' : exam ? 'Ujian Akhir' : 'Quiz'}</h2>
            <p>Apakah kamu yakin untuk menyelesaikan {pretest ? 'pretest' : exam ? 'ujian akhir' : 'quiz'} ini?</p>
            <div><button className="btn btn--outline" type="button" onClick={() => setConfirm(false)}>Batal</button><button className="btn btn--primary" type="button" onClick={finish}>Selesai</button></div>
          </section>
        </div>}
      </main>
    </LearningShell>
  )
}

function Result({ courseId, pretest, exam, completed = false }) {
  const mode = pretest ? 'Pretest' : exam ? 'UjianAkhir' : 'Quiz'
  const location = useLocation()
  let result = { score: 20, total: 10, correct: 2 }
  try {
    const stored = JSON.parse(localStorage.getItem('videobelajar-result-' + mode + '-' + courseId) || 'null')
    if (Number.isInteger(stored?.score) && stored.score >= 0 && stored.score <= 100 && Number.isInteger(stored?.correct) && stored.correct >= 0 && stored.correct <= 10) result = { ...result, ...stored }
  } catch { /* Keep the example result when storage is unavailable. */ }
  if (completed) result = { score: 100, total: 10, correct: 10 }
  if (Number.isInteger(location.state?.score) && location.state.score >= 0 && location.state.score <= 100) result = { ...result, ...location.state }
  if (completed) result = { score: 100, total: 10, correct: 10 }
  const passed = result.score >= 80
  const base = '/learn/' + courseId + (pretest ? '/pretest' : exam ? '/exam' : '/quiz')
  return (
    <LearningShell courseId={courseId} active={pretest ? 'pretest' : exam ? 'exam' : 'quiz'} className="learning-result" completed={completed}>
      <main className="learning-main">
        <div className={'result-banner ' + (passed ? 'result-banner--pass' : 'result-banner--retry')}><span>{passed ? 'CONGRATS' : 'TRY AGAIN'}</span></div>
        <section className="learning-description result-copy">
          <h1>Tanggal {pretest ? 'Pretest' : exam || completed ? 'Ujian Akhir' : 'Quiz'}:</h1>
          <p>23 September 2022, 10:20 AM</p>
          <div className="result-table">
            <div><span>Nilai</span><strong className={passed ? 'pass' : 'retry'}>{result.score}</strong></div>
            <div><span>Soal</span><strong>10</strong></div>
            <div><span>Benar</span><strong>● {result.correct ?? 0}</strong></div>
            <div><span>Salah</span><strong>● {result.total - (result.correct ?? 0)}</strong></div>
          </div>
          <h2>{passed ? 'Selesai!' : 'Sedikit Lagi!'}</h2>
          <p>{passed ? (pretest ? 'Pretest sudah selesai dan kami sudah mengetahui progresmu.' : exam ? 'Ujian Akhir sudah selesai.' : 'Quiz sudah selesai.') : 'Kamu sudah menyelesaikan quiz dengan baik namun nilaimu belum cukup untuk melanjutkan materi.'}</p>
          <p>{passed ? (exam ? 'Modul sudah selesai.' : 'Saatnya memulai kelas!') : 'Pelajari kembali modul sebelumnya dan kerjakan kembali quiz ini!'}</p>
          {passed
            ? <Link className="btn btn--primary" to={exam ? '/learn/' + courseId + '/done' : base}>Mulai Kelas</Link>
            : <Link className="btn btn--outline" to={base}>⟳ &nbsp; Ulangi Quiz</Link>}
        </section>
      </main>
      {completed && <section className="certificate-popover"><h2>Modul sudah selesai</h2><p>16 dari 16 modul telah selesai, silahkan download sertifikat</p><Link className="btn btn--primary" to={'/learn/' + courseId + '/certificate'}>Ambil Sertifikat</Link></section>}
    </LearningShell>
  )
}

function Review({ courseId }) {
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  return (
    <div className="learning-review-screen">
      <Player courseId={courseId} />
      <div className="learning-modal-backdrop">
        <form className="learning-modal learning-review-modal" onSubmit={(event) => { event.preventDefault(); navigate('/learn/' + courseId + '/done') }}>
          <h1>Tulis Review Terbaikmu!</h1>
          <p>Apakah kamu yakin untuk menyelesaikan pretest ini?</p>
          <div className="review-stars" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((star) => <button type="button" className={rating >= star ? 'is-selected' : ''} onClick={() => setRating(star)} aria-label={star + ' bintang'} key={star}>★</button>)}
          </div>
          <label className="sr-only" htmlFor="review-content">Masukkan Review</label>
          <textarea id="review-content" placeholder="Masukkan Review" value={review} onChange={(event) => setReview(event.target.value)} />
          <div><button className="btn btn--outline" type="button" onClick={() => navigate('/learn/' + courseId)}>Batal</button><button className="btn btn--primary" type="submit" disabled={!rating}>Selesai</button></div>
        </form>
      </div>
    </div>
  )
}

function Done({ courseId }) {
  return <Result courseId={courseId} pretest={false} exam completed />
}

function Certificate() {
  return (
    <>
      <Navbar />
      <main className="container certificate-page">
        <p className="breadcrumb"><Link to="/home">Beranda</Link> / Desain / Gapai Karier Impianmu / Sertifikat</p>
        <section className="certificate-product">
          <img src={certificatePreview} alt="Certificate of Completion untuk Morgan Maxwell" />
          <div className="certificate-product__details">
            <div><h1>Big 4 Auditor Financial Analyst</h1><p>Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik</p></div>
            <a className="btn btn--outline" href={certificatePreview} download="Sertifikat-VideoBelajar.png">⇩ &nbsp; Download Sertifikat</a>
            <p className="learning-instructor"><strong>Jenna Ortega</strong><span>Senior Accountant di <b>Gojek</b></span></p>
            <p className="learning-rating">★★★☆☆ <span>3.5 (86)</span></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function Learning() {
  const { courseId } = useParams()
  const { pathname } = useLocation()
  const course = courses.find((item) => item.id === Number(courseId))
  if (!course) return <main className="container empty-state"><h1>Kelas tidak ditemukan</h1><Link to="/my-courses">Kembali ke Kelas Saya</Link></main>

  const pretest = pathname.includes('/pretest')
  const exam = pathname.includes('/exam')
  if (pathname.endsWith('/review')) return <Review courseId={courseId} />
  if (pathname.endsWith('/certificate')) return <Certificate />
  if (pathname.endsWith('/done')) return <Done courseId={courseId} />
  if (pathname.endsWith('/summary')) return <Player courseId={courseId} summary />
  if (pathname.endsWith('/rules')) return <Rules courseId={courseId} pretest={pretest} exam={exam} />
  if (pathname.endsWith('/result')) return <Result courseId={courseId} pretest={pretest} exam={exam} />
  if (pathname.endsWith('/quiz') || pathname.endsWith('/pretest') || pathname.endsWith('/exam')) return <Quiz courseId={courseId} pretest={pretest} exam={exam} />
  return <Player courseId={courseId} />
}
