const mongoose =require('mongoose');

const schema=mongoose.Schema({
  username:{
    type:String,
    unique:true,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  email:String,
  nickname:String,
  phone:String,
  updateTime: { type: Date, default: Date.now },
})

module.exports=mongoose.model('USER',schema);