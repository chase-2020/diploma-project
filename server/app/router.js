'use strict';

//  const { Controller } = require("egg");

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  //  客户端接口

  //  运营商
  router.post('/courtclassfindAll', controller.mobile.merchant.courtclassfindAll);// 查询所有运营商
  router.post('/MerchantFindById', controller.mobile.merchant.MerchantFindById);// 查询单个运营商的信息
  router.post('/courtfindAll', controller.mobile.court.courtfindAll);// 球场场馆查找
  router.post('/site/stAll1', controller.mobile.site.stAll1); //  查询指定场馆的所有场地

  //  中后台
  //  admin/merchant
  router.post('/merchant/vcloger', controller.admin.merchant.vcloger); // 用户验证码登录
  router.post('/merchant/register', controller.admin.merchant.register); // 用户注册
  router.post('/merchant/yzmupdate', controller.admin.merchant.yzmupdate); // 用户获取验证码

  //  用户
  //  user
  router.post('/user/order', controller.user.order.order); // 用户场地预定下单
  router.post('/user/siteOrder', controller.user.order.siteOrder); // 用户单个订单场地记录
  router.post('/user/findOrder', controller.user.order.findOrder); // 用户单个订单查询
  router.post('/user/findSite', controller.user.order.findSite); // 查询用户预约的场地记录
  router.post('/user/findAll', controller.user.order.findAll); // 查询用户所有的订单

  router.post('/wxlogin', controller.wx.mp.login); // 小程序登录
  router.post('/userInfodecryptData', controller.wx.mp.getUserInfo); // 解密用户信息
  router.post('/findOpenId', controller.user.user.findOpenId); // 根据openid查询用户
  //  用户订单
  router.get('/', controller.home.index);
  router.post('/aa', controller.m.order.cgadd);//  场地订单增加
  router.post('/bb', controller.m.order.kcadd);//  课程订单增加
  // 私教订单
  router.post('/order/addSjOrder', controller.m.order.addSjOrder); // 私教订单的增加
  router.post('/order/findAllSjOrder', controller.m.order.findAllSjOrder); // 通过查询全部私教订单
  router.post('/order/findOneSjOrder', controller.m.order.findOneSjOrder); // 通过orderNumber查询订单信息
  router.post('/order/deleteSjOrder', controller.m.order.deleteSjOrder); // 删除对应orderNumber的订单信息
  router.post('/order/updateSjOrder', controller.m.order.updateSjOrder); // 修改订单的state的状态
  //  课程购买
  router.post('/coursePay', controller.m.order.coursePay);
  //  通过课程订单查找信息
  router.post('/couresPayNumber', controller.m.order.couresPayNumber);
  //  通过某个订单编号删除某个订单
  router.post('/cannelOrderNumber', controller.m.order.cannelOrderNumber);
  //  已取消的订单或者待付款的订单重新付款
  router.post('/updateState', controller.m.order.updateState);

  router.post('/orderAmend', controller.m.order.modify);//  订单修改
  router.post('/dd', controller.m.order.deleteAll);//  订单删除
  router.post('/order/findAll', controller.m.order.findAll);//  查询团课全部订单
  router.post('/order/findById', controller.m.order.findById);//  查询全部订单
  // 球场场馆
  router.post('/courtadd', controller.m.courtclass.courtadd);//  球场场馆增加
  router.post('/courtmodify', controller.m.courtclass.courtmodify);//  球场场馆修改
  router.post('/courtdelete', controller.m.courtclass.courtdelete);//  球场场馆删除


  router.post('/MerchantFindById', controller.m.courtclass.MerchantFindById);// 运营商查找
  // 订单记录表
  router.post('/orderRecordadd', controller.m.orderRecord.orderRecordadd);//  订单记录表增加
  router.post('/orderRecordfindAll', controller.m.orderRecord.orderRecordfindAll);//  订单记录表查全部
  router.post('/orderRecordFindById', controller.m.orderRecord.orderRecordFindById);//  订单记录表查单个
  //  活动信息
  router.post('/ff', controller.m.activity.addAll);//  添加活动
  router.post('/gg', controller.m.activity.revise);//  活动的修改
  router.post('/hh', controller.m.activity.cut);//  活动的删除
  router.post('/activity/find', controller.m.activity.find);//  活动的查找
  router.post('/user/activityApplyRecord/cancelRegistration', controller.user.activityApplyRecord.cancelRegistration);// 报名记录
  router.post('/user/activityApplyRecord/eventSome', controller.user.activityApplyRecord.eventSome);// 联表查找所有活动的信息
  router.post('/user/activityApplyRecord/queryOfAnEvent', controller.user.activityApplyRecord.queryOfAnEvent);// 查找某个赛事信息
  router.post('/user/activityApplyRecord/eventOne', controller.user.activityApplyRecord.eventOne);// 查找某个连表赛事信息
  router.post('/user/activityApplyRecord/modify', controller.user.activityApplyRecord.modify);// 修改报名信息
  router.post('/user/activityApplyRecord/tips', controller.user.activityApplyRecord.tips); // 查找报名信息表 判断是否包过名


  //  我的积分
  router.post('/jj', controller.m.myIntegral.jfadd);//  添加积分呢
  router.post('/kk', controller.m.myIntegral.modify);//  积分的修改
  router.post('/ll', controller.m.myIntegral.delete);//  积分的删除
  router.post('/findIntegralByUser', controller.m.myIntegral.find);//  积分的查找

  //  admin
  // 场馆会员信息,课程会员卡信息管理
  router.post('/memberadd', controller.m.member.add); // 添加
  router.post('/memberdelete', controller.m.member.delete); // 删除
  router.post('/memberupdate', controller.m.member.update); // 修改
  router.post('/memberfindAll', controller.m.member.findAll); // 查找

  router.post('/memberSelectOne/:vipId', controller.m.member.SelectOne);

  // 场馆课程信息管理
  router.post('/venue/venueClass/create', controller.venue.venueClass.create);// 添加
  router.post('/venue/venueClass/delete', controller.venue.venueClass.delete);// 删除
  router.post('/venue/venueClass/update', controller.venue.venueClass.update);// 修改
  router.post('/venue/venueClass/findAll', controller.venue.venueClass.findAll);// 查找

  // 商品订单 增、删、改、查
  router.post('/shopadd', controller.m.shop.add); // 添加
  router.post('/shopupdate', controller.m.shop.update); // 更新
  router.post('/shopdelete', controller.m.shop.delete); // 删除
  router.post('/shopfindAll', controller.m.shop.findAll); // 查找

  // 商品 增、删、改、查
  router.post('/commodityListcreate', controller.m.commodityList.create); // 添加
  router.post('/commodityListupdate', controller.m.commodityList.update); // 更新
  router.post('/commodityListdelete', controller.m.commodityList.delete); // 删除
  router.post('/commodityListfindAll', controller.m.commodityList.findAll); // 查找


  /* zwh编辑 */
  // 用户密码登录
  router.post('/signin/pwdloger', controller.signin.signin.pwdloger);
  // 用户验证码登录
  router.post('/signin/vcloger', controller.signin.signin.vcloger);
  // 用户重置密码
  router.post('/signin/Reset', controller.signin.signin.Reset);
  // 用户注册
  router.post('/signin/register', controller.signin.signin.register);
  // 用户请求登录验证码
  router.post('/signin/update/:phone', controller.signin.signin.update);
  // 活动信息相关增删查改
  router.post('/eventActivies/activies/findAll', controller.eventActivies.activies.findAll);// 查找所有赛事活动信息
  router.post('/eventActivies/activies/findOne', controller.eventActivies.activies.findOne);//  查找单个赛事活动信息
  router.post('/eventActivies/activies/update', controller.eventActivies.activies.update);//  修改单个赛事活动信息
  router.post('/eventActivies/activies/signUp', controller.eventActivies.activies.signUp);// 赛事报名登记信息添加


  // 个人积分获取记录
  router.post('/user/record/create', controller.user.record.create); // 签到增加积分获取记录
  router.post('/user/record/findAll', controller.user.record.findAll); // 个人积分查询
  router.post('/user/record/configInt', controller.user.record.configInt); // 积分配置
  router.post('/user/record/signin/:uid', controller.user.record.signin); // 传入签到状态
  router.post('/user/record/signinCre', controller.user.record.signinCre); // 修改签到状态
  router.post('/user/record/selectAll', controller.user.record.selectAll); // 传入签到状态

  // 场馆运营商表
  router.post('/user/merchant/merchantFind', controller.user.merchant.merchantFind);

  //  积分兑换
  router.post('/jiFenAdd/:phone', controller.user.record.jiFenAdd);


  //  // course
  //  router.post("/course/addCourse", controller.m.course.addCourse); // 添加私教课程
  //  router.post("/course/findCourse", controller.m.course.findCourse); // 查找单个课程课程
  //  router.post("/course/findAllCourse", controller.m.course.findCourses); // 查找私教所有团课课程

  //  router.post("/course/deleteCourse", controller.m.course.deleteCourse); // 删除课程
  //  router.post("/course/updateCourse", controller.m.course.updateCourse); // 更新课程
  //  router.post('/signin/update/:phone', controller.signin.signin.update);

  // 我购买的课程
  router.post('/user/myClass/findMyClass/:uid', controller.user.myClass.findMyClass); // 个人课程查询
  router.post('/user/myClass/createClass/:uid', controller.user.myClass.createClass); // 已购买了的场馆课程类
  router.post('/user/myClass/creCouClass/:uid', controller.user.myClass.creCouClass); // 已购买了的私教课程类
  // 场馆课程信息
  router.post('/venue/venueClass/create', controller.venue.venueClass.create); // 场馆添加课程
  // 场馆信息
  router.post('/venue/traverseVenue/findAll', controller.venue.traverseVenue.findAll); //  场馆遍历查询


  // 课程的增删改查
  router.post('/course/addCourse', controller.m.course.addCourse); // 添加课程
  router.post('/course/findCourse', controller.m.course.findCourse); // 查找单个课程课程
  router.post('/course/findAllCourse', controller.m.course.findCourses); // 查找私教所有团课课程
  router.post('/course/findVenueCourses', controller.m.course.findVenueCourses); // 查找场馆所有课程
  router.post('/course/findCoachCourses', controller.m.course.findCoachCourses); // 查找私教所有课程
  router.post('/course/findKeyCourse', controller.m.course.findKeyCourse); // 查找关键课程
  router.post('/course/findCourseName', controller.m.course.findCourseName); // 查找课程名称
  router.post('/course/findVenue', controller.m.course.findVenue); // 查找每个场馆中的全部课程
  router.post('/course/deleteCourse', controller.m.course.deleteCourse);// 删除课程
  router.post('/course/updateCourse', controller.m.course.updateCourse);// 更新课程
  router.post('/coach/findMerchant', controller.m.course.findMerchant); // 查找对应教练下的场馆运营商
  router.post('/course/findVenueCourseType', controller.m.course.findVenueCourseType); // 查找场馆课程类型
  router.post('/course/findAllCourt', controller.m.course.findallCourt); // 查找全部的场馆
  //  场馆课程订单
  router.post('/addVenueCourseOrder', controller.m.course.addVenueCourseOrder); // 添加场馆课程订单
  router.post('/findVenueCourseOrder', controller.m.course.findVenueCourseOrder); // 查找场馆课程订单
  router.post('/findVCOneOrder', controller.m.course.findVCOneOrder); // 通过订单编号查找场馆课程订单
  //  router.post('/deleteVenueOrder',controller.m.course.deleteVenueOrder)  // 通过订单编号删除课程订单
  router.post('/updateVenueOrder', controller.m.course.updateVenueOrder); // 通过订单编号修改场馆课程订单的支付状态


  // 评论的增删查
  router.post('/appraise/addAppraise', controller.m.appraise.addAppraise); // 添加评价
  router.post('/appraise/findAppraise', controller.m.appraise.findAppraise); // 查找评价
  router.post('/appraise/deleteAppraise', controller.m.appraise.deleteAppraise); // 删除评价
  //  发表评论
  router.post('/appraise/createAppraise', controller.m.appraise.createAppraise);
  router.post('/appraise/selectAppraise', controller.m.appraise.selectAppraise);

  //  stadium
  router.post('/stadium/add', controller.m.stadium.add);//  场馆信息增加
  router.post('/stadium/2', controller.m.stadium.delete);//  场馆信息删除
  router.post('/stadium/3', controller.m.stadium.update);//  场馆信息更新
  router.post('/stadium/4', controller.m.stadium.red1);//  场馆信息查询
  router.post('/stadium/redAll', controller.m.stadium.redAll);//  查询所有场馆
  router.post('/stadium/redAll1', controller.m.stadium.redAll1);
  router.post('/stadium/redAll2', controller.m.stadium.redAll2);
  router.post('/stadium/5', controller.m.stadium.findAll);//  场馆信息查询


  // 教练信息路由
  router.post('/addDate', controller.m.coachDate.addDate);// 增加
  router.post('/selectAllDate', controller.m.coachDate.selectAllDate);// 查找(全部查找)
  router.post('/updateDate', controller.m.coachDate.updateDate);// 修改
  router.post('/findById', controller.m.coachDate.findById);// 查找(单个查找)
  router.post('/deleteDate', controller.m.coachDate.deleteDate);// 删除
  router.post('/stadium/1', controller.m.stadium.add); //  场馆信息增加
  router.post('/stadium/2', controller.m.stadium.delete); //  场馆信息删除
  router.post('/stadium/3', controller.m.stadium.update); //  场馆信息更新
  router.post('/stadium/4', controller.m.stadium.red1); //  场馆信息查询
  router.post('/stadium/5', controller.m.stadium.findAll); //  场馆信息查询

  // admin/plan
  router.post('/plan/planCreate', controller.admin.plan.planCreate); // 创建特殊排场
  router.post('/plan/planFindAll', controller.admin.plan.planFindAll); // 查询所有特殊排场
  router.post('/plan/deletePlan', controller.admin.plan.deletePlan); // 删除选中的特别排场

  //  User/user


  router.post('/register', controller.user.user.register); // 用户注册
  router.post('/login', controller.user.user.login); // 用户登录
  router.post('/vcloger', controller.user.user.vcloger); // 用户验证码登录
  router.post('/user/yzmupdate', controller.user.user.yzmupdate); // 用户获取验证码
  router.post('/user/send', controller.user.user.send); // 验证码短信
  router.post('/user/resetpwd', controller.user.user.resetpwd); // 用户重置密码
  router.post('/user/useAll', controller.user.user.useAll); // 查询用户的所有信息
  router.post('/user/useUpdate', controller.user.user.useUpdate); // 更新用户的信息

  router.post('/userFindOne/:phone', controller.user.user.userFindOne);// 个人积分查找
  router.post('/userAdd', controller.user.user.userAdd);// 添加用户消息
  router.post('/addUserInfo', controller.user.user.addUserInfo);// 添加用户消息

  //  根据用户uid查找数据
  router.post('/user/findOneUid', controller.user.user.findOneUid);
  //  创建学员购买详情记录
  router.post('/coursePayJiLu', controller.user.user.coursePayJiLu);

  router.post('/findCoursePayJiLu', controller.user.user.findCoursePayJiLu);


  //  User/competition

  router.all('/competition/create', controller.user.competition.create); // 赛事创建
  router.post('/competition/findAll', controller.user.competition.findAll); // 查询所有赛事  // 查询指定场馆所有赛事
  router.post('/competition/stAll', controller.user.competition.stAll); //  查询发布活动的所有场馆

  //  User/venueClass

  router.post('/venueClass/vnAll', controller.user.venueClass.vnAll); // 查询所有的课程类型
  router.post('/venueClass/findAll', controller.user.venueClass.findAll); // 查询所有的课程

  //  controller/m/coach
  //  controller/coach

  router.post('/coach/add', controller.m.coach.addCoach);
  router.post('/coach/find', controller.m.coach.findCoach);
  router.post('/coach/update', controller.m.coach.updateCoach);

  router.post('/coach/delete', controller.m.coach.deleteCoach);

  //  查找某一个教练信息
  router.post('/coachOne', controller.m.coach.coachOne);

  //  教练注册信息
  router.post('/coach/registerCoach', controller.m.coach.registerCoach);

  //  修改排课的教练教程
  router.post('/coach/findUpdated/:coachId', controller.m.coach.findUpdated);

  // controller/m/coachWorkTime
  router.post('/coachtime/add', controller.m.coachWorkTime.addTime);
  router.post('/coachtime/find', controller.m.coachWorkTime.findTime);
  router.post('/coachtime/findOne', controller.m.coachWorkTime.findOneTime);
  router.post('/coachtime/update', controller.m.coachWorkTime.updateTime);
  router.post('/coachtime/delete', controller.m.coachWorkTime.deleteTime);

  // controller/m/courseManage
  router.post('/courseManage/add', controller.m.courseManage.addManage);
  router.post('/courseManage/findAll', controller.m.courseManage.findAllManage);
  router.post('/courseManage/findOne', controller.m.courseManage.findOneManage);
  router.post('/courseManage/update', controller.m.courseManage.updateManage);
  router.post('/courseManage/delete', controller.m.courseManage.deleteManage);

  // controller/m/courseAdd 添加课程
  router.post('/courseAdd/add', controller.m.courseAdd.addCourse);
  router.post('/courseAdd/find', controller.m.courseAdd.findCourse);
  router.post('/courseAdd/update', controller.m.courseAdd.updateCourse);
  router.post('/courseAdd/delete', controller.m.courseAdd.deleteCourse);

  // m/site(场地表)
  router.post('/site/stAll', controller.m.site.stAll);


  router.post('/site/arrange', controller.admin.site.arrange); // 排场
  router.post('/site/findAll', controller.admin.site.findAll); // 查询指定场地信息

  //  admin/order(订单表)
  router.post('/admin/order/find', controller.admin.order.find); // 查询多个订单
  router.post('/admin/order/create', controller.admin.order.create); // 创建订单
  router.post('/admin/order/update', controller.admin.order.update); // 修改订单
  router.post('/admin/order/delete', controller.admin.order.delete); // 删除订单
  router.post('/admin/order/findOne', controller.admin.order.findOne); // 查询订单


  //  admin/user
  router.post('/admin/user/findOne/:uid', controller.admin.user.findOne); // 查(单个)
  router.post('/admin/user/findAll', controller.admin.user.findAll); // 查(多个)
  router.post('/admin/user/destroy', controller.admin.user.destroy); // 删
  router.post('/admin/user/update', controller.admin.user.update); // 改

  //  m/newStudent
  router.post('/m/newStudent/findOne', controller.m.newStudent.findOne); // 查(单个)
  router.post('/m/newStudent/findAll', controller.m.newStudent.findAll); // 查(多个)
  router.post('/m/newStudent/destroy', controller.m.newStudent.destroy); // 删
  router.post('/m/newStudent/update', controller.m.newStudent.update); // 改
  router.post('/m/newStudent/create', controller.m.newStudent.create); // 增

  //  admin/course
  router.post('/admin/course/findOne', controller.admin.course.findOne); // 查(单个)
  router.post('/admin/course/findAll', controller.admin.course.findAll); // 查(多个)
  router.post('/admin/course/update', controller.admin.course.update); // 改
  router.post('/admin/course/destroy', controller.admin.course.destroy); // 删
  router.post('/admin/course/create', controller.admin.course.create); // 增

  //  admin/event
  router.post('/admin/event/findOne', controller.admin.event.findOne); // 查(单个)
  router.post('/admin/event/findAll', controller.admin.event.findAll); // 查(多个)
  router.post('/admin/event/update', controller.admin.event.update); // 改
  router.post('/admin/event/destroy', controller.admin.event.destroy); // 删
  router.post('/admin/event/create', controller.admin.event.create); // 增

  //  admin/dynamic
  router.post('/admin/dynamic/findOne', controller.admin.dynamic.findOne); // 查(单个)
  router.post('/admin/dynamic/findAll', controller.admin.dynamic.findAll); // 查(多个)
  router.post('/admin/dynamic/destroy', controller.admin.dynamic.destroy); // 删

  //  admin/sdUser(场馆表)
  router.post('/admin/sdUser/find', controller.admin.sdUser.find); // 查询多个场馆信息
  router.post('/admin/sdUser/create', controller.admin.sdUser.create); // 添加场馆
  router.post('/admin/sdUser/update', controller.admin.sdUser.update); // 修改场馆信息
  router.post('/admin/sdUser/destroy', controller.admin.sdUser.destroy); // 删除场馆信息

  //  admin/site(场地表)
  router.post('/admin/site/find', controller.admin.site.find); // 查询场地信息
  router.post('/admin/site/create', controller.admin.site.create); // 添加场馆
  router.post('/admin/site/update', controller.admin.site.update); // 修改场馆信息
  router.post('/admin/site/destroy', controller.admin.site.destroy); // 删除场馆信息

  // admin/coach(教练信息表)
  router.post('/admin/coach/findAll', controller.admin.coach.findAll); // 查询多个教练信息
  router.post('/admin/coach/findOne', controller.admin.coach.findOne); // 查询单个教练信息
  router.post('/admin/coach/create', controller.admin.coach.create); // 添加教练信息
  router.post('/admin/coach/update', controller.admin.coach.update); // 修改教练信息
  router.post('/admin/coach/delete', controller.admin.coach.delete); // 删除教练信息

  // admin/courseOrders(商品订单信息表)
  router.post('/admin/commodityOrder/findAll', controller.admin.commodityOrder.findAll); // 查询多个商品订单信息
  router.post('/admin/commodityOrder/findOne', controller.admin.commodityOrder.findOne); // 查询单个商品订单信息
  router.post('/admin/commodityOrder/create', controller.admin.commodityOrder.create); // 添加商品订单信息
  router.post('/admin/commodityOrder/update', controller.admin.commodityOrder.update); // 修改商品订单信息
  router.post('/admin/commodityOrder/delete', controller.admin.commodityOrder.delete); // 删除商品订单信息

  // admin/member(会员信息表)
  router.post('/admin/member/findAll', controller.admin.member.findAll); // 查询多个会员卡信息
  router.post('/admin/member/findOne', controller.admin.member.findOne); // 查询单个会员卡信息
  router.post('/admin/member/create', controller.admin.member.create); // 添加会员卡信息
  router.post('/admin/member/update', controller.admin.member.update); // 修改会员卡信息
  router.post('/admin/member/delete', controller.admin.member.delete); // 删除会员卡信息 // 通用操作

  //  admin/merchantAdmin(merchant 运营商信息表)
  router.post('/admin/merchantAdmin/find', controller.admin.merchantAdmin.find); // 查询多个场馆信息
  router.post('/admin/merchantAdmin/create', controller.admin.merchantAdmin.create); // 添加场馆
  router.post('/admin/merchantAdmin/update', controller.admin.merchantAdmin.update); // 修改场馆信息
  router.post('/admin/merchantAdmin/destroy', controller.admin.merchantAdmin.destroy); // 删除场馆信息

  //  activity/activityText(eventRegistration 赛事报名登记表)
  router.post('/activityText/findAll', controller.activity.activityText.findAll); // 查询多个赛事报名登记表信息
  router.post('/activityText/create', controller.activity.activityText.create); // 添加报名信息
  router.post('/activityText/update', controller.activity.activityText.update); // 添加报名信息
  router.post('/activityText/destroy', controller.activity.activityText.destroy); // 添加报名信息

  // admin/member(会员信息表)
  router.post('/admin/courseCard/find', controller.admin.courseCard.find); // 查询多个会员卡信息
  router.post('/admin/courseCard/findOne', controller.admin.courseCard.findOne); // 查询单个会员卡信息
  router.post('/admin/courseCard/create', controller.admin.courseCard.create); // 添加会员卡信息
  router.post('/admin/courseCard/update', controller.admin.courseCard.update); // 修改会员卡信息
  router.post('/admin/courseCard/delete', controller.admin.courseCard.delete); // 删除会员卡信息 // 通用操作

  //  mobile
  // 通用操作
  router.post('/common/upload', controller.common.common.upload); // 上传图片
};
