const Router =require('koa-router');
const auth =require('../middleware/auth');
const router =new Router({prefix:'/user'});
const User=require('../models/user');
var md5 = require('blueimp-md5');
router.get('/userInfo',auth,async(ctx) =>{
    ctx.body={
        success:true,
        data:ctx.session.userInfo,
        message:'查询成功！'
    };
})
router.post('/logout',auth,async(ctx) =>{
    delete ctx.session.userInfo;
    ctx.body={
        success:true,
        message:'注销成功！'
    };
})
router.post('/login',async(ctx) =>{
    const {body}=ctx.request;
    body.password=md5(md5(body.password),body.username);
    const userInfo=await User.findOne({username:body.username});
    if(userInfo&&body.password===userInfo.password){
        ctx.session.userInfo=userInfo;
        ctx.body={
            success:true,
            message:'登陆成功！'
        }
    }else{
        ctx.body={
            success:false,
            message:'用户名或密码错误'
        }  
    }
})
router.post('/register',async(ctx) =>{
    const {body}=ctx.request;
    body.username=body.phone;
    body.password=md5(md5(body.password),body.username);
    const user=new User(body);
    try{
        await user.save();
        ctx.body={
            success:true,
            message:'注册成功！'
        }
    } catch(err){
        ctx.body={
            success:true,
            message:err.errmsg
        }
    }
})
module.exports=router;