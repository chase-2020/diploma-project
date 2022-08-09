'use strict';

const Controller = require('egg').Controller;

class VenueClassController extends Controller {

    //场馆添加的课程信息
  // async create() {
  //   const { ctx,app } =this
  //   const { className,venueName,contacts,contactPhone,
  //           teacher,content,studentAge,trainTime,alreadyPeople,
  //           numberOfCourses,price} = ctx.request.body
  //   const classTime = Date.now()

  //   try {
  //       let one = await ctx.model.VenueClass.create({
  //           className:className,  //场馆课程名
  //           venueName:venueName,  //开课场馆
  //           classTime:classTime,  //开课时间
  //           contacts:contacts,    //联系人
  //           contactPhone:contactPhone,  //联系电话
  //           teacher:teacher,   //开课老师
  //           content:content,   //课程介绍
  //           studentAge:studentAge,   //学员的年龄范围
  //           trainTime:trainTime,   //训练时间范围
  //           alreadyPeople:alreadyPeople,   //已报名人数
  //           numberOfCourses:numberOfCourses,   //课程次数
  //           price:price,   //课程价格
  //       })
  //       ctx.body={success:true,info:"增加课程成功+1",data:one}
  //   }catch(e){
  //       console.log(e)
  //       ctx.body={success:false,info:"失败"}
  //   }
  // }


  
    /*
        author:xing
        desc:查询多个课程
        params:{
                className:"场馆课程名",
                venueName:"开课场馆",
                classTime:"开课时间",
                contacts:联系人,
                contactPhone:联系电话,
                teacher:开课老师,
                content:课程介绍,
                studentAge:学员的年龄范围,
                trainTime:训练时间范围,
                alreadyPeople:已报名人数,
                numberOfCourses:课程次数,
                price:课程价格,
                createdAt:创建时间,
                updatedAt:更新时间,
                vcid:场馆课程id,
               }
        data:2021-08-16
    */

  async findAll() {
    const {ctx , app} = this;
    //// 获取参数
    let { venueName,contacts,contactPhone,teacher,studentAge,price,limit,page } = ctx.request.body;
    const { Op } = app.Sequelize;
    //查询的条件
    const where = {}
    // 分页处理
    limit = limit ? limit:30;
    page = page ? page : 1;
    const offset = (page-1)*limit;
    //用户可以传的参数
    if(venueName) where.venueName = venueName;
    if(contacts) where.contacts = contacts;
    if(contactPhone) where.contactPhone = contactPhone;
    if(teacher) where.teacher = teacher;
    if(studentAge) where.studentAge = studentAge;
    if(price) where.price = price;
    try{
        const res = await ctx.model.VenueClass.findAndCountAll({
            where,
            limit,
            offset
        })

        if(!res.count) return ctx.body = {success:false,errCode:50002,info:"系统有误 请联系管理员"};
        
        ctx.body = {success:true,errCode:50000,info:"查询成功",res }

    }catch(e){
        ctx.body = {success:false,errCode:50001,info:"系统有误 请联系管理员" }
    }
  }
    /*
        author:xing
        desc:添加场馆课程信息
        params:{
            className:"场馆课程名",
            venueName:"开课场馆",
            classTime:"开课时间",
            contacts:联系人,
            contactPhone:联系电话,
            teacher:开课老师,
            content:课程介绍,
            studentAge:学员的年龄范围,
            trainTime:训练时间范围,           
            numberOfCourses:课程次数,
            price:课程价格,           
        }
        data:2021-08-20
    */
    async create(){
        const { ctx } =this;
        let {contacts,className,venueName,classTime,contactPhone,teacher,content,studentAge,trainTime,numberOfCourses,price} = ctx.request.body;
        //数据过滤
        if(!className) return ctx.body = { success:false, errCode:50002,info:"请填场馆课程名" }
        if(!venueName) return ctx.body = { success:false, errCode:50002,info:"请填写开课场馆" }
        if(!classTime) return ctx.body = { success:false, errCode:50002,info:"请填写开课时间" }
        if(!contacts) return ctx.body = { success:false, errCode:50002,info:"请填联系人" }
        if(!/^1[3456789]\d{9}$/.test(contactPhone))  return ctx.body = { success:false, errCode:50002, info:"请填写正确的手机号码" }
        if(!teacher) return ctx.body = { success:false, errCode:50002,info:"请填开课老师" }
        if(!content) return ctx.body = { success:false, errCode:50002,info:"请填写课程介绍" }
        if(!studentAge) return ctx.body = { success:false, errCode:50002,info:"请填写学员的年龄范围" }
        if(!price) return ctx.body = { success:false, errCode:50002,info:"请填写课程价格" }
        try{
            const res = await ctx.model.VenueClass.create({
                className,
                venueName,
                classTime, 
                contacts,
                contactPhone,
                teacher,
                content,
                studentAge,
                price,
               createdAt: Date.now(),
               updatedAt: Date.now(),
            })
            if(!res) return ctx.body = {success:false,errCode:50001,info:"添加失败"};
            console.log("res",res)
            ctx.body = {success:true,errCode:50000,info:"添加成功",res}
        } catch(e){
            console.log(e)
            ctx.body = {success:true,errCode:50001,info:"添加失败"}
          }
    
    }

    /*
        author:xing
        desc:修改场馆课程信息
        params:{
            vcid:场馆课程id,
            className:"场馆课程名",
            venueName:"开课场馆",
            classTime:"开课时间",
            contacts:联系人,
            contactPhone:联系电话,
            teacher:开课老师,
            content:课程介绍,
            studentAge:学员的年龄范围,
            trainTime:训练时间范围,           
            numberOfCourses:课程次数,
            price:课程价格,           
        }
        data:2021-08-20
    */
        async update(){
            const { ctx } =this;
            let {vcid,trainTime,className,venueName,classTime,contactPhone,teacher,content,studentAge,numberOfCourses,price,contacts} = ctx.request.body;
            const updateDate = {}
            const where = {}
            //修改的内容
            if(className) updateDate.className = className;
            if(venueName) updateDate.venueName = venueName;
            if(classTime) updateDate.classTime = classTime;
            if(contacts) updateDate.contacts = contacts;
            if(contactPhone) updateDate.contactPhone=contactPhone;
            if(teacher) updateDate.teacher=teacher;
            if(content) updateDate.content=content;
            if(studentAge) updateDate.studentAge=studentAge;
            if(price) updateDate.price=price;
            if(trainTime) updateDate.trainTime=trainTime;
            if(numberOfCourses) updateDate.numberOfCourses=numberOfCourses;
           //修改的指定条件（根据条件修改哪条数据）
            if(vcid) where.vcid = vcid
            try{

                const res = await ctx.model.VenueClass.update(updateDate,{
                   
                   where
                 }) 
                 if(!res) return ctx.body = {success:false,errCode:50002,info:"修改失败"};
                 console.log('res',res) 
       
                 ctx.body = {success:true, errCode: 50000,info:"修改成功",res}
           
               } catch(e){
                 console.log(e)
                 ctx.body = {success:false, errCode: 50001,info:"修改失败"}
                 
               }
        }

      /*
        author:xing
        desc:删除场馆课程信息
        params:{
          vcid:场馆课程id,
          className:"场馆课程名",
        }
        data:2021-08-20
        */ 
    //删除场馆课程信息
    async delete() {
        const { ctx ,app} = this;
        let { vcid,className} = ctx.request.body;
        const where = {}
        
        //删除的指定条件（根据条件删除哪条数据）
        if(vcid) where.vcid = vcid;
        if(className) where.className=className;
        
        try{
    
          const res = await ctx.model.VenueClass.destroy({
            
            where
          }) 
          if(!res) return ctx.body = {success:false,errCode:50002,info:"删除失败"};
          ctx.body = {success:true,errCode:50000,info:"删除成功",res}
        } catch(e){
          console.log(e)
          ctx.body = {success:false,errCode:50001,info:"删除失败"}
    
        }
       
    }  

}

module.exports = VenueClassController;
