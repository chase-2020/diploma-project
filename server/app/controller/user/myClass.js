'use strict';

const Controller = require('egg').Controller;

class MyClassController extends Controller {

  //我的所有课程
  async findMyClass() {
    const { ctx } = this
    const uid = ctx.params.uid

    try {
        let one = await ctx.model.MyClass.findAll({
            where:{uid}
        })
        ctx.body={success:true,info:"我的课程展示成功",data:one}
    }catch(e){
        console.log(e)
        ctx.body={success:false,info:"我的课程展示失败"}

    }
  }

  //购买场馆课程后将课程信息放入我的课程里
  async createClass(){
    const {ctx} = this
    const {vcid} =ctx.request.body
    const uid = ctx.params.uid
    
    try {
      let one = await ctx.model.VenueClass.findOne({
        where:{
          vcid
        }
      })
      console.log("数据",one.dataValues.className)

      if(one){
        ctx.body={success:true,info:"我的课程展示成功",data:one}
        let two = await ctx.model.MyClass.create({
          uid:uid,
          sponsor:one.dataValues.sponsor,
          className:one.dataValues.className,
          venueName:one.dataValues.venueName,
          classTime:one.dataValues.classTime,
          teacher:one.dataValues.teacher,
          content:one.dataValues.content,
          trainTime:one.dataValues.trainTime,
          numberOfCourses:one.dataValues.numberOfCourses,
        })
        if(two){
          ctx.body={success:true,info:"课程已进入我的课程",data:two}
        }else{
          ctx.body={success:false,info:"失败"}
        }
      }else{
        ctx.body={success:false,info:"我的课程展示失败"}
      }

    }catch(e){
      console.log(e)
      ctx.body={success:false,info:"函数执行失败"}

    }
  }



  //购买私教课程后将课程信息放入我的课程里
  async creCouClass(){
    const {ctx} = this
    const {courseId} =ctx.request.body
    const uid = ctx.params.uid
    
    try {
      let one = await ctx.model.Course.findOne({
        where:{
          courseId
        }
      })

      if(one){
        ctx.body={success:true,info:"我的课程展示成功",data:one}
        let two = await ctx.model.MyClass.create({
          uid:uid,
          courseName:one.dataValues.courseName,
          type:one.dataValues.type,
          coursetype:one.dataValues.coursetype,
          sponsor:one.dataValues.sponsor,
          coachname:one.dataValues.coachname,
          coachphone:one.dataValues.coachphone,
          coachId:one.dataValues.coachId,
          appointmenTime:one.dataValues.appointmenTime,
          startTime:one.dataValues.startTime,
          endTime:one.dataValues.endTime,
          serverPlace:one.dataValues.serverPlace,
          courseIntroduction:one.dataValues.courseIntroduction,
          courseNotice:one.dataValues.courseNotice,
        })
        if(two){
          ctx.body={success:true,info:"课程已进入我的课程",data:two}
        }else{
          ctx.body={success:false,info:"失败"}
        }
      }else{
        ctx.body={success:false,info:"我的课程展示失败"}
      }

    }catch(e){
      console.log(e)
      ctx.body={success:false,info:"函数执行失败"}

    }
  }


  //我的课程删减
  async delete (){
    const {ctx,app} = this

    try {
      let one = await ctx.model.MyClass.destroy
    }catch(e){

    }

  }
}


    

module.exports = MyClassController;
