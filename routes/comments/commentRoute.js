const express = require('express');

const commentRouter = express.Router();




commentRouter.post('/create', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "comment created"
        })
    }catch (error) {
        console.log(error.message);
    }
})   


commentRouter.get('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "comment fetched"
        })
    }catch (error) {
        console.log(error.message);
    }
})

commentRouter.put('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "comment updated"
        })
    }catch (error) {
        console.log(error.message);
    }
})

commentRouter.delete('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "comment deleted"
        })
    }catch (error) {
        console.log(error.message);
    }
})

commentRouter.get('/', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "all comments data"
        })
    }catch (error) {
        console.log(error.message);
    }
})

module.exports = commentRouter;