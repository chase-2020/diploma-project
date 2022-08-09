'use strict';

const Controller = require('egg').Controller;

class MerchantController extends Controller {


    async merchantFind(){
        const {ctx,app} = this
        const { uid } = ctx.request.body;
        
        const where = {}
        if(uid) where.uid=uid
        try {
            const res = await ctx.model.Merchant.findOne({
                where
            })
            ctx.body = {success: true,info: "查找成功",data: res}

        }catch(e){
            ctx.body = {success: false,errCode: 3002}
        }
    }


}



module.exports = MerchantController;
