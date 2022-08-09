"use strict";

const Service = require("egg").Service;
var asd = console.log.bind();
class CourseCardService extends Service {
  	/*
        author:xing
        desc:查询所有会员卡信息
        params:{
			vipIp:会员卡编号,
			vipNumber:会员卡号,
			endTime:会员卡到期时间,
			vipType:会员卡类型（1：年卡，2：月卡，3：季卡，4，周卡，5：次卡，6：半年卡),
			vipIntegral:会员卡积分,
			vipStae:会员卡状态（1:可用，2：不可用),
			vipQian:会员卡折后价格,
			vipMoney:会员卡价格,
			vipImg:会员卡图片,
			vipDays:会员卡有效天数,
			vipCiShu:会员卡可使用次数,
			createdAt:创建时间,
			updatedAt:更新时间,
        }
        data:2021-09-26
	*/
  	//查询所有会员卡信息
  	async find() {
		const { ctx, app } = this;
		const { Op } = app.Sequelize;
		let {
				page,
				limit,
				vipIp,
				vipNumber,
				endTime,
				vipType,
				vipIntegral,
				vipStae,
				vipQian,
				vipMoney,
				vipImg,
				vipDays,
				vipCiShu,
    		} = ctx.request.body;
   		let where = {};
    	limit = limit ? limit : 30;
   		page = page ? page : 1;
    	const offset = (page - 1) * limit;
		//查询的关键词
		if (vipIp) where.vipIp = vipIp;
		if (vipNumber) where.vipNumber = vipNumber;
		if (endTime) where.endTime = endTime;
		if (vipType) where.vipType = vipType;
		if (vipIntegral) where.vipIntegral = vipIntegral;
		if (vipStae) where.vipStae = vipStae;
		if (vipQian) where.vipQian = vipQian;
		if (vipMoney) where.vipMoney = vipMoney;
		if (vipImg) where.vipImg = vipImg;
		if (vipDays) where.vipDays = vipDays;
		if (vipCiShu) where.vipCiShu = vipCiShu;
		try {
			const res = await ctx.model.CourseCard.findAndCountAll({
				where,
				limit,
				offset,
				order: [["vipIp", "desc"]],
			});
			if (!res)return (ctx.body = {
				success: false,
				errCode: 50002,
				info: "系统有误 请联系管理员",
			});
			ctx.body = { success: true, errCode: 50000, info: "查询成功", res };
    	} catch (e) {
			ctx.body = {
				success: false,
				info: "系统有误 请联系管理员",
				errCode: 50001,
			};
    	}
 	}
 	/*
        author:xing
        desc:查询单个会员卡信息
        params:{
			vipIp:会员卡编号,
			vipNumber:会员卡号,
        }
        data:2021-09-26
    */
  	//查询单个会员卡信息
	async findOne() {
		const { ctx, app } = this;
		const { Op } = app.Sequelize;
		let { page, limit, vipIp, vipNumber } = ctx.request.body;
		let where = {};
		limit = limit ? limit : 30;
		page = page ? page : 1;
		const offset = (page - 1) * limit;
		//查询的关键词
		if (vipIp) where.vipIp = vipIp;
		if (vipNumber) where.vipNumber = vipNumber;
		try {
			const res = await ctx.model.CourseCard.findAndCountAll({
				where,
				limit,
				offset,
			});
			if (!res.count)return (ctx.body = {
				success: false,
				errCode: 50002,
				info: "系统有误 请联系管理员",
			});
			ctx.body = { success: true, errCode: 50000, info: "查询成功", res };
		} catch (e) {
			ctx.body = {
				success: false,
				info: "系统有误 请联系管理员",
				errCode: 50001,
			};
		}
	}
 	/*
        author:xing
        desc:添加会员卡信息
        params:{
			vipIp:会员卡编号,
			vipNumber:会员卡号,
			endTime:会员卡到期时间,
			vipType:会员卡类型（1：年卡，2：月卡，3：季卡，4，周卡，5：次卡，6：半年卡),
			vipIntegral:会员卡积分,
			vipStae:会员卡状态（1:可用，2：不可用),
			vipQian:会员卡折后价格,
			vipMoney:会员卡价格,
			vipImg:会员卡图片,
			vipDays:会员卡有效天数,
			vipCiShu:会员卡可使用次数,
			createdAt:创建时间,
			updatedAt:更新时间,
        }
        data:2021-09-26
    */

	// 添加会员卡信息
	async create() {
		const { ctx } = this;
		const { customAlphabet } = require("nanoid");
		let {
			vipNumber,
			endTime,
			vipType,
			vipIntegral,
			vipStae,
			vipQian,
			vipMoney,
			vipImg,
			vipDays,
			vipCiShu,
		} = ctx.request.body;
		//数据过滤
		if(!vipIntegral) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写会员卡积分" }
		if(![6,1,2,3,4,5,'6','1','2','3','4','5'].includes(vipType)) return ctx.body = { success:false, errCode:50002,errorMessage:"请正确填写会员卡类型" }
		if(!vipQian) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写会员卡折后价格" }
		if(![2,1,'2','1'].includes(vipStae)) return ctx.body = { success:false, errCode:50002,errorMessage:"请填写会员状态" }
		if(!vipMoney) return ctx.body = {success:false, errCode:5002,errorMessage:"请填写会员卡价格"}

		if( vipType ===5 ) if(!vipCiShu) return ctx.body = {success:false, errCode:5002,errorMessage:"请填写会员卡可使用次数"}
		
		if(!vipImg) return ctx.body = {success:false, errCode:5002,errorMessage:"请填写会员卡图片"}
		const nanoId = customAlphabet("1234567890", 10);

		try {
			// 1：年卡，2：月卡，3：季卡，4，周卡，5：次卡，6：半年卡
			var now = new Date();
			// 月卡2
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var d = new Date(year, month, 0);
			var yueKa = d.getDate()
			console.log("月卡天数yueKa", yueKa);
			var yueDd = year + "-" + month + "-" + d.getDate();

			var dd = new Date(yueDd).getTime();
			console.log("dd", dd);

			var timeEnd = new Date();
			timeEnd.setHours(0,0,0)
			//月卡有效日期时间戳
			var timeEndDate = timeEnd.setDate(timeEnd.getDate()+yueKa)
			
			var effectiveDate = timeEndDate-new Date().valueOf()
			// 月卡有效天数
			var yueEffectiveDate = Math.floor(effectiveDate/1000/60/60/24)
			
			//  年卡1
			var yearDays
			if(year%4 == 0 && year%100 !== 0 || year%400 ==0 ){
				yearDays=366
			}else{
				yearDays=365
			}
			console.log("年卡yearDays",yearDays)

			var yearNow = new Date();
			// 年卡到期时间
			yearNow.setHours(0,0,0)
			var yearEnd = yearNow.setDate(yearNow.getDate()+yearDays)
				

			//  周卡4
			var daySs
			function fun_date(num) {

				var date1 = new Date();
				//今天时间
				var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
				console.log(time1);
				var date2 = new Date(date1);
				date2.setDate(date1.getDate() + num);
				//num是正数表示之后的时间，num负数表示之前的时间，0表示今天
				var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate(); 
				console.log('time2',time2); //2021-10-5
				daySs = (new Date(time2).getTime()-new Date(time1).getTime())/(1000*3600*24)
				console.log("周卡daySs",daySs)

				return time2;
			}
			fun_date(7);
			
			var daySsNow = new Date();
			daySsNow.setHours(0,0,0)
			// 周卡到期时间
			var daySsEnd = daySsNow.setDate(daySsNow.getDate()+daySs)

			// 季卡3
			now.setMonth(now.getMonth() + 3);
			var y = now.getFullYear();
			var m = now.getMonth() + 1;
			var d = now.getDate();
			var jiDd = y + "-" + m + "-" + d;
			console.log("jiDd", jiDd);
			var jiDays = new Date(jiDd).getTime() - dd;

			var jiKaDays = Math.trunc(jiDays / (1000 * 3600 * 24));
			console.log("季卡天数jiKaDays", jiKaDays);

			var jiKaNow = new Date();
			jiKaNow.setHours(0,0,0)
			// 季卡到期时间
			var jiKaEnd = jiKaNow.setDate(jiKaNow.getDate()+jiKaDays)

			// 半年卡6
			now.setMonth(now.getMonth() + 3);
			var y1 = now.getFullYear();
			var m1 = now.getMonth() + 1;
			var d1 = now.getDate();
			var jiDd1 = y1 + "-" + m1 + "-" + d1;
			console.log("jiDd1", jiDd1);
			var jiDays1 = new Date(jiDd1).getTime() - dd;

			var jiKaDays1 = Math.trunc(jiDays1 / (1000 * 3600 * 24));
			console.log("半年年卡jiKaDays1", jiKaDays1);

			var halfYearNow = new Date();
			halfYearNow.setHours(0,0,0)
			// 半年卡到期时间
			var halfYearEnd = halfYearNow.setDate(halfYearNow.getDate()+jiKaDays1+1)

			// 次卡到期时间
			var ciKa = new Date()
			 ciKa.setFullYear(ciKa.getFullYear+2)

			const res = await ctx.model.CourseCard.create({
				vipNumber: nanoId(),
				endTime:vipType==1?yearEnd:vipType==2?timeEndDate:vipType==3?jiKaDays:vipType==4?daySsEnd:vipType==6?jiKaDays1:'次卡无时间限制',
				vipIntegral,
				vipType,
				vipQian,
				vipStae,
				vipDays:vipType==1?yearDays:vipType==2?yueKa:vipType==3?jiKaEnd:vipType==4?daySs:vipType==6?halfYearEnd:'',
				vipMoney,
				vipCiShu,
				vipImg,
			});
			if (!res) return (ctx.body = {
				success: false,
				errCode: 50001,
				errorMessage: "创建失败",
			});
			console.log("res", res);
			ctx.body = { success: true, errCode: 50000, info: "添加成功", res };
		} catch (e) {
			console.log(e);
			ctx.body = { success: true, errCode: 50001, info: "添加失败" };
		}
	}
	// 修改会员卡信息
	async update() {
		const { ctx, app } = this;
		let {
				vipIp,
				vipNumber,
				endTime,
				vipType,
				vipIntegral,
				vipStae,
				vipQian,
				vipMoney,
				vipImg,
				vipDays,
				vipCiShu,
			} = ctx.request.body;
		// const { Op} = app.Sequelize;
		const updateDate = {};
		const where = {};
		//修改的内容
		if (endTime) updateDate.endTime = endTime;
		if (vipType) updateDate.vipType = vipType;
		if (vipCiShu) updateDate.vipCiShu = vipCiShu;
		if (vipIntegral) updateDate.vipIntegral = vipIntegral;
		if (vipDays) updateDate.vipDays = vipDays;
		if (vipStae) updateDate.vipStae = vipStae;
		if (vipQian) updateDate.vipQian = vipQian;
		if (vipMoney) updateDate.vipMoney = vipMoney;
		if (vipImg) updateDate.vipImg = vipImg;
		//修改的指定条件（根据条件修改哪条数据）
		if (vipIp) where.vipIp = vipIp;
		if (vipNumber) where.vipNumber = vipNumber;
		try {
			const res = await ctx.model.CourseCard.update(updateDate, {
				where,
			});
			if (!res) return (ctx.body = {
				success: false,
				errCode: 50002,
				info: "修改失败",
			});
			console.log("res", res);

			ctx.body = { success: true, errCode: 50000, info: "修改成功", res };
		} catch (e) {
			console.log(e);
			ctx.body = { success: false, errCode: 50001, info: "修改失败" };
		}
	}
    /*
        author:xing
        desc:删除会员卡信息
        params:{
			vipIp:会员编号,
			vipNumber:会员卡号,
			vipPhone:电话,
         
        }
        data:2021-08-16
    */
	//删除会员卡信息
	async delete() {
		const { ctx, app } = this;
		let { vipIp, vipNumber } = ctx.request.body;
		const { Op } = app.Sequelize;

		const where = {};

		//删除的指定条件（根据条件删除哪条数据）
		if (vipIp) where.vipIp = vipIp;
		if (vipNumber) where.vipNumber = vipNumber;
		//destroy
		try {
			const res = await ctx.model.CourseCard.destroy({
				where,
			});
			if (!res) return (ctx.body = {
				success: false,
				errCode: 50001,
				info: "删除失败",
			});
			ctx.body = { success: true, errCode: 50000, info: "删除成功", res };
		} catch (e) {
			console.log(e);
			ctx.body = { success: false, errCode: 50001, info: "删除失败" };
		}
	}
}

module.exports = CourseCardService;
