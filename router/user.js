const auth =require('../middleware/auth');
var md5 = require('blueimp-md5');
// token鉴权
const jwt =require('jsonwebtoken');
const jwtAuth=require('koa-jwt');
const secret='re';

//koa 上传
const multer=require('koa-multer')
//文件上传
//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({ storage: storage });
module.exports=app=>({
  "/upload":{
    method:'post',
    middleware:upload.single('file'),
    handler:async(ctx,next)=>{
      ctx.body = {
          filename: ctx.req.file.filename//返回文件名
      }
  }
  },
  '/userInfo-token':{
    method:'get',
    middleware:jwtAuth({secret}),
    handler:async(ctx) =>{
      ctx.body={
          success:true,
          data:ctx.state.user.data,
          message:'查询成功！'
      };
  }
  },
  '/login-token':{
    method:'post',
    handler:async(ctx) =>{
      const {body}=ctx.request;
      body.password=md5(md5(body.password),body.username);
      const userInfo=await app.$model.user.findOne({username:body.username});
      if(userInfo&&body.password===userInfo.password){
          const{password,...userInfoData}=userInfo;
          ctx.session.userInfo=userInfoData;
          ctx.body={
              success:true,
              message:'登陆成功！',
              data:{
                  userInfoData,
                  token:jwt.sign({
                      data:userInfo,
                      exp:Math.floor(Date.now()/1000)+60*60,
                  }, secret)
              }
          }
      }else{
          ctx.body={
              success:false,
              message:'用户名或密码错误'
          }  
      }
    }
  },
  '/userInfo':{
    middleware:auth,
    handler:async(ctx) =>{
      ctx.body={
          success:true,
          data:ctx.session.userInfo,
          message:'查询成功！'
      };
  }
  },
  '/logout':{
    method:'post',
    handler:async(ctx) =>{
      delete ctx.session.userInfo;
      ctx.body={
          success:true,
          message:'注销成功！'
      };
  }
  },
  '/login':{
    method:'post',
    handler:async(ctx) =>{
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
  }
  },
  '/register':{
    method:'post',
    handler:async(ctx) =>{
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
  },
}
});