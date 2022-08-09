'use strict';

const Controller = require('egg').Controller;

class MemberController extends Controller {
    /*
        author:xing
        desc:查询所有会员卡信息
        params:{
          vipSex:性别,
          vipName:会员姓名,
          startTime：开卡时间,
          endTime：到期日期,
          vipType：会员卡类型,
          totalSpend：消费总额,
          spendItem：消费的项目,
          vipIntegral：会员积分,
          cardsRemain：卡内剩余,
          vipPhone：电话,
          vipState：会员状态,
          vipBirthday：会员生日,
          vipQian：会员卡折后价格,
          vipMoney：会员卡实际价格,
          vipImg：会员卡图片,
          vipDays：有效天数,
          vipyueke：可约课次数,
          createdAt:创建时间,
          updatedAt:更新时间,
        }
        data:2021-08-16
        */ 
    //查询所有会员卡信息
  async findAll() {
    const{ctx,app} = this;
    const {Op} = app.Sequelize;
    let{page,limit,vipSex,startTime,endTime,vipType,totalSpend,spendItem,vipIntegral,vipDays,vipyueke,createdAt,updatedAt,vipState} = ctx.request.body;
    let where = {}
    limit = limit? limit:30;
    page = page ? page : 1;
    const offset = (page-1)*limit
    //查询的关键词
    if(vipSex) where.vipSex = vipSex;
    if(startTime) where.startTime = startTime;
    if(endTime) where.endTime = endTime;
    if(vipType) where.vipType = vipType;
    if(totalSpend) where.totalSpend = totalSpend;
    if(spendItem) where.spendItem = spendItem;
    if(vipIntegral) where.vipIntegral = vipIntegral;
    if(vipDays) where.vipDays = vipDays;
    if(vipyueke) where.vipyueke = vipyueke;
    if(vipState) where.vipState = vipState;
    if(createdAt) where.createdAt = createdAt;
    if(updatedAt) where.updatedAt = updatedAt;
    try{
        const res = await ctx.model.Member.findAndCountAll({
            where,
            limit,
            offset,
            order:[ ['vipId','desc' ]]
        })
        if(!res) return ctx.body = {success:false,errCode:50002,info:"系统有误 请联系管理员"};
        ctx.body = {success:true,errCode:50000,info:"查询成功",res }
    }catch(e){
        ctx.body = {success:false,info:"系统有误 请联系管理员",errCode:50001 }
    }
  }

  /*
        author:xing
        desc:查询单个会员卡信息
        params:{
          vipId:会员编号,
          vipNumber:会员卡号,
          vipName:会员姓名,
         
        }
        data:2021-08-16
        */ 
  //查询单个会员卡信息
  async findOne() {
    const{ctx,app} = this;
    const {Op} = app.Sequelize;
    let{page,limit,vipId,vipNumber,vipName,vipType}= ctx.request.body;
    let where = {}
    limit = limit? limit:30;
    page = page ? page : 1;
    const offset = (page-1)*limit

    //查询的关键词
    if(vipId) where.vipId = vipId;
    if(vipNumber) where.vipNumber  = vipNumber; 
    if(vipName) where.vipName = vipName;
    if(vipType)where.vipType = vipType
    try{
        const res = await ctx.model.Member.findAndCountAll({
            where,
            limit,
            offset
        })
        if(!res.count) return ctx.body = {success:false,errCode:50002,info:"系统有误 请联系管理员"};
        ctx.body = {success:true,errCode:50000,info:"查询成功",res }
    }catch(e){
        ctx.body = {success:false,info:"系统有误 请联系管理员",errCode:50001 }
    }
  }

  /*
        author:xing
        desc:添加会员卡信息
        params:{
          vipSex:性别,
          vipNumber:会员卡卡号
          vipName:会员姓名,
          startTime：开卡时间,
          endTime：到期日期,
          vipType：会员卡类型,
          totalSpend：消费总额,
          spendItem：消费的项目,
          vipIntegral：会员积分,
          cardsRemain：卡内剩余,
          vipPhone：电话,
          vipState：会员状态,
          vipBirthday：会员生日,
          vipQian：会员卡折后价格,
          vipMoney：会员卡实际价格,
          vipImg：会员卡图片,
          vipDays：有效天数,
          vipyueke：可约课次数,
          createdAt:创建时间,
          updatedAt:更新时间,
        }
        data:2021-08-16
    */

    // 添加会员卡信息 
    async create(){
        const { ctx } = this;
        let{vipSex,vipName,vipPhone,vipState,vipNumber,startTime,vipType,spendItem,createdAt,updatedAt} = ctx.request.body;
        //数据过滤
        if(!vipNumber) return ctx.body = {success:false, errCode:50002,errorMessage:"请填写会员卡号" }
        if(![0,1,'0','1'].includes(vipSex)) return ctx.body = { success:false, errCode:50002,errorMessage:"请正确填写会员性别" }
        if(!vipName) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写会员姓名" }
        if(!/^1[3456789]\d{9}$/.test(vipPhone))  return ctx.body = { success:false, errCode:50002, errorMessage:"请填写正确的手机号码" }
        if(![0,1,2,3,4,5,'0','1','2','3','4','5'].includes(vipType)) return ctx.body = { success:false, errCode:50002,errorMessage:"请正确填写会员卡类型" }
        if(!spendItem) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写消费的项目" }
        if(![0,1,'0','1'].includes(vipState)) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写会员状态" }
        try{
         const res = await ctx.model.Member.create({
            vipNumber,
            vipSex,
            vipName,
            vipPhone,
            vipType,
            spendItem,
            vipState,
            startTime:Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
         })
         if(!res) return ctx.body = {success:false,errCode:50001,errorMessage:"创建失败"};
         console.log("res",res)
         ctx.body = {success:true,errCode:50000,info:"添加成功",res}
       } catch(e){
         console.log(e)
         ctx.body = {success:true,errCode:50001,info:"添加失败"}
       }
    }
    
    // 修改会员卡信息
    async update() {
        
        const { ctx ,app} = this;
        let{vipImg,vipMoney,vipQian,vipBirthday,cardsRemain,vipState,vipPhone,vipName,vipId,vipNumber,vipSex,startTime,endTime,vipType,totalSpend,spendItem,vipIntegral,vipDays,vipyueke,createdAt,updatedAt} = ctx.request.body;
        // const { Op} = app.Sequelize;
        const updateDate = {}
        const where = {}
        //修改的内容
        if(vipName) updateDate.vipName = vipName;
        if(vipSex || vipSex===0) updateDate.vipSex = vipSex;
        if(startTime) updateDate.startTime = startTime;
        if(endTime) updateDate.endTime = endTime;
        if(vipType || vipType===0) updateDate.vipType = vipType;
        if(totalSpend) updateDate.totalSpend = totalSpend;
        if(spendItem) updateDate.spendItem = spendItem;
        if(vipIntegral) updateDate.vipIntegral=vipIntegral;
        if(vipDays) updateDate.vipDays=vipDays;
        if(cardsRemain) updateDate.cardsRemain=cardsRemain;
        if(vipPhone) updateDate.vipPhone=vipPhone
        if(vipyueke) updateDate.vipyueke=vipyueke;
        if(vipState || vipState===0) updateDate.vipState = vipState;
        if(createdAt) updateDate.createdAt= createdAt;
        if(vipBirthday) updateDate.vipBirthday=vipBirthday;
        if(vipQian) updateDate.vipQian=vipQian;
        if(vipMoney) updateDate.vipMoney=vipMoney;
        if(vipImg) updateDate.vipImg=vipImg;
        //修改的指定条件（根据条件修改哪条数据）
        if(vipId) where.vipId = vipId
        if(vipNumber) where.vipNumber = vipNumber
        try{

         const res = await ctx.model.Member.update(updateDate,{
            
            where
          }) 
          if(!res) return ctx.body = {success:false,errCode:50001,info:"修改失败"};
          console.log('res',res) 

          ctx.body = {success:true, errCode: 50000,info:"修改成功",res}
    
        } catch(e){
          console.log(e)
          ctx.body = {success:false, errCode: 50001,info:"修改失败"}
          
        }
       
    }

    /*
        author:xing
        desc:删除会员卡信息
        params:{
          vipId:会员编号,
          vipNumber:会员卡号,
          vipPhone:电话,
         
        }
        data:2021-08-16
        */ 
  //删除会员卡信息
  async delete() {
    const { ctx ,app} = this;
    let { vipId,vipNumber,vipPhone} = ctx.request.body;
    const { Op} = app.Sequelize;
    
    const where = {}
    
    //删除的指定条件（根据条件删除哪条数据）
    if(vipPhone) where.vipPhone = vipPhone
    if(vipId) where.vipId = vipId
    if(vipNumber) where.vipNumber=vipNumber
    //destroy
    try{

      const res = await ctx.model.Member.destroy({
        
        where
      }) 
      if(!res) return ctx.body = {success:false,errCode:50001,info:"删除失败"};
      ctx.body = {success:true,errCode:50000,info:"删除成功",res}
      

    } catch(e){
      console.log(e)
      ctx.body = {success:false,errCode:50001,info:"删除失败"}

    }
   
}

}

module.exports = MemberController;
