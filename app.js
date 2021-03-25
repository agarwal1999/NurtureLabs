require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const adminPage = require('./admin');
const userPage = require('./user');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/nurtureDB'

mongoose.connect(dbURl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

app.use('/admin', adminPage);
app.use('/user', userPage);

app.use('/', (req, res) => {
    res.send('All good');
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started on port 3000")
});