'use strict';

const Controller = require('egg').Controller;

class CommodityListController extends Controller {


  // 增

  async create() {

    const { ctx, app } = this;

    const { commodity, classification, supplier, price, quantity, goodsName } = ctx.request.body;

    if (!commodity) return ctx.body = { success: false, errCode: 3002, info: '商品编号不能为空' };

    const addData = {};

    if (commodity) addData.commodity = commodity;
    if (classification) addData.classification = classification;
    if (supplier) addData.supplier = supplier;
    if (price) addData.price = price;
    if (quantity) addData.quantity = quantity;
    if (goodsName) addData.goodsName = goodsName;

    try {

      await ctx.model.CommodityList.create(addData);

      ctx.body = { success: true, errCode: '', info: '创建成功' };
    } catch (e) {

      console.log(e);
      ctx.body = { success: false, errCode: 3002, info: '创建失败' };
    }


  }

  // 删

  async delete() {
    const { ctx, app } = this;
    const { commodity } = ctx.request.body;

    const where = {};
    if (commodity) where.commodity = commodity;

    try {
      await ctx.model.CommodityList.destroy({
        where,
      });
      ctx.body = '删除成功';
    } catch (e) {
      console.log(e);
      ctx.body = '删除失败';

    }
  }

  // 改
  async update() {
    const { ctx, app } = this;
    const { commodity, goodsName, classification, supplier, price, quantity } = ctx.request.body;

    const updateData = {};
    const where = {};
    if (commodity) where.commodity = commodity;
    if (goodsName) updateData.goodsName = goodsName;
    if (classification) updateData.classification = classification;
    if (supplier) updateData.supplier = supplier;
    if (price) updateData.price = price;
    if (quantity) updateData.quantity = quantity;
    try {

      await ctx.model.CommodityList.update(updateData, {
        where,
      });
      ctx.body = { success: true, errCode: '', info: '更新成功' };
    } catch (e) {

      ctx.body = { success: false, errCode: 3002, info: '更新失败' };
    }

  }


  // 查


  async findAll() {
    const { ctx, app } = this;


    let { commodity, page, limit,orderType } = ctx.request.body;
    limit = limit ? limit : 30;
    page = page ? page : 1;
    const offset = (page - 1) * limit;

    const where = {};
    if (commodity) where.commodity = commodity;


    const { count, rows } = await ctx.model.CommodityList.findAndCountAll({
      offset,
      limit,
      where,
    });
    const res = { count, rows };
    ctx.body = res;


  }


}

module.exports = CommodityListController;
