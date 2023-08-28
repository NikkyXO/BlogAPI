const express = require('express');

const userRouter = express.Router();


userRouter.post("/register", async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "user registered"
        })
    }catch (error) {
        console.log(error.message);
    }
})

userRouter.post('/login', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "user logged in"
        })
    }catch (error) {
        console.log(error.message);
    }
})   


userRouter.get('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "profile"
        })
    }catch (error) {
        console.log(error.message);
    }
})

userRouter.put('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "profile"
        })
    }catch (error) {
        console.log(error.message);
    }
})

userRouter.delete('/:id', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "profile"
        })
    }catch (error) {
        console.log(error.message);
    }
})

userRouter.get('/', async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "all profile data"
        })
    }catch (error) {
        console.log(error.message);
    }
})

module.exports = userRouter;