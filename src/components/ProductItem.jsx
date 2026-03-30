import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card glass" onClick={() => navigate(`/product/${product.id}`)}>
      <img src={product.imgUrl} alt={product.model} className="product-img" loading="lazy" />
      <div className="product-brand">{product.brand}</div>
      <div className="product-model">{product.model}</div>
      <div className="product-price">{product.price} €</div>
    </div>
  );
};

export default ProductItem;
