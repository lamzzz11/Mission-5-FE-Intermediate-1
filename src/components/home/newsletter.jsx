import { useState } from 'react'
import Button from '../button.jsx'

export default function Newsletter({ eyebrow, title, description, placeholder, buttonLabel, successMessage }) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <section className="newsletter">
      <div className="newsletter__text">
        <p className="newsletter__eyebrow">{eyebrow}</p>
        <div className="newsletter__copy">
          <h2 className="newsletter__title">{title}</h2>
          <p className="newsletter__desc">{description}</p>
        </div>
      </div>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input
          className="newsletter__input"
          type="email"
          placeholder={placeholder}
          aria-label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Button type="submit" variant="accent">
          {buttonLabel}
        </Button>
      </form>
      {isSubscribed && <p className="newsletter__success">{successMessage}</p>}
    </section>
  )
}
