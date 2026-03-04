import axios from 'axios';
import { Routes, Route } from 'react-router';
import { useState, useEffect } from 'react';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { AuthForm } from './pages/login/AuthForm';
import './App.css'
import SellerDashboard from './pages/sellerpage/sellerdashboard';


function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get('https://vercel-backend-new.onrender.com/api/cart/',{
      headers: {
      Authorization: `Bearer ${token}`,
    },
    });
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<AuthForm/>}/>
      <Route path="home" element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="sellerdash" element={<SellerDashboard/>} />

    </Routes>
  )
}

export default App
