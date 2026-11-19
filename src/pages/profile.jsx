import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/footer.jsx'
import Navbar from '../components/navbar.jsx'
import user from '../assets/avatars/user.png'

function AccountSidebar({ active }) {
  return (
    <aside className="account-sidebar">
      <h1>Ubah Profil</h1>
      <p>Ubah data diri Anda</p>
      <nav>
        <Link className={active === 'profile' ? 'is-active' : ''} to="/profile">♙ &nbsp; Profil Saya</Link>
        <Link className={active === 'classes' ? 'is-active' : ''} to="/my-courses">▣ &nbsp; Kelas Saya</Link>
        <Link className={active === 'orders' ? 'is-active' : ''} to="/orders">♧ &nbsp; Pesanan Saya</Link>
      </nav>
    </aside>
  )
}

export default function Profile() {
  const [saved, setSaved] = useState(false)
  return <>
    <Navbar />
    <main className="container profile-page">
      <AccountSidebar active="profile" />
      <form className="content-panel profile-form" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}>
        <div className="profile-heading"><img src={user} alt="" /><div><h2>Jennie Ruby Jane</h2><p>rubyjane@gmail.com</p><button type="button">Ganti Foto Profil</button></div></div>
        <div className="profile-fields">
          <label>Nama Lengkap<input required defaultValue="Jennie Ruby Jane" onChange={() => setSaved(false)} /></label>
          <label>E-Mail<input required type="email" defaultValue="rubyjane@gmail.com" onChange={() => setSaved(false)} /></label>
          <label className="profile-phone"><span>No. Hp</span><span><select aria-label="Kode negara" defaultValue="+62"><option>+62</option></select><input type="tel" defaultValue="81234567890" onChange={() => setSaved(false)} /></span></label>
        </div>
        <button className="btn btn--primary" type="submit">Simpan</button>
        {saved && <span className="profile-saved" role="status">Data tersimpan</span>}
      </form>
    </main>
    <Footer />
  </>
}
