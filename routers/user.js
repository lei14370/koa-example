const Router =require('koa-router');
const auth =require('../middleware/auth');
const router =new Router({prefix:'/user'});

router.get('/userInfo',auth,async(ctx) =>{
    ctx.body={
        success:true,
        message:'查询成功！',
        data:ctx.session.userInfo
    };
})
router.post('/login',async(ctx) =>{
    const {body}=ctx.request;
    ctx.session.userInfo=body;
    ctx.body={
        success:true,
        message:'登陆成功！'
    }
})
module.exports=router;