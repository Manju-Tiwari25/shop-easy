import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`https://dummyjson.com/products/${id}`)

        if (!response.ok) {
          throw new Error('Product not found')
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])


  const { addToCart } = useCart()

  if (loading) return <p>Loading product...</p>

  if (error) {
    return (
      <div>
        <p className="error">Error: {error}</p>
        <Link to="/">Back to products</Link>
      </div>
    )
  }

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-layout">
        <img src={product.thumbnail} alt={product.title} />

        <div>
          <p className="product-category">{product.category}</p>
          <h1>{product.title}</h1>
          {product.brand && <p>Brand: {product.brand}</p>}
          <p className="product-price">${product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>In stock: {product.stock}</p>
          <p>{product.description}</p>
          <p>{product.description}</p>
          <p>{product.description}</p>
          <button className="add-btn" onClick={() => addToCart(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail