import axios from 'axios';
import { useState, useEffect } from 'react';
import { OrderSummary } from './OrderSummary';
import { useNavigate } from 'react-router';
import { Header } from '../../components/Header';
import { PaymentSummary } from './PaymentSummary';
import './checkout-header.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart, loadCart }) {



const paymentSummary = cart && cart.items ? (() => {

  const totalItems = cart?.items?.reduce(
  (sum, item) => sum + Number(item.quantity || 0),
  0
) || 0;

    const productCostCents = cart.items.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    );

    const shippingCostCents = productCostCents > 5000 ? 0 : 500; 
    // Example:
    // Free shipping over $50
    // Otherwise $5

    const totalCostBeforeTaxCents =
      productCostCents + shippingCostCents;

    const taxCents = Math.round(
      totalCostBeforeTaxCents * 0.1
    ); // 10% tax

    const totalCostCents =
      totalCostBeforeTaxCents + taxCents;

    return {
      totalItems,
      productCostCents,
      shippingCostCents,
      totalCostBeforeTaxCents,
      taxCents,
      totalCostCents
    };

  })() : null;



  return (
    <>
      <title>Checkout</title>
      <>
      <Header cart={cart} />
      <div className="checkout-page">
      <div className="checkout-layout">
        <OrderSummary cart={cart} />

        <PaymentSummary
          paymentSummary={paymentSummary}
          cart={cart}
          loadCart={loadCart}
        />
      </div>
      </div>
    </>


  

    </>
  );
}