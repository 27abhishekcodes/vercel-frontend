import { Link } from 'react-router';
import './header.css';

export function Header({ cart }) {
  // let totalQuantity = 0;

  // cart.forEach((cartItem) => {
  //   totalQuantity += cartItem.quantity;
  // });
//   console.log(cart, typeof cart);
// const totalQuantity = cart.reduce((total, item) => {
//   return total + item.quantity;
// }, 0);
 const totalQuantity = Array.isArray(cart?.items)
    ? cart.items.reduce((total, item) => total + item.quantity, 0)
    : 0;
  return (
    <div className="header">
      <div className="left-section">
        <Link to="/home" className="header-link">
          <img className="logo"
            src="https://res.cloudinary.com/dhpu6lgrl/image/upload/v1772531153/companylogo_muofq8.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="https://res.cloudinary.com/dhpu6lgrl/image/upload/v1772531759/searchicon_scpbpz.webp" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="https://res.cloudinary.com/dhpu6lgrl/image/upload/v1772531660/carticon_zbvz19.jpg" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}