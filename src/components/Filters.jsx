function Filters({search, onSearchChange, category, onCategoryChange, categories,sortBy, onSortChange,}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        <option value="default">Default</option>
        <option value="low-high">Price: low to high</option>
        <option value="high-low">Price: high to low</option>
        <option value="rating">Rating: high to low</option>
      </select>
    </div>
  )
}

export default Filters