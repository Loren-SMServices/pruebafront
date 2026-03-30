import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartCount } = useCart();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const pathParts = location.pathname.split('/').filter(p => p !== '');

  return (
    <header className="glass">
      <div className="container header-content">
        <Link to="/" className="logo">
           GADGET STORE
        </Link>

        <div className="cart-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span>{cartCount}</span>
        </div>
      </div>
      
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Home</Link>
          {!isHome && (
            <>
              <span className="breadcrumb-separator"> / </span>
              {pathParts[0] === 'product' ? (
                <span className="breadcrumb-active">Product Details</span>
              ) : (
                <span className="breadcrumb-active">{pathParts[0]}</span>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
