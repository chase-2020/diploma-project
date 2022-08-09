'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    /*
        author:ZERO
        desc:查询单个用户
        params:{
                uid:"用户id",
                phone:"手机号码",
                username:"用户名",
                senFen:"身份证号",
                wxOpenId:"微信账号",
                qq:"QQ号码",
                vipcardid:"会员卡ID",
                email:"邮箱",
                registerTime:"注册时间"
               }
        data:2021-08-10
    */ 
    async findOne(){
        const { ctx,app } = this
        const uid = ctx.params.uid
        // 获取参数
        let { phone,username,senFen,wxOpenId,qq,vipcardid,email,registerTime } = ctx.request.body;
        const { Op } = app.Sequelize;

        //查询的条件
        const where = {}
        //用户可以传的参数
        if(uid) where.uid = uid
        if(phone) where.phone = phone
        if(username) where.username = username
        if(senFen) where.senFen = senFen
        if(wxOpenId) where.wxOpenId = wxOpenId
        if(qq) where.qq = qq
        if(vipcardid) where.vipcardid = vipcardid
        if(email) where.email = email
        if(registerTime) where.registerTime = registerTime

        try{
    
            let res = await ctx.model.User.findOne({
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

    /*
        author:ZERO
        desc:查询多个用户
        params:{
                sex:"性别",
                age:"年龄",
                hight:"身高",
                weight:"体重",
                keCheng:"所选课程",
                type:"是否为会员",
                birthday:"生日"
               }
        data:2021-08-10
    */
    async findAll(){
      const { ctx,app } = this
      // 获取参数
      let { uid,username,sex,age,hight,weight,keCheng,type,birthday,limit,page } = ctx.request.body;
      const { Op } = app.Sequelize;

      //查询的条件
      const where = {}
      // 分页处理
      limit = limit ? limit:30
      page = page ? page : 1

      //用户可以传的参数
      if(sex) where.sex = sex
      if(age) where.age = age
      if(hight) where.hight = hight
      if(weight) where.weight = weight
      if(keCheng) where.keCheng = keCheng
      if(type) where.type = type
      if(birthday) where.birthday = birthday
      if(uid) where.uid = uid
      if(username) where.username = username
      console.log(where);
      try{
          let res = await ctx.model.User.findAndCountAll({
              where,
              order:[["uid","ASC"]],     //让查出来的数据（多个）按指定字段大小排列
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


    /*
        author:ZERO
        desc:修改用户信息
        params:{
                uid:"用户id",
                phone:"手机号码",
                username:"用户名",
                senFen:"身份证号",
                wxOpenId:"微信账号",
                qq:"QQ号码",
                vipcardid:"会员卡ID",
                email:"邮箱",
                registerTime:"注册时间",
                sex:"性别",
                age:"年龄",
                hight:"身高",
                weight:"体重",
                keCheng:"所选课程",
                type:"是否为会员",
                birthday:"生日"
               }
        data:2021-08-10
    */ 
    async update(){
        const { ctx,app } = this;

        let { sex,age,hight,weight,keCheng,type,birthday,uid,phone,username,senFen,wxOpenId,qq,vipcardid,email,registerTime,address,limit,page } = ctx.request.body;
        const { Op } = app.Sequelize;

        //修改的条件
        const where = {}
        //修改的内容
        const updateData = {}
        // 分页处理
        limit = limit ? limit:30
        page = page ? page : 1

        if(uid) where.uid = uid

        if(uid) updateData.uid = uid
        if(sex || sex===0) updateData.sex = sex
        if(age) updateData.age = age
        if(hight) updateData.hight = hight
        if(weight) updateData.weight = weight
        if(keCheng) updateData.keCheng = keCheng
        if(type || type===0 ) updateData.type = type
        if(birthday) updateData.birthday = birthday
        if(phone) updateData.phone = phone
        if(username) updateData.username = username
        if(senFen) updateData.senFen = senFen
        if(wxOpenId) updateData.wxOpenId = wxOpenId
        if(qq) updateData.qq = qq
        if(vipcardid) updateData.vipcardid = vipcardid
        if(email) updateData.email = email
        if(registerTime) updateData.registerTime = registerTime
        if(address) updateData.address = address

        //update({要变更的字段信息}，{配置项})  配置项.where 条件
        try{
          let res = await ctx.model.User.update(updateData,{
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


    /*
        author:ZERO
        desc:删除用户
        params:{
                uid:"用户id",
                phone:"手机号码",
                username:"用户名",
                senFen:"身份证号",
                wxOpenId:"微信账号",
                qq:"QQ号码",
                vipcardid:"会员卡ID",
                email:"邮箱",
                registerTime:"注册时间",
                sex:"性别",
                age:"年龄",
                hight:"身高",
                weight:"体重",
                keCheng:"所选课程",
                type:"是否为会员",
                birthday:"生日"
               }
        data:2021-08-10
    */
    async destroy(){
        const { ctx,app } = this;
        let { uid,phone,username,senFen,wxOpenId,qq,vipcardid,email,registerTime,sex,age,hight,weight,keCheng,type,birthday,limit,page } = ctx.request.body;
        const { Op } = app.Sequelize;

        //修改的条件
        const where = {}
        // 分页处理
      limit = limit ? limit:30
      page = page ? page : 1

        //用指定条件找到所要删除的用户
        if(uid) where.uid = uid
        if(phone) where.phone = phone
        if(username) where.username = username
        if(senFen) where.senFen = senFen
        if(wxOpenId) where.wxOpenId = wxOpenId
        if(qq) where.qq = qq
        if(vipcardid) where.vipcardid = vipcardid
        if(email) where.email = email
        if(registerTime) where.registerTime = registerTime
        if(sex) where.sex = sex
        if(age) where.age = age
        if(hight) where.hight = hight
        if(weight) where.weight = weight
        if(keCheng) where.keCheng = keCheng
        if(type) where.type = type
        if(birthday) where.birthday = birthday

        try{
          let res = await ctx.model.User.destroy({
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
}

module.exports = UserController;