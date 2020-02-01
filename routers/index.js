const user=require('./user');
const api=require('./api');
const routers=[
    user,//用户管理
    api,//通用接口
]
module.exports=function(app){
    routers.forEach(router=>{
        app.use(router.routes())
    })
};