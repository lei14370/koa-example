const Koa=require('koa');
const {routerInit,controllerInit,serverInit,initSchedule,loadConfig}=require('./loader');
class App{
  constructor(conf){
    this.$app=new Koa(conf);
    loadConfig(this);
    this.$server=serverInit(this);
    this.$ctrl=controllerInit(this);
    this.$router=routerInit(this)
    this.$app.use(this.$router.routes());
    initSchedule()
  }
  listen(port,cb){
    this.$app.listen(port,(err)=>{
      if(!err){
        console.log(`app启动成功，端口${port}`);
      }
      if(typeof cd ==='function'){
        cb(arguments);
      }
    });
  }
}

class Controller{
  constructor(app){
    this.$app=app.$app;
    this.$server=app.$server;
    this.$model=app.$model;
  }
}
class Server{
  constructor(app){
    this.$app=app.$app;
    this.$model=app.$model;
  }
}
module.exports={
  App,
  Controller,
  Server,
}
