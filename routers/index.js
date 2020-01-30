const user=require('./user');
const routers=[
    user,//用户管理
]
module.exports=function(app){
    routers.forEach(router=>{
        app.use(router.routes())
    })
};