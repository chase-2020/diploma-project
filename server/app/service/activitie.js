'use strict';

const Service = require('egg').Service;

class ActivitieService extends Service {

  //找到全部数据
  async findAll() {
    const {ctx,app} = this

    try {
        let one = await ctx.model.EventActivities.findAll({

        })
        ctx.body={success:true,info:"活动查询成功",data:one}
    }catch(e){
        console.log(e)
        ctx.body={success:false,info:"活动查询失败"}

    }
  }

//找单个数据
  async findOne() {
    const {ctx,app} = this

    try {
        let one = await ctx.model.EventActivities.findOne({
            where:{
                actId
            }
        })
        ctx.body={success:true,info:"活动查询成功",data:one}
    }catch(e){
        console.log(e)
        ctx.body={success:false,info:"活动查询失败"}

    }
  }


  //添加赛事信息（图片海报）
  async update(actId,poster) {
    const {ctx,app} = this
    try {
        let one = await ctx.model.EventActivities.update({
          poster:poster
        },{where:{
          actId
        }})
        ctx.body={success:true,info:"赛事信息添加成功",data:one}
    }catch(e){
        console.log(e)
        ctx.body={success:false,info:"赛事信息添加失败"}

    }
  }


  //赛事报名登记信息添加
  async signUp(actId,uid,djNum,name,phone,ID,address,healthy,registrationStatus){
    const {ctx,app} =this
    const {  customAlphabet } = require('nanoid')
    if(!/0?(13|14|15|17|18|19)[0-9]{9}/.test(phone)) return ctx.body ={ success:false , info:"手机号输入错误！"}
    if(!/\d{17}[\d|x]|\d{15}/.test(ID)) return ctx.body ={ success:false , info:"身份证号输入错误！"}
    const nanoid = customAlphabet('1234567890abcdef', 10)
    try{
      let one = await ctx.model.EventRegistration.create({
        actid:actId,
        uid:uid,
        djNum:nanoid(),
        name:name,
        phone:phone,
        ID:ID,
        address:address,
        healthy:healthy,
        registrationStatus:registrationStatus
      })
      ctx.body={success:true,info:"报名成功",data:one}
    }catch(e){
      console.log(e)
      ctx.body={success:false,info:"报名失败"}
    }
  }


  
  
}

module.exports = ActivitieService;
