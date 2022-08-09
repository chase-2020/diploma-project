'use strict';

const Controller = require('egg').Controller;

class MerchantAdminController extends Controller {
    /*
        author:lby
        desc:查询场馆运营商信息
        params:{
            mid:商家编号,
            name:运营商名,
            operatorAddress:地址,
            pictureAddress:图片,
            phone:电话号码,
            ID:账号,
            createdAt:创建时间,
        }
        data:2021-09-16
    */
    //查询多个场馆运营商信息
    async find() {

        const { ctx ,app} = this;
        let { mid, name, operatorAddress, pictureAddress, phone, ID, createdAt, limit, page, mNum} = ctx.request.body;
        const { Op } = app.Sequelize;
        const where = {}
        //查询的关键词  
        if(mid) where.mid = mid;
        if(name) where.name = { [Op.like]:'%'+name+'%' };
        if(operatorAddress) where.operatorAddress = operatorAddress;
        if(pictureAddress) where.pictureAddress = { [Op.like]:'%'+pictureAddress+'%' };
        if(phone) where.phone = { [Op.like]:phone+'%' };
        if(ID) where.ID = ID
        if(createdAt) where.createdAt = createdAt
        if(mNum) where.mNum = { [Op.like]:'%'+mNum+'%' };
        //分页处理
        limit = limit? limit:30;
        page = page ? page : 1;
        const offset = (page-1)*limit

        try{
            let res = await ctx.model.Merchant.findAndCountAll({
                where,
                limit,
                offset,
                order: [['mid','desc']]
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
        author:lby
        desc:查询单个场馆运营商信息
        params:{
            mid:商家编号,
            name:运营商名,
            operatorAddress:地址,
            pictureAddress:图片,
            phone:电话号码,
            ID:账号,
            createdAt:创建时间,
        }
        data:2021-09-16
    */
    //查询单个场馆运营商信息
    async findOne() {
        const{ctx,app} = this;
        const {Op} = app.Sequelize;
        let{mid,name,phone,ID,mNum}= ctx.request.body;
        let where = {}
        limit = limit? limit:30;
        page = page ? page : 1;
        const offset = (page-1)*limit

        //查询的关键词
        if(mid) where.mid = mid;
        if(phone) where.phone = phone;
        if(ID) where.ID = ID;
        if(name) where.name = name;
        if(mNum) where.mNum = mNum;
        try{
            const res = await ctx.model.Merchant.findAndCountAll({
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
        desc:添加场馆运营商
        params:{
            mid:商家编号,
            name:运营商名,
            operatorAddress:地址,
            pictureAddress:图片,
            phone:电话号码,
            ID:账号,
            mMum:场馆运营商编号,
            createdAt:创建时间,
        }
        data:2021-09-16
    */
    // 添加场馆运营商
    async create() {
        const { ctx } = this;
        let { name, operatorAddress, pictureAddress, phone, ID,mNum} = ctx.request.body;


        //数据过滤
            if(!name) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写运营商名称" }
            if(!operatorAddress) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写地址" }
            if(!pictureAddress) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写图片" }
            if(!/^1[3456789]\d{9}$/.test(phone))  return ctx.body = { success:false, errCode:50002, errorMessage:"请填写正确的手机号码" }

            if(!/^[0-9]*$/.test(ID)) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写纯数字ID" }
            if(!mNum) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写场馆运营商编号"}
       
            
            const one = await ctx.model.Merchant.findOne({
                where:{
                    phone:phone
                },
                raw:true
            })
    
            console.log('one',one)
            if(one) return ctx.body = { success:false,errorMessage:'该手机号已注册!', }
       
            try{
            let res = await ctx.model.Merchant.create({
                name,
                operatorAddress,
                pictureAddress,
                phone,
                ID,
                mNum,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            })
            
            if(!res) return ctx.body = {success:false,errCode:50001,errorMessage:"添加失败"};
            console.log('res',res)
            ctx.body = {success:true, errCode: 50000,info:"添加成功",res}
        }catch(e){
            console.log(e);
            ctx.body = {success:false, errCode: 50001,info:"添加失败", };
        }
    }

    /*
        author:lby
        desc:修改场馆运营商信息
        params:{
            mid:商家编号,
            name:运营商名,
            operatorAddress:地址,
            pictureAddress:图片,
            phone:电话号码,
            ID:账号,
            createdAt:创建时间,
            mNum:场馆运营商编号,
        }
        data:2021-09-16
    */
    // 修改场馆运营商信息
    async update() {
        const { ctx ,app} = this;
        let { mid, name, operatorAddress, pictureAddress, phone, ID, mNum } = ctx.request.body;
        const { Op} = app.Sequelize;
        let updateDate = {}
        let where = {}
        //修改的内容
        if(name) updateDate.name = name;
        if(operatorAddress) updateDate.operatorAddress = operatorAddress;
        if(pictureAddress) updateDate.pictureAddress = pictureAddress
        if(phone) updateDate.phone = phone
        if(ID) updateDate.ID = ID
        if(mNum) updateDate.mNum = mNum
        //根据条件修改哪条数据
        if(mid) where.mid = mid
        
        try{
            let res = await ctx.model.Merchant.update(updateDate,{
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
        desc:删除场馆运营商信息
        params:{mid：场馆运营商编号}
        data:2021-08-10
        */
    // 删除场馆运营商信息
    async destroy() {
        const { ctx ,app} = this;
        let { mid } = ctx.request.body;
        const { Op} = app.Sequelize;
        const where = {}
        //（根据条件删除哪条数据）
        if(mid) where.mid = mid
        try{
            let res = await ctx.model.Merchant.destroy({
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

module.exports = MerchantAdminController;