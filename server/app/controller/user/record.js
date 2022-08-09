"use strict";

const Controller = require("egg").Controller;
// author : 薄荷,zwh
// describe : user表,record表的操作(针对数据的累加和迁移)
// 2021-8-18
class RecordController extends Controller {

  //增加积分记录
  async create() {
    const { ctx, app } = this;
    const {uid,cid} = ctx.request.body;
    const time = Date.now();
    try {
      //根据uid 找到user表当中的手机号
      let two = await ctx.model.User.findOne({
        where: {
          uid,
        },
      });
      //根据uid 找到config表中的积分配置
      let three = await ctx.model.Config.findOne({
        where: {
          cid,
        },
      });
      let one = await ctx.model.Record.create({
        time: time,
        uid:uid,
        phone: two.phone,
        integral: three.integral, //领取的积分
        channel: three.channel, //积分获取途径
      });
      ctx.body = { success: true, info: "成功", data: one };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: "失败" };
    }
  }

  // 兑换积分(开始)
  async jiFenAdd() {
    const { ctx, app } = this;
    const phone = ctx.params.phone;
    const cid = ctx.params.cid;
    console.log('手机号',phone)
    const time = Date.now();
    let { integral,channel} = ctx.request.body;
    try {
      let fenOne = await ctx.model.User.findOne({
        where: {
          phone,
        },
      });
       //根据uid 找到config表中的积分配置
       let fenConfig = await ctx.model.Config.findOne({
        where: {
          cid,
        },
      });
      let fenTwo = await ctx.model.Record.create({
        time: time,
        phone: fenOne.phone,
        integral: fenConfig.integral, //领取的积分
        channel: fenConfig.channel, //积分获取途径
      });
      ctx.body = { success: true, info: "成功插入数据", data: [fenShu,fenTwo] };
    } catch (e) {
      console.log(e);
      // 数据插入异常
      ctx.body = { success: false,errCode: 40000, info: "失败" };
    }
  }
  // 结束


  //根据uid查询到所有的总积分 author: 薄荷
  async findAll() {
    const { ctx, app } = this;
    const {uid} = ctx.request.body;

    try {
      let res = await ctx.model.Record.findAll({
        where: {
          uid,                  
        },
      });
      ctx.body = { success: true, info: "成功", data: res };
      // 个人积分累加数据内容
      const arr = [];
      for (let i in res) {
        arr.push(res[i].integral);
      }
      console.log("个人积分数据为:", arr);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const totalIntegral = arr.reduce(reducer);
      console.log("个人总的积分为", totalIntegral);

      ctx.body = { success: true, info: "", data: totalIntegral };

      

      // 针对User数据
      let red=await ctx.model.User.update(
        {
          integral: totalIntegral,
        },
        {
          where: {
            uid,
          },
        }
      );
      ctx.body = "成功修改插入数据";

      

      let ress=await ctx.model.User.findOne(
        {
          where: {
            uid
          },
        }
      );
      ctx.body = { success: true, info: "成功", data: ress };

      

      

    } 
    catch (e) {
      ctx.body = { success: false, info: "失败" };
      console.log(e);
    }
  }

  
//个人积分查询
  // 查找所有签到信息
  async selectAll(){
    const { ctx, app } = this;
    const {uid} = ctx.request.body;
    console.log('uid',uid)

    try {
      let res = await ctx.model.Record.findAll({
        where: {
          uid,
        },
      });
      console.log("ahfri", res);
      ctx.body = { success: true, info: "成功", data:res };
    } 
    catch (e) {
      ctx.body = { success: false, info: "失败" };
      console.log(e);
    }
  }


  //config 对积分配置表增加积分获取情况
  async configInt() {
    const { ctx, app } = this;
    const { channel, integral } = ctx.request.body;

    if (!channel)
      return (ctx.body = { success: false, info: "请输入获取积分的途径" });
    if (!integral)
      return (ctx.body = { success: false, info: "请输入获取积分的途径" });

    try {
      await ctx.model.Config.create({
        channel: channel,
        integral: integral,
      });
      ctx.body = { success: true, info: "配置加入成功" };
    } catch (e) {
      console.log(e);
      ctx.body = { success: true, info: "配置失败" };
    }
  }


  //查找签到状态
  async signin(){
    const {ctx,app} = this;
    const uid = ctx.params.uid

    try{
      let res = await ctx.model.User.findOne({
        where:{
          uid:uid
        }
      })
      console.log('res',res)
      ctx.body={success:true,info:"状态传入成功",data:res.record}
    }catch(e){
      console.log(e)
      ctx.body={success:true,info:"状态传入失败"}
    }
  }


    //修改签到状态
    async signinCre(){
      const {ctx,app} = this;
      const {uid} = ctx.request.body;
      const updateData = {}

      try{
        let res = await ctx.model.User.findOne({
          where:{ uid}
        })
        if(res.record==1){
          updateData.record = 2
          await ctx.model.User.update(updateData,{
            where:{ uid}
          })
        }
        // console.log('res',res)
        ctx.body={success:true,info:"修改成功",data:res.record}
      }catch(e){
        console.log(e)
        ctx.body={success:false,info:"修改失败"}
      }
    }



  //   async updateSignin(){
  //     const {ctx,app} = this
  //     const updateData = {}
      
  //     try{
  //       //找出user表当中的所有record的数据
  //       let one = await ctx.model.User.findAll({
          
  //       })

  //       for (const i of one) {
  //         let two = await ctx.model.User.update({
  //           record:1
  //         },{
  //           where:{
  //             uid:i.uid
  //           }
  //         })
  //         console.log('two',two)
  //       }       
        
  //       ctx.body={success:true,info:"修改成功",}
  //     }catch(e){
  //       console.log(e)
  //       ctx.body={success:true,info:"修改失败"}
  //     }
  // }
}

module.exports = RecordController;
