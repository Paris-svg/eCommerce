const express = require('express');
const cors = require('cors');
const path = require('path'); // Tambahkan ini

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ LANGKAH 3: Sajikan file statis dari folder 'public'
app.use(express.static('public'));

// Data produk dengan penamaan yang konsisten
const products = [
  { id: 1, name: 'Laptop Gaming', price: 15000000, image: '/image/laptop.jpeg' },
  { id: 2, name: 'Mouse Gaming', price: 500000, image: '/image/mouse.jpeg' },
  { id: 3, name: 'Keyboard Mekanikal', price: 800000, image: '/image/keyboard.jpeg' },
  { id: 4, name: 'Monitor 24 inch', price: 2500000, image: '/image/monitor.jpeg' },
];

// API Endpoints
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/checkout', (req, res) => {
  const { cartItems } = req.body;
  console.log("Menerima pesanan untuk item:", cartItems);

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: 'Keranjang belanja kosong!' });
  }

  console.log("Pesanan berhasil diproses!");
  res.status(200).json({ message: 'Checkout berhasil! Terima kasih telah berbelanja.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`);
});