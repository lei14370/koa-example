//表单检验 中间件
const bouncer=require('koa-bouncer');
module.exports=()=>bouncer.middleware();