const Controller = require('egg').Controller;

class OrderRecordController extends Controller {


  //增
  async orderRecordadd(){
    const { ctx } = this;
    const { sid,did,startIndex,price,date ,abc} = ctx.request.body;


    //过滤条件


    //if (phone.length >11) return ctx.body = { success: false, errCode: 3002, info: '您输入的号码错误' };

    try {
      {abc.map(r =>{
        ctx.model.OrderRecord.create({
          sid:r.siteName,
          did,
          startIndex:r.ibindex,
          price:r.fee,
          date:r.time,

        });
        ctx.body = { success: true, errCode: '' };
      })}




    } catch (e) {
      console.log(e);
      ctx.body = { success: false, errCode: 3002 };// 3002数据错误
    }


  }


  // 查找
  async orderRecordfindAll() {
    const { ctx } = this;

    let { page, limit, sid,did,startIndex,price,date } = ctx.request.body;
    limit = limit ? limit : 10;
    page = page ? page : 1;
    const offset = (page - 1) * limit; // offset: 匹配的数据里 跳过多少条数据

    const where = {}; // 查询条件
    if (sid) where.sid = sid;
    if (did) where.did = did;
    if (startIndex) where.startIndex = startIndex;
    if (price) where.price = price;
    if (date) where.date = date;


    await ctx.model.Order.belongsTo(ctx.model.orderRecord, {
      foreignKey: "uid",
      targetKey: "uid",
    });
    // await ctx.model.Merchant.belongsTo(ctx.model.Court, { foreignKey: 'mid', targetKey: 'mid' });
    const { count, rows } = await ctx.model.OrderRecord.findAndCountAll({
      offset,
      limit,
      where,// 查询条件
      include:{
        model: ctx.model.orderRecord,
        required: false,
      },
    });
    const res = { count, rows };

    ctx.body = res;
    console.log(res)
  }


  async orderRecordFindById() {
    const { ctx } = this;
    const { rid } = ctx.request.body;
    
    const res = await ctx.model.OrderRecord.findOne({
      where: {
        rid,
      },
    });

    ctx.body = res;

  }


}

module.exports = OrderRecordController;
