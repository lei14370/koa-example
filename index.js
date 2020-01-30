const Koa=require('koa');
//创建koa实例；
const app=new Koa();
//连接MongoDB
const mongoose =require('./models/mongoose');
//redis
const redisClient =require('./middleware/redis');
const redisStore=require('koa-redis');
const warpper=require('co-redis');
const client=warpper(redisClient);//兼容 async
//session鉴权
const session=require('koa-session');
app.keys=['some secret'];//session私钥

const SESSION_CONFIG={
  key : 'lileilei:sess',//名
  maxAge : 8640000,//有效期
  httpOnly : true,// 服务器有效
  signed:true, //签名
  store:redisStore({
    client//session保存到redis
  })
}

app.use(session(SESSION_CONFIG,app));

const bodyparser=require('koa-bodyparser');
app.use(bodyparser());
//静态文件

const static =require('koa-static');
app.use(static(__dirname+'/public'));

//导入路由
const routers=require('./routers');
routers(app);

app.listen(3000);