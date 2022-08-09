'use strict';

const Controller = require('egg').Controller;

class newStudentController extends Controller {

    async findOne(){
        const { ctx,app } = this
        const uid = ctx.params.uid
        // 获取参数
        let { sid,name,sex,phone,documentType,ID,age,birthday,createdAt,updatedAt } = ctx.request.body;
        const { Op } = app.Sequelize;

        //查询的条件
        const where = {}
        //用户可以传的参数
        if(sid) where.sid = sid
        if(name) where.name = name
        if(phone) where.phone = phone
        if(documentType) where.documentType = documentType
        if(ID) where.ID = ID
        if(age) where.age = age
        if(sex) where.sex = sex
        if(birthday) where.birthday = birthday
        if(createdAt) where.createdAt = createdAt
        if(updatedAt) where.updatedAt = updatedAt

        try{
    
            let res = await ctx.model.NewStudent.findOne({
                where,
            })
            if (!res) return ctx.body = { success:false, errCode: 50002, info:"查询失败" }
            console.log("res",res)
            ctx.body = {success:true,info:"查询成功",data:res}
      
        } catch(e){
            console.log(e)
            ctx.body = { success:false, errCode: 50001, info:"查询失败" }
      
        }
    }

    async findAll(){
        const { ctx,app } = this
        // 获取参数
        let { sid,sex,age,birthday,limit,page,uid } = ctx.request.body;
        const { Op } = app.Sequelize;
  
        //查询的条件
        const where = {}
        // 分页处理
        limit = limit ? limit:30
        page = page ? page : 1
  
        //用户可以传的参数
        if(sid) where.sid = sid
        if(sex) where.sex = sex
        if(uid) where.uid = uid
        if(age) where.age = age
        if(birthday) where.birthday = birthday
        console.log(where);
        try{
            let res = await ctx.model.NewStudent.findAndCountAll({
                where,
                order:[["sid","ASC"]],     //让查出来的数据（多个）按指定字段大小排列
            })
            // console.log(res1);
            // ctx.body = res1
            if (!res.count) return ctx.body = { success:false, errCode: 50002, info:"查询失败" }
            console.log("res",res)
            ctx.body = {success:true,info:"查询成功",res}
      
        } catch(e){
            console.log(e)
            ctx.body = { success:false, errCode: 50001, info:"查询失败" }
      
        }
    }

    async destroy(){
        const { ctx,app } = this;
        let { sid,limit,page } = ctx.request.body;
        const { Op } = app.Sequelize;

        //修改的条件
        const where = {}
        // 分页处理
      limit = limit ? limit:30
      page = page ? page : 1

        //用指定条件找到所要删除的用户
        if(sid) where.sid = sid

        try{
          let res = await ctx.model.NewStudent.destroy({
            where,
            order:[["registerTime","ASC"]],     //让查出来的数据（多个）按指定字段大小排列
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

    async update(){
        const { ctx,app } = this;

        let { sid,name,phone,documentType,ID,age,birthday,limit,page,sex } = ctx.request.body;
        const { Op } = app.Sequelize;

        //修改的条件
        const where = {}
        //修改的内容
        const updateData = {}
        // 分页处理
        limit = limit ? limit:30
        page = page ? page : 1

        if(sid) where.sid = sid

        // if(sid) updateData.sid = sid
        if(sex) updateData.sex = sex
        if(name) updateData.name = name
        if(phone) updateData.phone = phone
        if(documentType) updateData.documentType = documentType
        if(ID) updateData.ID = ID
        if(age) updateData.age = age
        if(birthday) updateData.birthday = birthday

        //update({要变更的字段信息}，{配置项})  配置项.where 条件
        try{
          let res = await ctx.model.NewStudent.update(updateData,{
            where,
            order:[["registerTime","ASC"]],     //让查出来的数据（多个）按指定字段大小排列
          })      
          if (!res[0]) return ctx.body = { success:false, errCode: 50002, info:"查询无结果,修改失败" }
          console.log("res",res)
          ctx.body = {success:true,info:"修改成功",res}
    
        } catch(e){
          console.log(e)
          ctx.body = { success:false, errCode: 50001, info:"修改失败" }
        }
    }

    async create() {
      const { ctx } = this;
      let {name,phone,documentType,ID,age,birthday,sex,uid} = ctx.request.body;


      //数据过滤
       if(!name) return ctx.body = { success:false, errCode:50002,info:"请填写学员姓名" }
       if(!documentType) return ctx.body = { success:false, errCode:50002,info:"请选择证件类型" }
       if(!ID) return ctx.body = { success:false, errCode:50002,info:"请填写证件号码" }
      //  if(!age) return ctx.body = { success:false, errCode:50002,info:"请填写年龄" }
       if(!birthday) return ctx.body = { success:false, errCode:50002,info:"请填写生日" }
       if(!sex) return ctx.body = { success:false, errCode:50002,info:"请选择性别" }
       if(!/^1[3456789]\d{9}$/.test(phone))  return ctx.body = { success:false, errCode:50002, info:"请填写正确的手机号码" }
      try{
          let res = await ctx.model.NewStudent.create({
              name,
              phone,
              uid,
              documentType,
              ID,
              age,
              birthday,
              sex,
              createdAt: Date.now(),
              updatedAt: Date.now(),
          })
          if(!res) return ctx.body = {success:false,errCode:50001,info:"添加失败"}; 
          console.log('res',res)
          ctx.body = {success:true,info:"添加成功",res}
      }catch(e){
          console.log(e);
          ctx.body = {success:false, errCode: 50001,info:"添加失败"};
      }
  }
}

module.exports = newStudentController;