import { useState } from 'react'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'

export default function Profile() {
  const [saved, setSaved] = useState(false)
  return <><Navbar /><main className="container profile-page"><div className="orders-sidebar"><h1>Ubah Profil</h1><p>Ubah data diri Anda</p></div><form className="content-panel profile-form" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}><h2>Profil Saya</h2><label>Nama Lengkap<input required defaultValue="Student VideoBelajar" onChange={() => setSaved(false)} /></label><label>E-Mail<input required type="email" defaultValue="student@email.com" onChange={() => setSaved(false)} /></label><label>No. HP<input type="tel" defaultValue="081234567890" onChange={() => setSaved(false)} /></label><button className="btn btn--primary" type="submit">Simpan</button>{saved && <p role="status" className="profile-saved">Perubahan profil tersimpan di sesi ini.</p>}</form></main><Footer /></>
}
