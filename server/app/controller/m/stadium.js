  /**
 * author: Alice
 * desc：场馆信息表接口
 * date：2021-08-10
 * params:{ stName:'场馆名', site:'场馆地址', type:'场馆类型', phone:'场馆电话', sdInfo:'场馆介绍', businessAt:'场馆营业时间', createdAt:'创建时间', updatedAt:'更新时间'}
 * */
'use strict';

const { exclude } = require('../../../.autod.conf');
const Controller = require('egg').Controller;// 控制器类入口

// 实现路由几个常规函数，包括列表及CRUD的操作
class stadiumController extends Controller {
  /**
   *添加场馆
   **/
  async add() {
    //获取参数
    const { ctx } = this;
    const { stName, site, type,rates, plan,phone, sdInfo, businessAt } = ctx.request.body;
    // 添加的内容
    const createDate = {}
    if(stName) createDate.stName = stName
    if(site) createDate.site = site
    if(type) createDate.type = type
    if(rates) createDate.rates = rates
    if(plan) createDate.plan = plan
    if(phone) createDate.phone = phone
    if(sdInfo) createDate.sdInfo = sdInfo
    if(businessAt) createDate.businessAt = businessAt


    // 数据过滤
    if (!stName) return ctx.body = { success: false, errCode: 40001, info: '请填写场馆名' };
    if (!site) return ctx.body = { success:false,info: '请输入场馆地址' }
    if (!phone) return ctx.body = { success:false,info: '请输入联系电话' }
    if (!/^1[3456789]\d{9}$/.test(phone)) return ctx.body = { success: false, errorCode: 40001, info: '请填写正确的手机号' };

    //判断当前创建的场馆是否已经存在
    const one = await ctx.model.SdUser.findOne({
      where:{
        stName
      },
      raw:true
    })

    console.log('one',one)
    if(one) return ctx.body = { success:false,info:'该场馆已存在!' }


    try {
      await ctx.model.SdUser.create(createDate);
      ctx.body = { success: true,info: '添加成功' };

    } catch (e) {
      console.log(e);
      ctx.body = { success: false,info: '添加失败' };
    }


  }

  /**
   * 删除数据
   * */
  async delete() {
    const { ctx, app } = this;
    const { stName, site, type, phone, sdInfo, businessAt } = ctx.request.body;

    // 过滤
    const up = {};
    if (stName) up.stName = stName;
    if (site) up.site = site;
    if (type) up.type = type;
    if (phone) up.phone = phone;
    if (sdInfo) up.sdInfo = sdInfo;
    if (businessAt) up.businessAt = businessAt;
    // if (!stName) return ctx.body = '场馆名不能为空';
    // if (!site) return ctx.body = '场馆地址不能为空';
    try {
      await ctx.model.SdUser.destroy({
        where: up,
      });

      ctx.body = { success: true, errrCode: '', info: '删除成功' };

    } catch (e) {
      ctx.body = { success: false, errCode: 40001, info: '未删除' };
      // 40001 创建失败 model原因
    }

  }

  /**
   * 更新数据
   * */
  async update() {
    const { ctx } = this;
    const { stName, phone, type, rename, site, retype, rephone, resdInfo } = ctx.request.body;

    const up = {};// 要更新的对象
    const pu = {};// 更新的对象

    // 判断条件
    if (stName) up.stName = stName;// 当stName,为场馆名时一下数据可以更新
    if (phone) up.phone = phone;
    if (type) up.type = type;
    // 更新内容
    if (rename) pu.stName = rename;
    if (site) pu.site = site;
    if (retype) pu.type = retype;
    if (rephone) pu.phone = rephone;
    if (resdInfo) pu.sdInfo = resdInfo;

    try {
      await ctx.model.SdUser.update(pu, {
        where: up,
      });

      ctx.body = { success: true, errorCode: '', info: '更新成功' };

    } catch (e) {
      console.log(e);
      ctx.body = { success: false, errorCode: '40001', msg: '更新失败' };
    }

  }

  /**
   * 查询数据
   * */
  /* 条件查询*/
  async red1() {
    const { ctx, app } = this;
    const { stName, site, type, phone, sdInfo, businessAt } = ctx.request.body;

    // 过滤
    // 多条查询
    const up = {};
    if (stName) up.stName = stName;
    if (site) up.site = site;
    if (type) up.type = type;
    if (phone) up.phone = phone;
    if (sdInfo) up.sdInfo = sdInfo;
    if (businessAt) up.businessAt = businessAt;

    const res = await ctx.model.SdUser.findAll({
      where: up,
    });

    if (res === null) {
      console.log('没找到');
    } else {
      console.log(res.stName);
    }

    ctx.body = res;


  }


  /**
   * 查询所有场馆
   **/
  async redAll() {
    const {ctx, app} = this;
    const { Op } = app.Sequelize;
    const {stName} = ctx.request.body;
    const where = {};
    if (stName) where.stName = { [Op.like]:'%'+stName+'%' }
    try {

      const res = await ctx.model.SdUser.findAll({
        where
      });
      console.log(res)
      ctx.body = res
    } catch (e) {
      ctx.body = "查询失败"
    }
  }

  /**
   * 查询所有 球场场馆
   **/
  async redAll2() {
    const {ctx, app} = this;
    const {stName,type} = ctx.request.body;
    const where = {};
    if(stName) where.stName = stName;
    if(type) where.type = type;
    try {

      const res = await ctx.model.Court.findAll({
         where
      });
      console.log(res)
      ctx.body = res
    } catch (e) {
      ctx.body = "查询失败"
    }
  }


  /**
   * 连表 所有场馆
   **/
  async redAll1() {
    const {ctx, app} = this;
    const {stName} = ctx.request.body;

    try {
      await ctx.model.SdUser.hasOne(ctx.model.Court, { foreignKey:'ctid',targetKey:'ctid' })
      const res = await ctx.model.SdUser.findAll({
        stName,

        include: [
          {
            model: ctx.model.Court,
            // where:{stName:'徐家汇体育公园'},
            attributes: ['stName'],
          }
        ],

      });
      console.log(res)
      ctx.body = res
    } catch (e) {
      console.log(e)
      ctx.body = "查询失败132"
    }
  }


  async findAll(){
    const { ctx,app } = this;


    let { stName,page,limit} = ctx.request.body;
    limit = limit ?  limit: 30;
    page = page ? page :1;
    const offset = (page-1)*limit;

    const where = {}
    if(stName) where.stName = stName;



    const { count ,rows} = await ctx.model.SdUser.findAndCountAll({
      offset,
      limit,
      where,
    });
    const res = { count,rows};
    ctx.body = res;



  }


}

module.exports = stadiumController;
