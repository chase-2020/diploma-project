'use strict';

const Controller = require('egg').Controller;

class ActivityTextController extends Controller {
        /*
        author:lby
        desc:查询赛事报名登记表信息
        params:{
            rid:登记id,
            djNum:登记编号,
            actid:赛事活动id,
            uid:报名用户id1,
            name:姓名,
            phone:联系电话,
            ID:身份证号,
            address:通讯地址,
            healthy:身体健康情况,
            registrationStatus:报名状态,
        }
        data:2021-09-22
    */
    //查询多个赛事报名登记表信息
    async findAll() {

        const { ctx ,app} = this;
        let { rid,djNum,actid,uid,name, phone, ID, limit, page, } = ctx.request.body;
        const { Op } = app.Sequelize;
        const where = {}
        //查询的关键词  
        if(rid) where.rid = rid;
        if(djNum) where.djNum = djNum;
        if(actid) where.actid = actid;
        if(uid) where.uid = uid;
        if(name) where.name = { [Op.like]:'%'+name+'%' };
        if(phone) where.phone = { [Op.like]:phone+'%' };
        if(ID) where.ID = ID;
        //分页处理
        limit = limit? limit:30;
        page = page ? page : 1;
        const offset = (page-1)*limit

        try{
            let res = await ctx.model.EventRegistration.findAndCountAll({
                where,
                limit,
                offset,
                order: [['rid','desc']]
            })
            if(!res) return ctx.body = {success:false,errCode:50002,info:"查询失败"};
            ctx.body = {success:true, errCode: 50000,info:"查询成功",res}
        }catch(e){
            ctx.body = {success:false, errCode: 50001,info:"查询失败"}
        }
    }

    /*
        author:lby
        desc:查询赛事报名登记表信息
        params:{
            rid:登记id,
            djNum:登记编号,
            actid:赛事活动id,
            uid:报名用户id1,
            name:姓名,
            phone:联系电话,
            ID:身份证号,
            address:通讯地址,
            healthy:身体健康情况,
            registrationStatus:报名状态,
        }
        data:2021-09-22
    */
    //查询单个赛事报名登记表信息
    async findOne() {
        const{ctx,app} = this;
        const {Op} = app.Sequelize;
        let{rid,djNum,actid,uid,name, phone, ID }= ctx.request.body;
        let where = {}
        limit = limit? limit:30;
        page = page ? page : 1;
        const offset = (page-1)*limit
        //查询的关键词
        if(rid) where.rid = rid;
        if(djNum) where.djNum = djNum;
        if(actid) where.actid = actid;
        if(uid) where.uid = uid;
        if(name) where.name = name;
        if(phone) where.phone = phone;
        if(ID) where.ID = ID;
        try{
            const res = await ctx.model.EventRegistration.findAndCountAll({
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
        author:lby
        desc:查询赛事报名登记表信息
        params:{
            rid:登记id,
            djNum:登记编号,
            actid:赛事活动id,
            uid:报名用户id1,
            name:姓名,
            phone:联系电话,
            ID:身份证号,
            address:通讯地址,
            healthy:身体健康情况,
            registrationStatus:报名状态,
        }
        data:2021-09-22
    */
    // 添加报名信息
    async create() {
        const { ctx } = this;
        let { djNum,actid,uid,name, phone, ID, address,healthy, registrationStatus,} = ctx.request.body;

        //数据过滤
            if(!djNum) return ctx.body = { success:false, errCode:50002,info:"请填写登记编号" }
            if(!actid) return ctx.body = { success:false, errCode:50002,info:"请填写赛事活动id" }
            if(!uid) return ctx.body = { success:false, errCode:50002,info:"请填写报名用户id1" }
            if(!name) return ctx.body = { success:false, errCode:50002,info:"请填写姓名" }
            if(!/^1[3456789]\d{9}$/.test(phone))  return ctx.body = { success:false, errCode:50002, info:"请填写正确的手机号码" }
            if(!ID) return ctx.body = { success:false, errCode:50002,info:"请填写身份证号" }
            if(!address) return ctx.body = { success:false, errCode:50002,info:"请填写通讯地址" }
            if(!healthy) return ctx.body = { success:false, errCode:50002,info:"请填写身体健康情况" }
            if(!registrationStatus) return ctx.body = { success:false, errCode:50002,info:"请填写报名状态" }
        try{
            let res = await ctx.model.EventRegistration.create({
                djNum,
                actid,
                uid,
                name,
                phone,
                ID,
                address,
                healthy,
                registrationStatus,
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
        author:lby
        desc:查询赛事报名登记表信息
        params:{
            rid:登记id,
            djNum:登记编号,
            actid:赛事活动id,
            uid:报名用户id1,
            name:姓名,
            phone:联系电话,
            ID:身份证号,
            address:通讯地址,
            healthy:身体健康情况,
            registrationStatus:报名状态,
        }
        data:2021-09-22
    */
    // 修改报名信息
    async update() {
        const { ctx ,app} = this;
        let { djNum,actid,uid,name, phone, ID, address,healthy, registrationStatus, } = ctx.request.body;
        const { Op} = app.Sequelize;
        let updateDate = {}
        let where = {}
        //修改的内容
        if(actid) updateDate.actid = actid;
        if(uid) updateDate.uid = uid
        if(name) updateDate.name = name
        if(phone) updateDate.phone = phone
        if(ID) updateDate.ID = ID
        if(address) updateDate.address = address
        if(healthy) updateDate.healthy = healthy
        if(registrationStatus) updateDate.registrationStatus = registrationStatus
        //根据条件修改哪条数据
        if(djNum) where.djNum = djNum
        
        try{
            let res = await ctx.model.EventRegistration.update(updateDate,{
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
        author:lby
        desc:查询赛事报名登记表信息
        params:{
            rid:登记id,
            djNum:登记编号,
        }
        data:2021-09-22
    */
    // 删除报名信息
    async destroy() {
        const { ctx ,app} = this;
        let { djNum } = ctx.request.body;
        const { Op} = app.Sequelize;
        const where = {}
        //（根据条件删除哪条数据）
        if(djNum) where.djNum = djNum
        try{
            let res = await ctx.model.EventRegistration.destroy({
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

module.exports = ActivityTextController;
