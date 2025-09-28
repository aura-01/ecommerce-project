import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import '../styles/ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const addToCart = async () => {
  try {
    await api.post(`cart/add/${product.id}/`);
    alert('Added to cart!');
  } catch (err) {
    alert('Add to cart failed');
    console.error(err);
  }
};

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="card">
      <h2>{product.name}</h2>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p>{product.description}</p>
      <button onClick={addToCart} disabled={product.stock === 0}>
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
}
