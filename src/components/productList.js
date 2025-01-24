import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../lib/fetchProducts';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {products.map((product) => (
        <div key={product._id} style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
          <img
            src={product.productImage.asset._ref.replace('image-', 'https://cdn.sanity.io/images/t2nykucn/production/').replace('-webp', '.webp')}
            alt={product.title}
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
          />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          {product.isNew && <span style={{ color: 'green' }}>New!</span>}
        </div>
      ))}
    </div>
  );
}
