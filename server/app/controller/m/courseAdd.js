'use strict';

const Controller=require('egg').Controller;

class courseAddController extends Controller{

    /*
        author:ww
        desc:新增课程添加
        params:{courseName:课程名称,courseType：课程类型,courseLevel：课程难度,courseTime：课程时长,courseIntro：课程简介}
        date:2021-8-23
    */

    async addCourse(){
        const {ctx,app}=this;
        const {courseName,courseType,courseLevel,courseTime,courseIntro}=ctx.request.body;
        if(!courseName) return ctx.body={success:false,errCode:20008,info:"请填写课程名称"}
        if(!courseType) return ctx.body={success:false,errCode:20008,info:"请填写课程类型"}
        if(!courseLevel) return ctx.body={success:false,errCode:20008,info:"请填写课程难度"}
        if(!courseTime) return ctx.body={success:false,errCode:20008,info:"请填写课程时长"}
        if(!courseIntro) return ctx.body={success:false,errCode:20008,info:"请填写课程简介"}

        try{
            let res=await ctx.model.AddCourse.create({
                courseName,
                courseType,
                courseLevel,
                courseTime,
                courseIntro
            })
            ctx.body={success:true,errCode:20012,msg:"创建成功"}
            console.log(res);
        }catch(e){
            ctx.body={success:false,errCode:20013,msg:"创建失败"}
            console.log(e);
        }
    }

    /*
        author:ww
        desc:查找课程添加
        params:{courseName:课程名称,courseType：课程类型,courseLevel：课程难度,courseTime：课程时长,courseIntro：课程简介}
        date:2021-8-23
    */

    async findCourse(){
        const {ctx,app}=this;
        const {addCourseId,courseName}=ctx.request.body;

        const findData={}

        if(addCourseId) findData.addCourseId=addCourseId;
        if(courseName) findData.courseName=courseName;

        try {
            let res = await ctx.model.AddCourse.findAll({
                where:findData
            })
            if(res){
                ctx.body={success:true,data:res}
                console.log(res);
            }else{
                ctx.body={success:false,errCode:20022,msg:"找不到指定的值"}
            }
        } catch (e) {
            ctx.body={success:false,errCode:20023}
            console.log(e);
        }
    }

    /*
        author:ww
        desc:更新课程添加
        params:{courseName:课程名称,courseType：课程类型,courseLevel：课程难度,courseTime：课程时长,courseIntro：课程简介}
        date:2021-8-23
    */

    async updateCourse(){
        const {ctx,app}=this;
        const {addCourseId,courseName,courseType,courseLevel,courseTime,courseIntro}=ctx.request.body;
        const updateData={}
        const where={}

        if(addCourseId) where.addCourseId=addCourseId;
        if(courseName) updateData.courseName=courseName;
        if(courseType) updateData.courseType=courseType;
        if(courseLevel) updateData.courseLevel=courseLevel;
        if(courseTime) updateData.courseTime=courseTime;
        if(courseIntro) updateData.courseIntro=courseIntro;

        try {
            let res=await ctx.model.AddCourse.update(updateData,{
                where
            })
            console.log(res);
            ctx.body={success:true,errCode:20032,msg:"修改成功"}
        } catch (e) {
            ctx.body={success:false,errCode:20033}
            console.log(e);
        }
    }

    /*
        author:ww
        desc:删除课程添加
        params:{courseName:课程名称,courseType：课程类型,courseLevel：课程难度,courseTime：课程时长,courseIntro：课程简介}
        date:2021-8-23
    */

    async deleteCourse(){
        const {ctx,app}=this;
        const {addCourseId}=ctx.request.body;

        const deleteData={}

        if(addCourseId) deleteData.addCourseId=addCourseId;

        try {
            let res=await ctx.model.AddCourse.destroy({
                where:deleteData
            })
            ctx.body={success:true,errCode:20042,msg:"删除成功"}
        } catch (e) {
            ctx.body={success:false,errCode:20043,msg:"删除失败"}
        }
    }
}

module.exports=courseAddController;