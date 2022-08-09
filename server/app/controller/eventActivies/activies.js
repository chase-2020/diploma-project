'use strict';

const Controller = require('egg').Controller;

class ActiviesController extends Controller {
  async create() {
    const {ctx,app} = this
    const { theme,project,field,organizer,module,sponsor,content,
            quota,registration,first,second,third,compete,rttStartTime,
            rttEndTime,startTime,endTime,state} = ctx.request.body
    
  }



  //查询所有活动
  async findAll(){
    const {ctx,app} = this
    await ctx.service.activitie.findAll()
  }


  //查询单个活动
  async findOne(){
    const {ctx,app} = this
    await ctx.service.activitie.findOne()
  }

  async update(){
    const {ctx,app} = this
    const {actId,poster} = ctx.request.body
    await ctx.service.activitie.update(actId,poster)
  }


  //赛事报名登记信息添加
  async signUp(){
    const {ctx,app} = this
    const {actId,djNum,uid,name,phone,ID,address,healthy,registrationStatus} =ctx.request.body
    await ctx.service.activitie.signUp(actId,djNum,uid,name,phone,ID,address,healthy,registrationStatus)
  }

  
}

module.exports = ActiviesController;
