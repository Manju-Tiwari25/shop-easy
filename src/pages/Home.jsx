import { useState, useEffect } from 'react'
import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100')

        if (!response.ok) {
          throw new Error('Server error: ' + response.status)
        }

        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const categories = ['all', ...new Set(products.map((p) => p.category))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory = category === 'all' || product.category === category

    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts]

  if (sortBy === 'low-high') {
    sortedProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'high-low') {
    sortedProducts.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    sortedProducts.sort((a, b) => b.rating - a.rating)
  }

  return (
    <div>
      <h2>Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <>
          <Filters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            categories={categories}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <p>
            Showing {filteredProducts.length} of {products.length} products
          </p>

          {filteredProducts.length === 0 && <p>No products found.</p>}

          <div className="product-grid">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                category={product.category}
                rating={product.rating}
                thumbnail={product.thumbnail}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Home