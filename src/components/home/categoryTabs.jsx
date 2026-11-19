export default function CategoryTabs({ categories, activeCategory, onChange }) {
  return (
    <div className="tabs" role="group" aria-label="Filter kategori kelas">
      {categories.map((category) => {
        const isActive = activeCategory === category
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            className={`tabs__item${isActive ? ' tabs__item--active' : ''}`}
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
