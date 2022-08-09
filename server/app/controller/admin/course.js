'use strict';

const Controller = require('egg').Controller;

class CourseController extends Controller {

    //course表的所有字段
    /*  
            courseId:"课程编号",
            courseName:"课程名称",
            type:"课程类型",
            coachId:"教练编号",
            price:"课程价格",
            appointmenTime:"课程可约时间",
            serverPlace:"课程上课的场地",
            startTime:"课程开始时间",
            endTime:"课程结束时间",
            courseMaxNumber:"课程可预约的人数",
            ReservedNumber:"课程已预约人数",
            courseIntroduction:"课程相关介绍",
            courseNotice:"课程须知",
            coursetype:"课程类型"
        
    */



    /*
        author:ZERO
        desc:查询单个课程
        params:{
                courseId:"课程编号",
                courseName:"课程名称",
               }
        data:2021-08-16
    */ 
    async findOne(){
        const { ctx,app } = this
        // 获取参数
        let { courseId,courseName } = ctx.request.body;
        const { Op } = app.Sequelize;

        //查询的条件
        const where = {}

        //用户可以传的参数
        if(courseId) where.courseId = courseId
        if(courseName) where.courseName = courseName

        try{
    
            let res = await ctx.model.Course.findOne({
                where,
            })
            if (!res) return ctx.body = { success:false, errCode: 50002, info:"查询无结果" }  
            console.log("res",res)
            ctx.body = {success:true,info:"查询成功",res}
      
        } catch(e){
            console.log(e)
            ctx.body = { success:false, errCode: 50001, info:"查询失败" }
      
        }

    }


    /*
        author:ZERO
        desc:查询多个课程
        params:{
                type:"课程类型",
                coachId:"教练编号",
                price:"课程价格",
               }
        data:2021-08-16
    */ 
    async findAll(){
        const { ctx,app } = this
        // 获取参数
        let { courseId,courseName,coachName,type,coachId,price,courseType,serverPlace,limit,page } = ctx.request.body;
        const { Op } = app.Sequelize;
  
        //查询的条件
        const where = {}
        // 分页处理
        limit = limit ? limit:30
        page = page ? page : 1
  
        //用户可以传的参数
        if(courseId) where.courseId = courseId
        if(courseName) where.courseName = courseName
        if(type) where.type = type
        if(coachId) where.coachId = coachId
        if(price) where.price = price
        if(courseType) where.courseType = courseType
        if(coachName) where.coachName = coachName
        if(serverPlace) where.serverPlace = serverPlace

        try{
            let res = await ctx.model.Course.findAndCountAll({
                where,
                order:[["courseId","ASC"]],    //让查出来的数据（多个）按指定字段大小排列
            })

            if (!res.count) return ctx.body = { success:false, errCode: 50002, info:"查询无结果" }
            console.log("res",res)
            ctx.body = {success:true,info:"查询成功",res}
      
        } catch(e){
            console.log(e)
            ctx.body = { success:false, errCode: 50001, info:"查询失败" }
      
        }
    }


    /*
        author:ZERO
        desc:修改课程信息
        params:{
            courseId:"课程编号",
            courseName:"课程名称",
            type:"课程类型",
            coachId:"教练编号",
            price:"课程价格",
            appointmenTime:"课程可约时间",
            serverPlace:"课程上课的场地",
            startTime:"课程开始时间",
            endTime:"课程结束时间",
            courseMaxNumber:"课程可预约的人数",
            ReservedNumber:"课程已预约人数",
            courseIntroduction:"课程相关介绍",
            courseNotice:"课程须知",
               }
        data:2021-08-16
    */ 
    async update(){
        const { ctx,app } = this;

        let { coursetype,courseId,courseName,type,coachId,appointmenTime,serverPlace,startTime,price,endTime,courseMaxNumber,ReservedNumber,courseIntroduction,courseNotice,limit,page } = ctx.request.body;
        const { Op } = app.Sequelize;

        //修改的条件
        const where = {}
        //修改的内容
        const updateData = {}
        // 分页处理
        limit = limit ? limit:30
        page = page ? page : 1

        if(courseId) where.courseId = courseId

        if(courseName) updateData.courseName = courseName
        if(type || type === 0) updateData.type = type
        if(coachId) updateData.coachId = coachId
        if(price) updateData.price = price
        if(appointmenTime) updateData.appointmenTime = appointmenTime
        if(serverPlace) updateData.serverPlace = serverPlace
        if(startTime) updateData.startTime = startTime
        if(endTime) updateData.endTime = endTime
        if(courseMaxNumber) updateData.courseMaxNumber = courseMaxNumber
        if(ReservedNumber) updateData.ReservedNumber = ReservedNumber
        if(courseIntroduction) updateData.courseIntroduction = courseIntroduction
        if(courseNotice) updateData.courseNotice = courseNotice
        if(coursetype) updateData.coursetype = coursetype
        

        //update({要变更的字段信息}，{配置项})  配置项.where 条件
        try{
          let res = await ctx.model.Course.update(updateData,{
            where,
            order:[["createdAt","ASC"]],  //让查出来的数据（多个）按指定字段大小排列
          })      
          if (!res) return ctx.body = { success:false, errCode: 50002, info:"查询无结果,修改失败" }
          console.log("res",res)
          ctx.body = {success:true,info:"修改成功",res}
    
        } catch(e){
          console.log(e)
          ctx.body = { success:false, errCode: 50001, info:"修改失败" }
        }
    }


    /*
        author:ZERO
        desc:删除课程
        params:{
            courseId:"课程编号",
            courseName:"课程名称",
            type:"课程类型",
            coachId:"教练编号",
            price:"课程价格",
            startTime:"课程开始时间",
            endTime:"课程结束时间",
               }
        data:2021-08-10
    */
        async destroy(){
            const { ctx,app } = this;
            let { courseId,courseName,type,price,coachId,startTime,endTime,limit,page } = ctx.request.body;
            const { Op } = app.Sequelize;
    
            //修改的条件
            const where = {}
            // 分页处理
            limit = limit ? limit:30
            page = page ? page : 1
    
            //用指定条件找到所要删除的用户
            if(courseId) where.courseId = courseId
            if(courseName) where.courseName = courseName
            if(type) where.type = type
            if(price) updateData.price = price
            if(startTime) updateData.startTime = startTime
            if(endTime) updateData.endTime = endTime
            if(coachId) updateData.coachId = coachId
    
            try{
              let res = await ctx.model.Course.destroy({
                where,
                order:[["createdAt","ASC"]],    //让查出来的数据（多个）按指定字段大小排列
              })     
              console.log(res);
              if (!res) return ctx.body = { success:false, errCode: 50002, info:"查询无结果,删除失败" } 
              console.log("res",res)
              ctx.body = {success:true,info:"删除成功",res}
        
            } catch(e){
              console.log(e)
              ctx.body = { success:false, errCode: 50001, info:"删除失败" }
        
            }
        }


        /*
        author:ZERO
        desc:添加课程
        params:{
            courseId:"课程编号",
            courseName:"课程名称",
            type:"课程类型",
            coachId:"教练编号",
            price:"课程价格",
            startTime:"课程开始时间",
            endTime:"课程结束时间",
               }
        data:2021-08-10
    */
        async create() {
            const { ctx } = this;
            let {serverPlace,sponsor,courseIntroduction,courseName,coachName,type,courseType,price,coachPhone,coachId} = ctx.request.body;
    
    
            //数据过滤
             if(!courseName) return ctx.body = { success:false, errCode:50002,info:"请填写课程名称" }
             if(!type) return ctx.body = { success:false, errCode:50002,info:"请填写授课类型" }
             if(!price) return ctx.body = { success:false, errCode:50002,info:"请填写价格" }
             if(!courseIntroduction) return ctx.body = { success:false, errCode:50002,info:"请填写简介" }
             if(!serverPlace) return ctx.body = { success:false, errCode:50002,info:"请填写授课场地" }
             if(!courseType) return ctx.body = { success:false, errCode:50002,info:"请填写课程类型" }
             if(!coachName) return ctx.body = { success:false, errCode:50002,info:"请填写教练姓名" }
             if(!sponsor) return ctx.body = { success:false, errCode:50002,info:"请填写课程开办方" }
             if(!/^1[3456789]\d{9}$/.test(coachPhone))  return ctx.body = { success:false, errCode:50002, info:"请填写正确的手机号码" }
            try{
                let res = await ctx.model.Course.create({
                    courseName,
                    courseIntroduction,
                    price,
                    serverPlace,
                    coachName,
                    courseType,
                    type,
                    coachPhone,
                    coachId,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                })
                if(!res) return ctx.body = {success:false,errCode:50001,info:"添加失败"}; 
                console.log('res',res)
                ctx.body = {success:true,info:"添加成功",res}
            }catch(e){
                console.log(e);
                ctx.body = {success:false, errCode: 50001,info:"添加失败"};
            }
        }

}

module.exports = CourseController;