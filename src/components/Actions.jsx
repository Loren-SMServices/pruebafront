import React, { useState, useEffect } from 'react';
import { addToCart } from '../services/api';
import { useCart } from '../context/CartContext';

const Actions = ({ product }) => {
  const { updateCartCount } = useCart();
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [adding, setAdding] = useState(false);

  // Set default selections
  useEffect(() => {
    if (product.options) {
      if (product.options.storages && product.options.storages.length > 0) {
        setSelectedStorage(product.options.storages[0].code);
      }
      if (product.options.colors && product.options.colors.length > 0) {
        setSelectedColor(product.options.colors[0].code);
      }
    }
  }, [product]);

  const handleAdd = async () => {
    if (!selectedStorage || !selectedColor) return;
    
    setAdding(true);
    try {
      const response = await addToCart(product.id, selectedColor, selectedStorage);
      // The API returns the new total count, or an object containing it
      const newCount = typeof response === 'number' ? response : (response?.count ?? (parseInt(localStorage.getItem('cartCount') || '0') + 1));
      updateCartCount(newCount);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="actions-card glass">
      {/* Storage Selection */}
      <div className="selector-group">
        <label className="selector-label">Storage</label>
        <div className="selector-options">
          {product.options?.storages?.map(storage => (
            <button
              key={storage.code}
              className={`option-btn ${selectedStorage === storage.code ? 'selected' : ''}`}
              onClick={() => setSelectedStorage(storage.code)}
            >
              {storage.name}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="selector-group">
        <label className="selector-label">Color</label>
        <div className="selector-options">
          {product.options?.colors?.map(color => (
            <button
              key={color.code}
              className={`option-btn ${selectedColor === color.code ? 'selected' : ''}`}
              onClick={() => setSelectedColor(color.code)}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>

      {/* Add Button */}
      <button 
        className="add-btn" 
        onClick={handleAdd}
        disabled={adding}
      >
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default Actions;
