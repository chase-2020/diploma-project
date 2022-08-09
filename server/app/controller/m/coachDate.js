"use strict";

// author : 薄荷
// describe : 教练个人信息
// params ： {name:昵称,realName:真实姓名,photo:头像图片,sex: 教练性别(0:男生 1：女生),age: 教练年龄,coachType:教练类型,certificate: 证书,phone:电话号码,weixin微信号,qq: qq号}
// date : 2021-8-11

const Controller = require("egg").Controller;

class CoachDateController extends Controller {
  // 增加数据
  async addDate() {
    const { ctx, app } = this;

    const {
      name,
      realName,
      photo,
      sex,
      age,
      coachType,
      certificate,
      phone,
      qq,
    } = ctx.request.body;

    // 数据过滤
    // 20002 表示参数有误
    if (!/^\D{1,10}$/.test(name))
      return (ctx.body = {
        success: false,
        errCode: 20002,
        info: "请重新输入账号名",
      });

    if (!/^\D{2,4}$/.test(realName))
      return (ctx.body = {
        success: false,
        errCode: 20002,
        info: "请重新输入姓名",
      });

    console.log(photo);
    if (!photo)
      return (ctx.body = {
        success: false,
        errCode: 2002,
        info: "请重新传入图片",
      });

    if (!sex)
      return (ctx.body = {
        success: false,
        errCode: 20002,
        info: "请重新填写性别",
      });

      // 若是d{}则表示输入的内容是数字，若是D{}则表示输入的内容可以是字符串
    if (!/^[123456789]\d{1}$/.test(age))
      return (ctx.body = {
        success: false,
        errCode: 20002,
        info: "请重新填写年龄",
      });

    if (!coachType)
      return (ctx.body = {
        success: false,
        errCode: 2002,
        info: "请重新填写教练类型",
      });

    if (!certificate)
      return (ctx.body = {
        success: false,
        errCode: 2002,
        info: "请重新传入证书",
      });

    console.log(/^1[3456789]\d{9}$/.test(phone));
    if (!/^1[3456789]\d{9}$/.test(phone))
      return (ctx.body = {
        success: false,
        errCode: 20002,
        info: "请重新填写手机号码",
      });

    if (!/^\d{5,12}$/.test(qq))
      return (ctx.body = {
        success: false,
        errCode: 20002,
        info: "请重新填写qq号",
      });

    try {
      await ctx.model.CoachXinxi.create({
        name: name, //账号
        realName,//真实姓名
        photo: photo, //头像图片
        sex: sex, //教练性别
        age: age, //教练年龄
        coachType: coachType, //教练类型
        certificate: certificate, //证书
        phone: phone, //电话号码
        qq: qq, //qq号
      });

      ctx.body = { success: true, errCode: "", msg: "创建成功" };
    } catch (e) {
      ctx.body = { success: false, errCode: 20001 };
      // 20001 创建失败 model原因
      console.log(e);
    }
  }
  
  // 单个查找
  async findById(){
    const { ctx ,app} = this;
    const { coachId } = ctx.request.body ;

    const res = await ctx.model.User.findOne({
      where:{
        coachId
      },
      attributes:{
        exclude:['pwd']
      }

    })

    ctx.body = res;

  }

  // 进行查找数据
  async selectAllDate() {
    const { ctx, app } = this;

    const { photo, sex, age, coachType, certificate, phone, qq, limit, page } =
      ctx.request.body;
const where = {}; //作为条件
    

    if (sex) where.sex = sex;

    // limit = limit ? limit : 10; //限制条数

    // page = page ? page : 1; //实现分页

    // const offset = (page - 1) * limit;

    try {
      // 查找所有的数据
      const res = await ctx.model.CoachXinxi.findAll({
        where,
        // limit,
        // offset,
      });
      if (res) return (ctx.body = { data: res });

      ctx.body = { success: false, errCode: 2004, info: "没有找到参数" }; //2004没有找到参数
    } catch (e) {
      //2003 查找失败 model的原因
      console.log(e);
      ctx.body = { success: false, errCode: 2003 };
    }
  }

  // 进行数据修改
  async updateDate() {
    const { ctx, app } = this;
    const {
      photo,
      sex,
      age,
      coachType,
      certificate,
      phone,
      qq,
      idDate, // 表示能修改第几行里面包含的数据
    } = ctx.request.body;

    const where = {};
    if (coachId) where.coachId = coachId;
    const updateData = {};
    if (photo) updateData.photo = photo;
    if (sex) updateData.sex = sex;
    if (age) updateData.age = age;
    if (coachType) updateData.coachType = coachType;
    if (certificate) updateData.certificate = certificate;
    if (phone) updateData.phone = phone;
    if (qq) updateData.qq = qq;

    // console.log("传入的参数是：" + sex);

    try {
      await ctx.model.CoachXinxi.update(updateData, {
        where: {
          coachId: idDate,
        },
      });
      ctx.body = "数据成功修改";
    } catch (e) {
      //2003 修改失败 model的原因
      ctx.body = { success: false, errCode: 2003 };
    }
  }

  // 对数据进行删除操作
  async deleteDate() {
    const { ctx, app } = this;
    const {
      coachId,
      photo,
      sex,
      age,
      coachType,
      certificate,
      phone,
      qq,
      idDate, //表示删除第几行包含的信息
    } = ctx.request.body;

    const where = {};
    if (coachId) where.coachId = coachId;

    const deleteDate = {};
    if (photo) deleteDate.photo = photo;
    if (sex) deleteDate.sex = sex;
    if (age) deleteDate.age = age;
    if (coachType) deleteDate.coachType = coachType;
    if (certificate) deleteDate.certificate = certificate;
    if (phone) deleteDate.phone = phone;
    if (qq) deleteDate.qq = qq;

    console.log(deleteDate);

    try {
      await ctx.model.CoachXinxi.destroy({
        where: {
          coachId: idDate,
        },
      });

      ctx.body = "数据删除成功";
    } catch (e) {
      //  2003 删除失败
      ctx.body = { success: false, errCode: 2003 };
    }
  }
}

module.exports = CoachDateController;
