'use strict';

const Controller = require('egg').Controller;
const utils = require('utility');

class UserController extends Controller {



    /**
     * author : 龙且
     * desc : 用户注册
     * params : { phone:'手机号'，passWord:'密码'; }
     * date : 2021.08.10
    **/

    async register(){

        const { ctx } = this;
        // 获取参数
        const { phone,passWord,verificationCode } = ctx.request.body;
        const registerTime = Date.now();
        // 数据过滤
        if(!phone) return  ctx.body = { success:false,info:"请输入手机号码" }
        if(!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone))
            return  ctx.body = { success:false,info:"请输入正确的手机号码" }
        if(!passWord) return  ctx.body = { success:false,info:"请输入密码" }
        if(passWord.length < 6)  return  ctx.body = { success:false,info:"密码不能少于6位" }

        const one = await ctx.model.User.findOne({
            where:{
                phone:phone
            },
            raw:true
        })

        console.log('one',one)
        if(one) return ctx.body = { success:false,info:'该手机号已注册!' }
        if(!verificationCode) return ctx.body={success:false, info:"请输入验证码"}
        if(verificationCode.length<6) return ctx.body={success:false,info:"请输入正确的验证码"}

        const pwd = utils.md5(passWord+`${registerTime}`);
        try{

            await ctx.model.User.create({
                phone: phone,
                passWord: pwd,
                registerTime: registerTime,
                createdAt: Date.now(),
                updatedAt: Date.now(),

            })
            ctx.body  = { success:true,info:'注册成功'}
        }catch(a){
            ctx.body  = { success:false,info:'注册失败，请联系管理员！'}
        }
    }


    /**
     * author : 龙且
     * desc : 用户账号密码登录
     * params : { phone:'手机号'，passWord:'密码'; }
     * date : 2021.08.10
     **/

    async login(){

        const { ctx } = this;
        // 获取参数
        const { phone,passWord, } = ctx.request.body;
        // 数据过滤
        if(!phone) return  ctx.body = { success:false,info:"请输入手机号码" }
        if(!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone))
            return  ctx.body = { success:false,info:"请输入正确的手机号码" }
        if(!passWord) return  ctx.body = { success:false,info:"请输入密码" }

        const one = await ctx.model.User.findOne({
            where:{
                phone:phone
            },
            raw:true
        })

        console.log('one',one)
        if(!one) return ctx.body = { success:false,info:'没有此用户，请先注册!' }

        let pwa = utils.md5(passWord+`${one.registerTime}`);
        if(pwa=== one.passWord){
            ctx.body = {success: true, info: '登录成功'}
        }else {
            ctx.body  = { success:false,info:'手机号或者密码输入错误，请重新输入！'}
        }

    }

    /**
        *用户验证码登录
    **/
    async vcloger(){
        const { ctx,app }=this;
        const { phone , code} =ctx.request.body;
        const updateData = {}
        const codeTemp = await app.redis.get(phone);
        console.log(codeTemp)
        //数据过滤
        if(!phone) return  ctx.body = { success:false,info:"请输入手机号码" }
        if(!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone))
            return  ctx.body = { success:false,info:"请输入正确的手机号码" }
        if(!codeTemp) return ctx.body={success:false, info:"请输入验证码"}
        if(codeTemp.length<6) return ctx.body={success:false,info:"请输入正确的验证码"}

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
                if(codeTemp === code){
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


    /**
       * 随机添加验证码
    **/
    async yzmupdate(){
        const{ ctx }=this;
        const{ phone,verificationCode } = ctx.request.body;
        const utils = require('utility');
        const updateData = {}

        //根据输入的手机号，给它的verificationCode字段添加6个随机数字字符串
        if(!phone) return  ctx.body = { success:false,info:"请输入手机号码" }
        if(!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone))
            return  ctx.body = { success:false,info:"请输入正确的手机号码" }
        if(phone) updateData.verificationCode = utils.randomString(6,'0123456789qwertyuioplkjhgfdsazxcvbnm');

        try{
            //将更新的数据，通过查找的手机号修改其字段数据
            let res = await ctx.model.User.update(updateData,{
                where:{ phone }
            })

            const one = await ctx.model.User.findOne({
                where:{
                    phone:phone
                },
                raw:true
            })

            console.log("res",res)
            ctx.body = {success:true,info:"验证码发送成功",yzm:one.verificationCode}

            //当用户没有注册
            if(!res) return ctx.body={success:false, info:"该手机号未注册，请先注册！"}
        }catch(e){
            ctx.body = {success:false,info:"网络开了小差"}
        }

    }

    /**
     * 用户更新个人资料
     **/

    /**
     * 验证码测试
     **/
    async cs(){
        const{ ctx,app }=this;
        const{ phone,verificationCode } = ctx.request.body;
        const utils = require('utility');
        // const code = '';

        //根据输入的手机号，给它的verificationCode字段添加6个随机数字字符串
        if(!phone) return  ctx.body = { success:false,info:"请输入手机号码" }
        if(!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone))
            return  ctx.body = { success:false,info:"请输入正确的手机号码" }


        try{
            // console.log(app.redis)
           const codeTemp = await app.redis.get(phone);
           if (!codeTemp){
            var code = utils.randomString(6,'0123456789qwertyuioplkjhgfdsazxcvbnm') ;
           }
           await app.redis.set(phone,code,'EX',60);
           console.log('手机号:',phone);
           console.log('验证码:',code);

          ctx.body = { success: true, info:'发送成功' }
        }catch(e){
            ctx.body = {success:false,info:"网络开了小差"}
        }

    }

}

module.exports = UserController;
