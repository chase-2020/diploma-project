
/* eslint-disable indent */
'use strict';

const utils = require("utility");
const Controller = require('egg').Controller;

class MerchantController extends Controller {




    /**
     * author : 龙且
     * desc : 用户注册
     * params : { phone:'手机号'，passWord:'密码'; }
     * date : 2021.08.10
     **/

    async register(){

        const { ctx,app } = this;
        // 获取参数
        const { phone,passWord,code } = ctx.request.body;
        const registerTime = Date.now();
        const utils = require('utility');
        const codeTemp = await app.redis.get(phone);
        // 数据过滤
        if(!phone) return  ctx.body = { success:false,info:"请输入手机号码" }
        if(!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone))
            return  ctx.body = { success:false,info:"请输入正确的手机号码" }
        if(!passWord) return  ctx.body = { success:false,info:"请输入密码" }
        if(passWord.length < 6)  return  ctx.body = { success:false,info:"密码不能少于6位" }
        if(!code) return ctx.body={success:false, info:"请输入验证码"}
        if(code.length<6) return ctx.body={success:false,info:"请输入6位数字/字母验证码"}

        const one = await ctx.model.User.findOne({
            where:{
                phone:phone
            },
            raw:true
        })

        console.log('one',one)
        if(one) return ctx.body = { success:false,info:'该手机号已注册!' }

        const pwd = utils.md5(passWord+`${registerTime}`);
        try{
            if(codeTemp === code){
                await ctx.model.User.create({
                    phone: phone,
                    passWord: pwd,
                    registerTime: registerTime,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                })
                ctx.body  = { success:true,info:'注册成功'}
            }else {
                ctx.body = { success:false, info:"验证码错误，请重新输入" }
            }

        }catch(a){
            ctx.body  = { success:false,info:'注册失败，请联系管理员123！'}
            console.log(a)
        }
    }


    /**
     * author : 龙且
     * desc : 用户账号密码登录
     * params : { phone:'手机号'，passWord:'密码'; }
     * date : 2021.08.10
     **/

    async login() {
        const utils = require("utility");
        const { ctx } = this;
        // 获取参数
        const { phone, passWord } = ctx.request.body;
        // 数据过滤
        if (!phone) return (ctx.body = { success: false, info: "请输入手机号码" });
        if (
            !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
                phone
            )
        )
            return (ctx.body = { success: false, info: "请输入正确的手机号码" });
        if (!passWord) return (ctx.body = { success: false, info: "请输入密码" });

        const one = await ctx.model.User.findOne({
            where: {
                phone: phone,
            },
            raw: true,
        });

        console.log("one", one);
        if (!one)
            return (ctx.body = { success: false, info: "没有此用户，请先注册!" });

        let pwa = utils.md5(passWord + `${one.registerTime}`);
        if (pwa === one.passWord) {
            ctx.body = { success: true, info: "登录成功", one };
        } else {
            ctx.body = {
                success: false,
                info: "手机号或者密码输入错误，请重新输入！",
            };
        }
    }

    /**
     *用户验证码登录
     **/
    async vcloger() {
        const { ctx, app } = this;
        const { phone, code } = ctx.request.body;

        const codeTemp = await app.redis.get(phone);
        console.log(codeTemp);
        const registerTime = Date.now();
        //数据过滤
        if (!phone) return (ctx.body = { success: false, info: "请输入手机号码" });
        if (
            !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
                phone
            )
        )
            return (ctx.body = { success: false, info: "请输入正确的手机号码" });
        if (!codeTemp) return (ctx.body = { success: false, info: "请输入验证码" });
        if (codeTemp.length < 6)
            return (ctx.body = { success: false, info: "请输入正确的验证码" });

        try {
            //查找输入的手机号
            let one = await ctx.model.Merchant.findOne({
                where: {
                    phone,
                },
                raw: true,
            });
            //判断输入的手机号是否已经注册
            if (one != null) {
                //匹配登录验证码
                if (codeTemp === code) {
                    ctx.body = { success: true, info: "登录成功", one };
                } else {
                    ctx.body = { success: false, info: "验证码错误，请重新输入" };
                }
            } else {
                ctx.body  = { success:true,info:'该手机号还没注册，请先注册'}
            }
        } catch (e) {
            ctx.body = { success: false, info: "网络开了小差！" };
            console.log(e)
        }
    }

    /**
     * 随机添加验证码
     **/

    async yzmupdate() {
        const {ctx, app} = this;
        const {phone} = ctx.request.body;
        const utils = require("utility");

        if (!phone) return (ctx.body = {success: false, info: "请输入手机号码"});
        if (
            !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
                phone
            )
        )
            return (ctx.body = {success: false, info: "请输入正确的手机号码"});

        try {
            // console.log(app.redis)
            const codeTemp = await app.redis.get(phone);
            if (!codeTemp) {
                var code = utils.randomString(6, "0123456789");
            }
            await app.redis.set(phone, code, "EX", 60);
            console.log("手机号:", phone);
            console.log("验证码:", code);

            ctx.body = {success: true, info: "发送成功",code};
        } catch (e) {
            ctx.body = {success: false, info: "网络开了小差"};
        }
    }


    async send () {
        const {ctx, app} = this;
        const {phone} = ctx.request.body;
        if (!phone) return (ctx.body = {success: false, info: "请输入手机号码"});
        if (
            !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
                phone
            )
        )
            return (ctx.body = {success: false, info: "请输入正确的手机号码"});


        try {
            // console.log(app.redis)
            const codeTemp = await app.redis.get(phone);
            if (!codeTemp) {
                const code = utils.randomString(6, "0123456789");
                await ctx.sms.sendSMS({
                    PhoneNumbers: `${phone}`,
                    SignName: '三微智能',
                    TemplateCode: 'SMS_194061070',
                    TemplateParam: `{"code":"${code}"}`,
                })

                await app.redis.set(phone, code, "EX", 60);
                console.log("手机号:", phone);
                console.log("验证码:", code);

                return ctx.body = {success: true, info: "发送成功"};
            }
            ctx.body = {success: false, info: "操作过于频繁，请稍后再试"};

        } catch (e) {
            console.error(e)
            ctx.body = {success: false, info: "网络开了小差"};
        }



    }




    /**
     * 重置密码
     **/

    async resetpwd(){
        // 获取参数
        const {ctx} = this;
        const {phone, passWord, passWord1} = ctx.request.body;
        const registerTime = Date.now();
        const utils = require('utility');
        // 数据过滤
        if (!passWord) return ctx.body = {success: false, info: "请输入密码"}
        if (passWord.length < 6) return ctx.body = {success: false, info: "密码不能少于6位"}
        if (passWord !== passWord1) return ctx.body = {success: false, info: "两次输入的密码不相同"}

        const one = await ctx.model.User.findOne({
            where: {
                phone: phone
            },
            raw: true
        })
        const pwd = utils.md5(passWord + `${one.registerTime}`);
        try {
            await ctx.model.User.update({
                passWord: pwd,
            }, {
                where: {
                    phone
                }
            })
            ctx.body = {success: true, info: "设置密码成功", a: passWord}

        } catch (e) {
            console.log(e)
            ctx.body = {success: false, info: "设置密码失败,请联系管理员!"}
        }
    }



    /**
     * 查询用户的所有信息
     **/
    async useAll(){

        const { ctx,app} = this;
        const { phone,phone1 } = ctx.request.body;
        const where = {}
        if(phone1) where.phone = phone1
        try{

            let res1 = await ctx.model.User.findAll({
                phone,
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
     * 更新用户的信息
     **/

    async useUpdate(){
        const { ctx } = this;
        const { username,name,sex,age,phone,hight,weight,senFen,address,photo,wxOpenId,qq,passWord,email,birthday } = ctx.request.body;

        //修改的条件
        const where = {}
        //修改的内容
        const updateData = {}

        if(phone) where.phone = phone

        if(username) updateData.username = username
        if(name) updateData.name = name
        if(sex) updateData.sex = sex
        if(age) updateData.age = age
        if(phone) updateData.phone = phone
        if(hight) updateData.hight = hight
        if(weight) updateData.weight = weight
        if(senFen) updateData.senFen = senFen
        if(address) updateData.address = address
        if(photo) updateData.photo = photo
        if(wxOpenId) updateData.wxOpenId = wxOpenId
        if(qq) updateData.qq = qq
        if(passWord) updateData.passWord = passWord
        if(email) updateData.email = email
        if(birthday) updateData.birthday = birthday

        //update({要变更的字段信息}，{配置项})
        try{
            await ctx.model.User.update(updateData,{
                where
            })
            ctx.body = {success:true,info:"修改成功",a:updateData}

        } catch(e){
            console.log(e)
            ctx.body = { success:false,info:"修改失败" }
        }
    }




    // desc: 完成用户积分信息
    //   通过手机号码及逆行查新数据
    async userFindOne() {
        const { ctx, app } = this;
        const phone = ctx.params.phone;
        console.log('手机号',phone)

        // 条件查找
        const where = {};
        if (phone) where.phone = phone;
        try {

            const res = await ctx.model.User.findOne({
                where
            });
            if (res) return (ctx.body = { data: res });
        } catch (e) {
            ctx.body = { success: false, errCode: 2004, info: "没有找到参数" };
        }
    }


    //desc: 添加用户消息
    async userAdd(){
        const {ctx,app} = this;
        const {username,name,sex,age,phone,hight,weight,senFen,address,photo,wxOpenId,qq,keCheng,type,email,balance,integral,record,birthday,motto}=ctx.request.body;
        // 用户名
        if(!/^\W{1,6}$/.test(username)) return (ctx.body = { success: false, errCode: "", info: "用户账号昵称出错" });
        //真实姓名
        if(!/^\W{2,4}$/.test(name)) return (ctx.body = { success: false, errCode: "", info: "姓名出错" });
        // 性别
        if(![0,1,"0","1"].includes(sex)) return (ctx.body = { success: false, errCode: "", info: "性别格式出错" });
        // 年龄
        if(!/^[123456789]\d{1}/) return (ctx.body = { success: false, errCode: "", info: "年龄格式出错" });
        // 电话号码
        if(!/^1[34567898]\d{9}$/.test(phone))return (ctx.body = { success: false, errCode: "", info: "号码格式出错" });
        // 身高
        if(!/^1[23456789]\d{1}$/.test(hight)) return (ctx.body = { success: false, errCode: "", info: "身高格式出错" });
        // 身份证
        console.log(senFen);
        if(!/^\W{18}/) return (ctx.body = { success: false, errCode: "", info: "身份证格式出错" });
        // 地址
        if(!address) return (ctx.body = { success: false, errCode: "", info: "地址格式出错" });
        // 头像照片
        if(!photo) return (ctx.body = { success: false, errCode: "", info: "头像照片格式出错" });

        //微信账号
        if(!wxOpenId) return (ctx.body = { success: false, errCode: "", info: "微信账号格式出错" });
        // qq账号
        if(!qq) return (ctx.body = { success: false, errCode: "", info: "QQ账号格式出错" });
        // 所选课程
        if(!keCheng) return (ctx.body = { success: false, errCode: "", info: "所选课程格式出错" });
        // 用户是否是会员
        if(![0,1,"0","1"].includes(type)) return (ctx.body = { success: false, errCode: "", info: "判断会员格式出错" });
        //邮箱
        if(!email) return (ctx.body = { success: false, errCode: "", info: "邮箱格式出错" });
        // 余额
        if(!/^\d{1,30}$/.test(balance)) return (ctx.body = { success: false, errCode: "", info: "余额格式出错" });
        // 个人积分
        if(!/^\d{1,50}$/.test(integral)) return (ctx.body = { success: false, errCode: "", info: "个人积分格式出错" });
        // 签到状态
        if(![1,2,"1","2"].includes(record)) return (ctx.body = { success: false, errCode: "", info: "签到状态格式出错" });
        // 生日
        if(!birthday) if(!photo) return (ctx.body = { success: false, errCode: "", info: "生日格式出错" });
        // 个性签名
        try {

            let res = await ctx.model.User.create({
                username,
                name,
                sex,
                age,
                phone,
                hight,
                weight,
                senFen,
                address,
                photo,
                wxOpenId,
                qq,
                keCheng,
                type,
                email,
                balance,
                integral,
                record,
                birthday,
                motto
            });
            ctx.body = { success: true, errCode: "", info: "数据创建成功" };



        } catch (e) {
            // 40001 ：数据创建失败
            ctx.body = { success: false, errCode: "40001", info: "创建失败" };
            console.log(e);

        }
    }
}

module.exports = MerchantController;
