import express from 'express';
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryByType
} from '../controllers/categoryController.js'

const router = express.Router();

router.get('/', getAllCategories);
// router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.get("/:slug_type", getCategoryByType);

export default router;