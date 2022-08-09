
const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {

    static get schedule() {
        return {
			cron: '0 0 0 * * *', // 每天23:46执行
			// interval: '1m', // 1 分钟间隔
			type: 'all',
			// disable:true,  //配置该参数为 true 时，这个定时任务不会被启动。
        };
    } 
    async subscribe(){
        const {ctx,app} = this
    
        try{
            console.log('定时任务')
			//找出CourseCard表当中的所有record的数据
			let one = await ctx.model.CourseCard.findAll({
            
          	})
			//遍历数组
			for (const i of one) {
                if(i.vipDays !=0) i.vipDays--
				let two = await ctx.model.CourseCard.update({
					vipDays:i.vipDays
				},{
					where:{
						vipIp:i.vipIp
					}
				})
                console.log('two',two)
			}       
          	ctx.body={success:true,info:"修改成功",}
        }catch(e){
			console.log(e)
			ctx.body={success:true,info:"修改失败"}
        }
    }
}

module.exports = UpdateCache;