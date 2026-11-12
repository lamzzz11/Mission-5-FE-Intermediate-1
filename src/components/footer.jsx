import { useState } from 'react'
import arrowRightIcon from '../assets/icons/arrow-right.svg'
import facebookIcon from '../assets/icons/facebook.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import twitterIcon from '../assets/icons/twitter.svg'
import logo from '../assets/logo.svg'
import useIsMobile from '../hooks/useIsMobile.js'

const FOOTER_SECTIONS = [
  {
    title: 'Kategori',
    links: ['Digital & Teknologi', 'Pemasaran', 'Manajemen Bisnis', 'Pengembangan Diri', 'Desain'],
  },
  {
    title: 'Perusahaan',
    links: ['Tentang Kami', 'FAQ', 'Kebijakan Privasi', 'Ketentuan Layanan', 'Bantuan'],
  },
  {
    title: 'Komunitas',
    links: ['Tips Sukses', 'Blog'],
  },
]

const SOCIALS = [
  { name: 'LinkedIn', icon: linkedinIcon },
  { name: 'Facebook', icon: facebookIcon },
  { name: 'Instagram', icon: instagramIcon },
  { name: 'Twitter', icon: twitterIcon },
]

export default function Footer() {
  const [openSection, setOpenSection] = useState(null)
  const isMobile = useIsMobile()

  const toggleSection = (title) => setOpenSection((prev) => (prev === title ? null : title))

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <img className="footer__logo" src={logo} alt="videobelajar" />
            <div className="footer__info">
              <p className="footer__tagline">Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!</p>
              <p className="footer__contact">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
              <p className="footer__contact">+62-877-7123-1234</p>
            </div>
          </div>

          <div className="footer__links">
            {FOOTER_SECTIONS.map(({ title, links }) => {
              const isOpen = openSection === title
              const showLinks = !isMobile || isOpen
              return (
                <div key={title} className={`footer__column${isOpen ? ' footer__column--open' : ''}`}>
                  {isMobile ? (
                    <button
                      type="button"
                      className="footer__heading"
                      onClick={() => toggleSection(title)}
                      aria-expanded={isOpen}
                    >
                      {title}
                      <img className="footer__chevron" src={arrowRightIcon} alt="" />
                    </button>
                  ) : (
                    <h3 className="footer__heading">{title}</h3>
                  )}
                  {showLinks && (
                    <ul className="footer__list">
                      {links.map((link) => (
                        <li key={link}>
                          <a href="#">{link}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">@2023 Gerobak Sayur All Rights Reserved.</p>
          <div className="footer__socials">
            {SOCIALS.map(({ name, icon }) => (
              <a key={name} href="#" aria-label={name}>
                <img src={icon} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
