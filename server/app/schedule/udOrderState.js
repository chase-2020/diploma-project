 /*
        author: lwj
        desc: 定时更新课程的未支付的支付状态
        data:2021-09-27
  */
const Subscription = require('egg').Subscription;
class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1m', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const {ctx,app} = this
    try{
        // 先找出order表中的订单
        const res1 = await ctx.model.Order.findAll({
            where:{uid:186}
        })
        // console.log("res1111111111111111111111111111111111",res1)
        // 遍历找到的订单
        for(const i of res1){
            const _m = new Date(i.createdAt).getMinutes()
            const _countDown = new Date(i.createdAt).setMinutes(_m+15)
            // console.log("我是倒计时结束时间",_countDown)
            const _nowDate = new Date().getTime()
            if(i.state==1&&(_countDown<_nowDate)){
                const res2 = await ctx.model.Order.update({
                    state:3  //如果超过十五分没有支付就修改订单的状态为已取消
                },{
                    where:{
                      // uid:i.uid
                      orderNumber:i.orderNumber
                    }
                })
                // console.log('res2',res2)
            }
        }
        this.ctx.app.cache = res1.data;
    }catch(e){
        console.log(e)
        ctx.body={success:true,info:"修改失败"}
    }
  }
}

module.exports = UpdateCache;