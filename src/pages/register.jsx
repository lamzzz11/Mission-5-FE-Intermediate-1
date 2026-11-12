import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthActions from '../components/auth/authActions.jsx'
import AuthCard from '../components/auth/authCard.jsx'
import InputField, { PhoneField } from '../components/inputField.jsx'

const INITIAL_FORM = {
  name: '',
  email: '',
  countryCode: '+62',
  phone: '',
  password: '',
  confirmPassword: '',
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'password' || name === 'confirmPassword') setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Konfirmasi kata sandi tidak sama.')
      return
    }
    navigate('/login')
  }

  return (
    <AuthCard title="Pendaftaran Akun" subtitle="Yuk, daftarkan akunmu sekarang juga!" onSubmit={handleSubmit}>
      <div className="auth__fields">
        <InputField label="Nama Lengkap" name="name" autoComplete="name" value={form.name} onChange={handleChange} required />
        <InputField
          label="E-Mail"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <PhoneField
          label="No. Hp"
          name="phone"
          autoComplete="tel-national"
          value={form.phone}
          onChange={handleChange}
          countryCode={form.countryCode}
          onCountryCodeChange={(countryCode) => setForm((prev) => ({ ...prev, countryCode }))}
          required
        />
        <InputField
          label="Kata Sandi"
          name="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <InputField
          label="Konfirmasi Kata Sandi"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={error}
          required
        />
        <a href="#" className="auth__forgot">
          Lupa Password?
        </a>
      </div>
      <AuthActions
        submitLabel="Daftar"
        secondaryLabel="Masuk"
        onSecondaryClick={() => navigate('/login')}
        socialLabel="Daftar dengan Google"
      />
    </AuthCard>
  )
}
