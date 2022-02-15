const express = require('express');
const userRouter = require('./routes/User');
const categorieRouter = require('./routes/Categorie');
const loginRouter = require('./routes/Login');
const postRouter = require('./routes/Post');

const errorMidleware = require('./Middlewares/error');

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/categories', categorieRouter);
app.use('/login', loginRouter);
app.use('/post', postRouter);
app.use(errorMidleware);

module.exports = app;