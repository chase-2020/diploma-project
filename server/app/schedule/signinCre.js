const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {

    static get schedule() {
        return {
            cron: '0 0 0 * * *  ',
            type: 'all',
            // disable:true,  //配置该参数为 true 时，这个定时任务不会被启动。
        };
    }
    async subscribe(){
        const {ctx,app} = this
    
        try{
            console.log('定时任务')
			//找出user表当中的所有record的数据
			let one = await ctx.model.User.findAll({
            
          	})
			//遍历数组
			for (const i of one) {
				let two = await ctx.model.User.update({
					record:1
				},{
					where:{
						uid:i.uid
					}
				})
				console.log('two',two)
			}       
          	ctx.body={success:true,info:"修改成功",}
        }catch(e){
          console.log(e)
          ctx.body={success:false,info:"修改失败"}
        }
    }
}

module.exports = UpdateCache;