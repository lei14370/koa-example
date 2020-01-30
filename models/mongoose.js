const mongoose =require('mongoose');
const env=process.env.NODE_ENV ||'development';
const config = require('../config')[env].mongodb;
//1.连接 
mongoose.connect(config.host,{
  userNewUrlParer:true,
});

const conn=mongoose.connection;

conn.on('error',()=>console.log('MongoDB连接失败！'));
conn.once('open',()=>console.log('MongoDB连接成功！'));