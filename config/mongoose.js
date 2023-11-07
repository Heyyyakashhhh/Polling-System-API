const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/polling-system-api")
.then(()=>console.log("Database connected succsessfully: MongoDB"))
.catch((err)=>{console.log("Database connected succsessfully: MongoDB",err)})

const db = mongoose;
module.exports = db