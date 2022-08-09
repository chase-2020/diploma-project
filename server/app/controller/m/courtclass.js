'use strict';

/*
author: jack
desc: 场馆运营商
params:{};
data:2021-09-14
*/

const Controller = require('egg').Controller;

class MerchantController extends Controller {
  //增
  async courtadd(){
    const { ctx } = this;
    const { uid,name,operatorAddress,pictureAddress,phone,time,registerTime } = ctx.request.body;


    //过滤条件


    if (phone.length >11) return ctx.body = { success: false, errCode: 3002, info: '您输入的号码错误' };

    try {
      await ctx.model.Merchant.create({
        uid,name,operatorAddress,pictureAddress,phone,time,registerTime
      });

      ctx.body = { success: true, errCode: '' };

    } catch (e) {
      console.log(e);
      ctx.body = { success: false, errCode: 3002 };// 3002数据错误
    }


  }


  //改
  async courtmodify() {

    const { ctx } = this;
    const { uid,name,operatorAddress,pictureAddress,phone,time,registerTime } = ctx.request.body;
    const updateData = {};
    const where = {};
    if (ctid) where.ctid = ctid;
    if (name) where.name = name;
    if (retes) where.retes = retes;
    if (sdInfo) where.sdInfo = sdInfo;
    if (type) where.type = type;
    if (phone) where.phone = phone;
    if (time) where.time = time;
    if (bcType) where.bcType = bcType;
    if (mid) where.mid = mid;
    if (siteAddress) where.siteAddress = siteAddress;
    if (plan) where.plan = plan;

    // 数据过滤


    try {
      await ctx.model.Merchant.update(updateData, {
        where,
      });
      ctx.body = { success: true, errCode: '' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, errCode: 3002 };// 3002数据错误
    }
  }


  // 删除
  async courtdelete() {
    const { ctx } = this;
    const { uid,name,operatorAddress,pictureAddress,phone,time,registerTime } = ctx.request.body;
    const where = {};
    if (ctid) where.ctid = ctid;
    if (name) where.name = name;
    if (retes) where.retes = retes;
    if (sdInfo) where.sdInfo = sdInfo;
    if (type) where.type = type;
    if (phone) where.phone = phone;
    if (time) where.time = time;
    if (bcType) where.bcType = bcType;
    if (mid) where.mid = mid;
    if (siteAddress) where.siteAddress = siteAddress;
    if (plan) where.plan = plan;


    try {
      await ctx.model.Court.destroy({
        where,
      });
      ctx.body = { success: true, errCode: '' };

    } catch (e) {
      ctx.body = { success: false, errCode: 3002 };// 3002数据错误
    }
  }


  // 查找
  async courtclassfindAll() {
    const { ctx } = this;

    let { page, limit, uid,mid,name,operatorAddress,pictureAddress,phone,time,registerTime } = ctx.request.body;
    limit = limit ? limit : 10;
    page = page ? page : 1;
    const offset = (page - 1) * limit; // offset: 匹配的数据里 跳过多少条数据

    const where = {}; // 查询条件
    if (uid) where.uid = uid;
    if (name) where.name = name;
    if (operatorAddress) where.operatorAddress = operatorAddress;
    if (pictureAddress) where.pictureAddress = pictureAddress;
    if (phone) where.phone = phone;
    if (time) where.time = time;
    if (registerTime) where.registerTime = registerTime;
    if (mid) where.mid = mid;

    

    // await ctx.model.Merchant.belongsTo(ctx.model.Court, { foreignKey: 'mid', targetKey: 'mid' });
    const { count, rows } = await ctx.model.Merchant.findAndCountAll({
      offset,
      limit,
      where,// 查询条件
      // include:{
      //   model: ctx.model.Court,
      //   required: false,
      // },
    });
    const res = { count, rows };

    ctx.body = res;
    console.log(res)
  }
  

  async MerchantFindById() {
    const { ctx } = this;
    const { mid } = ctx.request.body;

    const res = await ctx.model.Merchant.findOne({
      where: {
        mid,
      },
    });

    ctx.body = res;

  }
}

module.exports = MerchantController;
