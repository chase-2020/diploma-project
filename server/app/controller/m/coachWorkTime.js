'use strict';

const Controller = require('egg').Controller;

class CoachTimeController extends Controller {

    /*
        author:ww
        desc:新增教练排课时间
        params:{startTime:"课程的开始时间",endTime:"课程的结束时间",bookTime:"学员开始预约的时间",bookPeople:"可预约人数",
                courseType:"课程类型",coachId:"关联教练表的ID",place:"选择场地"}
        date:2021-08-18
    */
   
    async addTime(){
        const { ctx ,app} = this;
        const {coachId,place,plan} = ctx.request.body;
        console.log(plan)
        try {
            let res = await ctx.model.CoachWorkTime.create({
                coachId,
                place,
                plan,
            })
            ctx.body={success:true,errCode:20010,msg:"创建成功"}
            console.log(res);
        } catch (e) {
            ctx.body={success:false,errCode:20011,msg:"创建失败"}
            console.log(e);
        }
    }

    /*
        author:ww
        desc:查找教练排课时间
        params:{startTime:"课程的开始时间",endTime:"课程的结束时间",bookTime:"学员开始预约的时间",bookPeople:"可预约人数",
                courseType:"课程类型",coachId:"关联教练表的ID",place:"选择场地"}
        date:2021-08-19
    */

    async findTime(){
        const {ctx,app}=this;
        const {workId,courseType} = ctx.request.body

        const findData={}

        if(workId) findData.workId=workId;
        if(courseType) findData.courseType=courseType;

        
        try {
            let res=await ctx.model.CoachWorkTime.findAll({
                where:findData
            })
            if(res){
                ctx.body={success:true,data:res}
                console.log(res)
            }else{
                ctx.body={success:false,errCode:20020,msg:"找不到指定的值"}
            }
        } catch (e) {
            ctx.body={success:false,errCode:20021}
            console.log(e)
        }
    }
    /*
        author:ww
        desc:查找单个教练排课时间
    */
    async findOneTime(){
        const {ctx,app}=this;
        const {coachId}=ctx.request.body;
        try {
            let res=await ctx.model.CoachWorkTime.findOne({
                where:{
                    coachId
                }
            })
            if(res){
                ctx.body={success:true,data:res}
                console.log(res)
            }else{
                ctx.body={success:false,errCode:20022,msg:"找不到指定的值"}
            }
        } catch (e) {
            ctx.body={success:false,errCode:20023}
            console.log(e)
        }
    }
    /*
        author:ww
        desc:更新教练排课时间
        params:{startTime:"课程的开始时间",endTime:"课程的结束时间",bookTime:"学员开始预约的时间",bookPeople:"可预约人数",
                courseType:"课程类型",coachId:"关联教练表的ID",place:"选择场地"}
        date:2021-08-19
    */

    async updateTime(){
        const {ctx,app}=this;
        const {workId,coachId,place,plan} = ctx.request.body;
        const updateData={}
        const where={}

        if(workId) where.workId=workId;
        if(coachId) updateData.coachId=coachId;
        if(place) updateData.place=place;
        if(plan) updateData.plan=plan;
        try {
            let res=await ctx.model.CoachWorkTime.update(updateData,{
                where,
            })
            console.log(res);
            ctx.body={success:true,errCode:20030,msg:"修改成功"}
        } catch (e) {
            ctx.body={success:false,errCode:20031,msg:'修改失败'}
            console.log(e);
        }
    }

    /*
        author:ww
        desc:删除教练排课时间
        params:{startTime:"课程的开始时间",endTime:"课程的结束时间",bookTime:"学员开始预约的时间",bookPeople:"可预约人数",
                courseType:"课程类型",coachId:"关联教练表的ID",place:"选择场地"}
        date:2021-08-19
    */

    async deleteTime(){
        const {ctx,app}=this;
        const {workId} = ctx.request.body;

        const deleteData={}
        
        if(workId) deleteData.workId=workId;
        
        try {
            let res=await ctx.model.CoachWorkTime.destroy({
                where:deleteData
            })
            ctx.body={success:true,errCode:20040,msg:"删除成功"}
        } catch (e) {
            ctx.body={success:false,errCode:20041,msg:"删除失败"}
        }
    }
}

module.exports=CoachTimeController;