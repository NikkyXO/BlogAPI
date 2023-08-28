const express = require('express');
const { 
    createComment, getCommentById,
    updateCommentById, deleteCommentById, 
    getAllComments } = require('../../controllers/comments/commentController');

const commentRouter = express.Router();




commentRouter.post('/create', createComment);

commentRouter.get('/:id', getCommentById);

commentRouter.put('/:id', updateCommentById);;

commentRouter.delete('/:id', deleteCommentById)

commentRouter.get('/', getAllComments);

module.exports = commentRouter;