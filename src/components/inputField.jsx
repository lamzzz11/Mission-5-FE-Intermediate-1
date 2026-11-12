import { useId, useState } from 'react'
import eyeIcon from '../assets/icons/eye.svg'
import eyeOffIcon from '../assets/icons/eye-off.svg'
import flagIdIcon from '../assets/icons/flag-id.svg'

function FieldLabel({ htmlFor, label, required }) {
  return (
    <label className="field__label" htmlFor={htmlFor}>
      {label}
      {required && <span className="field__required">*</span>}
    </label>
  )
}

export default function InputField({ label, type = 'text', required = false, error, ...props }) {
  const inputId = useId()
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="field">
      {label && <FieldLabel htmlFor={inputId} label={label} required={required} />}
      <div className={`field__control${error ? ' field__control--error' : ''}`}>
        <input
          id={inputId}
          className="field__input"
          type={isPassword && showPassword ? 'text' : type}
          required={required}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="field__toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          >
            <img src={showPassword ? eyeIcon : eyeOffIcon} alt="" />
          </button>
        )}
      </div>
      {error && <p className="field__error">{error}</p>}
    </div>
  )
}

export function PhoneField({ label, required = false, countryCode, onCountryCodeChange, ...props }) {
  const inputId = useId()

  return (
    <div className="field">
      <FieldLabel htmlFor={inputId} label={label} required={required} />
      <div className="phone">
        <div className="field__control phone__country">
          <span className="phone__flag">
            <img src={flagIdIcon} alt="Indonesia" />
          </span>
          <select
            className="phone__select"
            value={countryCode}
            onChange={(event) => onCountryCodeChange(event.target.value)}
            aria-label="Kode negara"
          >
            <option value="+62">+62</option>
          </select>
        </div>
        <div className="field__control phone__number">
          <input id={inputId} className="field__input" type="tel" inputMode="numeric" required={required} {...props} />
        </div>
      </div>
    </div>
  )
}
