'use strict';

const Service = require('egg').Service;

class EventRelationService extends Service {
    //报名记录表与赛事信息表关联
   async list() {
    const {ctx,app} = this
        let EventRT = ctx.model.EventRegistration;
        let EventAT = ctx.model.EventActivities;

        await EventRT.belongsTo(EventAT,{
            foreignKey:"actid",
            targetKey:"actId",
        })
        let result = await EventRT.findAll({
            include: [EventAT]
        })
        ctx.body={success:true , info:"成功", data:result}
        return result
  }

//报名记录表与赛事信息表关联
  async One(rid) {
    const {ctx,app} = this
        let EventRT = ctx.model.EventRegistration;
        let EventAT = ctx.model.EventActivities;

        await EventRT.belongsTo(EventAT,{
            foreignKey:"actid",
            targetKey:"actId",
        })
        let result = await EventRT.findOne({
            where:{
                rid
            },
            include: [EventAT]
        })
        ctx.body={success:true , info:"成功", data:result}
        return result
  }

  //根据登记编号删除报名信息
  async cancel() {
      const {ctx,app} = this
      const {djNum} = ctx.request.body
      try{
        let one = await ctx.model.EventRegistration.destroy({
            where :{
                djNum:djNum
            }
        })
        ctx.body={success:true , info:"成功", data:one}
      }catch(e){
        ctx.body={success:false , info:"失败"}
      }
  }


  //某个赛事查询
  async anEvent(){
    const {ctx,app} = this
    const {actId} = ctx.request.body
    try{
      let one = await ctx.model.EventActivities.findOne({
          where :{
            actId:actId
          }
      })
      ctx.body={success:true , info:"成功", data:one}
    }catch(e){
      ctx.body={success:false , info:"失败"}
    }
  }


  //修改报名信息
  async modify(){
    const {ctx,app} = this
    const {name,phone,ID,address,healthy,djNum,registrationStatus} = ctx.request.body

    try{
      let one = await ctx.model.EventRegistration.update({
        name:name,
        phone:phone,
        ID:ID,
        address:address,
        healthy:healthy,
        registrationStatus:registrationStatus
      },
      {where:{
        djNum
      }}
      )
      ctx.body={success:true , info:"成功", data:one}
    }catch(e){
      ctx.body={success:false , info:"失败"}
    }
  }


  //查找报名信息表 判断是否包过名
  async tips(){
    const {ctx,app} = this
    const {ID} = ctx.request.body

    try{
      let one = await ctx.model.EventRegistration.findOne({

      where:{
        ID
      }}
      )
      ctx.body={success:true , info:"该用户已报名了该赛事", data:one}
    }catch(e){
      ctx.body={success:false , info:"失败"}
    }
  }
}

// [{model:eventAT , attributes:['theme']}]

module.exports = EventRelationService;
