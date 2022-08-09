'use strict';

const Controller = require('egg').Controller;

class ShopController extends Controller {

    
   //增加商品订单
   async  add(){

       const { ctx,app }  = this;

       const { orderNumber,user,commoditys,totalAmount,placeAnOrder,orderComplete}  = ctx.request.body;

     
        if (!orderNumber) return ctx.body = { success: false ,errCode: 3002 ,info : "订单编号不能为空"}
        if (!user) return ctx.body = { success: false ,errCode: 3002 ,info : "用户名不能为空"}

        const addData = {}

        if(orderNumber) addData.orderNumber  = orderNumber;
        if (user) addData.user = user;
        if (commoditys) addData.commoditys = commoditys;
        if (totalAmount) addData.totalAmount = totalAmount;
        if (placeAnOrder) addData.placeAnOrder = placeAnOrder;
        if (orderComplete) addData.orderComplete = orderComplete;

        try{

              await ctx.model.CommodityOrder.create(addData);

              ctx.body = { success: true ,errCode:'',info:"添加成功"};
                  
        } catch (e) {   
            console.log(e)
            ctx.body = { success: false ,errCode: 3002,info:"创建失败" };//3002数据错误
        }


   }


   //改
   async update() {
        const { ctx } = this;
        const { orderNumber,user,commoditys,totalAmount,placeAnOrder,orderComplete} = ctx.request.body;

        const updateData = {}
        const where = {};
        if(orderNumber) where.orderNumber = orderNumber;

        if(user) updateData.user = user;
        if(commoditys) updateData.commoditys = commoditys;
        if(totalAmount) updateData.totalAmount = totalAmount;
        if(placeAnOrder) updateData.placeAnOrder = placeAnOrder;
        if(orderComplete) updateData.orderComplete = orderComplete;
        try{
            
        await ctx.model.CommodityOrder.update(updateData,{
            
            where,
        })      
        ctx.body = { success: true ,errCode:'',info:"修改成功"};

        } catch(e){
        console.log(e)
        ctx.body = { success: true ,errCode:'',info:"修改失败"};

        }
   
    } 


    //删
    async delete() {
        const { ctx } = this;
        const { orderNumber } = ctx.request.body;

        const where = {};
        if(orderNumber) where.orderNumber = orderNumber;

        try{
          await ctx.model.CommodityOrder.destroy({
            where,
          })      
          ctx.body = "删除成功"
    
        } catch(e){
          console.log(e)
          ctx.body = "删除失败"
    
        }
       
    }

  //查
   

  async findAll(){
    const { ctx,app } = this;

    
    let { orderNumber,page,limit} = ctx.request.body;
    limit = limit ?  limit: 30;
    page = page ? page :1;
    const offset = (page-1)*limit;

    const where = {}
    if(orderNumber) where.orderNumber = orderNumber;
   


    const { count ,rows} = await ctx.model.CommodityOrder.findAndCountAll({
      offset,
      limit,
      where,
    });
    const res = { count,rows};
    ctx.body = res;

    

  }




}

module.exports = ShopController;