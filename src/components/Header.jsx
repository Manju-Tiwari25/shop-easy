import { Link, NavLink } from 'react-router'
import { useCart } from '../context/CartContext'

function Header() {
  const { totalItems } = useCart()

  return (
    <header className="header">
      <div className="container header-inner">
        <h1>
          <Link to="/">ShopEasy</Link>
        </h1>

        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/cart">Cart ({totalItems})</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header