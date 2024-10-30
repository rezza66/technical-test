import express from 'express';
// import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../models/Order.js';

const router = express.Router();

// Tambah data dummy untuk Users
router.get('/addUsers', async (req, res) => {
  const user = new User({
    us_id: "1",
    us_name: "John Doe",
    us_password: "password123",
    us_email: "john@example.com",
    us_phone_number: "08123456789",
    us_address: "123 Example Street",
    us_created_at: new Date(),
    us_updated_at: new Date()
  });
  await user.save();
  res.send('User added');
});

export default router;
