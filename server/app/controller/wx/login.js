'use strict';

const Controller = require('egg').Controller;
class registerController extends Controller {
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
}
module.exports = registerController;