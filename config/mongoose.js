const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Database connected succsessfully: MongoDB"))
.catch((err)=>{console.log("Database connected succsessfully: MongoDB",err)})

const db = mongoose;
module.exports = db