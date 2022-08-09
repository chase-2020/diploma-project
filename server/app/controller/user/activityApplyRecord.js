'use strict';

const Controller = require('egg').Controller;

class ActivityApplyRecordController extends Controller {

   //赛事报名所有记录的查询
    async eventSome(){
        const {ctx,app} = this
        await ctx.service.eventRelation.list()
    }


      //赛事报名某个记录的查询
    async eventOne(){
      const {ctx,app} = this
      const {rid} = ctx.request.body
      await ctx.service.eventRelation.One(rid)
    }


      //赛事取消报名
    async cancelRegistration(){
      const {ctx,app} = this
      await ctx.service.eventRelation.cancel()
    }

     //某个赛事信息查询
     async queryOfAnEvent(){
      const {ctx,app} = this
      await ctx.service.eventRelation.anEvent()
    }


       //修改报名信息
       async modify(){
        const {ctx,app} = this
        await ctx.service.eventRelation.modify()
      }
      
  //查找报名信息表 判断是否包过名
       async tips(){
        const {ctx,app} = this
        await ctx.service.eventRelation.tips()
      }


}



module.exports = ActivityApplyRecordController;
