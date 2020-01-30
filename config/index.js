module.exports={
  production:{
    mongodb:{
      host: 'mongodb://localhost:27017/test',
    },
    redis:{
      port:6379,
      host:'localhost'
    },
  },
  development:{
    mongodb:{
      host: 'mongodb://localhost:27017/test',
    },
    redis:{
      port:6379,
      host:'localhost'
    },
  },
  test:{
    mongodb:{
      host: 'mongodb://localhost:27017/test',
    },
    redis:{
      port:6379,
      host:'localhost'
    },
  }
}