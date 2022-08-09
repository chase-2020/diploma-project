'use strict';

const Controller = require('egg').Controller;

class CommonController extends Controller {

  echo() {

  }
  async upload() {
    const { ctx } = this;

    try {
      const res = await ctx.service.image.uploadImg();
      ctx.body = res;
      console.log(res);
    } catch (e) {
      ctx.body = { success: false, info: '上传失败' };
      console.log(e);
    }
  }

}

module.exports = CommonController;
