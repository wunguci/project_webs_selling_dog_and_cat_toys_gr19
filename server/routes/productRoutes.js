import express from 'express';
import {
    getAllProducts,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsSale
    searchProducts,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/search', searchProducts);
router.get('/', getAllProducts);
router.get("/sales", getProductsSale)
router.get('/:slug', getProductByName);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


export default router;