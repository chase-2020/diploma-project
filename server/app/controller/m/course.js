'use strict';
const Controller = require('egg').Controller;
const { customAlphabet } = require('nanoid');
class CourseController extends Controller {
    /*
    author: lwj
    desc: 增加课程
    params:{ courseName:"课程名称",courseType:"课程类型",coursePrice:"课程价格",};
    data:2021-08-10
*/
    async addCourse(){
        const { ctx, app } = this;
        const { sponsor,copyDate,puliceClass,location,price,courseName,coachId,type,appointmenTime,serverPlace,startTime,endTime,courseMaxNumber,courseMinNumber,courseIntroduction,courseImage} = ctx.request.body;
       
        const array=copyDate
        console.log('拿到的copy',array);
        // 数据过滤
        if(!courseName) return ctx.body = { success:false,errCode:2002,info:"请填写课程名称"}
        // if(!coachId) return ctx.body = { success:false,errCode:2002,info:"请填写教练ID"}
        if(![0,1,'0','1'].includes(type)) return ctx.body = { success: false, errCode:2002,info:"请输入正确的课程类型，0代表一对一课程，1代表一对多课程"}
        // if((!/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/)) return ctx.body = { success:false,errCode:2002,info:"请输入正确的价格"}
        if(!/^[1-9]\d{0,20}$/)  return ctx.body = { success:false,errCode:2002,info:"请输入正确的价格"}
        if(!/^[1-9]\d{0,3}$/.test(courseMaxNumber)) return ctx.body = { success:false,errCode:2002,info:"请输入正确的课程可预约人数"}
        if(!/^[1-9]\d{0,30}$/.test(startTime)) return ctx.body = { success:false,errCode:2002,info:"请输入正确的课程开始时间" }
        if(!/^[1-9]\d{0,30}$/.test(endTime)) return ctx.body = { success:false,errCode:2002,info:"请输入正确的课程结束时间"  }
        if(!/^[1-9]\d{0,30}$/.test(appointmenTime)) return ctx.body = { success:false,errCode:2002,info:"请输入正确开始预约时间"  }
        if(startTime>endTime) return ctx.body = { success:false,errCode:2002,info:"课程开始时间不能大于结束时间"}
        // if(!courseIntroduction) return ctx.body = { success: false,errCode:2020, info:"课程介绍不能为空"}
            
        try{
            {array.map(r=>{
                let res = ctx.model.Course.create({
                    startTime:r, //课程开始时间
                    endTime,//课程结束时间
                    courseName,//课程名称
                    coachId,//教练ID
                    type, //课程类型 0:一对一 1:一对多
                    price, //课程价格
                    serverPlace, //课程地点
                    appointmenTime, //课程可预约时间
                    courseMaxNumber, //课程最多可约人数courseMaxNumber
                    courseMinNumber,//课程最少开课人数
                    courseIntroduction, //课程介绍
                    courseImage, //图片上传
                    sponsor,
                    location,//课程详细地址
                    puliceClass,//公开课
                })
                ctx.body = { success:true, errCode:"",msg:"创建成功"}
                console.log(res);
            })}
            
        }catch(e){
            console.log(e)
            ctx.body = { success:true, errCode:"",msg:"创建失败"}
        }
    }

    /*
        author: lwj
        desc: 查找课程
        params:{ courseName:"课程名称",courseType:"课程类型",coursePrice:"课程价格",};
        data:2021-08-10
    */

    //关联表查找 课程表(course)、教练表(coach)
    // 查找私教的团课课程
    async findCourses(){
       const { ctx ,app } = this;
       const{ Op }=app.Sequelize;
       
       let { coachId,type,limit,page,coachType,sponsor,courseId,courseName,s_time,e_time} = ctx.request.body;
       limit =limit ? limit:30;
       page = page ? page:1;
       const offset = (page-1)*limit;
       const where =  {};
       if(sponsor) where.sponsor = sponsor +''
       if(coachType) where.coachType = coachType
       if(courseId) where.courseId = courseId
       if(coachId) where.coachId = coachId;
       if(type) where.type =type +''
       if(courseName) where.courseName = {[Op.like]:'%'+courseName+'%'}
        if(s_time&&e_time) where.startTime = {[Op.between]:[s_time,e_time]}
        // console.log('&^%&^%&^%&%&^%', where)
        try{
            await ctx.model.Course.belongsTo(ctx.model.Coach,{foreignKey:'coachId',targetKey:'coachId'});
            let res=await ctx.model.Course.findAll({
                limit,
                offset,
                where,
                include:[
                    { 
                        model:ctx.model.Coach,
                        where:{coachType:1},
                        attributes:['coachId','coachName','coachPhone','coachPhoto','coachIntro']
                    },
                ],
                attributes:{
                    exclude:['updatedAt','createdAt']
                },
                order:[['startTime','ASC']] //按照课程开始时间顺序查找
            })  
            if(res)  ctx.body = { success:true,info:"查找成功",data:res }
            else ctx.body="没有找到数据"
        }catch(e){
            console.log(e)
            ctx.body = { success:false,errCode:2003,info:"查找失败" }
        }
    }
    //查找场馆课程、
    async findVenueCourses(){
        const { ctx ,app } = this;
        const{ Op }=app.Sequelize;
        
        let { coachId,type,name,limit,page,coachType,sponsor,courseType,courseId,ctid,price,price2} = ctx.request.body;
        limit =limit ? limit:30;
        page = page ? page:1;
        const offset = (page-1)*limit;
        const where =  {};
        const where2 = {}
        if(ctid) where2.ctid = ctid
        if(price&&price2) where.price = {[Op.between]:[price,price2]}
        if(price&&!price2) where.price = {[Op.gt]:price}
        if(!price&&price2) where.price = {[Op.lt]:price2}
        if(sponsor) where.sponsor = sponsor 
        if(courseId) where.courseId = courseId
        if(coachType) where.coachType = coachType
        if(coachId) where.coachId = coachId;
        if(courseType) where.courseType =courseType;
        if(name) where.courseName = {[Op.like]:'%'+name+'%'}
        try{
             await ctx.model.Course.belongsTo(ctx.model.Coach,{foreignKey:'coachId',targetKey:'coachId'});
             await ctx.model.Course.belongsTo(ctx.model.Court,{foreignKey:'ctid',targetKey:'ctid'});
             let res=await ctx.model.Course.findAll({
                 limit,
                 offset,
                 where,
                 include:[
                     { 
                         model:ctx.model.Coach,
                         where:{coachType:2},  //查馆内教练
                         attributes:['coachId','coachName','coachPhone','coachPhoto','coachType','mid']
                     },
                     { 
                        model:ctx.model.Court,
                        where:where2, 
                    },
                 ],
                 attributes:{
                     exclude:['type','updatedAt','createdAt','puliceClass',]
                 }
             })  
             if(res)  ctx.body = { success:true,info:"查找成功",data:res }
             else ctx.body="没有找到数据"
        }catch(e){
            console.log(e)
            ctx.body = { success:false,errCode:2003,info:"查找失败" }
        }
    }

    // 查询场馆的课程类型
    async findVenueCourseType(){
        const { ctx } = this;
        const { className } = ctx.request.body;
        try{
            let res = await ctx.model.Course.findAll({
                where:{
                    sponsor:1
                },
                className,
            })
            const a = [];
            for(let i in res){
                a.push(res[i].courseType)
            }
            const set = new Set(a);
            let b = [...set]
            ctx.body = b
        } catch(e){
            console.log(e)
            ctx.body = "查询失败123"
        }
    }

    // 查找全部场馆
    async findallCourt(){
        const { ctx } = this;
        const { className } = ctx.request.body;
        try{
            let res = await ctx.model.Court.findAll({
                attributes:['ctid','name']
            })
            if(res) ctx.body = { success:true,info:"查找成功",data:res}
            else ctx.body = "没有找到数据"
        } catch(e){
            console.log(e)
            ctx.body = {success:false,errCode:2003,info:"查找失败"}
        }
    }

    // 关联教练表和场馆运营商表（拿到教练ID的时候，查询教练是入驻哪一个场馆运营商）
    async findMerchant(){
        const { ctx ,app } = this;
        let { mid,coachId} = ctx.request.body;
        const where =  {};
        if(mid) where.mid = mid
        if(coachId) wherh.coachId = coachId
        try{
            await ctx.model.Merchant.hasMany(ctx.model.Court,{foreignKey:'mid',targetKey:'mid'});
            let res = await ctx.model.Merchant.findAll({
                where,
                include:[
                    {
                        model:ctx.model.Court,
                    }
                ],
            })
            if(res) ctx.body = { success:true,info:"查找成功",data:res}
            else ctx.body = "没有找到数据"
        }catch(e){
            console.log(e)
            ctx.body = {success:false,errCode:2003,info:"查找失败"}
        }
    }


     /**
      *   author: Alice
      *   desc: 查找课程方式二
      *   params:{ courseName:"课程名称",courseType:"课程类型",coursePrice:"课程价格",};
      *   data:2021-08-10
     **/
    async findCoachCourses(){
        const { ctx ,app } = this;
        const{ Op }=app.Sequelize;
        
        let { coachId,type,name,limit,page,coachType,courseId} = ctx.request.body;
        limit =limit ? limit:30;
        page = page ? page:1;
        const offset = (page-1)*limit;
        const where =  {};
        if(coachId) where.coachId = coachId;
        if(type) where.type =type;
        if(coachType) where.coachType = coachType
        if(courseId) where.courseId = courseId
        if(name) where.courseName = {[Op.like]:name+'%'}
         try{
             let res=await ctx.model.Course.findAll({
                 limit,
                 offset,
                 where,
                 attributes:['courseId','courseName','ReservedNumber','type','startTime','endTime','serverPlace','courseMinNumber','courseMaxNumber','courseImage','courseIntroduction','courseNotice','price','puliceClass','location'] //只显示想要的字段
             })  
             if(res)  ctx.body = { success:true,data:res }
             else ctx.body="没有找到数据"
         }catch(e){
             console.log(e)
             ctx.body = { success:false,errCode:2003,info:"查找失败" }
         }
     }

    async findVenue(){
        const { ctx ,app } = this;
        const{ Op }=app.Sequelize;
        
        let { sdid,courseType,name,limit,page} = ctx.request.body;
        limit =limit ? limit:30;
        page = page ? page:1;
        const offset = (page-1)*limit;
        const where =  {};
        if(sdid) where.sdid = sdid;
        if(courseType) where.type = courseType;
        if(name) where.courseName = {[Op.like]:'%'+name+'%'}
         try{
             await ctx.model.SdUser.hasMany(ctx.model.Course,{foreignKey:'sdid',targetKey:'sdid'});
             await ctx.model.SdUser.hasMany(ctx.model.Coach,{foreignKey:'sdid',targetKey:'sdid'});
            //  await ctx.model.Course.belongsTo(ctx.model.SdUser,{foreignKey:'sdid',targetKey:'sdid'});
             let res=await ctx.model.SdUser.findAll({
                 limit,
                 offset,
                 // where:ctx.model.Coach.coachId=ctx.model.Course.coachId,
                 where,
                 include:[
                     { 
                         model:ctx.model.Course,
                         where:{type:1},
                         attributes:['courseId','courseName','type','startTime','endTime','serverPlace',
                         'courseMinNumber','courseMaxNumber','courseImage','courseIntroduction','courseNotice','price'] //只显示想要的字段
                     },
                     {
                         model:ctx.model.Coach,
                        //  attributes:['sdid','site','phone','stName']
                     }
                 ],
                //  attributes:['courseId','courseName','type','startTime','endTime','serverPlace','courseMinNumber','courseMaxNumber','courseImage','courseIntroduction','courseNotice','price'] //只显示想要的字段
             })  
             if(res)  ctx.body = { success:true,data:res }
             else ctx.body="没有找到数据"
         }catch(e){
             console.log(e)
             ctx.body = { success:false,errCode:2003,info:"查找失败" }
         }
     }

     //查找满足条件的课程
     async findKeyCourse(){
        const { ctx, app } = this;
        const { name,courseType,coachId,startTime} = ctx.request.body;
        const where={};
        if(coachId) where.coachId = coachId
        if(courseType) where.type = courseType;
        if(name) where.courseName = name;
        if(startTime) where.startTime = startTime;
        console.log(name)
        await ctx.model.Course.belongsTo(ctx.model.Coach,{foreignKey:'coachId',targetKey:'coachId'});
        try{
            const res=await ctx.model.Course.findAll({
                where,
                include:[
                    { 
                        model:ctx.model.Coach,
                        where:{coachType:1},
                        attributes:['coachId','coachName','coachphoto','coachIntro','coachType'] ,//只从Coach中拿取coachName和coachphoto
                    },
                ],
                attributes:{
                    exclude:['createdAt','updatedAt']  //
                }
            })
            if(res)  ctx.body = { success:true,data:res }
            else ctx.body="没有找到数据"
        }catch(e){
            console.log(e)
            ctx.body = { success:false,errCode:2003,info:"查找失败" }
            //2003是查找失败
        }
    }

    //查找满足条件的一个课程
    async findCourse(){
        const { ctx, app } = this;
        const { name,courseType,coachId} = ctx.request.body;
        const where={};
        if(coachId) where.coachId = coachId
        if(courseType) where.type = courseType;
        if(name) where.courseName = name;
        try{
            const res=await ctx.model.Course.findOne({
                where,
                // attributes:['createdAt','updatedAt']
                attributes:{
                    exclude:['createdAt','updatedAt']  //
                }
            })
            if(res)  ctx.body = { success:true,data:res }
            else ctx.body="没有找到数据"
        }catch(e){
            console.log(e)
            ctx.body = { success:false,errCode:2003,info:"查找失败" }
            //2003是查找失败
        }
    }

    //只查找团课的课程名称
    async findCourseName(){
        const { ctx, app } = this;
        const { name,courseType,coachId} = ctx.request.body;
        // const where={};
        // if(coachId) where.coachId = coachId
        // if(courseType) where.type = courseType;
        // if(name) where.courseName = name;
        try{
            const res=await ctx.model.Course.findAll({
                where:{
                    type:1, //课程类型   1表示是团课
                    sponsor:2  //课程开办方 2表示是私教课程
                },
                attributes:['courseId','courseName']
            })
            if(res)  ctx.body = { success:true,data:res }
            else ctx.body="没有找到数据"
        }catch(e){
            console.log(e)
            ctx.body = { success:false,errCode:2003,info:"查找失败" }
            //2003是查找失败
        }
    }


    /*
    author: lwj
    desc: 删除课程
    params:{ courseName:"课程名称",courseType:"课程类型",coursePrice:"课程价格",};
    data:2021-08-10
    */
    async deleteCourse(){
        const { ctx, app } = this;
        const { courseType,courseId,coachId} = ctx.request.body;
        const where = {};
        if(courseType) where.type = courseType;
        if(courseId) where.courseId = courseId;
        if(coachId) where.coachId = coachId;
        try {
            const res = await ctx.model.Course.destroy({
                where,
            })
            ctx.body = {success:true,info:"删除成功",data:res}
        } catch (error) {
            console.log(error)
            ctx.body = {success:false,errCode:2004,info:"删除失败"}
            //2004 删除失败
        }
    }

     /*
    author: lwj
    desc: 更新课程
    params:{ courseName:"课程名称",courseType:"课程类型",coursePrice:"课程价格",};
    data:2021-08-10
    */
   async updateCourse(){
       const { ctx, app } = this;
       const { courseId,courseType,puliceClass,location,price,courseName,coachId,type,coursePrice,appointmenTime,serverPlace,startTime,endTime,courseMaxNumber,courseMinNumber,courseIntroduction,courseImage} = ctx.request.body;
       const modify = {};
       const where = {};
       if(courseId) where.courseId = courseId;
       if(startTime) modify.startTime = startTime;
       if(endTime) modify.endTime = endTime;
       if(appointmenTime) modify.appointmenTime = appointmenTime;
       if(type) modify.type = type;
       if(courseType) modify.courseType = courseType;
       if(courseName) modify.courseName = courseName;
       if(coursePrice) modify.coursePrice = coursePrice;
       if(serverPlace) modify.serverPlace = serverPlace;
       if(location) modify.location = location;
       if(price) modify.price = price;
       if(courseImage) modify.courseImage = courseImage;
       if(puliceClass || puliceClass === 0) modify.puliceClass = puliceClass;//if(0) 为false
       if(courseIntroduction) modify.courseIntroduction = courseIntroduction;
     
       
       if(courseMaxNumber) modify.courseMaxNumber = courseMaxNumber;
       if(courseMinNumber) modify.courseMinNumber = courseMinNumber;
       try{
        const res = await ctx.model.Course.update(modify,{
            where,
        })
        if(res) ctx.body = {success:true,data:res,info:'更新成功'}
        else ctx.body = "更新失败"
       }catch(error){
           console.log(error);
            ctx.body = {success:false,errCode:2005,info:"更新失败"}
            //2005 更新失败
       }
   }


   //场馆课程订单创建
    async addVenueCourseOrder(){
        const { ctx, app } = this;
        const {
            uid,
            courseId,
            uname,
            paymentAt,
            money,
            coursePrice,
            dtype,
            state,
            coachName,
            courseName,
            ctid,
            mid,
            courseAddress,
            courseChangDi,
            coachPhone,
            userNumber,
            startTime,
            courseNum,
            studentAge,
            reservePhone
        } = ctx.request.body

        const nanoidNum = customAlphabet('1234567890abcdef',10)()
        console.log("我是随机的订单编号:",nanoidNum)
        const _nowDate = new Date()
        try{
            const res = await ctx.model.Order.create({ 
                orderNumber:nanoidNum, //订单编号
                uid,  //用户ID
                courseId, //课程id
                uname,  //用户名
                // paymentAt,  //支付时间
                money,  //支付价格
                coursePrice, //课程价格
                dtype,  //订单类型 0：课程订单 1：场馆订单
                state,  //订单状态
                coachName, //教练姓名
                courseName, //课程名
                ctid, //场地ID
                mid,  //场馆运营商ID
                courseAddress, //场馆详细地址
                courseChangDi,  //上课的场馆
                coachPhone,  //教练的电话
                userNumber,  //预约人数
                startTime,  //课程开始时间
                courseNum, //课程次数
                studentAge, //学员年龄段
                reservePhone //电话
            })
            ctx.body = { success:true, errCode:"",msg:"订单创建成功"}
            console.log(res);
        }catch(e){
            console.log(e);
            ctx.body = {success:false,errCode:2005,info:"创建订单失败"}
        }
    }

    // 场馆课程订单查询
    async findVenueCourseOrder(){
        const { ctx, app } = this;
        let { uid,state } = ctx.request.body;
        const where =  {};
        if(uid) where.uid = uid
        if(state) where.state = state
        try{
            const res = await ctx.model.Order.findAll({
                where,
                attributes:['did','orderNumber','uid','uname',
                'paymentAt','money','coursePrice','dtype','state','coachName','courseName',
                'ctid','mid','courseAddress','courseChangDi','coachPhone','userNumber','startTime','courseNum','studentAge','reservePhone'],
                order:[['paymentAt','DESC']]  //DESC倒叙   //ASC顺序
            })
            if(res)  ctx.body = { success:true,info:"查找成功",data:res }
            else ctx.body={ success:false,info:"没有找到订单数据" }
        }catch(e){
            console.log(e);
            ctx.body = {success:false,errCode:2005,info:"查找订单失败"}
        }
    }

    // 通过订单编号查询订单
    async findVCOneOrder(){
        const { ctx, app } = this;
        let { orderNumber } = ctx.request.body;
        const where =  {};
        if(orderNumber) where.orderNumber = orderNumber
        try{
            const res = await ctx.model.Order.findOne({
                where,
                attributes:['did','orderNumber','uid','uname',
                'paymentAt','money','coursePrice','dtype','state','coachName','courseName',
                'ctid','mid','courseAddress','courseChangDi','coachPhone','userNumber','startTime','courseNum','studentAge','reservePhone','createdAt']
            })
            if(res)  ctx.body = { success:true,info:"查找成功",data:res }
            else ctx.body={ success:false,info:"没有找到订单数据" }
        }catch(e){
            console.log(e);
            ctx.body = {success:false,errCode:2005,info:"查找订单失败"}
        }
    }

    // // 通过订单编号 修改订单的支付状态
    async updateVenueOrder(){
        const { ctx, app } = this;
        let { orderNumber,state } = ctx.request.body;
        const where =  {};
        const modify = {};
        if(orderNumber) where.orderNumber = orderNumber
        if(state) modify.state = state
        try{
            const res = await ctx.model.Order.update(modify,{
                where,
            })
            if(res) ctx.body = {success:true,data:res,info:'更新成功'}
            else ctx.body = "更新失败"
        }catch(error){
            console.log(error);
            ctx.body = {success:false,errCode:2005,info:"更新失败"}
            //2005 更新失败
        }
    }
}
module.exports = CourseController;