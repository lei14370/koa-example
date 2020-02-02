const {Server}=require('../app');
class home extends Server{
  constructor(app){
    super(app)
  }
  index(ctx){
    ctx.body='Server index'
  }
}

module.exports=home