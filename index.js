const express = require('express')
const app = express();
const mongoose = require('./config/mongoose');
const route = require('./routes/routes')
require('dotenv').config();

app.use(express.json())


//route connected here
app.use('/' , route);



//server listen here
app.listen(process.env.PORT , ()=>{
    console.log(`Server running at port ${process.env.PORT} `)
})