'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  cors: {
    package: 'egg-cors',
    enable: true,
  },
  oss:{
    enable:true,
    package:'egg-oss'
  },
  sms:{
    enable: true,
    package: 'egg-sms'
  },
  mp:{
    enable: true,
    package: 'egg-mp',
  }
};
