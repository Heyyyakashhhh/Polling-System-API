const express = require('express')
const app = express();
const mongoose = require('./config/mongoose');
const route = require('./routes/routes')
require('dotenv').config();

app.use(express.json())

app.use('/' , route);

app.listen(process.env.PORT , ()=>{
    console.log(`Server running at port ${process.env.PORT} `)
})