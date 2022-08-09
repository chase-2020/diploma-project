'use strict';

/*
desc: 场馆
params:{
  mid: '场馆运营商编号',
  type: '场馆类型',
  name: '场馆名字',
};
*/

const Controller = require('egg').Controller;

class courtController extends Controller {

  // 查询单个运营商的所有场馆
  async courtfindAll() {
    const { ctx } = this;
    const { mid, type, name } = ctx.request.body;
    const where = {}; // 查询条件
    if (mid) where.mid = mid;
    if (type) where.type = type;
    if (name) where.name = name;
    try {
      const res = await ctx.model.Court.findAll({
        where, // 查询条件
      });
      ctx.body = res;
      console.log('所有场馆', res);
    } catch (e) {
      ctx.body = { success: false, info: '异常错误!' };
    }
  }
}

module.exports = courtController;
