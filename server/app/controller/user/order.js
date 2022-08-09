/* eslint-disable indent */
'use strict';


/*
desc: 订单
params:{};
*/

const utils = require("utility");
const Controller = require('egg').Controller;

class OrderController extends Controller {

    // 创建用户预约场地订单
    async order() {
        const { ctx } = this;

        const { name,phone,mbName,courtName,mbAddr,courtType,money,state,orderNum } = ctx.request.body;


        // 数据过滤

        if (!money) return ctx.body = { success: false,info: '请选择场地' };

        try {
            let res = await ctx.model.Order.create({
                name,
                phone,
                mbName,
                courtName,
                mbAddr,
                courtType,
                money,
                state,
                orderNum,
            });

            if (res){
                ctx.body = { success: true, errCode: "订单创建成功" };
            }

        } catch (e) {
            console.log(e);
            ctx.body = { success: false, errCode: "订单创建异常" }; // 3002数据错误
        }
    }

    // 查询单条订单
    async findOrder() {
        const { ctx } = this;

        const { orderNum } = ctx.request.body;


        try {
            let res1 = await ctx.model.Order.findOne({
               where:{
                   orderNum,
               }
            });

            if (res1){
                ctx.body = { success: true, data: res1 };
            }

        } catch (e) {
            console.log(e);
            ctx.body = { success: false, errCode: "订单查询异常1" }; // 3002数据错误
        }
    }

    // 创建用户预约的场地的记录
    async siteOrder() {
        const { ctx } = this;

        const { site,orderNum,did } = ctx.request.body;

        console.log('我是场地信息',site)
        console.log('我是订单号',orderNum)
        console.log('我是did啊啊啊啊',did)
        try {
            { site.map((r)=>{
                console.log('场地订单',orderNum)
                ctx.model.OrderRecord.create({
                    orderNum,
                    did,
                    sid:r.siteName,
                    date:`2022-${r.dateAt}`,
                    startIndex:r.st,
                    price:r.fee
                })
                // console.log('我是选中的',select)
                // if(res)  return  ctx.body = {success:true,info:'删除成功',data:res};
                return ctx.body = { success:true,info:'场地记录创建成功！！'}
            })}
        } catch (e) {
            console.log(e);
            ctx.body = { success: false, errCode: "订单创建失败" }; // 3002数据错误
        }
    }

    // 查询用户预约的场地记录
    async findSite() {
        const { ctx } = this;

        const { orderNum } = ctx.request.body;


        try {
            let res2 = await ctx.model.OrderRecord.findAll({
                where:{
                    orderNum,
                }
            });

            if (res2){
                ctx.body = res2
            }

        } catch (e) {
            console.log(e);
            ctx.body = { success: false, errCode: "订单查询异常2" }; // 3002数据错误
        }
    }



    //查询用户所有订单
    async findAll() {
        const { ctx } = this;

        const { phone,state,orderNum } = ctx.request.body;

        const where = {}
        if(phone) where.phone = phone
        if(state) where.state = state
        if(orderNum) where.orderNum = orderNum
        

        await ctx.model.Order.hasMany(ctx.model.OrderRecord, {
        // await ctx.model.OrderRecord.hasMany(ctx.model.Order, {
            foreignKey: "did",
            targetKey: "did",
        });
        try {
            let res3 = await ctx.model.Order.findAll({
                where,
                include: [
                    {
                        model: ctx.model.OrderRecord,
                        required: false,
                    },
                ]
            });
            if (res3){
                ctx.body = res3
            }

        } catch (e) {
            console.log(e);
            ctx.body = { success: false, errCode: "订单查询异常" }; // 3002数据错误
        }
    }

}

module.exports = OrderController;
