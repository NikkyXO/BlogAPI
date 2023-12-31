const express = require('express');
const userRouter = require('./routes/users/userRoute');
const postRouter = require('./routes/posts/postRoute');
const commentRouter = require('./routes/comments/commentRoute');
const categoryRouter = require('./routes/categories/categoryRoute');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const notFoundErrorHandler = require('./middlewares/notFoundErrorHandler');
const isAdmin = require('./middlewares/isAdmin');
require('dotenv').config();
require("./config/dbConnect");


const app = express();



// MiddleWares

app.use(express.json()); //pass incoming payload

// app.use(isAdmin)

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/categories", categoryRouter);


// Error Handlers middleware  BlogAPI_db
app.use(globalErrorHandler);

// 404 Error Handler
app.use("*", notFoundErrorHandler);

// Listen Server
const PORT = process.env.PORT | 9000;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`));