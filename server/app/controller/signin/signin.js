'use strict';

const Controller = require('egg').Controller;

class registerController extends Controller {


    /*
    用户注册
    */
    async register(){
        const { ctx } = this;
        const { phone,password } = ctx.request.body;  
        const utils = require('utility');
        const registerTime = Date.now()
        
        //错误提示
        if(!phone) return ctx.body = { success:false, errCode:8001, info:"请输入手机号" }
        if(!/^1[3456789]\d{9}$/.test(phone)) return ctx.body = { success:false, errCode:8002, info:"请输入正确的手机号" }
        if(!password) return ctx.body = { success:false, errCode:8011, info:"请输入密码" }
        if(password.length < 6) return ctx.body = { success:false, s, info:"密码不能少于6位" }

        try{
            
            //填写手机号、密码
            await ctx.model.User.create({
                phone:phone,
                passWord:utils.md5(password + `${registerTime}`),
                registerTime:registerTime,
            })

            ctx.body = { success:true, info:"注册成功！" }
        }catch(e){
            ctx.body = { success:false,errCode:8008, info:"注册失败！" }
        }

    }



    /*
    用户密码登录
    */
    async pwdloger(){
        const {ctx} =this;
        const {phone, password} = ctx.request.body;
        const utils = require('utility');

        //用户登录错误
        if(!phone)  return ctx.body ={ success:false , info:"手机号不能为空"}
        if(!/^1[3456789]\d{9}$/.test(phone)) return ctx.body ={ success:false , info:"手机号输入错误！"}
        if(!password) return ctx.body={success:false , info:"密码不能为空"}
        if(password.length <6) return ctx.body={success:false , info:"密码不能少与6位！" }
       
        try{
            
            //寻找有无请求的手机号
            let one = await ctx.model.User.findOne({
                where:{
                    phone,               
                },    
                raw : true                        
            })
            console.log(one)
            if(one!=null){
                //当手机号存在时，作密码匹配
                if(one.passWord == utils.md5(password + `${one.registerTime}`)){
                    return   ctx.body = { success:true, info:"登录成功！" }
                }else{
                    ctx.body = { success:false, info:"密码错误，请重新输入" }
                }
            }else{
                ctx.body = { success:false, info:"没有此用户，请先注册" }
            }
   
        }catch(e){
            ctx.body = { success:false, info:"网络开了小差！" }
        }
    }



    /*
    用户验证码登录
    */
    async vcloger(){
        const { ctx ,app } =this;
        const { phone , verificationCode} =ctx.request.body;
        const updateData = {}

        //数据过滤
        if(!phone)  return ctx.body ={ success:false , info:"手机号不能为空"}
        if(!/^1[3456789]\d{9}$/.test(phone)) return ctx.body ={ success:false , info:"手机号输入错误！"}
        if(!verificationCode) return ctx.body={success:false, info:"请输入验证码"}
        if(verificationCode.length<6) return ctx.body={success:false,info:"请输入正确的验证码"}

        try{
            //查找输入的手机号
            let one = await ctx.model.User.findOne({
                where:{
                    phone
                },
                raw : true  
            })
            //判断输入的手机号是否已经注册
            if(one!=null){
                //匹配登录验证码
                if(one.verificationCode == verificationCode){
                    ctx.body={success:true, info:"登录成功"}

                    //登录成功之后，清除验证码
                    updateData.verificationCode = null
                    let res = await ctx.model.User.update(updateData,{
                        where:{phone}
                    })
                }else{
                    ctx.body = { success:false, info:"验证码错误，请重新输入" }
                }
                
            }else{
                ctx.body={success:false, info:"没有此用户，请先注册"}
            }
        }catch(e){
            ctx.body = { success:false, info:"网络开了小差！" }
        }

    }


    

    /*
    随机添加验证码
    */
    async update(){
        const {ctx ,app } = this;
        const phone = ctx.params.phone
        const res = await ctx.service.user.verificationCode(phone)
        ctx.body={
            date:res
        }
        
    }



    /*
    用户修改密码
    */
    async Reset(){
        const { ctx,app } = this;
        const { phone,password,verificationCode } = ctx.request.body
        const updateData = {}
        const utils = require('utility');  
        const resetTime = Date.now()

        if(!phone) return ctx.body={success:false,info:"请输入您的手机号"}
        if(!/^1[3456789]\d{9}$/) return ctx.body={success:false,info:"您输入的手机号不正确，请从新输入！"}
        // if(verificationCode.length < 6) return ctx.body={success:false,info:"请正确输入验证码"}
        // if(!verificationCode) return ctx.body={success:false,info:"请输入验证码"}
        // if(!password) return ctx.body={success:false , info:"密码不能为空"}
        // if(password.length <6) return ctx.body={success:false , info:"密码不能少与6位！" }


        if(password) updateData.passWord = utils.md5(password + `${resetTime}`)

        try{
            //查找输入的手机号
            let one = await ctx.model.User.findOne({
                where:{
                    phone
                },
                raw : true  
            })
            //判断输入的手机号是否已经注册
            if(one[0]!=0){
                //匹配验证码
                if(one.verificationCode == verificationCode){
                    ctx.body={success:true, info:"验证成功"}

                    //验证成功之后，清除验证码，修改密码
                    updateData.verificationCode = ''
                    let res = await ctx.model.User.update(updateData,{
                        where:{ phone }
                    })
                    if(res.passWord!=password){
                        ctx.body={success:true, info:"密码重置成功"}
                    }else{
                        ctx.body={success:true, info:"密码重置失败"}
                    }
                }else{
                    ctx.body = { success:false, info:"验证码错误，请重新输入" }
                }
                
            }else{
                ctx.body={success:false, info:"没有此用户，请先注册"}
            }
        }catch(e){
            ctx.body = { success:false, info:"网络开了小差！" }
        }
    }
}

module.exports = registerController;