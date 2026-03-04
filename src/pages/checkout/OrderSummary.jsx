import { formatMoney } from '../../utils/money';
import './ordersummery.css';
export function OrderSummary({ cart}) {
  return (
    <div className="order-summary">
      <div>cart summery</div>
      {cart?.items?.map((cartItem) => {

        return (
          <div key={cartItem.productId} className="cart-item-container">
            

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={cartItem.product.image} />

              <div className="cart-item-details">
                <div className="product-name">
                  {cartItem.product.name}
                </div>
                <div className="product-price">
                  {formatMoney(cartItem.product.price)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  
                </div>
              </div>

             
            </div>
          </div>
        );
      })}
    </div>
  );
}