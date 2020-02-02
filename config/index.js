module.exports={
  development:{
    db:{
      host: 'mongodb://localhost:27017/test',
    },
    redis:{
      port:6379,
      host:'localhost'
    },
    middleware:[
      'bouncer',
      'cors',
      'session',
      'bodyparser',
      'static',
    ],
},

}