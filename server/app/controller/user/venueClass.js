'use strict';

const Controller = require('egg').Controller;

class VenueClassController extends Controller {


    /**
     * author : 龙且
     * desc : 查询所有课程/ 查询指定类型的课程 / 查询指定场馆的课程
     * date : 2021.08.23
     **/

    async findAll() {
        const { ctx } = this;
        // 获取参数
        let { className,type,venueName } = ctx.request.body;

        //查询的条件
        const where = {}

        //用户可以传的参数
        if(type) where.type = type;
        if(venueName) where.venueName = venueName;
        try{
            const res = await ctx.model.VenueClass.findAll({
                className,
                where
            })

            console.log(res)
            ctx.body = res
        }catch(e){
            ctx.body = {success:false,info:"查询失败 请联系管理员" }
        }
    }

    /**
     * author : 龙且
     * desc : 查询所有的课程类型
     * date : 2021.08.23
     **/

    async vnAll(){
        const { ctx } = this;
        const { className } = ctx.request.body;
        try{
            let res = await ctx.model.VenueClass.findAll({
                className,
            })
            console.log(res)
            const a = [];
            for(let i in res){
                a.push(res[i].type)
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

module.exports = VenueClassController;
