import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input'; 
import { AlertCircle } from 'lucide-react';
import { AuthContext } from '../AuthContext'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const EditProductForm = () => {
  const { token, isLoggedIn } = useContext(AuthContext);
  const { id } = useParams();
  
  const [productCode, setProductCode] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id && isLoggedIn) {
        setLoading(true);  
        try {
          const response = await axios.get(`http://localhost:5000/products/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
          setProductCode(response.data.pd_code);
          setCategory(response.data.pd_ct_id._id);
          setName(response.data.pd_name);
          setPrice(response.data.pd_price.toString());
        } catch (err) {
          setError('Gagal mengambil data produk');
        } finally {
          setLoading(false);  
        }
      }
    };
  
    fetchProduct(); 
  }, [id, token, isLoggedIn]);
  
  
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setCategories(response.data);
      } catch (err) {
        setError('Gagal mengambil data kategori');
        console.error(err);
      }
    };

    fetchCategories(); 
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      if (!productCode || !category || !name || !price) {
        throw new Error('Semua field harus diisi');
      }
  
      if (!isLoggedIn || !token) {
        throw new Error('Anda harus login untuk melakukan tindakan ini');
      }
  
      const submitData = {
        pd_code: productCode,
        pd_ct_id: category,
        pd_name: name,
        pd_price: parseFloat(price),
      };
  
      await axios.put(`http://localhost:5000/products/${id}`, submitData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert('Produk berhasil disimpan!');
      navigate('/manage-products')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Gagal menyimpan produk');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      {loading ? (
        <div className="text-center">Loading...</div> 
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{id ? 'Edit Produk' : 'Tambah Produk'}</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Kode Produk</label>
            <Input
              type="text"
              name="productCode"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              className="w-full"
              placeholder="Masukkan kode produk"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Kategori</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="" disabled>Pilih kategori</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.ct_name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Nama Produk</label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              placeholder="Masukkan nama produk"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Harga</label>
            <Input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
              placeholder="Masukkan harga produk"
              min="0"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan Produk'}
          </Button>
        </form>
        </>
      )}
    </div>
  );
};

export default EditProductForm;
