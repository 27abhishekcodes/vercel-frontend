import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect, Fragment } from 'react';
import { Header } from '../../components/Header';
import { formatMoney } from '../../utils/money';
import './OrdersPage.css';

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('https://vercel-backend-new.onrender.com/api/orders/fetchorder', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setOrders(response.data);
    })
    .catch((error) => {
      console.error('Failed to fetch orders:', error);
    });
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-container">

              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(order.placedAt).format('MMMM D, YYYY')}</div>
                  </div>

                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{formatMoney(order.totalCostCents)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.items.map((item) => (
                  <Fragment key={item.id}>
                    <div className="product-image-container">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="product-details">
                      <div className="product-name">
                        {item.name}
                      </div>

                      <div className="product-quantity">
                        Quantity: {item.quantity}
                      </div>

                      <div className="product-price">
                        Price: {formatMoney(item.priceCents)}
                      </div>

                      <button className="buy-again-button button-primary">
                        <img
                          className="buy-again-icon"
                          src="/images/icons/buy-again.png"
                          alt="Buy again"
                        />
                        <span className="buy-again-message">
                          Add to Cart
                        </span>
                      </button>
                    </div>

                    <div className="product-actions">
                      <button className="track-package-button button-secondary">
                        Track package
                      </button>
                    </div>
                  </Fragment>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
