'use strict';
const Controller = require('egg').Controller;

class AppraiseController extends Controller {
    async addAppraise(){
        const { ctx, app } = this;
        const { coachName,courseName,coachGrade,courseGrade,coachAppContent,courseAppContent } = ctx.request.body;
        // 数据过滤
        if(!coachName) return ctx.body = { success:false,errCode:2002,info:"请输入教练的姓名"}
        if(!courseName) return ctx.body = { success:false,errCode:2002,info:"请输入课程名称"}
        if(!/^[12345]$/.test(courseGrade)) return ctx.body = {success:false,errCode:2002,info:"请输入对课程的评价等级"}
        if(!/^[12345]$/.test(coachGrade)) return ctx.body = {success:false,errCode:2002,info:"请输入对教练的评价等级"}
        try{
            await ctx.model.Appraise.create({
                coachName,//教练姓名
                courseName,//课程名称
                coachGrade,//教练评价等级
                courseGrade,//课程评价等级
                coachAppContent,//评价教练的内容
                courseAppContent //评价课程的内容
            })
            ctx.body = {success:true,errCode:"",msg:"创建成功"}
        }catch(e){
            ctx.body = {success:true,errCode:"",msg:"创建失败"}
        }
    }

    // 查找评价
    async findAppraise(){
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        
        let { coachName,courseName,limit,page} = ctx.request.body;
        limit =limit ? limit:30;
        page = page ? page:1;
        const offset = (page-1)*limit;
        const findData =  {};
        if(coachName) findData.coachName  ={[Op.like]:coachName+'%'}
        if(courseName) findData.courseName = {[Op.like]:courseName+'%'}
        try{
            let res=await ctx.model.Appraise.findAll({
                limit,
                offset,
                where:findData
            })
            if(res)  ctx.body = { success:true,data:res }
            else ctx.body="没有找到数据"
        }catch(e){
            console.log(e)
            ctx.body = { success:false,errCode:2003,info:"查找失败" }
        }
    }
    
    // 删除评价
    async deleteAppraise(){
        const { ctx, app } = this;
        const { courseName,coachName,appraiseId} = ctx.request.body;
        const deleteData = {};
        if(courseName) deleteData.courseName = courseName;
        if(appraiseId) deleteData.id = appraiseId;
        if(coachName) deleteData.appraiseId = appraiseId;
        try {
            const res = await ctx.model.Appraise.destroy({
                where:deleteData,
            })
            ctx.body = {success:true,data:res}
        } catch (error) {
            console.log(error)
            ctx.body = {success:false,errCode:2004,info:"删除失败"}
            //2004 删除失败
        }
    }

    // 发表评论
    async createAppraise(){
        const { ctx, app } = this;
        const {uid, userName,userPhoto,courseName,stateCourse,courseAppContent,coachName,coachAppContent} = ctx.request.body;
        
        try{
           const res= await ctx.model.Appraise.create({
                userName,//学员姓名
                userPhoto,//学员头像
                uid,//用户uid
                courseName,//课程名称
                stateCourse,//评价课程星星数量
                courseAppContent, //评价课程的内容
                coachName,//教练姓名
                coachAppContent//评价教练的内容
            })
            ctx.body = {success:true,errCode:"",info:"创建成功",data:res}
        }catch(e){
            ctx.body = {success:true,errCode:30002,info:"创建失败"}
        }
    }

    //  查找所有课程评价
    async selectAppraise(){
        const { ctx, app } = this;    
        try{
            let res=await ctx.model.Appraise.findAll()
            if(res)  ctx.body = { success:true,info:'查找成功' ,data: res }
            else ctx.body="没有找到数据"
        }catch(e){
            console.log(e)
            ctx.body = { success:false,errCode:2006,info:"查找失败" }
        }
    }

    
}
module.exports = AppraiseController;