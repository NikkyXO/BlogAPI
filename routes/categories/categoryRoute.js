const express = require('express');
const { 
    createCategory, getCategoryById, 
    updateCategoryById, deleteCategoryById, 
    getAllCategories } = require('../../controllers/categories/categoryController');

const categoryRouter = express.Router();


categoryRouter.post('/create', createCategory);  

categoryRouter.get('/:id', getCategoryById);

categoryRouter.put('/:id', updateCategoryById);

categoryRouter.delete('/:id', deleteCategoryById);

categoryRouter.get('/', getAllCategories);

module.exports = categoryRouter;