import starEmptyIcon from '../assets/icons/star-empty.svg'
import starFullIcon from '../assets/icons/star-full.svg'
import useIsMobile from '../hooks/useIsMobile.js'

const formatPrice = (price) => `Rp ${price / 1000}K`

function Rating({ value }) {
  return (
    <div className="rating" role="img" aria-label={`Rating ${value} dari 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.min(Math.max(value - index, 0), 1)
        return (
          <span key={index} className="rating__star">
            <img src={starEmptyIcon} alt="" />
            {fill > 0 && (
              <span className="rating__fill" style={{ width: `${fill * 100}%` }}>
                <img src={starFullIcon} alt="" />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}

export default function CourseCard({ course }) {
  const { title, description, image, instructor, rating, reviews, price } = course
  const isMobile = useIsMobile()

  return (
    <article className="course-card">
      <img className="course-card__image" src={image} alt={title} />
      <div className="course-card__body">
        <div className="course-card__text">
          <h3 className="course-card__title">{title}</h3>
          {!isMobile && <p className="course-card__desc">{description}</p>}
        </div>
        <div className="course-card__instructor">
          <img className="course-card__avatar" src={instructor.avatar} alt={instructor.name} />
          <div>
            <p className="course-card__name">{instructor.name}</p>
            <p className="course-card__role">
              {instructor.role}
              {!isMobile && (
                <>
                  {' '}
                  di <strong>{instructor.company}</strong>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="course-card__footer">
        <div className="course-card__rating">
          <Rating value={rating} />
          <span className="course-card__reviews">
            {rating} ({reviews})
          </span>
        </div>
        <span className="course-card__price">{formatPrice(price)}</span>
      </div>
    </article>
  )
}
