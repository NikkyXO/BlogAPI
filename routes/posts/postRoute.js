const express = require('express');

const postRouter = express.Router();




postRouter.post('/create', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "post created"
        })
    }catch (error) {
        console.log(error.message);
    }
})   


postRouter.get('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "post fetched"
        })
    }catch (error) {
        console.log(error.message);
    }
})

postRouter.put('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "post updated"
        })
    }catch (error) {
        console.log(error.message);
    }
})

postRouter.delete('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "post deleted"
        })
    }catch (error) {
        console.log(error.message);
    }
})

postRouter.get('/', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "all posts data"
        })
    }catch (error) {
        console.log(error.message);
    }
})

module.exports = postRouter;