"use strict";

/*
author: jack
desc: 我的订单
params:{};
data:2021-08-16
*/

const Controller = require("egg").Controller;

// 生成随机数
const { customAlphabet } =require('nanoid');

class OrderController extends Controller {
  // 场地预约订单(增)
  async cgadd() {
    const { ctx } = this;

    const { did, orderNumber, userid, uname, cdleixing, packageType, cdid, yytime, fuwu, money, dtype, state, coachName, courseName, message, reservePhone, sitePrice ,mid} = ctx.request.body;


    // 数据过滤

      if (!userid) return ctx.body = { success: false, errCode: 3002, info: 'ID不能为空' };

      if (!uname) return ctx.body = { success: false, errCode: 3002, info: '用户名不能为空' };

      if (!cdleixing) return ctx.body = { success: false, errCode: 3002, info: '请选择场地类型' };

      if (!packageType) return ctx.body = { success: false, errCode: 3002, info: '请选择包场类型' };
      if (![ 1, 2, '1', '2' ].includes(packageType)) return ctx.body = { success: false, errCode: 3002, info: '包场类型有误' };

      if (![ 0, 1, '0', '1' ].includes(fuwu)) return ctx.body = { success: false, errCode: 3002, info: '服务类型有误' };

      if (!yytime) return ctx.body = { success: false, errCode: 3002, info: '请选择预约时间' };

      if (!/^\d+$/.test(money)) return ctx.body = { success: false, errCode: 3002, info: '输入的金额有误' };


      if (![ 1, '1' ].includes(dtype)) return ctx.body = { success: false, errCode: 3002, info: '订单类型有误' };
      if (!dtype) return ctx.body = { success: false, errCode: 3002, info: '无此订单' };

      if (![ 1, 2, 3, '1', '2', '3' ].includes(dtype)) return ctx.body = { success: false, errCode: 3002, info: '订单状态异常' };

      if (message.length > 255) return ctx.body = { success: false, errCode: 3002, info: '您输入的字数过多' };


    try {
      await ctx.model.Order.create({
        did, orderNumber, userid, uname, cdleixing, cdid, yytime, fuwu, money, dtype, state, coachName, courseName, message, packageType, reservePhone, sitePrice,mid
      });

      ctx.body = { success: true, errCode: "" };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, errCode: 3002 }; // 3002数据错误
    }
  }

  // 课程预约订单(增)
  async kcadd() {
    const { ctx } = this;
    const {
      did,
      userid,
      uname,
      money,
      dtype,
      coachName,
      courseName,
      message,
      reservePhone,
    } = ctx.request.body;

    // 数据过滤
    if (!userid)
      return (ctx.body = { success: false, errCode: 3002, info: "ID不能为空" });

    if (!uname)
      return (ctx.body = {
        success: false,
        errCode: 3002,
        info: "用户名不能为空",
      });

    if (!dtype)
      return (ctx.body = { success: false, errCode: 3002, info: "请选择课程" });
    if (![0, "0"].includes(dtype))
      return (ctx.body = {
        success: false,
        errCode: 3002,
        info: "订单信息有误",
      });

    try {
      await ctx.model.Order.create({
        did,
        userid,
        uname,
        money,
        coachName,
        courseName,
        message,
        dtype,
        reservePhone,
      });
      ctx.body = { success: true, errCode: "" };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, errCode: 3002 }; // 3002数据错误
    }
  }


    async addSjOrder(){
      const { ctx ,app} = this;
      const {dtype,sjCoachName,money,sjCoachPlace,state,createdAt,coachId,orderNumber} = ctx.request.body;

      const nanoidNum = customAlphabet('1234567890abcdef', 10)()

      console.log('我是nanoidNum',nanoidNum);
      try {
          let res = await ctx.model.Order.create({
            dtype,sjCoachName,money,sjCoachPlace,state,createdAt,coachId,orderNumber:nanoidNum
          })
          ctx.body={success:true,errCode:20010,msg:"创建成功"}
          console.log(res);
      } catch (e) {
          ctx.body={success:false,errCode:20011,msg:"创建失败"}
          console.log(e);
      }
    }

    async updateSjOrder(){
      const {ctx,app}=this;
      const {orderNumber,state} = ctx.request.body;
      const updateData={}
      const where={}

      if(orderNumber) where.orderNumber=orderNumber;
      if(state) updateData.state=state;
      try {
          let res=await ctx.model.Order.update(updateData,{
              where,
          })
          console.log(res);
          ctx.body={success:true,errCode:20030,msg:"修改成功"}
      } catch (e) {
          ctx.body={success:false,errCode:20031,msg:'修改失败'}
          console.log(e);
      }
  }

  // 修改
  async modify() {
    const { ctx } = this;
    const {
      orderNum,
      did,
      cdleixing,
      cdid,
      yytime,
      message,
      coachName,
      courseName,
      dtype,
      state,
      packageType,
      reservePhone,
      sitePrice,
    } = ctx.request.body;
    const updateData = {};
    const where = {};
    if (orderNum) where.orderNum = orderNum;
    if (did) where.did = did;
    if (cdleixing) updateData.cdleixing = cdleixing;
    if (cdid) updateData.cdid = cdid;
    if (yytime) updateData.yytime = yytime;
    if (message) updateData.message = message;
    if (coachName) updateData.coachName = coachName;
    if (courseName) updateData.courseName = courseName;
    if (dtype) updateData.dtype = dtype;
    if (state) updateData.state = state;
    if (packageType) updateData.packageType = packageType;
    if (reservePhone) updateData.reservePhone = reservePhone;
    if (sitePrice) updateData.sitePrice = sitePrice;

    // 数据过滤

    try {
      await ctx.model.Order.update(updateData, {
        where,
      });
      ctx.body = { success: true, info:"修改成功" };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, errCode: 3002 }; // 3002数据错误
    }
  }

  // 删除
  async deleteAll() {
    const { ctx } = this;
    const {
      did,
      cdleixing,
      cdid,
      yytime,
      message,
      coachName,
      courseName,
      dtype,
      state,
      packageType,
      reservePhone,
      sitePrice,
    } = ctx.request.body;
    const where = {};
    if (did) where.did = did;
    if (cdleixing) where.cdleixing = cdleixing;
    if (cdid) where.cdid = cdid;
    if (yytime) where.yytime = yytime;
    if (message) where.message = message;
    if (coachName) where.coachName = coachName;
    if (courseName) where.courseName = courseName;
    if (dtype) where.dtype = dtype;
    if (state) where.state = state;
    if (packageType) where.packageType = packageType;
    if (reservePhone) where.reservePhone = reservePhone;
    if (sitePrice) where.sitePrice = sitePrice;

    try {
      await ctx.model.Order.destroy({
        where,
      });
      ctx.body = { success: true, errCode: "" };
    } catch (e) {
      ctx.body = { success: false, errCode: 3002 }; // 3002数据错误
    }
  }

  // 查找
  async findAll() {
    const { ctx } = this;

    let {
      did,
      page,
      limit,
      userid,
      cdleixing,
      uname,
      cdid,
      yytime,
      message,
      coachName,
      courseName,
      dtype,
      state,
      packageType,
      reservePhone,
      sitePrice,
      uid,
    } = ctx.request.body;
    limit = limit ? limit : 10;
    page = page ? page : 1;
    const offset = (page - 1) * limit; // offset: 匹配的数据里 跳过多少条数据

    const where = {}; // 查询条件
    if (did) where.did = did;
    if (userid) where.userid = userid;
    if (cdleixing) where.cdleixing = cdleixing;
    if (uname) where.uname = uname;
    if (cdid) where.cdid = cdid;
    if (yytime) where.yytime = yytime;
    if (message) where.message = message;
    if (coachName) where.coachName = coachName;
    if (courseName) where.courseName = courseName;
    if (dtype) where.dtype = dtype;
    if (state) where.state = state;
    if (packageType) where.packageType = packageType;
    if (reservePhone) where.reservePhone = reservePhone;
    if (sitePrice) where.sitePrice = sitePrice;
    if (uid) where.uid = uid;
    // count是匹配数据的总数， rows当前页面要显示的数据
    //连表查询   Court
    await ctx.model.Order.belongsTo(ctx.model.Court, {
      foreignKey: "ctid",
      targetKey: "ctid",
    });
    await ctx.model.Order.belongsTo(ctx.model.Merchant, {
      foreignKey: "mid",
      targetKey: "mid",
    });
    await ctx.model.Order.belongsTo(ctx.model.User, {
      foreignKey: "uid",
      targetKey: "uid",
    });
    await ctx.model.Order.hasMany(ctx.model.OrderRecord, {
      foreignKey: "did",
      targetKey: "did",
    });

    const { count, rows } = await ctx.model.Order.findAndCountAll({
      offset,
      limit,
      where, // 查询条件
      include: [
        {
          model: ctx.model.Merchant,
          required: false,
        },
        {
          model: ctx.model.Court,
          required: false,
        },
        {
          model: ctx.model.User,
          required: false,
        },
        {
          model: ctx.model.OrderRecord,
          required: false,
        },
      ],
    });
    const res = { count, rows };
    ctx.body = res;
  }

  /*
    author: ww
    desc: 查询全部对应coachId的私教订单
    params:{sjCoachName:私教教练名字,money：付款金额,sjCoachPlace:私教上课场所,
            ？:预约时间、state:订单状态、createdAt:订单创建时间};
    data:2021-09-19
  */
    async findAllSjOrder(){
      const {ctx,app}=this;
      const {coachId} = ctx.request.body

      const findData={}

      if(coachId) findData.coachId=coachId;


      try {
          let res=await ctx.model.Order.findAll({
              where:findData
          })
          if(res){
              ctx.body={success:true,data:res}
              console.log(res)
          }else{
              ctx.body={success:false,errCode:20020,msg:"找不到指定的值"}
          }
      } catch (e) {
          ctx.body={success:false,errCode:20021}
          console.log(e)
      }
    }

      /*
        author: ww
        desc: 查询对应orderNumber的私教订单
        params:{};
        data:2021-09-22
      */
     async findOneSjOrder(){
        const {ctx,app}=this;
        const {orderNumber}=ctx.request.body;
        try {
            let res=await ctx.model.Order.findOne({
                where:{
                  orderNumber
                }
            })
            if(res){
                ctx.body={success:true,data:res}
                console.log(res)
            }else{
                ctx.body={success:false,errCode:20022,msg:"找不到指定的值"}
            }
        } catch (e) {
            ctx.body={success:false,errCode:20023}
            console.log(e)
        }
     }


  async findById() {
    const { ctx } = this;
    const { did } = ctx.request.body;
    const where = {};
    if(did)  where.did = did;

    await ctx.model.Order.belongsTo(ctx.model.Court, {
      foreignKey: "ctid",
      targetKey: "ctid",
    });
    await ctx.model.Order.belongsTo(ctx.model.Merchant, {
      foreignKey: "mid",
      targetKey: "mid",
    });
    await ctx.model.Order.belongsTo(ctx.model.User, {
      foreignKey: "uid",
      targetKey: "uid",
    });
    await ctx.model.Order.hasMany(ctx.model.OrderRecord, {
      foreignKey: "did",
      targetKey: "did",
    });
    const res = await ctx.model.Order.findOne({
        where: {
          did,
        },
        include: [
          {
            model: ctx.model.Merchant,
            required: false,
          },
          {
            model: ctx.model.Court,
            required: false,
          },
          {
            model: ctx.model.User,
            required: false,
          },
          {
            model: ctx.model.OrderRecord,
            required: false,
          },
        ],
      });

    ctx.body = res;
  }




  // 课程购买
  async coursePay() {
    const { ctx, app } = this;
    const {
      orderNumber,
      coachId,
      courseId,
      money,
      dtype,
      courseName,
      coachName,
      courseAddress,
      courseChangDi,
      coachPhone,
      userNumber,
      state,
      mid,
      ctid,
      uid,
      startTime,
      endTime,
    } = ctx.request.body;

    const suiJiShu = customAlphabet('1234567890abcdef', 10)()
    try {
      const res = await ctx.model.Order.create({
        orderNumber:suiJiShu, //订单编号
        coachId,
        courseId, //课程ID
        money, //付款金额
        dtype,//团课订单
        coachName, //上课教练
        courseName, //课程类型
        courseAddress, //上课地点
        courseChangDi, //上课场地
        coachPhone, //上课教练电话
        userNumber, //上课人数
        state, //订单状态
        mid, //运营商编号
        ctid, //场馆编号
        uid, //用户id
        startTime, //课程开始上课时间
        endTime, //课程结束上课时间
      });
      ctx.body = { success: true, errCode: "3002", msg: "创建成功" };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, errCode: 3002 }; // 3002数据错误·
    }
  }

  // 通过课程订单查找信息
  async couresPayNumber() {
    const { ctx ,app} = this;
    const { orderNumber } = ctx.request.body;
    try {
      const res  = await ctx.model.Order.findOne({
        where: {
          orderNumber
        }
      })
      ctx.body = { success: true, msg: "数据查找成功" ,data: res};
    } catch (error) {
      console.log(error);
    }
  }

      /*
        author: ww
        desc: 删除对应orderNumber的私教订单
        params:{};
        data:2021-09-26
      */
        async deleteSjOrder(){
          const { ctx,app}=this;
          const { orderNumber } = ctx.request.body;
          console.log('我是orderNumber',orderNumber)
          const deleteData={}
          if(orderNumber) deleteData.orderNumber=orderNumber
          try{
            let res=await ctx.model.Order.destroy({
              where:deleteData
            })
            console.log(res)
            ctx.body={success:true,errCode:20040,msg:"删除成功"}

          }catch (e) {
            ctx.body={success:false,errCode:20041,msg:"删除失败"}
            console.log(e)
          }
        }
  // 通过某个订单编号删除某个订单
  async cannelOrderNumber(){
    const { ctx, app } = this;
    const { orderNumber } = ctx.request.body;
    try {
      const res = await ctx.model.Order.destroy({
        where: {
          orderNumber
        }
      })
      ctx.body = { success: true, info: "订单删除成功" ,data: res};

    } catch (error) {
      ctx.body = { success: false, info: "数据有误"};
      console.log(error);
    }
  }
  // 已取消的订单或者待付款的订单重新付款
  async updateState(){
    const { ctx, app } = this;
    const { orderNumber,uid} = ctx.request.body;


    const where = {}
    if(orderNumber) where.orderNumber = orderNumber
    if(uid) where.uid = uid
    try {
      let resOne =await ctx.model.Order.update(
        {
          state:'2'
        },
        {
          where
        }
      )
      ctx.body = {success:true,info:'成功修改数据'}

      let resTwo =await ctx.model.Order.findOne(
        {
          where
        }
      )
      ctx.body = {success:true,info:'成功查找到数据',data:resTwo}

    } catch (error) {
      ctx.body = {success:false,error:4001,info:'数据有误'}
    }
  }


}




module.exports = OrderController;
