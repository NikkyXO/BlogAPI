const express = require('express');

const categoryRouter = express.Router();




categoryRouter.post('/create', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "category created"
        })
    }catch (error) {
        console.log(error.message);
    }
})   


categoryRouter.get('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "category fetched"
        })
    }catch (error) {
        console.log(error.message);
    }
})

categoryRouter.put('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "category updated"
        })
    }catch (error) {
        console.log(error.message);
    }
})

categoryRouter.delete('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "category deleted"
        })
    }catch (error) {
        console.log(error.message);
    }
})

categoryRouter.get('/', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "all categories data"
        })
    }catch (error) {
        console.log(error.message);
    }
})

module.exports = categoryRouter;