const express = require('express');
const { createPost } = require('../../controllers/posts/postController');
const { getPostById } = require('../../controllers/posts/postController');
const { updatePostById } = require('../../controllers/posts/postController');
const { deletePostById } = require('../../controllers/posts/postController');
const { getAllPosts } = require('../../controllers/posts/postController');

const postRouter = express.Router();




postRouter.post('/create', createPost);


postRouter.get('/:id', getPostById);

postRouter.put('/:id', updatePostById);

postRouter.delete('/:id', deletePostById);

postRouter.get('/', getAllPosts);

module.exports = postRouter;