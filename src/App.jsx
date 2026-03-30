import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductListPage from './views/ProductListPage';
import ProductDetailsPage from './views/ProductDetailsPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <main style={{ padding: '2rem 0' }}>
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="*" element={<div className="container">Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
