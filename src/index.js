import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.css';
import './styles/app.css';
import AuthProvider from './provider/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import CartProvider from './provider/CartProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProvider>
      <CartProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CartProvider>
    </AuthProvider>
  </Router>
);