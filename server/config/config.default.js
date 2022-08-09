/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1628473695881_3197';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  // 模板渲染引擎的配置
  config.view = {
    mapping: { // mapping 配置模板的遍历规则
      '.nj': 'nunjucks', // 指定所有的.nj后缀的文件都是用nunjucks模板引擎解析
    },
    defaultViewEngine: 'nunjucks', // 配置默认的模板引擎为nunjucks
  };


  // 配置redis，高速内存缓存工具
  config.redis = {
    client: {
      port: 6379, // 端口 默认 6379
      host: '127.0.0.1', // 地址
      password: '', //  密码
      db: 0, // 0 - 12 选一个
    },
  };


  // egg跨域问题
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE,PATCH',
  };


  config.security = {

    csrf: {
      enable: false, // 关闭csrf检验
    },
  };


  // 数据库连接
  config.sequelize = {
    dialect: 'mysql',
    host: 'rm-wz90e3s4v5a2sn54vuo.mysql.rds.aliyuncs.com',
    port: 3306,
    database: 'fpz',
    username:'hjd',
    password:'XIAOming2022',
    timezone: '+08:00',
    define:{//其他通用配置
      underscored:false,//禁止自动把由下划线的表名转成驼峰表名
      freezeTableName:true,//冻结表名，如果是true 它会自动的加上负数 user->users
      timestamps:true,//时间戳记录，如果是true  它会自动关联 updateAt 和  createAt字段
      }
  }

  // egg上传图片到阿里云oss(开始)
  // 图片上传
  config.oss = {
    client: {
      accessKeyId: 'LTAI4G4YMUZnnaKcSZTSvb8Q', // 阿里云账号
      accessKeySecret: 'FaCRX0mW5arsRdgBBNM053kX3l9sRu',
      bucket: 'img1775',
      endpoint: 'oss-cn-shenzhen.aliyuncs.com',
      timeout: '80s',
    },
    timezone: '+08:00'
  };


  // 启用Flie文件模式
  config.multipart = {
    mode: 'file',
    fileExtensions: [ '.pdf', 'doc', 'docx', 'pptx', 'xls', 'xlsx', 'epub', 'apk', 'jpeg' ], // 增加对 apk 扩展名的文件支持
    fileSize: '200mb',
    fields: 300,
  };

  config.sms = {
    client: {
      accessKeyId: 'LTAI4G4YMUZnnaKcSZTSvb8Q',
      secretAccessKey: 'FaCRX0mW5arsRdgBBNM053kX3l9sRu',
    },
  };

  config.mp ={
    appId: 'wx66d998e8283629b9', // 公众平台应用编号
    appSecret: '2a1a71dcbab27f8c27bb6eefba27f1a5', // 公众平台应用密钥
    mchId: '', // 商户平台商家编号
    apiKey: '', // 商户支付密钥
    notifyUrl: '' // 支付结果回调地址
  };

  return {
    ...config,
    ...userConfig,
  };
};
