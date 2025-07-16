import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// URL API back-end
const API_URL = 'http://localhost:5000';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  // 1. Mengambil data produk dari back-end saat komponen dimuat
  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        alert('Gagal memuat produk dari server. Pastikan server backend sudah berjalan.');
      });
  }, []);

  // 2. Fungsi untuk menambahkan produk ke keranjang
  const addToCart = (product) => {
    setCart([...cart, product]);
    setMessage(`${product.name} ditambahkan ke keranjang!`);
    setTimeout(() => setMessage(''), 2000); // Hilangkan pesan setelah 2 detik
  };

  // 3. Fungsi untuk menghitung total harga di keranjang
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toLocaleString('id-ID');
  };
  
  // 4. Fungsi untuk memproses checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang Anda kosong!");
      return;
    }
    
    axios.post(`${API_URL}/api/checkout`, { cartItems: cart })
      .then(response => {
        setMessage(response.data.message);
        setCart([]); // Kosongkan keranjang setelah berhasil
      })
      .catch(error => {
        console.error('Error during checkout:', error);
        setMessage('Checkout gagal, coba lagi.');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>eCommerce</h1>
        {message && <div className="message-popup">{message}</div>}
      </header>
      
      <main className="container">
        <div className="product-list">
          <h2>Daftar Produk</h2>
          <div className="products">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={`${API_URL}${product.image}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Rp {product.price.toLocaleString('id-ID')}</p>
                <button onClick={() => addToCart(product)}>Tambah ke Keranjang</button>
              </div>
            ))}
          </div>
        </div>

        <div className="shopping-cart">
          <h2>Keranjang Belanja</h2>
          {cart.length === 0 ? (
            <p>Keranjang masih kosong.</p>
          ) : (
            <>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>{item.name} - Rp {item.price.toLocaleString('id-ID')}</li>
                ))}
              </ul>
              <hr />
              <h3>Total: Rp {getCartTotal()}</h3>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout Sekarang</button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;