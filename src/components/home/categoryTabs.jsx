export default function CategoryTabs({ categories, activeCategory, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {categories.map((category) => {
        const isActive = activeCategory === category
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
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
