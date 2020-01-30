module.exports=async (ctx,next)=>{
  const {session}=ctx;
  const {userInfo}=session;
  if(!userInfo){
    ctx.body={
      success:false,
      message:'用户未登录'
    }
  }else{
    await next()
  }
}