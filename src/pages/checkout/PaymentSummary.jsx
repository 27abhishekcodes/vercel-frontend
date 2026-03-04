import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { formatMoney } from '../../utils/money';

export function PaymentSummary({ cart, paymentSummary, loadCart }) {
  
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async () => {
     console.log("BUTTON CLICKED");
    if (!cart?.items?.length) return;

    try {
      setIsPlacingOrder(true);
      setError(null);
      console.log(cart.items)
      // Prepare order data
      const orderData = {
        items: cart.items.map(item => ({
          product: item.product._id,
          name: item.product.name,
          priceCents: item.product.priceCents,
          quantity: item.quantity,
          image: item.product.image,
        })),
        shippingCostCents: paymentSummary.shippingCostCents,
        taxCents: paymentSummary.taxCents,
        totalCostCents: paymentSummary.totalCostCents,
        paymentMethod: 'card', // or dynamic from user selection
        shippingAddress: cart.shippingAddress, // make sure this exists in your cart
      };

      // Send to backend
      const token = localStorage.getItem('token');
      console.log(token)

      await axios.post('https://vercel-backend-new.onrender.com/api/orders/makeorder', orderData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
            });

      
      await axios.delete('https://vercel-backend-new.onrender.com/api/cart/clear',{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
            })
            // Clear or reload cart
      await loadCart();
      // Navigate to orders page
      navigate('/orders');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Failed to place order. Try again.'
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">
        Payment Summary
      </div>

      {paymentSummary ? (
        <>
          <div className="payment-summary-row">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="place-order-button button-primary"
            onClick={createOrder}
            disabled={isPlacingOrder || !cart?.items?.length}
          >
            {isPlacingOrder ? 'Placing order...' : 'Place your order'}
          </button>
        </>
      ) : (
        <p>No items in your cart.</p>
      )}
    </div>
  );
}

//isPlacingOrder || !cart?.items?.length
