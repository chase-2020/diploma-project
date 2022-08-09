'use strict';

const Controller = require('egg').Controller;

class DynamicController extends Controller {

    //event表的所有字段
    /*  
            uid:"用户Id",
            Photo:"头像照片",
            username:"用户名",
            releaseTime:"动态发布时间",
            context:"动态内容",
            fabulous:"点赞数",
            evaluate:"评论数",
            evalUsername:"评论用户名",
            evalContext:"评论内容",
            evalTime:"评论时间",
            replyContext:"回复内容",
            replyTime:"回复时间",
            createdAt:"创建时间",
            updatedAt:"更新时间",
    */


        /*
            author:ZERO
            desc:查询单个动态
            params:{
                    uid:"用户Id",
                    username:"用户名",
                }
            data:2021-08-16
        */ 
            async findOne(){
                const { ctx,app } = this
                // 获取参数
                let { uid,username } = ctx.request.body;
                const { Op } = app.Sequelize;
        
                //查询的条件
                const where = {}
        
                //用户可以传的参数
                if(uid) where.uid = uid
                if(username) where.username = username
        
                try{
            
                    let res = await ctx.model.Dynamic.findOne({
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
            desc:查询多个动态
            params:{
                    uid:"用户Id",
                    username:"用户名",
                }
            data:2021-08-16
            */ 
            async findAll(){
                const { ctx,app } = this
                // 获取参数
                let { uid,username,releaseTime,fabulous,limit,page } = ctx.request.body;
                const { Op } = app.Sequelize;
          
                //查询的条件
                const where = {}
                // 分页处理
                limit = limit ? limit:30
                page = page ? page : 1
          
                //用户可以传的参数
                if(uid) where.uid = uid
                if(username) where.username = username
                if(releaseTime) where.releaseTime = releaseTime
                if(fabulous) where.fabulous = fabulous
        
                try{
                    let res = await ctx.model.Dynamic.findAndCountAll({
                        where,
                        order:[["createdAt","ASC"]],    //让查出来的数据（多个）按指定字段大小排列
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
                desc:删除赛事
                params:{
                        uid:"用户ID",
                        createdAt:"创建时间",
                    }
                data:2021-08-16
            */ 
            async destroy(){
                const { ctx,app } = this;
                let { uid,createdAt,limit,page } = ctx.request.body;
                const { Op } = app.Sequelize;
        
                //修改的条件
                const where = {}
                // 分页处理
                limit = limit ? limit:30
                page = page ? page : 1
        
                //用指定条件找到所要删除的用户
                if(uid) where.uid = uid
                if(createdAt) where.createdAt = createdAt
        
                try{
                  let res = await ctx.model.Dynamic.destroy({
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

}

module.exports = DynamicController;