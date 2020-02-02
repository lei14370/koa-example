const Router =require('koa-router');
const router =new Router({prefix:'/api'});
const captcha=require('trek-captcha');

module.exports={
  '/captcha':async(ctx)=>{
    const {token,buffer}=await captcha({size:4});
    ctx.session.captcha=token;
    ctx.body=buffer;
  }
};