'use strict';

const Controller = require('egg').Controller;

class TraverseVenueController extends Controller {


    //暂时抛弃不用
    async findAll() {
        const { ctx, app } = this

        try {
            let one = await ctx.model.SdUser.findAll({})
            const arr = [];
            for (let i in one) {
                arr.push(one[i].stName)
            }
            console.log(arr)

            ctx.body = { success: true, info: "场馆遍历成功", data: arr }
        } catch (e) {
            console.log(e)
            ctx.body = { success: false, info: "场馆遍历失败" }
        }
    }
}

module.exports = TraverseVenueController;
