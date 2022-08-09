'use strict';

/*
desc: 场馆运营商
params:{};
*/


const Controller = require('egg').Controller;

class MerchantController extends Controller {  
  // 查找所有场馆运营商
  async courtclassfindAll() {
    const { ctx, app } = this;
    const { type } = ctx.request.body;
    const where = {}; // 查询条件
    const { Op } = app.Sequelize;
    if (type)where.type = { [Op.like]: '%' + type + '%' };

    try {
      const res = await ctx.model.Merchant.findAll({
        where,
      });
      ctx.body = res;
      console.log(res);
    } catch (a) {
      console.log(a);
    }
  }

  // 查找单个场馆运营商
  async MerchantFindById() {
    const { ctx } = this;
    const { mid } = ctx.request.body;
    try {
      const res = await ctx.model.Merchant.findOne({
        where: {
          mid,
        },
      });
      ctx.body = res;
    } catch (e) {
      console.log('MerchantFindById报错', e);
    }
  }

  // 运营商注册
  async register() {
    const { ctx, app } = this;
    // 获取参数
    const { phone, passWord, code } = ctx.request.body;
    const registerTime = Date.now();
    const utils = require('utility');
    const codeTemp = await app.redis.get(phone);
    // 数据过滤
    if (!phone) return ctx.body = { success: false, info: '请输入手机号码' };
    if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone)) return ctx.body = { success: false, info: '请输入正确的手机号码' };
    if (!passWord) return ctx.body = { success: false, info: '请输入密码' };
    if (passWord.length < 6) return ctx.body = { success: false, info: '密码不能少于6位' };
    if (!code) return ctx.body = { success: false, info: '请输入验证码' };
    if (code.length < 6) return ctx.body = { success: false, info: '请输入6位数字/字母验证码' };

    const one = await ctx.model.User.findOne({
      where: {
        phone,
      },
      raw: true,
    });

    console.log('one', one);
    if (one) return ctx.body = { success: false, info: '该手机号已注册!' };

    const pwd = utils.md5( passWord + `${registerTime}`);
    try {
      if (codeTemp === code) {
        await ctx.model.User.create({
          phone,
          passWord: pwd,
          registerTime,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        ctx.body  = { success: true, info: '注册成功' };
      } else {
        ctx.body = { success: false, info: '验证码错误，请重新输入' };
      }
    } catch (a) {
      ctx.body = { success: false, info: '注册失败，请联系管理员123！' };
      console.log(a);
    }
  }

    //获取验证码
    async yzmupdate() {
        const {ctx, app} = this;
        const {phone} = ctx.request.body;
        const utils = require("utility");

        if (!phone) return (ctx.body = {success: false, info: "请输入手机号码"});
        if (
            !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
                phone
            )
        )
            return (ctx.body = {success: false, info: "请输入正确的手机号码"});

        try {
            // console.log(app.redis)
            const codeTemp = await app.redis.get(phone);
            if (!codeTemp) {
                var code = utils.randomString(6, "0123456789");
            }
            await app.redis.set(phone, code, "EX", 60);
            console.log("手机号:", phone);
            console.log("验证码:", code);

            ctx.body = {success: true, info: "发送成功",code};
        } catch (e) {
            ctx.body = {success: false, info: "网络开了小差"};
        }
    }
}

module.exports = MerchantController;
