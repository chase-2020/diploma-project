'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  /*
        author:xing
        desc:创建订单
        params:{
          orderNum:订单编号,
          userid:用户ID,
          uname:用户名,
          cdid:预约的场地编号,
          fuwu:场馆服务,
          dtype:订单类型,
          state:订单状态,
          message:留言,
          reservePhone:
          coachName:下单课程所属的教练,
          courseName:下单的课程名单
        }
        data:2021-08-11
        */
  // 查看所有订单
  async find() {

    const { ctx, app } = this;

    const { Op } = app.Sequelize;
    let { userid, did, reservePhone, uname, fuwu, dtype, state, limit, page, cdid, message, coachName, courseName ,orderNum,mid} = ctx.request.body;

    const where = {};
    // if(phone.length !== 11)  return ctx.body = { success:false,info:"请填写正确的手机号码" }

    limit = limit ? limit : 30;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    // 查询的关键词
    if (orderNum) where.orderNum = orderNum;
    if (did) where.did = did;
    if (userid) where.userid = userid;
    if (mid) where.mid = mid;
    if (reservePhone) where.reservePhone = { [Op.like]: reservePhone + '%' };
    if (uname) where.uname = uname;
    if (dtype) where.dtype = dtype;
    if (cdid) where.cdid = cdid;
    if (fuwu) where.fuwu = fuwu;
    if (state) where.state = state;
    if (message) where.message = message;
    if (coachName) where.coachName = coachName;
    if (courseName) where.courseName = courseName;
    try {
      const res = await ctx.model.Order.findAndCountAll({
        where,
        limit,
        offset,
        order:[ ['orderNum','desc' ]]
      });
      if (!res) return ctx.body = { success: false, errCode: 50002, info: '系统有误 缺少某些字段 请联系管理员' };
      ctx.body = { success: true, errCode: 50000, info: '查询成功', res };
    } catch (e) {   
         console.log('订单列表',e)
      ctx.body = { success: false, info: '系统有误 请联系管理员', errCode: 50001 };
    }


  }
  /*
        author:xing
        desc:创建订单
        params:{
          orderNum:订单编号,
          userid:用户ID,
          uname:用户名,
          reservePhone:预约手机号,
          cdleixing:预约的场地类型,
          cdid:预约的场地编号,
          yytime:预约的时间,
          fuwu:场馆服务,
          money:付款金额,
          dtype:订单类型,
          state:订单状态,
          message:留言,
          coachName:下单课程所属的教练,
          courseName:下单的课程名单
        }
        data:2021-08-11
        */ 

    // 创建订单 
    async create(){
         const { ctx } = this;
         let { cdleixing,sitePrice,reservePhone,fuwu,orderNum,userid,uname,money,dtype,state,cdid,yytime,packageType,message,coachName,courseName} = ctx.request.body;         
        //数据过滤
         if(!orderNum) return ctx.body = { success:false, errCode:50002,info:"请填订单编号" }
         if(!userid) return ctx.body = { success:false, errCode:50002,info:"请填写用户ID" }
         if(!uname) return ctx.body = { success:false, errCode:50002,info:"请填写用户名" }
         if(!money) return ctx.body = { success:false, errCode:50002,info:"请填输入付款金额" }
         if(![0,1,'0','1'].includes(dtype)) return ctx.body = { success:false, errCode:50002,info:"请正确填写订单类型" }
         if(![1,,2,3,,4,'1','2','3','4'].includes(state)) return ctx.body = { success:false, errCode:50002,info:"请正确填写订单状态" }
         if (![0,1,'0','1'].includes(fuwu)) return ctx.body = { success: false, errCode: 50002, info: "请正确填写场馆服务" }
         if(![1,2,,3,4,5,'1','2','3','4','5'].includes(cdleixing)) return ctx.body = {success:false,  errCode:50002,info:"请正确填写场地类型"}
         if(!/^1[3456789]\d{9}$/.test(reservePhone))  return ctx.body = { success:false, errCode:50002, info:"请填写正确的手机号码" }
         if(!sitePrice) return ctx.body = { success:false, errCode:50002,info:"请填输入场地价格" }
         try{
          const res = await ctx.model.Order.create({
            
            orderNum,
            userid,
            uname,
            cdleixing,
            cdid,
            yytime,
            fuwu,
            reservePhone,
            sitePrice,
            packageType,
            money,
            dtype,
            state,
            message,
            coachName,
            courseName,
            paymentAt:Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
          })
          if(!res) return ctx.body = {success:false,errCode:50002,info:"创建失败"};
          console.log("res",res)
          ctx.body = {success:true,errCode:50000,info:"创建成功",res}
        } catch(e){
          console.log('e',e)
          ctx.body = {success:true,errCode:50001,info:"创建失败"}
        }
    }
  
  /*
        author:xing
        desc:修改订单
        params:{
          did:订单ID,
          orderNum:订单编号,
          userid:用户ID,
          uname:用户名,
          cdleixing:预约的场地类型,
          cdid:预约的场地编号,
          yytime:预约的时间,
          fuwu:场馆服务,
          money:付款金额,
          dtype:订单类型,
          state:订单状态,
          message:留言,
          coachName:下单课程所属的教练,
          courseName:下单的课程名单
        }
        data:2021-08-11
        */ 
    // 修改订单
    async update() {
        
        const { ctx ,app} = this;
        let { did,orderNum,uname,cdleixing,cdid,yytime,fuwu,money,dtype,state,message,coachName,courseName,userid,reservePhone,sitePrice,packageType ,courseAddress,courseChangDi,coachPhone,userNumber,startTime,endTime,sjCoachPlace,sjCoachName,coachId,sjBookTime,courseNum,studentAge,uid  } = ctx.request.body;
        const { Op} = app.Sequelize;
        const updateDate = {}
        const where = {}
        //修改的内容
        if(uname) updateDate.uname = uname;
        if(cdleixing) updateDate.cdleixing = cdleixing
        if(cdid) updateDate.cdid = cdid
        if(yytime) updateDate.yytime = yytime
        if(fuwu) updateDate.fuwu=fuwu
        if(money) updateDate.money=money
        if(dtype) updateDate.dtype=dtype
        if(state) updateDate.state=state
        if(message) updateDate.message=message
        if(courseName) updateDate.courseName= courseName
        if(coachName) updateDate.coachName= coachName

        if(orderNum) updateDate.orderNum= orderNum
        if(userid) updateDate.userid= userid
        if(reservePhone) updateDate.reservePhone= reservePhone
        if(sitePrice) updateDate.sitePrice= sitePrice
        if(packageType) updateDate.packageType= packageType

        if(courseAddress) updateDate.courseAddress= courseAddress // 课程上课的地点
        if(courseChangDi) updateDate.courseChangDi= courseChangDi // 上课所在场馆
        if(coachPhone) updateDate.coachPhone= coachPhone // 上课教练的电话
        if(userNumber) updateDate.userNumber= userNumber // 上课人数
        if(uid) updateDate.uid= uid // 用户ID
        if(startTime) updateDate.startTime= startTime // 课程开始上课时间
        if(endTime) updateDate.endTime= endTime // 课程结束上课时间
        if(sjCoachPlace) updateDate.sjCoachPlace= sjCoachPlace // 私教上课场所
        if(sjCoachName) updateDate.sjCoachName= sjCoachName // 私教教练名称
        if(coachId) updateDate.coachId= coachId // 私教ID
        if(sjBookTime) updateDate.sjBookTime= sjBookTime // 私教预约时间
        if(courseNum) updateDate.courseNum= courseNum // 课程次数
        if(studentAge) updateDate.studentAge= studentAge // 学生年龄段


        //修改的指定条件（根据条件修改哪条数据）
        if(did) where.did = did
        if(orderNum) where.orderNum=orderNum
        // if(userid) where.userid=userid
        
        try{

         const res = await ctx.model.Order.update(updateDate,{
            
            where
          }) 
          if(!res) return ctx.body = {success:false,errCode:50001,info:"修改失败"};
          console.log('res',res) 

          ctx.body = {success:true, errCode: 50000,info:"修改成功",res}
    
        } catch(e){
          console.log(e)
          ctx.body = {success:false, errCode: 50001,info:"修改失败"}
          
    
        }
       
    } 
    /*
        author:xing
        desc:删除订单
        params:{
          did:订单ID,
          orderNum:订单编号,
          userid:用户ID
        }
        data:2021-08-11
        */

    //删除订单
    async delete() {
        const { ctx ,app} = this;
        let { did,orderNum,} = ctx.request.body;
        const { Op} = app.Sequelize;
        
        const where = {}
        
        //删除的指定条件（根据条件删除哪条数据）
        if(did) where.did=did
        //destroy
        try{
    
          const res = await ctx.model.Order.destroy({
            
            where
          }) 
          if(!res) return ctx.body = {success:false,errCode:50001,info:"删除失败"};
          ctx.body = {success:true,errCode:50000,info:"删除成功",res}
          
    
        } catch(e){
          console.log(e)
          ctx.body = {success:false,errCode:50001,info:"删除失败"}
    
        }
       
    }

  
  /*
        author:xing
        desc:删除订单
        params:{did:订单ID,orderNum:订单编号}
        data:2021-08-11
        */
  // 查多个订单信息
  // async find() {
  //     const { ctx ,app} = this;
  //     let { limit,page,userid,uname,cdleixing,cdid,yytime,fuwu,money,dtype,state,message,coachName,courseName } = ctx.request.body;
  //     const { Op} = app.Sequelize;
  //     // const w = {}
  //     const where = {}
  //     //分页处理
  //     limit = limit? limit:30;
  //     page = page ? page : 1;
  //     const offset = (page-1)*limit
  //     //查询的指定条件（根据条件删除哪条数据）
  //     if(did) where.did = did
  //     if(orderNum) where.orderNum=orderNum
  //     try{

  //       let res1 = await ctx.model.Order.findAndCountAll({
  //         where,
  //         limit,
  //         page
  //       })

  //       console.log(res1)
  //       ctx.body = {success:true,errCode:50000,info:"查询成功",res1}

  //     } catch(e){
  //       console.log(e)
  //       ctx.body = {success:false,errCode:50001,info:"查询失败"}

  //     }

  // }
  /*
        author:xing
        desc:查单个订单信息
        params:{
          did:订单ID,
          orderNum:订单编号
        }
        data:2021-08-11
        */

    // 查单个订单信息
    async findOne() {
        const { ctx ,app} = this;
        const { did,orderNum} = ctx.request.body;
        const { Op} = app.Sequelize;                                                                                                                                                                                                                                                                                        
        // const w = {}
        const where = {}
        
        //查询的指定条件
        if(did) where.did = did
        if(orderNum) where.orderNum=orderNum

        try{
    
          let res = await ctx.model.Order.findAndCountAll({
            where
          })
          if(!res.count) return ctx.body = {success:false,errCode:50002,info:"系统有误 请联系管理员"};
          ctx.body = {success:true,errCode:50000,info:"查询成功",res}
    
        } catch(e){
          console.log(e)
          ctx.body = {success:false,errCode:50001,info:"查询失败"}
    
        }
       
    }

  
}

module.exports = OrderController;
