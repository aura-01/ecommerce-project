import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function EditProduct(){
  const { id } = useParams();
  const [form,setForm]=useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    async function load(){
      try { const res = await api.get(`products/${id}/`); setForm(res.data); } catch(e){ console.error(e); }
    }
    load();
  }, [id]);

  if (!form) return <div>Loading...</div>;

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`products/${id}/`, {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price||0),
        stock: parseInt(form.stock||0),
      });
      navigate('/products');
    } catch (err) { alert('Update failed'); }
  };

  return (
    <div className="card" style={{maxWidth:520}}>
      <h2>Edit Product</h2>
      <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:8}}>
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <input type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
        <input type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} />
        <div style={{display:'flex', gap:8}}>
          <button type="submit">Save</button>
          <button type="button" onClick={()=>navigate('/products')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
