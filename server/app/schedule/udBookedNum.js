 /*
        author: lwj
        desc: 定时更新课程已购买的人数
        data:2021-09-29
  */
const Subscription = require('egg').Subscription;
class UpdateBooked extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
    return {
        interval: '1h', // 1 分钟间隔
        type: 'all', // 指定所有的 worker 都需要执行
        disable:true,  //配置该参数为 true 时，这个定时任务不会被启动。
    };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
    const {ctx,app} = this
    try{
        // 先找出course表中的课程
        const res1 = await ctx.model.Course.findAll({
            where:{
                sponsor:2,
                type:1,
                // ReservedNumber
            }
        })
        console.log("我是res1111111111111111111111111",res1)

        // 遍历找到的课程
        for(const i of res1){
            const res2 = await ctx.model.Order.findAll({
                where:{
                    courseId:i.courseId,
                    state:2
                },
            })
            console.log("我是res2222222222222222222",res2)
            // 如果查到有数据，就更新课程表的课程已预约人数的字段
            if(res2){
                const res3 = await ctx.model.Course.update({
                    ReservedNumber:res2.lenght
                },{
                    where:{
                        courseId:i.courseId
                    }
                })
                console.log("我是res3333333333333333333",res3)
            }
        }
        this.ctx.app.cache = res1.data;
    }catch(e){
        console.log(e)
        ctx.body={success:true,info:"修改失败"}
    }
    }
}

module.exports = UpdateBooked;
