import Button from '../button.jsx'

export default function HeroBanner({ title, description, ctaLabel, onCtaClick }) {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__desc">{description}</p>
      </div>
      <Button onClick={onCtaClick}>{ctaLabel}</Button>
    </section>
  )
}
