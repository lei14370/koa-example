//静态文件

const static =require('koa-static');
module.exports= ()=>static(__dirname+'/public');