import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthActions from '../components/auth/authActions.jsx'
import AuthCard from '../components/auth/authCard.jsx'
import InputField from '../components/inputField.jsx'

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
    <AuthCard title="Masuk ke Akun" subtitle="Yuk, lanjutin belajarmu di videobelajar." onSubmit={handleSubmit}>
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
      <AuthActions
        submitLabel="Masuk"
        secondaryLabel="Daftar"
        onSecondaryClick={() => navigate('/register')}
        socialLabel="Masuk dengan Google"
      />
    </AuthCard>
  )
}
