"use strict";

const Controller = require("egg").Controller;

class MemberController extends Controller {
  /*
    author:vic,薄荷
    desc:会员卡信息
    params:{    vipId：会员编号,vipNumber：会员卡卡号,vipSex：会员性别(0：男生，1：女生),vipName：会员姓名,startTime：开卡日期,
                endTime：到期日期,vipType：会员卡类型（0:年卡,1:月卡，2：季卡，3：周卡，4：此卡，5：半年卡）,totalSpend：消费总额,
                spendItem:消费项目,vipIntegral:会员卡积分,cardsRemain:卡内剩余,vipPhone:会员电话,
                vipState:会员卡状态（0：可用，1：不可用）,vipBirthday:会员生日,vipQian:会员卡折后价格,vipMoney:会员卡实际价格,
                vipImg：会员卡图片,vipDays：有效天数,vipyueke：可约课次数}
    date:2021-08-13

    */

  //新增会员

  async add() {
    const { ctx, app } = this;
    // 传参
    const {
      vipNumber,
      vipSex,
      vipName,
      startTime,
      endTime,
      vipType,
      totalSpend,
      spendItem,
      vipIntegral,
      cardsRemain,
      vipPhone,
      vipState,
      vipBirthday,
      vipQian,
      vipMoney,
      vipImg,
      vipDays,
      vipyueke,
    } = ctx.request.body;

    // 会员卡
    if (!vipNumber)
      return (ctx.body = {
        success: false,
        errCode: 30002,
        info: "会员卡号有误",
      });

    // 性别
    if (![0, 1, "0", "1"].includes(vipSex))
      return (ctx.body = {
        success: false,
        errCode: 30002,
        info: "请正确填写性别",
      });

    // 姓名
    if (!/^\D{2,4}$/.test(vipName))
      return (ctx.body = {
        success: false,
        errCode: 30002,
        info: "请填写会员姓名",
      });

    // 开卡日期
    if (!startTime)
      return (ctx.body = { success: false, errCode: "", info: "时间格式出错" });

    // 到期日期
    if (!endTime)
      return (ctx.body = { success: false, errCode: "", info: "时间格式出错" });

    // 电话
    if (!/^1[3456789]\d{9}$/.test(vipPhone))
      return (ctx.body = {
        success: false,
        errCode: 30002,
        info: "请填写正确的手机号码",
      });

    // 会员卡类型
    if (![0, 1, 2, 3, 4, 5, "0", "1", "2", "3", "4", "5"].includes(vipType))
      return (ctx.body = {
        success: false,
        errCode: 20002,
        info: "请填写会员卡类型",
      });

    // 消费总额
    if (!/^[1234567890]\d{1,20}$/.test(totalSpend))
      return (ctx.body = {
        success: false,
        errCode: "",
        info: "请重新输入价格",
      });

    // 消费的项目
    if (!spendItem)
      return (ctx.body = {
        success: false,
        errCode: "",
        info: "请填写消费的项目",
      });

    //会员卡积分
    if (!/^[1234567890]\d{1,20}/.test(vipIntegral))
      return (ctx.body = { success: false, errCode: "", info: "积分信息有误" });

    // 会员卡剩余余额
    if (!/^[1234567890]\d{1,20}/.test(cardsRemain))
      return (ctx.body = { success: false, errCode: "", info: "会员卡无余额" });

    // 会员卡状态
    if (![0, 1, "0", "1"].includes(vipState))
      return (ctx.body = {
        success: false,
        errCode: "",
        info: "填写会员卡状态",
      });

    // 会员生日
    if (!vipBirthday)
      return (ctx.body = { success: false, errCode: "", info: "生日有误" });

    // 会员卡实际价格
    if (!/^[1234567890]\d{1,20}/.test(vipMoney))
      return (ctx.body = {
        success: false,
        errCode: "",
        info: "填写会员卡实际价格",
      });

    // 折后价格
    if (!/^[1234567890]\d{1,20}/.test(vipQian))
      return (ctx.body = {
        success: false,
        errCode: "",
        info: "填写会员卡折后价格",
      });

    // 会员卡图片
    if (!vipImg)
      return (ctx.body = { success: false, errCode: "", info: "图片格式有错" });

    // 会员卡有效天数
    if (!/^[1234567890]\d{1,20}$/.test(vipDays))
      return (ctx.body = { success: false, errCode: "", info: "无效天数" });

    // 会员卡可约课次数
    if (!/^[1234567890]\d{1,20}/.test(vipyueke))
      return (ctx.body = {
        success: false,
        errCode: "",
        info: "可约课次数无效",
      });

    try {
      let res = await ctx.model.Member.create({
        vipNumber,
        vipSex,
        vipName,
        startTime,
        endTime,
        vipType,
        totalSpend,
        spendItem,
        vipIntegral,
        cardsRemain,
        vipPhone,
        vipState,
        vipBirthday,
        vipQian,
        vipMoney,
        vipImg,
        vipDays,
        vipyueke,
      });
      ctx.body = { success: true, errCode: "", info: "数据创建成功" };

      console.log(res);
    } catch (e) {
      // 40001 ：数据创建失败
      ctx.body = { success: false, errCode: "40001", info: "创建失败" };
      console.log(e);
    }
  }

  //删除数据
  async delete() {
    const { ctx, app } = this;
    const { vipId } = ctx.request.body;
    if (!vipId) return (ctx.body = "vipId不能为空的");

    const where = {}; //作为条件
    try {
      await ctx.model.Member.destroy({
        where: {
          vipId,
        },
      });
      ctx.body = "删除成功";
    } catch (e) {
      console.log(e);
      ctx.body = "删除失败";
    }
  }

  //修改
  async update() {
    const { ctx, app } = this;
    const {
      vipId,
      vipNumber,
      vipSex,
      vipName,
      startTime,
      endTime,
      vipType,
      totalSpend,
      spendItem,
      vipIntegral,
      cardsRemain,
      vipPhone,
      vipState,
      vipBirthday,
      vipQian,
      vipMoney,
      vipImg,
      vipDays,
      vipyueke,
      idDate, ///表示选择第几行修改它包含的信息
    } = ctx.request.body;

    // 条件
    const where = {};
    if (vipId) where.vipId = vipId;

    // 可修改的信息
    const updateData = {};
    if (vipNumber) updateData.vipNumber = vipNumber;
    if (vipSex) updateData.vipSex = vipSex;
    if (vipPhone) updateData.vipPhone = vipPhone;
    if (vipName) updateData.vipName = vipName;
    if (startTime) updateData.startTime = startTime;
    if (endTime) updateData.endTime = endTime;
    if (vipType) updateData.vipType = vipType;
    if (totalSpend) updateData.totalSpend = totalSpend;
    if (spendItem) updateData.spendItem = spendItem;
    if (vipIntegral) updateData.vipIntegral = vipIntegral;
    if (cardsRemain) updateData.vipName = cardsRemain;
    if (vipState) updateData.vipState = vipState;
    if (vipBirthday) updateData.vipBirthday = vipBirthday;
    if (vipQian) updateData.vipQian = vipQian;
    if (vipMoney) updateData.vipMoney = vipMoney;
    if (vipImg) updateData.vipImg = vipImg;
    if (vipDays) updateData.vipDays = vipDays;
    if (vipyueke) updateData.vipyueke = vipyueke;
    try {
      await ctx.model.Member.update(updateData, {
        where: {
          vipId: idDate,
        },
      });
      ctx.body = { success: true, errCode: "", info: "修改成功" };
    } catch (e) {
      console.log(e);
      ctx.body = { success: true, errCode: "", info: "修改失败" };
    }
  }

  //查找全部信息
  async findAll() {
    const { ctx, app } = this;
    let { vipId, vipSex, vipPhone,vipType, page, limit } = ctx.request.body;

    const { Op } = app.Sequelize;
    limit = limit ? limit : 30;
    page = page ? page : 1;
    const offset = (page - 1) * limit;

    const where = {}; // 条件查找
    if (vipSex) where.vipSex = vipSex;
    if (vipId) where.vipId = vipId;
    if (vipType) where.vipType = vipType;
    if (vipPhone) where.vipPhone = { [Op.like]: vipPhone + "%" }; //实现模糊查询

    try {
      const res = await ctx.model.Member.findAll({
        where,
        offset,
        limit,
      });
      if (res) return (ctx.body = { data: res });
    } catch (e) {
      ctx.body = { success: false, errCode: 2004, info: "没有找到参数" }; //2004没有找到参数
    }
  }

  // 会员卡单个查找数据
  async SelectOne() {
    const { ctx, app } = this;
    const vipId= ctx.params.vipId;

    const where = {};

    try {
      const res = await ctx.model.Member.findOne({
        where: {
          vipId,
        }
      });

      if (res) return (ctx.body = { data: res });
    } catch (e) {
      ctx.body = { success: false, errCode: 2004, info: "查找数据失败" };
    }
  }
}

module.exports = MemberController;
