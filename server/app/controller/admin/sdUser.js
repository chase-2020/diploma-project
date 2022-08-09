'use strict';

const Controller = require('egg').Controller;

class SdUserController extends Controller {
    /*
        author:xing
        desc:查询条件场馆信息
        params:{
            name:场馆名称,
            site:场馆地址,
            type:场馆类型,
            phone:联系电话,
            mid:场馆编号
        }
        data:2021-08-10
    */
    //查询多个场馆信息
    async find() {

        const { ctx ,app} = this;
        let { ctid, name,siteAddress, type, phone, bcType,mid,time,retes,limit, page} = ctx.request.body;
        const { Op} = app.Sequelize;
        const where = {}
        //查询的关键词
        if(phone) where.phone = { [Op.like]:phone+'%' };
        if(ctid) where.ctid = ctid
        if(name) where.name = name
        if(siteAddress) where.siteAddress = siteAddress
        if(bcType) where.bcType = bcType
        if(mid) where.mid = mid
        if(time) where.time = time
        if(retes) where.retes = retes
        if(type) where.type = { [Op.like]:'%'+type+'%' };
        //分页处理
        limit = limit? limit:30;
        page = page ? page : 1;
        const offset = (page-1)*limit

        try{
            let res = await ctx.model.Court.findAndCountAll({
                where,
                limit,
                offset,
                order: [['ctid','desc']]
            })  
            console.log('row',res)
            if(!res) return ctx.body = {success:false,errCode:50001,info:"查询失败"};
            ctx.body = {success:true, errCode: 50000,info:"查询成功",res}
        }catch(e){
            console.log(e);
            ctx.body = {success:false, errCode: 50001,info:"查询失败"}
        }
    }

    /*
        author:xing
        desc:查询单个场馆信息
         params:{
            phone:联系电话,
            mid:场馆编号
        }
        data:2021-08-10
    */
    //查询单个场馆信息
    async findOne() {
        const{ctx,app} = this;
        const {Op} = app.Sequelize;
        let{page,limit,mid,phone,type}= ctx.request.body;
        let where = {}
        limit = limit? limit:30;
        page = page ? page : 1;
        const offset = (page-1)*limit

        //查询的关键词
        if(mid) where.mid = mid;
        if(phone) where.phone = phone;
        if(type) where.type = type;
        try{
            const res = await ctx.model.Court.findAndCountAll({
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
        desc:添加场馆
         params:{
            site:场馆地址,
            type:场馆类型,
            phone:联系电话,
            mid:场馆编号
            sdInfo:场馆简介
        }
        data:2021-08-10
        */

    //添加场馆
    async create() {
        const { ctx } = this;
        let { name,siteAddress, type,mid, phone, bcType,sdInfo,plan,time,retes,coverPhoto} = ctx.request.body;


        //数据过滤
         if(!name) return ctx.body = { success:false, errCode:50002,info:"请填写场馆名称" }
         if(!siteAddress) return ctx.body = { success:false, errCode:50002,info:"请填写场馆地址" }
         if(!type) return ctx.body = { success:false, errCode:50002,info:"请填写场馆类别" }
         if(!/^1[3456789]\d{9}$/.test(phone))  return ctx.body = { success:false, errCode:50002, info:"请填写正确的手机号码" }
         if(!sdInfo) return ctx.body = { success:false, errCode:50002,info:"请填写场馆简介" }
         if(!mid) return ctx.body = { success:false, errCode:50002,info:"请填写运营商编号" }
         if(!retes) return ctx.body = { success:false, errCode:50002,info:"请填写场馆收费标准" }
         if(!time) return ctx.body = { success:false, errCode:50002,info:"请填写营业时间" }
         if(!bcType) return ctx.body = { success:false, errCode:50002,info:"请填写包场类型" }
        //  if(!plan) return ctx.body = { success:false, errCode:50002,info:"请填加平面图" }
         if(!coverPhoto) return ctx.body = { success:false, errCode:50002,info:"请填加场馆封面" }
        try{
            let res = await ctx.model.Court.create({
                
                // mid: "3",
                // site: "天河路666",
                // type:"篮球666",
                // phone:"13211506666",
                // sdinfo:"666",
                // businessAt:Date.now(),
                // createdAt: Date.now(),
                // updatedAt: Date.now(),
                plan,
                coverPhoto,
                siteAddress,
                type,
                phone,
                time,
                name,
                bcType,
                sdInfo,
                mid,
                retes,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            })
            if(!res) return ctx.body = {success:false,errCode:50001,info:"添加失败"};
            console.log('res',res)

            ctx.body = {success:true, errCode: 50000,info:"添加成功",res}
        }catch(e){
            console.log(e);
            ctx.body = {success:false, errCode: 50001,info:"添加失败"};
        }
    }
        /*
        author:xing
        desc:修改场馆信息
        params:{
            site:场馆地址,
            type:场馆类型,
            phone:联系电话,
            mid:场馆编号,
            sdInfo:场馆简介
        }
        data:2021-08-11
        */ 
    // 修改场馆信息
    async update() {
        const { ctx ,app} = this;
        let { retes,name,siteAddress,type,phone,ctid,sdInfo,bcType,plan,time,coverPhoto,mid } = ctx.request.body;
        const { Op} = app.Sequelize;
        let updateDate = {}
        let where = {}
        //修改的内容
        if(retes) updateDate.retes = retes;
        if(phone) updateDate.phone = phone;
        if(name) updateDate.name = name
        if(siteAddress) updateDate.siteAddress = siteAddress
        if(type) updateDate.type = type
        if(sdInfo) updateDate.sdInfo = sdInfo
        if(bcType) updateDate.bcType = bcType
        if(plan) updateDate.plan = plan
        if(coverPhoto) updateDate.coverPhoto = coverPhoto
        if(time) updateDate.time = time
        if(mid) updateDate.mid = mid
        //根据条件删除哪条数据
        if(ctid) where.ctid = ctid
        
        try{
            let res = await ctx.model.Court.update(updateDate,{
                        where
            }) 
            if(!res) return ctx.body = {success:false,errCode:50001,info:"修改失败"};
            console.log('res',res)

            ctx.body = {success:true, errCode: 50000,info:"修改成功",res}
        }catch(e){
            console.log(e);
            ctx.body = {success:false, errCode: 50001,info:"修改失败"};
        }
    }
    /*
        author:xing
        desc:删除场馆信息
        params:{mid：场馆编号}
        data:2021-08-10
        */
    // 删除场馆信息
    async destroy() {
        const { ctx ,app} = this;
        let { ctid } = ctx.request.body;
        const { Op} = app.Sequelize;
        const where = {}
        //（根据条件删除哪条数据）
        if(ctid) where.ctid = ctid
        try{
            let res = await ctx.model.Court.destroy({
                
                where

            }) 
            if(!res) return ctx.body = {success:false,errCode:50002,info:"删除失败"};
            console.log('res',res)

            ctx.body = {success:true, errCode: 50000,info:"删除成功",res}
        }catch(e){
            console.log(e);
            ctx.body = {success:false, errCode: 50001,info:"删除失败"};
        }
    }
}

module.exports = SdUserController;
