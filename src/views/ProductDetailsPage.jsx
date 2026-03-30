import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductDetails } from '../services/api';
import Actions from '../components/Actions';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getProductDetails(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading product details...</div>;
  if (!product) return <div className="container" style={{ padding: '2rem' }}>Product not found.</div>;

  return (
    <div className="container">
      <Link to="/" className="back-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Products
      </Link>

      <div className="pdp-container">
        {/* Column 1: Image */}
        <div className="detail-img-container glass">
          <img src={product.imgUrl} alt={product.model} className="detail-img" />
        </div>

        {/* Column 2: Information & Actions */}
        <div className="detail-info">
          <div className="product-brand">{product.brand}</div>
          <h1>{product.model}</h1>
          <div className="product-price" style={{ fontSize: '1.5rem' }}>{product.price} €</div>

          <div className="spec-list">
            <div className="spec-item">
              <span className="spec-label">CPU</span>
              <span className="spec-value">{product.cpu || 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">RAM</span>
              <span className="spec-value">{product.ram || 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">OS</span>
              <span className="spec-value">{product.os || 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Display</span>
              <span className="spec-value">{product.displayResolution || 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Battery</span>
              <span className="spec-value">{product.battery || 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Main Camera</span>
              <span className="spec-value">
                {Array.isArray(product.primaryCamera) ? product.primaryCamera.join(', ') : product.primaryCamera || 'N/A'}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Selfie Camera</span>
              <span className="spec-value">
                {Array.isArray(product.secondaryCmera) ? product.secondaryCmera.join(', ') : product.secondaryCmera || 'N/A'}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Dimensions</span>
              <span className="spec-value">{product.dimentions || 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Weight</span>
              <span className="spec-value">{product.weight || 'N/A'}</span>
            </div>
          </div>

          <Actions product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
