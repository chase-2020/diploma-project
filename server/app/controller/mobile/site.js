'use strict';

/*
desc: 场地
params:{};
*/

const Controller = require('egg').Controller;

class siteController extends Controller {

    // 查询指定场馆的所有场地
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



}

module.exports = siteController;
