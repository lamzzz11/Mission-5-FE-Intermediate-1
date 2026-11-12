import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile.js'
import userAvatar from '../assets/avatars/user.png'
import logoutIcon from '../assets/icons/logout.svg'
import menuIcon from '../assets/icons/menu.svg'
import logo from '../assets/logo.svg'

const ACCOUNT_MENU = ['Profil Saya', 'Kelas Saya', 'Pesanan Saya']

export default function Navbar({ showMenu = true }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false)
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  const handleLogout = () => {
    closeMenu()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="videobelajar" />
        </Link>

        {showMenu && (
          <nav className="navbar__menu" ref={menuRef}>
            {isMobile ? (
              <button
                type="button"
                className="navbar__burger"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-label="Buka menu"
              >
                <img src={menuIcon} alt="" />
              </button>
            ) : (
              <>
                <a href="#kategori" className="navbar__link">
                  Kategori
                </a>
                <button
                  type="button"
                  className="navbar__avatar"
                  onClick={toggleMenu}
                  aria-expanded={isOpen}
                  aria-label="Menu akun"
                >
                  <img src={userAvatar} alt="" />
                </button>
              </>
            )}

            {isOpen && (
              <ul className={`navbar__dropdown${isMobile ? ' navbar__dropdown--mobile' : ''}`}>
                {isMobile && (
                  <li>
                    <a href="#kategori" className="navbar__dropdown-item" onClick={closeMenu}>
                      Kategori
                    </a>
                  </li>
                )}
                {ACCOUNT_MENU.map((item) => (
                  <li key={item}>
                    <button type="button" className="navbar__dropdown-item" onClick={closeMenu}>
                      {item}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className="navbar__dropdown-item navbar__dropdown-item--danger"
                    onClick={handleLogout}
                  >
                    Keluar
                    <img src={logoutIcon} alt="" />
                  </button>
                </li>
              </ul>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
