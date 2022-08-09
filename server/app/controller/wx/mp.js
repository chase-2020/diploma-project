'use strict';

const Controller = require('egg').Controller;


class mpController extends Controller {

    // 小程序登录
    async login() {
        const { ctx, service } = this;
        const { code } = ctx.request.body;
        console.log("我是服务端拿到的code",code)
        if(code){
            try{
                let res = await service.mp.login(code);
                ctx.body= { success:true,data:res}
                console.log("我是session_key",res.session_key)
                console.log("我是openid",res.openid)
            }catch(e){
                ctx.body  = { success:false,msg:'no ok'}
            }
        
        } else{
            ctx.body  = { success:false,msg:'no code was send'}
        }
    }

    // 小程序 getUserInfo 信息解密

    async getUserInfo(){
        const { ctx, service } = this;

        const {sessionKey, encryptedData, iv }  = ctx.request.body;
        console.log("我是解密的参数sessionKey",sessionKey)
        console.log("我是解密的参数encryptedData",encryptedData)
        console.log("我是解密的参数iv",iv)
        try{
            let res = await service.mp.decryptData(sessionKey, encryptedData, iv);
            ctx.body = {success:true,data:res}
        }catch(e){
            console.log(e)
            ctx.body = {success:false,msg:"解密失败"}
        }
        // 解密之后   同时更新用户信息
    }
}


module.exports = mpController ;