import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct, getProductById, getProductsCard } from '../controllers/productController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createProduct);
router.get('/', protect, getProducts);
router.get('/card',  getProductsCard);
router.get('/:id', protect, getProductById);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
