'use strict';

const Controller = require('egg').Controller;

class CourseManageController extends Controller {

    /*
        author:ww
        desc:新增教练排课管理
        params:{courseName:课程名字, coachName:教练名字, startTime:开始时间, endTime:结束时间, 
                bookedPeople:已预约人数, appointPeople:可预约人数, courseType:课程类型 }
        date:2021-09-13
    */
    async addManage() {
        const { ctx, app } = this;
        const { courseName, coachName, startTime, endTime, bookedPeople, appointPeople, courseType } = ctx.request.body;
        if (!courseName) return ctx.body = { success: false, errCode: 10001, info: "请填写课程名称" }
        if (!coachName) return ctx.body = { success: false, errCode: 10001, info: "请填写教练名字" }
        if (!/^[1-9]\d{1,13}$/.test(startTime)) return ctx.body = { success: false, errCode: 10001, info: "请填写正确的开始时间时间戳" }
        if (!/^[1-9]\d{1,13}$/.test(endTime)) return ctx.body = { success: false, errCode: 10001, info: "请填写正确的结束时间时间戳" }
        if (!bookedPeople) return ctx.body = { success: false, errCode: 10001, info: "请填写已预约人数" }
        if (!appointPeople) return ctx.body = { success: false, errCode: 10001, info: "请填写可预约人数" }
        if (![0, 1, '0', '1'].includes(courseType)) return ctx.body = { success: false, errCode: 10001, info: "请填写正确的课程类型" }
        try {
            let res = await ctx.model.CourseManage.create({
                courseName, 
                coachName, 
                startTime, 
                endTime, 
                bookedPeople, 
                appointPeople, 
                courseType
            })
            ctx.body={success:true,msg:"创建成功"}
            console.log(res);
        } catch (error) {   
            ctx.body={success:false,errCode:10002,msg:"创建失败"}
            console.log(error);
        }
    }

    /*
        author:ww
        desc:查找全部教练排课管理
        params:{courseName:课程名字, coachName:教练名字, startTime:开始时间, endTime:结束时间, 
                bookedPeople:已预约人数, appointPeople:可预约人数, courseType:课程类型 }
        date:2021-09-13
    */
    
    async findAllManage(){
        const {ctx,app}=this;
        const {courseId,courseName,coachName}=ctx.request.body;
        
        const findData={}
        
        if(courseId) findData.courseId=courseId;
        if(courseName) findData.courseName=courseName;
        if(coachName) findData.coachName=coachName;

        try {
            let res=await ctx.model.CourseManage.findAll({
                where:findData
            })
            if(res){
                ctx.body={success:true,data:res}
                console.log(res);
            }else{
                ctx.body={success:false,errCode:10003,msg:"找不到指定的值"}
            }

        } catch (error) {
            ctx.body={success:false,errCode:10004,msg:"查找失败"}
            console.log(error);
        }
    }

    /*
        author:ww
        desc:查找单个教练排课管理
        params:{courseName:课程名字, coachName:教练名字, startTime:开始时间, endTime:结束时间, 
                bookedPeople:已预约人数, appointPeople:可预约人数, courseType:课程类型 }
        date:2021-09-13
    */
   async findOneManage(){
       const {ctx,app}=this;
       const {courseId} =ctx.request.body;

       try {
            const res = await ctx.model.CourseManage.findOne({
                where:{
                    courseId
                },
            })
            if(res){
                ctx.body={success:true,data:res}
                console.log(res);
            }else{
                ctx.body={success:false,errCode:10004,msg:"找不到指定的值"}
            }
       } catch (error) {
            ctx.body={success:false,errCode:10005,msg:"查找失败"}
            console.log(error);
       }
   }

   /*
        author:ww
        desc:更新教练排课管理
        params:{courseName:课程名字, coachName:教练名字, startTime:开始时间, endTime:结束时间, 
                bookedPeople:已预约人数, appointPeople:可预约人数, courseType:课程类型 }
        date:2021-09-13
    */
   async updateManage(){
       const {ctx,app}=this;
       const {courseId,courseName,coachName,startTime,endTime,bookedPeople,appointPeople,courseType}=ctx.request.body;
       const updateData={}
       const where={}

       if(courseId) where.courseId=courseId;
       if(courseName) updateData.courseName=courseName;
       if(coachName) updateData.coachName=coachName;
       if(startTime) updateData.startTime=startTime;
       if(endTime) updateData.endTime=endTime;
       if(bookedPeople) updateData.bookedPeople=bookedPeople;
       if(appointPeople) updateData.appointPeople=appointPeople;
       if(courseType) updateData.courseType=courseType;

       try {
           let res=await ctx.model.CourseManage.update(updateData,{
               where
           })
           console.log(res);
           ctx.body={success:true,errCode:10006,msg:"修改成功"}
       } catch (error) {
           ctx.body={success:false,errCode:10007,msg:"修改出错"}
           console.log(error);
       }
   }

   /*
        author:ww
        desc:删除教练排课管理
        params:{courseName:课程名字, coachName:教练名字, startTime:开始时间, endTime:结束时间, 
                bookedPeople:已预约人数, appointPeople:可预约人数, courseType:课程类型 }
        date:2021-09-13
    */

    async deleteManage(){
        const {ctx,app}=this;
        const {courseId}=ctx.request.body;

        const deleteData={}

        if(courseId) deleteData.courseId=courseId;

        try{
            let res=await ctx.model.CourseManage.destroy({
                where:deleteData
            })
            ctx.body={success:true,errCode:10008,msg:"删除成功"}
        }catch(error){
            ctx.body={success:false,errCode:10009,msg:"删除失败"}
        }
    }
}

module.exports = CourseManageController;