import { Link } from 'react-router'
import { useCart } from '../context/CartContext'

function ProductCard({ id, title, price, category, rating, thumbnail }) {
  const { addToCart } = useCart()

  return (
    <div className="product-card">
      <Link to={`/products/${id}`} className="card-link">
        <img src={thumbnail} alt={title} />
        <p className="product-category">{category}</p>
        <h3>{title}</h3>
        <p className="product-price">${price}</p>
        <p>Rating: {rating}</p>
      </Link>

      <button
        className="add-btn"
        onClick={() => addToCart({ id, title, price, thumbnail })}
      >
        Add to cart
      </button>
    </div>
  )
}

export default ProductCard