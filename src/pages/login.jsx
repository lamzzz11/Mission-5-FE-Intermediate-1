import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import googleIcon from '../assets/icons/google.svg'
import Button from '../components/button.jsx'
import InputField from '../components/inputField.jsx'
import Navbar from '../components/navbar.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <>
      <Navbar showMenu={false} />
      <main className="auth">
        <div className="auth__card">
          <div className="auth__header">
            <h1 className="auth__title">Masuk ke Akun</h1>
            <p className="auth__subtitle">Yuk, lanjutin belajarmu di videobelajar.</p>
          </div>

          <div className="auth__body">
            <form className="auth__form" onSubmit={handleSubmit}>
              <div className="auth__fields">
                <InputField
                  label="E-Mail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Kata Sandi"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <a href="#" className="auth__forgot">
                  Lupa Password?
                </a>
              </div>
              <div className="auth__actions">
                <Button type="submit" fullWidth>
                  Masuk
                </Button>
                <Button variant="secondary" fullWidth onClick={() => navigate('/register')}>
                  Daftar
                </Button>
              </div>
            </form>

            <div className="auth__divider">
              <span>atau</span>
            </div>

            <Button variant="outline" fullWidth>
              <img src={googleIcon} alt="" />
              Masuk dengan Google
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
