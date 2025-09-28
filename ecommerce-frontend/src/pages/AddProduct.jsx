import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AddProduct(){
  const [form,setForm]=useState({name:'',description:'',price:'',stock:''});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('products/', {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price||0),
        stock: parseInt(form.stock||0),
      });
      navigate('/products');
    } catch (err) { alert('Create failed'); }
  };

  return (
    <div className="card" style={{maxWidth:520}}>
      <h2>Add Product</h2>
      <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:8}}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
        <input placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} />
        <div style={{display:'flex', gap:8}}>
          <button type="submit">Create</button>
          <button type="button" onClick={()=>navigate('/products')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
