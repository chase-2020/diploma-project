'use strict';

const Controller = require('egg').Controller;

class EventController extends Controller {

    //event表的所有字段
    /*  
            actId:"赛事活动编号",
            theme:"赛事活动名称",
            project:"赛事活动项目",
            field:"赛事活动场地",
            organizer:"赛事活动举办方",
            mode:"活动参与方式",
            sponsor:"赛事活动赞助商",
            content:"赛事活动内容介绍",
            quota:"赛事活动名额",
            registration:"报名费用",
            rttStartTime:"赛事活动报名开始时间",
            rttEndTime:"赛事活动报名结束时间",
            startTime:"赛事活动开始时间",
            endTime:"赛事活动结束时间",
            state:"活动状态：1.报名中，2.已结束，3.预约中，4已截止", 
            createdAt:"创建时间",
            organizerphone:"举办方联系电话"
    */


        /*
            author:ZERO
            desc:查询单个赛事
            params:{
                    actId:"赛事活动编号",
                    theme:"赛事活动名称",
                }
            data:2021-08-16
        */ 
        async findOne(){
            const { ctx,app } = this
            // 获取参数
            let { actId,theme } = ctx.request.body;
            const { Op } = app.Sequelize;
    
            //查询的条件
            const where = {}
    
            //用户可以传的参数
            if(actId) where.actId = actId
            if(theme) where.theme = theme
    
            try{
        
                let res = await ctx.model.EventActivities.findOne({
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
                desc:查询多个赛事
                params:{
                    project:"赛事活动项目",
                    field:"赛事活动场地",
                    sponsor:"赛事活动赞助商",
                    }
                data:2021-08-16
            */ 
            async findAll(){
                const { ctx,app } = this
                // 获取参数
                let { type,theme,actId,project,sponsor,field,limit,page } = ctx.request.body;
                const { Op } = app.Sequelize;
          
                //查询的条件
                const where = {}
                // 分页处理
                limit = limit ? limit:30
                page = page ? page : 1
          
                //用户可以传的参数
                if(project) where.project = project
                if(sponsor) where.sponsor = sponsor
                if(field) where.field = field
                if(actId) where.actId = actId
                if(theme) where.theme = theme
                if(type) where.type = type
        
                try{
                    let res = await ctx.model.EventActivities.findAndCountAll({
                        where,
                        order:[["actId","ASC"]],    //让查出来的数据（多个）按指定字段大小排列
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
                desc:修改赛事信息
                params:{
                    actId:"赛事活动编号",
                    theme:"赛事活动名称",
                    type:"活动类型",
                    project:"赛事活动项目",
                    field:"赛事活动场地",
                    organizer:"赛事活动举办方",
                    mode:"活动参与方式",
                    sponsor:"赛事活动赞助商",
                    content:"赛事活动内容介绍",
                    quota:"赛事活动名额",
                    registration:"报名费用",
                    rttStartTime:"赛事活动报名开始时间",
                    rttEndTime:"赛事活动报名结束时间",
                    startTime:"赛事活动开始时间",
                    endTime:"   ",
                    state:"活动状态：1.报名中，2.已结束，3.预约中，4已截止",
                    createdAt:"创建时间",       
                    }
                data:2021-08-16
            */ 
            async update(){
                const { ctx,app } = this;
        
                let { organizerphone,type,actId,theme,project,field,organizer,mode,sponsor,content,quota,registration,rttStartTime,rttEndTime,startTime,endTime,state,limit,page } = ctx.request.body;
                const { Op } = app.Sequelize;
        
                //修改的条件
                const where = {}
                //修改的内容
                const updateData = {}
                // 分页处理
                limit = limit ? limit:30
                page = page ? page : 1
        
                if(actId) where.actId = actId
        
                if(theme) updateData.theme = theme
                if(type) updateData.type = type
                if(project) updateData.project = project
                if(field) updateData.field = field
                if(organizer) updateData.organizer = organizer
                if(mode) updateData.mode = mode
                if(sponsor) updateData.sponsor = sponsor
                if(content) updateData.content = content
                if(quota) updateData.quota = quota
                if(registration) updateData.registration = registration
                if(rttStartTime) updateData.rttStartTime = rttStartTime
                if(rttEndTime) updateData.rttEndTime = rttEndTime
                if(startTime) updateData.startTime = startTime
                if(endTime) updateData.endTime = endTime
                if(state) updateData.state = state
                if(organizerphone) updateData.organizerphone = organizerphone
                
        
                //update({要变更的字段信息}，{配置项})  配置项.where 条件
                try{
                  let res = await ctx.model.EventActivities.update(updateData,{
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
                desc:删除赛事
                params:{
                        actId:"赛事活动编号",
                        theme:"赛事活动名称",
                    }
                data:2021-08-16
            */ 
            async destroy(){
                const { ctx,app } = this;
                let { actId,theme,limit,page } = ctx.request.body;
                const { Op } = app.Sequelize;
        
                //修改的条件
                const where = {}
                // 分页处理
                limit = limit ? limit:30
                page = page ? page : 1
        
                //用指定条件找到所要删除的用户
                if(actId) where.actId = actId
                if(theme) where.theme = theme
        
                try{
                  let res = await ctx.model.EventActivities.destroy({
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


            async create() {
                const { ctx } = this;
                let {theme,type,project,organizerphone,actId,field,organizer,mode,sponsor,content,quota,registration,first,second,third,state,rttStartTime,rttEndTime} = ctx.request.body;
        
        
                //数据过滤
                 if(!theme) return ctx.body = { success:false, errCode:50002,info:"请填写赛事名称" }
                 if(!type) return ctx.body = { success:false, errCode:50002,info:"请填写赛事活动项目" }
                 if(!project) return ctx.body = { success:false, errCode:50002,info:"请填写课程类型" }
                 if(!field) return ctx.body = { success:false, errCode:50002,info:"请填写场地" }
                 if(!organizer) return ctx.body = { success:false, errCode:50002,info:"请填写举办方" }
                 if(!mode) return ctx.body = { success:false, errCode:50002,info:"请填写活动参与方式" }
                 if(!sponsor) return ctx.body = { success:false, errCode:50002,info:"请填写活动赞助商" }
                 if(!content) return ctx.body = { success:false, errCode:50002,info:"请填写内容" }
                 if(!quota) return ctx.body = { success:false, errCode:50002,info:"请填写赛事活动名额" }
                 if(!registration) return ctx.body = { success:false, errCode:50002,info:"请填写金额" }
                 if(!first) return ctx.body = { success:false, errCode:50002,info:"请填写一等奖" }
                 if(!second) return ctx.body = { success:false, errCode:50002,info:"请填写二等奖" }
                 if(!third) return ctx.body = { success:false, errCode:50002,info:"请填写三等奖" }
                 if(!state) return ctx.body = { success:false, errCode:50002,info:"请填写赛事状态" }
                 if(!rttStartTime) return ctx.body = { success:false, errCode:50002,info:"请填写时间" }
                 if(!rttEndTime) return ctx.body = { success:false, errCode:50002,info:"请填写时间" }
                 if(!/^1[3456789]\d{9}$/.test(organizerphone))  return ctx.body = { success:false, errCode:50002, info:"请填写正确的手机号码" }
                try{
                    let res = await ctx.model.EventActivities.create({
                        theme,
                        project,
                        type,
                        organizerphone,
                        actId,
                        field,
                        organizer,
                        mode,
                        sponsor,
                        content,
                        quota,
                        registration,
                        first,
                        second,
                        state,
                        third,
                        rttStartTime,
                        rttEndTime,
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                    })
                    if(!res) return ctx.body = {success:false,errCode:50001,info:"添加失败"}; 
                    console.log('res',res)
                    ctx.body = {success:true,info:"添加成功",res}
                }catch(e){
                    console.log(e);
                    ctx.body = {success:false, errCode: 50002,info:"添加失败"};
                }
            }

}

module.exports = EventController;