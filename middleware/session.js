

module.exports=(app)=>{
  //redis
  const redis =require('redis');
  const env = process.env.NODE_ENV || 'development';
  const config = require('../config')[env].redis;
  const redisClient=redis.createClient(config.port,config.host);
  const redisStore=require('koa-redis');
  const warpper=require('co-redis');
  const client=warpper(redisClient);//兼容 async
  //session鉴权
  const session=require('koa-session');
  app.$app.keys=['some secret'];//session私钥

  const SESSION_CONFIG={
    key : 'lileilei:sess',//名
    maxAge : 8640000,//有效期
    httpOnly : true,// 服务器有效
    signed:true, //签名
    store:redisStore({
      client//session保存到redis
    })
  }
  return session(SESSION_CONFIG,app.$app); 
}