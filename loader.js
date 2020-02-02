const path=require('path');
const fs=require('fs');
const Router=require('koa-router');
const mongoose =require('mongoose');
const env=process.env.NODE_ENV ||'development';

function loaderFiles(dir,cb){
  const src=path.resolve(__dirname+'/'+dir);
  console.log(`......正在加载文件夹：`+src);
  try{
    const files=fs.readdirSync(src);
    console.log(`......正在加载文件：`,files);
    files.forEach((file)=>{
      const fileName=file.replace('.js',"");
      const file_opt=require(src+"/"+fileName);
      cb(fileName,file_opt);
    })
  }catch(err){
    console.log(err);
  }
}

function routerInit(app){
  const router=new Router();
  loaderFiles('router',(fileName,routes)=>{
    // 路由类型判断
    routes = typeof routes === 'function' ? routes(app) : routes
    Object.keys(routes).forEach(path=>{
      let method='get',route=routes[path],middleware;
      if(Object.prototype.toString.apply(route)==='[object Object]'){
        method=route.method||'get';
        middleware=route.middleware
        route=route.handler;
      }
      const prefix=fileName==='index'?'':`/${fileName}`;
      //注册路由
      console.log(`正在映射地址 ${method.toLocaleUpperCase()} ${prefix}${path}`)
      if(middleware){
        router[method.toLocaleLowerCase()](prefix+path,middleware,route)
      }else{
        router[method.toLocaleLowerCase()](prefix+path,route)
      }
    })
  })
  return router;
}
function controllerInit(app){
  const controllers={};
  loaderFiles('controller',(fileName,Controller)=>{
   controllers[fileName]=new Controller(app);
  })
  return controllers;
}
function serverInit(app){
  const servers={};
  loaderFiles('server',(fileName,Server)=>{
    servers[fileName]=new Server(app);
  })
  return servers;
}
function loadConfig(app) {
    loaderFiles('config', (filename, file_opt) => {
        const conf=file_opt[env];
        if (conf.db) {
          const config=conf.db;
          //1.连接 
          mongoose.connect(config.host,{
            useNewUrlParser:true,
            useUnifiedTopology: true
          });

          app.$conn=mongoose.connection;

          app.$conn.on('error',()=>console.log('MongoDB连接失败！'));
          app.$conn.once('open',()=>console.log('MongoDB连接成功！'));

          // 加载模型
          app.$model = {}
          loaderFiles('model', (filename, model) => {
              app.$model[filename] = model
          })
        }

        if (conf.middleware) {
            conf.middleware.forEach(mid => {
                const midPath = path.resolve(__dirname, 'middleware', mid);
                console.log('......注册中间件:',mid)
                try{
                  const middleware=require(midPath)(app);
                  app.$app.use(middleware)
                  console.log('......注册中间件:',mid,'加载成功！')
                }catch(error) {
                  console.error(error)
                }
            })
        }
    })
}

const schedule = require('node-schedule')
function initSchedule() {
  loaderFiles('schedule', (filename, scheduleConfig) => {
        schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
  })
}
module.exports={
  routerInit,
  controllerInit,
  serverInit,
  initSchedule,
  loadConfig
}
// loaderFiles('router',(name,file_opt)=>{
//   console.log(name,file_opt)
// })