const redis =require('redis');
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env].redis;
const redisClient=redis.createClient(config.port,config.host);

module.exports=redisClient;