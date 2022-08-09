'use strict';

const Controller = require('egg').Controller;

class CommodityOrderController extends Controller {
    /*
        author:xing
        desc:查询所有教练信息
        params:{
          orderNumber:订单编号,
          user:购买商品的用户,
          commoditys:购买商品的数量,
          totalAmount:该订单的总金额,
          placeAnOrder:订单的提交时间,
          orderComplete:订单的完成时间,
          createdAt:创建时间,
          updatedAt:更新时间,
        }
        data:2021-08-16
        */ 
    //查询所有商品的订单

    async findAll() {
        const{ ctx , app } = this;
        const {Op} = app.Sequelize;
        let{page,limit,user,commoditys,totalAmount} = ctx.request.body;
        let where = {}
        limit = limit? limit:30;
        page = page ? page : 1;
        const offset = (page-1)*limit
        //查询的关键词
        if(user) where.user = user;
        if(totalAmount) where.totalAmount=totalAmount
        if(commoditys) where.commoditys=commoditys
        try{
            const res = await ctx.model.CommodityOrder.findAndCountAll({
                where,
                limit,
                offset,
                order:[ ['orderNumber','desc' ]]
            })

            if(!res.count) return ctx.body = {success:false,errCode:50002,info:"系统有误 请联系管理员"};
            
            ctx.body = {success:true,errCode:50000,info:"查询成功",res }

        }catch(e){
            ctx.body = {success:false,errCode:50001,info:"系统有误 请联系管理员" }
        }
    }

  /*
        author:xing
        desc:查询单个商品订单信息
        params:{
          orderNumber:订单编号,
        }
        data:2021-08-16
        */ 
  //查询单个商品订单
    async findOne() {
    const{ctx,app} = this;
    const {Op} = app.Sequelize;
    let{page,limit,orderNumber,user}= ctx.request.body;
    let where = {}
    limit = limit? limit:30;
    page = page ? page : 1;
    const offset = (page-1)*limit

    //查询的关键词
    if(orderNumber) where.orderNumber = orderNumber;
    if(user) where.user = user;
    
    try{
        const res = await ctx.model.CommodityOrder.findAndCountAll({
            where,
            limit,
            order:[ ['orderNumber','desc' ]]
        })
        if(!res.count) return ctx.body = {success:false,errCode:50002,info:"系统有误 请联系管理员"};
        ctx.body = {success:true,errCode:50000,info:"查询成功",res }
    }catch(e){
        ctx.body = {success:false,info:"系统有误 请联系管理员",errCode:50001 }
    }
  }

  /*
        author:xing
        desc:添加商品订单信息
        params:{
          user:购买商品的用户,
          commoditys:购买商品的数量,
          totalAmount:该订单的总金额,
          placeAnOrder:订单的提交时间,
          orderComplete:订单的完成时间,
          createdAt:创建时间,
          updatedAt:更新时间,
        }
        data:2021-08-16
    */

    // 添加商品订单信息 
    async create(){
        const { ctx } = this;
        let {user,totalAmount,placeAnOrder,commoditys,orderComplete,createdAt,updatedAt} = ctx.request.body;
        //数据过滤
        if(!user) return ctx.body = { success:false, errCode:50002,errorMessage:"请填购买商品的用户" }
        if(!totalAmount) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写订单的总金额" }
        if(!commoditys) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写购买商品的数量" }
        if(!placeAnOrder) return ctx.body = { success:false, errCode:50002,errorMessage:"请填订单的提交时间" }
        if(!orderComplete) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写订单的完成时间" }
        
        try{
         const res = await ctx.model.CommodityOrder.create({
            user,
            totalAmount,
            orderComplete,
            commoditys,
            placeAnOrder,
            createdAt: Date.now(),
            updatedAt: Date.now(),
         })
         if(!res) return ctx.body = {success:false,errCode:50001,errorMessage:"添加失败 请联系管理员"};
         console.log("res",res)
         ctx.body = {success:true,errCode:50000,info:"添加成功",res}
       } catch(e){
         console.log(e)
         ctx.body = {success:true,errCode:50001,info:"添加失败 请联系管理员"}
       }
     }

     /*
        author:xing
        desc:修改商品订单信息
        params:{
          orderNumber:商品订单
          user:购买商品的用户,
          commoditys:购买商品的数量,
          totalAmount:该订单的总金额,
          placeAnOrder:订单的提交时间,
          orderComplete:订单的完成时间,
          createdAt:创建时间,
          updatedAt:更新时间,
        }
        data:2021-08-13
    */

    // 修改商品订单信息
    async update(){
        const { ctx } = this;
        let {orderNumber,user,totalAmount,placeAnOrder,commoditys,orderComplete,createdAt,updatedAt} = ctx.request.body;
        const updateDate = {}
        const where = {}
        //修改的内容
        if(user) updateDate.user = user;
        if(totalAmount) updateDate.totalAmount = totalAmount
        if(commoditys) updateDate.commoditys = commoditys
        if(placeAnOrder) updateDate.placeAnOrder = placeAnOrder
        if(orderComplete) updateDate.orderComplete = orderComplete
        //修改的指定条件（根据条件修改哪条数据）
        if(orderNumber) where.orderNumber = orderNumber
        try{
         const res = await ctx.model.CommodityOrder.update(updateDate,{
            where,
            updatedAt: Date.now(),
         })
         if(!res) return ctx.body = {success:false,errCode:50001,info:"修改失败 请联系管理员"};
         console.log("res",res)
         ctx.body = {success:true,errCode:50000,info:"修改成功",res}
       } catch(e){
         console.log(e)
         ctx.body = {success:true,errCode:50001,info:"修改失败 请联系管理员"}
       }
    }
    /*
        author:xing
        desc:删除单个商品订单信息
        params:{
          orderNumber:订单编号,
          
        }
        data:2021-08-16
        */ 
    //删除订单
    async delete() {
        const { ctx ,app} = this;
        let { orderNumber} = ctx.request.body;
        const where = {}
        
        //删除的指定条件（根据条件删除哪条数据）
        if(orderNumber) where.orderNumber = orderNumber;
        
        try{
    
          const res = await ctx.model.CommodityOrder.destroy({
            
            where
          }) 
          if(!res) return ctx.body = {success:false,errCode:50001,info:"系统有误 请联系管理员"};
          ctx.body = {success:true,errCode:50000,info:"删除成功",res}
          
    
        } catch(e){
          console.log(e)
          ctx.body = {success:false,errCode:50001,info:"系统有误 请联系管理员"}
    
        }
       
    }

}

module.exports = CommodityOrderController;
