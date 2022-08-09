'use strict';

const Controller = require('egg').Controller;

class PlanController extends Controller {


    // 创建特殊排场
    async planCreate(){
        const { ctx } = this;
        const { siteid,plan,time,planNum } = ctx.request.body;


        try{

            //查找当前场地的当前日期是否已经存在特别排场
            await ctx.model.Plan.destroy({
                where: {
                    siteid,
                    time,
                    planNum,
                }
            });

            const res = await ctx.model.Plan.create({
                siteid,
                plan,
                time,
                planNum,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            })
            if(res) return ctx.body = {success:true,info:"排场成功"};
            console.log("res",res)
            ctx.body = {success:false,info:"排场失败",res}
        } catch(e){
            console.log('e',e)
            ctx.body = {success:false,info:"排场失败"}
        }
    }


    // 查询所有排场
    async planFindAll() {
        const { ctx ,app} = this;
        const { siteid,planNum } = ctx.request.body;

        try {
            let res = await ctx.model.Plan.findAll({
                where:{
                    siteid,
                    planNum
                }
            })

            if(res)  return  ctx.body = {success:true,info:'查询成功',data:res};
            return ctx.body = { success:false,info:'没有符合条件'}
        }catch(e){
            console.log(e)
            ctx.body = "查询失败!"
        }

    }

    // 删除排场
    async deletePlan() {
        const { ctx ,app} = this;
        const { select } = ctx.request.body;
        try {
            { select.map((item,index)=>{
              const res = ctx.model.Plan.destroy({
                    where:{
                        siteid:item.siteid,
                        planNum:item.planNum,
                        time:item.time
                    }
                })
                console.log('我是选中的',select)
                if(res)  return  ctx.body = {success:true,info:'删除成功',data:res};
                return ctx.body = { success:false,info:'没有符合条件'}
            })}
        }catch(e){
            console.log(e)
            ctx.body = "删除失败!"
        }

    }


}

module.exports = PlanController;
