'use strict';

const Controller = require('egg').Controller;

class CoachController extends Controller {
    /*
        author:xing
        desc:查询所有教练信息
        params:{
          coachType:教练类型,
          coachName:教练姓名,
          coachSex:教练性别,
          coachPhone:教练电话,
          wxOpenId:教练微信,
          coachQq:教练qq,
          coachSports:教练擅长的运动,
          coachIntro:教练个人简介,
          coursePrice:课程价格,
          courseDuration:课程时长,
          trainAddress:训练地址,
          coachPhoto:教练头像,
          createdAt:创建时间,
          updatedAt:更新时间,
        }
        data:2021-08-13
        */ 
    //查询所有教练
    async findAll() {
    const{ctx,app} = this;
    const {Op} = app.Sequelize;
    let{coachQq,wxOpenId,coachPhone,coachName,page,limit,coachType,coachSex,coachSports,coursePrice,courseDuration} = ctx.request.body;
    const where = {}
    limit = limit? limit:30;
    page = page ? page : 1;
    const offset = (page-1)*limit

    //查询的关键词
    if(coachType) where.coachType = coachType;
    if(coachQq) where.coachQq = coachQq;
    if(wxOpenId) where.wxOpenId = wxOpenId;
    if(coachName) where.coachName=coachName;
    if(coachSex) where.coachSex  = coachSex; 
    if(coachPhone)where.coachPhone=coachPhone;
    if(coachSports) where.coachSports = coachSports;
    if(coursePrice) where.coursePrice = coursePrice;
    if(courseDuration) where.courseDuration = courseDuration;
    try{
        let res = await ctx.model.Coach.findAndCountAll({
            where,
            limit,
            offset,
            order:[['coachId','desc']]
        })
        if(!res) return ctx.body = {success:false,errCode:50002,info:"系统有误 请联系管理员"};
        ctx.body = {success:true,errCode:50000,info:"查询成功",res }
    }catch(e){
        ctx.body = {success:false,info:"系统有误 请联系管理员",errCode:50001 }
    }
  }
   /*
        author:xing
        desc:查询单个教练信息
        params:{
          coachId:教练编号,
          coachName:教练姓名,
          coachPhone:教练电话,
         
        }
        data:2021-08-13
        */ 
  //查询单个教练
    async findOne() {
    const{ctx,app} = this;
    const {Op} = app.Sequelize;
    let{page,limit,coachName,coachPhone,coachId}= ctx.request.body;
    let where = {}
    limit = limit? limit:30;
    page = page ? page : 1;
    const offset = (page-1)*limit

    //查询的关键词
    if(coachId) where.coachId = coachId;
    if(coachName) where.coachName  = coachName; 
    if(coachPhone) where.coachPhone = coachPhone;
    
    try{
        const res = await ctx.model.Coach.findAndCountAll({
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
        desc:添加教练信息
        params:{
          mid:场馆运营商ID,
          coachType:教练类型,
          coachName:教练姓名,
          coachSex:教练性别,
          coachPhone:教练电话,
          wxOpenId:教练微信,
          coachQq:教练qq,
          coachSports:教练擅长的运动,
          coachIntro:教练个人简介,
          coursePrice:课程价格,
          courseDuration:课程时长,
          trainAddress:训练地址,
          coachPhoto:教练头像,
          createdAt:创建时间,
          updatedAt:更新时间,
        }
        data:2021-08-13
    */

    // 添加教练 
    async create(){
    const { ctx } = this;
    let {password,mid,emil,coachPhoto,birthday,personAddress,dengJi,courseDuration,trainAddress,weight,hight,zhengShu,coachSex,coursePrice,coachName,coachType,coachPhone, coachSports,coachIntro,wxOpenId,coachQq} = ctx.request.body;
    //数据过滤
    // if(!mid) return ctx.body = {success:false, errCode:50002,info:"请填选择场馆运营商ID" } 
    if(!coachName) return ctx.body = { success:false, errCode:50002,info:"请填教练姓名" }
    if(!coachType) return ctx.body = { success:false, errCode:50002,info:"请填写教练类型" }
    if(!/^1[3456789]\d{9}$/.test(coachPhone))  return ctx.body = { success:false, errCode:50002, info:"请填写正确的手机号码" }
    // if(!coachSports) return ctx.body = { success:false, errCode:50002,info:"请填教练擅长的运动" }
    // if(!coachIntro) return ctx.body = { success:false, errCode:50002,info:"请填写教练个人简介" }
    // if(!wxOpenId) return ctx.body = { success:false, errCode:50002,info:"请填写教练个人微信" }
    if(![0,1,'0','1'].includes(coachSex)) return ctx.body = { success:false, errCode:50002,info:"请正确填写教练性别" }
    // if(!coursePrice) return ctx.body = { success:false, errCode:50002,info:"请填写课程价格" }
    // if(!zhengShu) return ctx.body = { success:false, errCode:50002,info:"请填写证书" }
    // if(!personAddress) return ctx.body = { success:false, errCode:50002,info:"请填写教练个人地址" }
    // if(!hight) return ctx.body = { success:false, errCode:50002,info:"请填写教练身高" }
    // if(!weight) return ctx.body = { success:false, errCode:50002,info:"请填写教练体重" }
    if(!password) return ctx.body = { success:false, errCode:50002,info:"请填教练登录密码" }
    // if(!trainAddress) return ctx.body = { success:false, errCode:50002,info:"请填写训练地址" }
    // if(!courseDuration) return ctx.body = { success:false, errCode:50002,info:"请填写课程时长" }
    // if(!dengJi) return ctx.body = { success:false, errCode:50002,info:"请填写等级" }
    // if(!emil) return ctx.body = { success:false, errCode:50002,info:"请填写教练邮箱" }
    // if(!coachPhoto) return ctx.body = { success:false, errCode:50002,info:"请填写教练头像" }
    // if(!birthday) return ctx.body = { success:false, errCode:50002,info:"请填写教练生日" }
    try{
     const res = await ctx.model.Coach.create({
        coachName,
        mid,
        dengJi,
        courseDuration,
        trainAddress,
        personAddress,
        hight,
        weight,
        zhengShu,
        coursePrice,
        coachSex,
        coachType,
        coachPhone, 
        coachSports,
        coachIntro,
        wxOpenId,
        coachQq,
        coachPhoto,
        emil,
        birthday,
        createdAt: Date.now(),
        updatedAt: Date.now(),
     })
     if(!res) return ctx.body = {success:false,errCode:50001,info:"创建失败"};
     console.log("res",res)
     ctx.body = {success:true,errCode:50000,info:"添加成功",res}
   } catch(e){
     console.log(e)
     ctx.body = {success:true,errCode:50001,info:"添加失败"}
   }
 }

    // 修改教练信息
    async update() {
        
        const { ctx ,app} = this;
        let {password,birthday,personAddress,weight,hight,dengJi,zhengShu,courseDuration,emil,coachId,coachPhoto,coachSex,coursePrice,trainAddress,coachName,coachType,coachPhone, coachSports,coachIntro,wxOpenId,coachQq } = ctx.request.body;
        // const { Op} = app.Sequelize;
        const updateDate = {}
        const where = {}
        //修改的内容
        if(coachName) updateDate.coachName = coachName;
        if(coachType || coachType===0) updateDate.coachType = coachType;
        if(coachPhone) updateDate.coachPhone = coachPhone;
        if(coachSports) updateDate.coachSports = coachSports;
        if(coachIntro) updateDate.coachIntro=coachIntro;
        if(wxOpenId) updateDate.wxOpenId=wxOpenId;
        if(coachQq) updateDate.coachQq=coachQq;
        if(trainAddress) updateDate.trainAddress=trainAddress;
        if(coursePrice) updateDate.coursePrice=coursePrice;
        if(coachSex ||coachSex===0) updateDate.coachSex= coachSex;
        if(coachPhoto) updateDate.coachPhoto= coachPhoto;
        if(emil) updateDate.emil= emil;
        if(courseDuration) updateDate.courseDuration= courseDuration;
        if(zhengShu) updateDate.zhengShu= zhengShu;
        if(dengJi) updateDate.dengJi= dengJi;
        if(hight) updateDate.hight= hight;
        if(weight) updateDate.weight= weight;
        if(personAddress) updateDate.personAddress= personAddress;
        if(birthday) updateDate.birthday= birthday;
        if(password) updateDate.password = password
        //修改的指定条件（根据条件修改哪条数据）
        if(coachId) where.coachId = coachId
        try{

         const res = await ctx.model.Coach.update(updateDate,{
            
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
        desc:删除教练信息
        params:{
          coachId:教练编号,
          coachName:教练姓名,
          coachPhone:教练电话,
        }
        data:2021-08-13
        */ 
    //删除订单
    async delete() {
        const { ctx ,app} = this;
        let { coachName,coachPhone,coachId} = ctx.request.body;
        const where = {}
        
        //删除的指定条件（根据条件删除哪条数据）
        if(coachName) where.coachName = coachName;
        if(coachPhone) where.coachPhone=coachPhone;
        if(coachId) where.coachId=coachId;
        try{
    
          const res = await ctx.model.Coach.destroy({
            
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

module.exports = CoachController;
