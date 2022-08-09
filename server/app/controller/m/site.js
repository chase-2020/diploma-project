'use strict';

const Controller = require('egg').Controller;

class SiteController extends Controller {

    /**
     * 查询场地的所有信息
     **/



    async stAll1(){

        const { ctx,app} = this;
        const { courtid } = ctx.request.body;

        try{
            const res = await ctx.model.Site.findAll({
                where:{
                    courtid,
                }
            })
            if(res)  return  ctx.body = {success:true,data:res};
            console.log(res)

        } catch(e){
            console.log(e)
            ctx.body = "查询失败321"
        }
    }







    async stAll(){

        const { ctx,app} = this;
        const { stadium,merchant } = ctx.request.body;
        const where = {}
        if(merchant) where.merchant = merchant
        if(stadium) where.stadium = stadium
        try{
            let res = await ctx.model.Site.findAll({
                where,
            })
            console.log(res)
            ctx.body = res
        } catch(e){
            console.log(e)
            ctx.body = "查询失败321"
        }
    }


    async stAll11(){

        const { ctx,app} = this;
        const { stadium,merchant,time } = ctx.request.body;
        const where = {}
        if(merchant) where.merchant = merchant
        if(stadium) where.stadium = stadium
        // const where1 = {}
        // if(merchant) where1.merchant = merchant
        // if(stadium) where1.stadium = stadium
        // if(time) where1.time = time
        try{
            const res = await ctx.model.Sort.findAll({
                // where1
                where:{
                    merchant,
                    stadium,
                    time,

                }
            })
            ctx.body = res
            console.log(res)


            if(res[0] == null){
                    const res1 = await ctx.model.Site.findAll({
                        where,
                    })
                    console.log(res1)
                    ctx.body = res1
            }


        } catch(e){
            console.log(e)
            ctx.body = "查询失败321"
        }
    }

    async stAll2(){

        const { ctx,app} = this;
        const { stadium,merchant ,time} = ctx.request.body;
        const where = {}
        if(merchant) where.merchant = merchant
        if(stadium) where.stadium = stadium
        try{

            const site = await ctx.model.sort.findAll({
                // where:{
                //     time
                // }

            })

            // if(!site){
            //     let res = await ctx.model.Site.findAll({
            //         where,
            //     })
            //     console.log(res)
            //     ctx.body = res
            // }

            ctx.body = site

        } catch(e){
            console.log(e)
            ctx.body = "查询失败321"
        }
    }


}

module.exports = SiteController;
