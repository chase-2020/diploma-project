'use strict';

const Controller = require('egg').Controller;

class competitionController extends Controller {


    /**
     * author : 龙且
     * desc : 赛事创建
     * params : { name:'赛事名'，venue:'密码'; }
     * date : 2021.08.10
     **/
    async create(){
        const { ctx } = this;
        const { theme,organizer,field,type,startTime,endTime } = ctx.request.body;

        try{
           await ctx.model.EventActivities.create({
               type,  // 活动类型
               theme,  //活动主题
               organizer,  //活动举办方
               field,  //赛事活动场地
               startTime, //赛事活动开始时间
               endTime, //赛事活动结束时间
               createdAt: Date.now(),
               updatedAt: Date.now(),
            })
            ctx.body = {success:true,info:'创建成功'}
        } catch(e){
            ctx.body = {success:false,info:'创建失败123'}
        }
    }

    /**

     * desc : 查询所有活动/ 查询单个场馆的所有的活动

     **/

    async findAll(){

        const { ctx,app} = this;
        const { theme,organizer,} = ctx.request.body;

        try{
            const where = {};
            if(organizer) where.organizer = organizer;
            let res1 = await ctx.model.EventActivities.findAll({
                theme,
                where
            })
            console.log(res1)
            ctx.body = res1
        } catch(e){
            console.log(e)
            ctx.body = "查询失败123"
        }
    }


    /**

     * desc : 查询发布活动的所有场馆

     **/

    async stAll(){
        const { ctx } = this;
        const { theme } = ctx.request.body;
        try{
            let res1 = await ctx.model.EventActivities.findAll({
                theme,
                where:{state: 1}
            })
            console.log(res1)
            const a = [];
            for(let i in res1){
                a.push(res1[i].organizer)
            }
            const set = new Set(a);
            let b = [...set]
            ctx.body = b
        } catch(e){
            console.log(e)
            ctx.body = "查询失败123"
        }
    }




}

module.exports = competitionController;
