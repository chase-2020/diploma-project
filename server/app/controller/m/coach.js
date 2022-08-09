"use strict";

const Controller = require("egg").Controller;

class CoachController extends Controller {
  /*
        author: ww,薄荷 
        desc: 新增教练
        params:{type"教练类型",name:"教练姓名",sex:"教练性别",phone:"教练手机号码",qq:"教练qq",sports:"教练擅长的运动",Intro:"教练简介",emil:"邮箱"
                price:"课程价格",courseDuration:"课程时长",address:"训练地址",date:"课程有效日期",zhengShu: 证书,dengJi: 等级,hight: 身高,
                weight: 体重,birthday: 生日,personAddress: 教练个人地址,wxOpenId: 微信}
        date:2021-08-10
    */

  async addCoach() {
    const { ctx, app } = this;
    const {
      type,
      name,
      sex,
      phone,
      qq,
      sports,
      intro,
      price,
      courseDuration,
      address,
      photo,
      zhengShu,
      dengJi,
      hight,
      weight,
      birthday,
      personAddress,
      emil,
      wxOpenId,
      courseName,
    } = ctx.request.body;
    // if (![0, 1, "0", "1"].includes(type))
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "请填写教练类型",
    //   });
    // if (!/^\D{2,10}$/.test(name))
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "请填写教练姓名",
    //   });
    // if (![0, 1, "0", "1"].includes(sex))
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "请正确填写性别",
    //   });
    // if (!/^1[3456789]\d{9}$/.test(phone))
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "请填写正确的手机号码",
    //   });
    // if (!/^\d{5,12}$/.test(qq))
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "请填写正确的qq号",
    //   });
    // if (!sports)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "擅长运动不能为空",
    //   });
    // if (!intro)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "教练简介不能为空",
    //   });
    // if (!/^\d{0,4}$/.test(price))
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "课程价格不能为空",
    //   }); //
    // if (!courseDuration)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "课程时长不能为空",
    //   });
    // if (!address)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "训练地址不能为空",
    //   });
    // if (!photo)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "教练图像不能为空",
    //   });

    // if (!zhengShu)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "证书图片不能为空",
    //   });
    // if (!dengJi)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "教练等级填写错误",
    //   });
    // if (!hight)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "身高输入有误",
    //   });
    // if (!weight)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "体重输入有误",
    //   });
    // if (!birthday)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "生日信息输入有误",
    //   });
    // if (!personAddress)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "教练个人地址有误",
    //   });

    // if (!emil)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "邮箱输入有误",
    //   });

    // if (!wxOpenId)
    //   return (ctx.body = {
    //     success: false,
    //     errCode: 20002,
    //     info: "微信输入有误",
    //   });

    try {
      let res = await ctx.model.Coach.create({
        coachType: type, //0:馆内教练;1:私人教练
        coachName: name,
        coachSex: sex, //0：男；1：女
        coachPhone: phone,
        coachQq: qq,
        coachSports: sports,
        coachIntro: intro,
        coursePrice: price,
        courseDuration, //课程时长
        trainAddress: address,
        coachPhoto: photo,
        zhengShu,
        dengJi,
        hight,
        weight,
        birthday,
        personAddress,
        emil,
        wxOpenId,
        courseName,
      });
      hight ? hight : 0;
      weight ? weight : 0;
      ctx.body = { success: true, errCode: "", msg: "创建成功" };
      console.log(res);
    } catch (error) {
      ctx.body = { success: false, errCode: 20001 };
      console.log(error);
    }
  }

  // 教练注册信息  author: 薄荷
  async registerCoach() {
    const { ctx, app } = this;
    const {
      coachName,//姓名
      coachSex,//性别（0 男生，1 女生）
      coachPhone,//电话
      coachIntro,//简介
      coachPhoto,//头像
      coachType,//教练类型
      zhengShu,//证书
      dengJi,//等级
      hight,//身高
      weight,//体重
      birthday,//生日
      personAddress,//地址
      emil,//邮箱
      wxOpenId,//微信
    } = ctx.request.body;

    if (!/\W{2,10}$/.test(coachName)) return (ctx.body = {   success: false,   errCode: 20002,   info: "请填写教练姓名", });

    if (![0, 1, "0", "1"].includes(coachSex)) return (ctx.body = {   success: false,   errCode: 20002,   info: "请正确填写性别", });

    if (!/^1[3456789]\d{9}$/.test(coachPhone)) return (ctx.body = {   success: false,   errCode: 20002,   info: "请填写正确的手机号码", });

    if (!coachIntro) return (ctx.body = {   success: false,   errCode: 20002,   info: "教练简介不能为空", });

    // if (!coachPhoto) return (ctx.body = {   success: false,   errCode: 20002,   info: "教练图像不能为空", });

    if (!zhengShu) return (ctx.body = {   success: false,   errCode: 20002,   info: "证书图片不能为空", });

    if (!dengJi) return (ctx.body = {   success: false,   errCode: 20002,   info: "教练等级填写错误", });

    if (!hight) return (ctx.body = {   success: false,   errCode: 20002,   info: "身高输入有误", });

    if (!weight) return (ctx.body = {   success: false,   errCode: 20002,   info: "体重输入有误", });

    if (!birthday) return (ctx.body = {   success: false,   errCode: 20002,   info: "生日信息输入有误", });
    if (!personAddress) return (ctx.body = {   success: false,   errCode: 20002,   info: "教练个人地址有误", });

    if (!emil) return (ctx.body = {   success: false,   errCode: 20002,   info: "邮箱输入有误", });

    if (!wxOpenId) return (ctx.body = {   success: false,   errCode: 20002,   info: "微信输入有误", });
    
    console.log(ctx.request.body);
    
    try {
      let res = await ctx.model.Coach.create({
      
      coachName,//姓名
      coachSex,//性别（0 男生，1 女生）
      coachPhone,//电话
      coachIntro,//简介
      coachPhoto,//头像
      coachType,//教练类型
      zhengShu,//证书
      dengJi,//等级
      hight,//身高
      weight,//体重
      birthday,//生日
      personAddress,//地址
      emil,//邮箱
      wxOpenId,//微信
      });
      hight ? hight : 0;
      weight ? weight : 0;
      ctx.body = { success: true, errCode: "", msg: "创建成功" };

      console.log(res);
    } catch (error) {
      ctx.body = { success: false, errCode: 20001 };
      console.log(error);
    }
  }

  // 修改排课的教练教程 author: 薄荷
  async findUpdated() {
    const { ctx, app } = this;
    const coachId = ctx.params.coachId;
    const { name, phone, email, wxOpenId, personAddress, sex, birthday, hight,weight, dengJi, intro, zhengShu, photo } = ctx.request.body;
    const updateDate = {}; //修改后的数据
    if (name) updateDate.name = name;
    if (phone) updateDate.phone = phone;
    if(email) updateDate.email = email;
    if (wxOpenId) updateDate.wxOpenId = wxOpenId;
    if(personAddress) updateDate.personAddress =personAddress;
    if(sex) updateDate.sex = sex;
    if(birthday) updateDate.birthday=birthday;
    if(hight) updateDate.hight = hight;
    if(weight) updateDate.weight = weight;
    if (dengJi) updateDate.dengJi = dengJi;
    if (intro) updateDate.intro = intro;
    if (zhengShu) updateDate.zhengShu = zhengShu;
    if (photo) updateDate.photo = photo;
    try {
      let res = await ctx.model.RegisterCoach.findOne({
        where: {
          coachId,
        },
      });
      ctx.body = { success: true, info: "查找成功", data: res };

      let updatedRes = await ctx.model.RegisterCoach.update(updateDate, {
        where: {
          coachId,
        },
      });
      ctx.body = { success: true, info: "修改成功", data: updatedRes };
    } catch (error) {
      ctx.body = { success: false, info: "数据失败" };
      console.log(error);
    }
  }

  /*
        author: ww 
        desc: 查找教练
        params:{type"教练类型",name:"教练姓名",sex:"教练性别",phone:"教练手机号码",qq:"教练qq",sports:"教练擅长的运动",Intro:"教练简介",
                price:"课程价格",courseDuration:"课程时长",address:"训练地址",date:"课程有效日期"}
        date:2021-08-10
    */

  /*
        1、[Op.like] :phone+'%'  模糊查询
        2、where 是一个对象
        3、选择某些特定属性,可以使用 attributes 参数

    */

  async findCoach() {
    const { ctx, app } = this;
    // const { Op } = app.Sequelize;

    let { id, type, name, limit, page ,price} = ctx.request.body;

    const findData = {};

    limit = limit ? limit : 30; //
    page = page ? page : 1;

    const offset = (page - 1) * limit;

    if (id) findData.coahchId = id;
    if (type) findData.coachType = type; //0:馆内教练;1:私人教练
    if (name) findData.coachName = name;
    if (price) findData.price=price;

    try {
      let res = await ctx.model.Coach.findAll({
        where: findData, //where:where
        limit,
        offset,
      });

      ctx.set("Access-Control-Allow-Credential", "true");

      if (res) {
        ctx.body = { success: true, data: res };
        console.log(res);
      } else {
        ctx.body = { success: false, errCode: 20001, msg: "找不到指定的值" };
      }
    } catch (e) {
      ctx.body = { success: false, errCode: "" };
      console.log(e);
    }
  }

  /*
        author: ww 
        desc: 更新教练
        params:{type"教练类型",name:"教练姓名",sex:"教练性别",phone:"教练手机号码",qq:"教练qq",sports:"教练擅长的运动",Intro:"教练简介",
                price:"课程价格",courseDuration:"课程时长",address:"训练地址",date:"课程有效日期"}
        date:2021-08-10
    */

  async updateCoach() {
    const { ctx, app } = this;
    const {
      id,
      type,
      name,
      sex,
      phone,
      qq,
      sports,
      intro,
      price,
      courseDuration,
      address,
      photo,
      courseName,
    } = ctx.request.body;

    const updateData = {}; //修改后的内容
    const w = {};
    if (id) w.coachId = id;
    if (type) updateData.coachType = type; //0:馆内教练;1:私人教练
    if (name) updateData.coachName = name;
    if (phone) updateData.coachPhone = phone;
    if (qq) updateData.coachQq = qq;
    if (sports) updateData.coachSports = sports;
    if (intro) updateData.coachIntro = intro;
    if (price) updateData.coursePrice = price;
    if (courseDuration) updateData.courseDuration = courseDuration;
    if (address) updateData.trainAddress = address;
    if (photo) updateData.coachPhoto = photo;
    if (courseName) updateData.courseName = courseName;
    try {
      let res = await ctx.model.Coach.update(updateData, {
        where: w, //查找位置
      });
      console.log(res);
      ctx.body = { success: true, errCode: "", msg: "修改成功", data: res };
    } catch (error) {
      ctx.body = { success: false, errCode: 20001 };
      console.log(error);
    }
  }

  /*
        author: ww 
        desc: 删除教练
        params:{type"教练类型",name:"教练姓名",sex:"教练性别",phone:"教练手机号码",qq:"教练qq",sports:"教练擅长的运动",Intro:"教练简介",
                price:"课程价格",courseDuration:"课程时长",address:"训练地址",date:"课程有效日期"}
        date:2021-08-10
    */

  async deleteCoach() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;
    const w = {};
    if (id) w.coachId = id;
    try {
      let res = await ctx.model.Coach.destroy({
        where: w,
      });
      ctx.body = { success: true, errCode: 20001, msg: "删除成功", data: res };
    } catch (e) {
      ctx.body = { success: false, errCode: 20001, msg: "删除失败" };
      console.log(e);
    }
  }

  // 单个查找数据
  async coachOne() {
    const { ctx, app } = this;
    // const coachId = ctx.params.coachId;
    const {coachId } = ctx.request.body;

    console.log('coachId',coachId)

    const where = {};
    if (coachId) where.coachId = coachId;

    try {
      const res = await ctx.model.Coach.findOne({
        where,
      });
      if (res) return (ctx.body = { data: res });
    } catch (e) {
      ctx.body = { success: false, errCode: 2004, info: "查找数据失败" };
    }
  }
}

module.exports = CoachController;
