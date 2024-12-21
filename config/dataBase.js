const mongoose = require("mongoose");

module.exports.config = ()=>{
   try {
    
    mongoose.connect(process.env.MONGO_URL)
    console.log("connect sussesc!");
    
   } catch (error) {

    console.log("connect error");
    
   }
}