const mongoose =require('mongoose');

const schema=mongoose.Schema({
  username:String,
  password:String,
  email:String,
  nickname:String,
  phone:String, 
})

module.exports=mongoose.model('USER',schema);