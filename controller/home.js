const {Controller}=require('../app');
class home extends Controller{
  constructor(app){
    super(app)
  }
  index=(ctx)=>{
    this.$server.home.index(ctx);
  }
}

module.exports=home