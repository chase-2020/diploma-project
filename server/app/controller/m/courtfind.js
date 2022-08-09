const Controller = require('egg').Controller;

class CourtController extends Controller {


  // 查找
  async courtfindAll() {
    const { ctx } = this;

    let { page,limit,ctid,name, retes, coverPhoto,sdInfo,type,phone,time,bcType,mid,siteAddress,plan,planByTime } = ctx.request.body;
    limit = limit ? limit : 10;
    page = page ? page : 1;
    const offset = (page - 1) * limit; // offset: 匹配的数据里 跳过多少条数据

    const where = {}; // 查询条件
    if (ctid) where.ctid = ctid;
    if (name) where.name = name;
    if (retes) where.retes = retes;
    if (coverPhoto) where.coverPhoto = coverPhoto;
    if (sdInfo) where.sdInfo = sdInfo;
    if (time) where.time = time;
    if (type) where.type = type;
    if (phone) where.phone = phone;
    if (bcType) where.bcType = bcType;
    if (siteAddress) where.siteAddress = siteAddress;
    if (mid) where.mid = mid;
    if (plan) where.plan = plan;
    if (planByTime) where.planByTime = planByTime;



    // await ctx.model.Merchant.belongsTo(ctx.model.Court, { foreignKey: 'mid', targetKey: 'mid' });
    const { count, rows } = await ctx.model.Court.findAndCountAll({
      offset,
      limit,
      where// 查询条件

    });
    const res = { count, rows };

    ctx.body = res;
    console.log(res)
  }
}

module.exports = CourtController;

