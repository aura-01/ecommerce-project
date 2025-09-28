import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'; // Make sure Link is imported
import api from '../services/api';
import '../styles/ProductList.css';

export default function ProductList(){
  const [products,setProducts]=useState([]);

  async function load(){ 
    try { const res = await api.get('products/'); setProducts(res.data); } catch (e){ console.error(e); }
  }
  useEffect(()=>{ load(); }, []);

  const remove = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`products/${id}/`); setProducts(p=>p.filter(x=>x.id!==id)); } catch(e){ alert('Delete failed'); }
  };

  return (
    <div>
      <div>
        <h1>Products</h1>
        <Link to="/products/add">Add Product</Link>
      </div>
      <div className="card">
        <table>
          <thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p=>(
              <tr key={p.id} style={{borderTop:'1px solid #eee'}}>
                {/* MODIFICATION IS HERE:
                  The product name is now a clickable link to its details page.
                */}
                <td><Link to={`/products/${p.id}`}>{p.name}</Link></td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <Link to={`/products/edit/${p.id}`}>Edit</Link>
                  {' | '}
                  <button onClick={()=>remove(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {products.length===0 && <tr><td colSpan="4" style={{padding:12}}>No products.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}