import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductItem from '../components/ProductItem';
import Search from '../components/Search';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const search = searchTerm.toLowerCase();
    return (
      product.brand.toLowerCase().includes(search) ||
      product.model.toLowerCase().includes(search)
    );
  });

  if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading products...</div>;

  return (
    <div className="container">
      <div className="search-bar">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
