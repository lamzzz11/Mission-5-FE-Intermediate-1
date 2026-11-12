import { useState } from 'react'
import CourseCard from '../courseCard.jsx'
import CategoryTabs from './categoryTabs.jsx'

export default function CourseSection({ id, title, subtitle, categories, courses }) {
  const [activeCategory, setActiveCategory] = useState(categories[0])

  const visibleCourses =
    activeCategory === categories[0] ? courses : courses.filter((course) => course.category === activeCategory)

  return (
    <section className="courses" id={id}>
      <div className="section-heading">
        <h2 className="section-heading__title">{title}</h2>
        <p className="section-heading__subtitle">{subtitle}</p>
      </div>

      <CategoryTabs categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />

      <div className="course-grid">
        {visibleCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}
