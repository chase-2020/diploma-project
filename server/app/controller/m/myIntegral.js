'use strict';


/*
    author: jack
    desc: 我的积分
    params:{};
    data:2021-08-16
*/

const Controller = require('egg').Controller;

class myIntegralController extends Controller {


  //  我的积分(增)
  async jfadd() {

    const { ctx } = this;
    const { uid, totalIntegral, time, getIntegral } = ctx.request.body;

    // 数据过滤


    try {
      await ctx.model.MyIntegral.create({
        uid, totalIntegral, time, getIntegral,
      });

      ctx.body = { success: true, errCode: '' };

    } catch (e) {

      ctx.body = { success: false, errCode: 3002 };// 3002数据错误
    }

  }

  // 修改
  async modify() {

    const { ctx } = this;
    const { uid, totalIntegral, time, getIntegral } = ctx.request.body;

    const updateData = {};
    const where = {};
    if (uid) where.uid = uid;

    if (totalIntegral) updateData.totalIntegral = totalIntegral;
    if (time) updateData.time = time;
    if (getIntegral) updateData.getIntegral = getIntegral;


    // 数据过滤


    try {
      await ctx.model.MyIntegral.update(updateData, {
        where,
      });
      ctx.body = { success: true, errCode: '' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, errCode: 3002 };// 3002数据错误
    }
  }

  // 删除
  async delete() {
    const { ctx } = this;
    const { uid, totalIntegral, time, getIntegral } = ctx.request.body;
    const where = {};

    if (uid) where.uid = uid;
    if (totalIntegral) where.totalIntegral = totalIntegral;
    if (time) where.time = time;
    if (getIntegral) where.getIntegral = getIntegral;


    try {
      await ctx.model.MyIntegral.destroy({
        where,
      });
      ctx.body = { success: true, errCode: '' };

    } catch (e) {
      ctx.body = { success: false, errCode: 3002 };// 3002数据错误
    }
  }

  // 查找
  async find() {
    const { ctx } = this;

    let { uid, limit, page, totalIntegral, time, getIntegral } = ctx.request.body;
    limit = limit ? limit : 10;
    page = page ? page : 1;
    const offset = (page - 1) * limit; // offset: 匹配的数据里 跳过多少条数据

    const where = {}; // 查询条件
    if (uid) where.uid = uid;
    if (totalIntegral) where.totalIntegral = totalIntegral;
    if (time) where.time = time;
    if (getIntegral) where.getIntegral = getIntegral;

    const { integral } = await ctx.model.User.findOne({
      where: {
        uid,
      },
    });

    // const res = await ctx.model.Order.findAndCount({
    //   where, // where:where
    // });
    // count是匹配数据的总数， rows当前页面要显示的数据
    const { count, rows } = await ctx.model.MyIntegral.findAndCountAll({
      offset,
      limit,
      where, // 查询条件
    });
    const res = { count, rows, integral };

    ctx.body = res;

  }

}
module.exports = myIntegralController;
