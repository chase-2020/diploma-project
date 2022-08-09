'use strict';


const Controller = require('egg').Controller;

class SiteController extends Controller {
    /*
        author:xing
        desc:查询条件场地信息
        params:{
            courtid:所属场馆编号,
            site:场地编号,
            merchant:所属商家,
            siteNum:场地号,
            siteType:场地类型（1:篮球,2:排球,3:足球,4:网球,5:羽毛球,6:乒乓球,7:游泳）,
            type:场地状态(1:可选，2:不可选，3:已选定),
            price: 场地价格,
            createdAt:创建时间,
            updatedAt:更新时间
        }
        data:2021-09-13
    */
    //查询场地信息
    async find() {

        const { ctx ,app} = this;
        let { price,stName,siteType,courtid, site, type, siteNum, merchant, limit, page} = ctx.request.body;
        const { Op} = app.Sequelize;
        const where = {}
        //查询的关键词
        if(stName) where.stName = stName;
        if(price) where.price = price;
        if(siteType) where.siteType = siteType;
        if(courtid) where.courtid =courtid;
        if(site) where.site = site;
        if(type) where.type = { [Op.like]:'%'+type+'%' };
        if(siteNum) where.siteNum = siteNum
        if(merchant) where.merchant = merchant;
        //分页处理
        limit = limit? limit:30;
        page = page ? page : 1;
        const offset = (page-1)*limit

        try{
            let res = await ctx.model.Site.findAndCountAll({
                where,
                limit,
                offset,
                order:[ ['site','desc' ]]
            })
            console.log('row',res)
            if(!res) return ctx.body = {success:false,errCode:50001,info:"查询失败"};
            ctx.body = {success:true, errCode: 50000,info:"查询成功",res}
        }catch(e){
            console.log(e);
            ctx.body = {success:false, errCode: 50001,info:"查询失败"}
        }
    }

    /*
   author:xing
   desc:添加场馆
    params:{
       courtid:所属场馆,
       site:场馆编号,
       merchant:所属商家,
       siteNum:场地号,
       siteType:场地类型（1:篮球,2:排球,3:足球,4:网球,5:羽毛球,6:乒乓球,7:游泳）,
       price: 场地价格,
       type:场地状态(1:可选，2:不可选，3:已选定),
       sitePhoto:场地图片
   }
   data:2021-08-10
   */

    //添加场馆
    async create() {
        const { ctx } = this;
        let {sitePhoto,price,site,merchant,siteNum,courtid,siteType,type} = ctx.request.body;


        //数据过滤
        if(!merchant) return ctx.body = { success:false, errCode:50002,info:"请填写所属商家" }
        if(![1,2,3,4,5,6,7,'1','2','3','4','5','6','7'].includes(siteType)) return ctx.body = { success:false, errCode:50002,info:"请正确填写场地类别" }
        if(![3,2,1,'2','1','3'].includes(type)) return ctx.body = { success:false, errCode:50002,info:"请正确填写场地状态" }
        if(!siteNum) return ctx.body = { success:false, errCode:50002,info:"请填写场地号" }
        if(!courtid) return ctx.body = { success:false, errCode:50002,info:"请填写所属场馆" }
        if(!price) return ctx.body = { success:false, errCode:50002,info:"请填写场地价格" }
        if(!sitePhoto) return ctx.body = { success:false, errCode:50002,info:"请上传场地图片" }
        try{
            let res = await ctx.model.Site.create({
                merchant,
                courtid,
                sitePhoto,
                site,
                price,
                siteType,
                siteNum,
                price,
                type,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            })
            if(!res) return ctx.body = {success:false,errCode:50001,info:"添加失败"};
            console.log('res',res)

            ctx.body = {success:true, errCode: 50000,info:"添加成功",res}
        }catch(e){
            console.log(e);
            ctx.body = {success:false, errCode: 50001,info:"添加失败"};
        }
    }
    /*
    author:xing
    desc:修改场地信息
    params:{
        sitePhoto:场地图片,
        courtid:所属场馆,
        site:场地编号,
        merchant:所属商家,
        siteNum:场地号,
        siteType:场地类型（1:篮球,2:排球,3:足球,4:网球,5:羽毛球,6:乒乓球,7:游泳）,
        price: 场地价格,
        type:场地状态(1:可选，2:不可选，3:已选定),
    }
    data:2021-09-13
    */
    // 修改场馆信息
    async update() {
        const { ctx ,app} = this;
        let {sitePhoto,price, site,merchant,siteNum,courtid,siteType,type } = ctx.request.body;
        const { Op} = app.Sequelize;
        let updateDate = {}
        let where = {}
        //修改的内容

        if(merchant) updateDate.merchant = merchant;
        if(siteNum) updateDate.siteNum = siteNum
        if(courtid) updateDate.courtid = courtid
        if(type) updateDate.type = type
        if(siteType) updateDate.siteType = siteType
        if(price) updateDate.price = price
        if(sitePhoto) updateDate.sitePhoto = sitePhoto
        //根据条件修改哪条数据
        if(site) where.site = site;

        try{
            let res = await ctx.model.Site.update(updateDate,{
                where
            })
            if(!res) return ctx.body = {success:false,errCode:50001,info:"修改失败"};
            console.log('res',res)

            ctx.body = {success:true, errCode: 50000,info:"修改成功",res}
        }catch(e){
            console.log(e);
            ctx.body = {success:false, errCode: 50001,info:"修改失败"};
        }
    }
    /*
        author:xing
        desc:删除场地信息
        params:{site:场地编号,}
        data:2021-09-13
        */
    // 删除场馆信息
    async destroy() {
        const { ctx ,app} = this;
        let { site } = ctx.request.body;
        const { Op} = app.Sequelize;
        const where = {}
        //（根据条件删除哪条数据）
        if(site) where.site = site
        try{
            let res = await ctx.model.Site.destroy({

                where

            })
            if(!res) return ctx.body = {success:false,errCode:50001,info:"删除失败"};
            console.log('res',res)

            ctx.body = {success:true, errCode: 50000,info:"删除成功",res}
        }catch(e){
            console.log(e);
            ctx.body = {success:false, errCode: 50001,info:"删除失败"};
        }
    }

    // 排场
    async arrange() {
        const { ctx ,app} = this;
        let { courtid,siteNum,plan } = ctx.request.body;

        try {
            await ctx.model.Site.update({
                plan,
            }, {
                where: {
                    courtid,
                    siteNum
                }
            })
            ctx.body = { success:true, info:"修改成功"}
        }catch(e){
            console.log(e)
            ctx.body = { success:true, info:"修改失败112"}
        }

    }

    //查询指定场地信息
    async findAll() {
        const { ctx ,app} = this;
        const { courtid,siteNum } = ctx.request.body;

        const where = {}
        if(courtid) where.courtid = courtid
        if(siteNum) where.siteNum = siteNum
        try {
            let res = await ctx.model.Site.findOne({
                where
            })

            if(res)  return  ctx.body = {success:true,data:res};
            return ctx.body = { success:false,info:'没有符合条件'}
        }catch(e){
            console.log(e)
            ctx.body = "查询失败!"
        }

    }
}

module.exports = SiteController;
