import { Link } from 'react-router'
import { useCart } from '../context/CartContext'

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart()

  if (cartItems.length === 0) {
    return (
      <div>
        <h2>Your cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>Your cart</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />

            <div className="cart-info">
              <h3>{item.title}</h3>
              <p>${item.price}</p>
            </div>

            <div className="qty-controls">
              <button onClick={() => decreaseQuantity(item.id)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>

            <p className="line-total">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button className="clear-btn" onClick={clearCart}>
          Clear cart
        </button>
      </div>
    </div>
  )
}

export default Cart