import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById
} from '../controllers/productsController';
import { isAdmin } from '../middleware/isAdmin';
import { get } from 'http';
import upload from '../middleware/upload';

const router = express.Router();

// Public route: anyone can view products
router.get('/', getProducts);
router.get('/:id', getProductById)



// Protected routes: only logged-in users with a valid token can access
router.get('/admin-products', verifyToken, isAdmin, getProducts)
router.post('/', verifyToken, upload.single('image'), createProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);


export default router;
