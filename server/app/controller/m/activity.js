'use strict';

/*
author: jack
desc: 赛事活动
params:{};
data:2021-08-16
*/

const Controller = require('egg').Controller;

class activityController extends Controller {


  // 活动信息(增)
  async addAll() {
    const { ctx } = this;
    const { theme, project, field, organizer, contentsponsor, sponsor, content, registration, quota, first, second, third, compete, rttStartTime, rttEndTime, startTime, endTime, state, mode } = ctx.request.body;

    // 数据过滤

    if (theme.length > 50) return ctx.body = { success: false, errCode: 3002, info: '赛事活动主题内容过多' };
    if (project.length > 50) return ctx.body = { success: false, errCode: 3002, info: '赛事活动项目内容过多' };
    if (field.length > 50) return ctx.body = { success: false, errCode: 3002, info: '赛事活动场地内容过多' };
    if (organizer.length > 50) return ctx.body = { success: false, errCode: 3002, info: '您输入的内容过多' };
    if (contentsponsor.length > 50) return ctx.body = { success: false, errCode: 3002, info: '您输入的内容过多' };
    if (content.length > 255) return ctx.body = { success: false, errCode: 3002, info: '您输入的内容过多' };

    if (first.length > 255) return ctx.body = { success: false, errCode: 3002, info: '您输入的内容过多' };
    if (second.length > 255) return ctx.body = { success: false, errCode: 3002, info: '您输入的内容过多' };
    if (third.length > 255) return ctx.body = { success: false, errCode: 3002, info: '您输入的内容过多' };
    if (compete.length > 255) return ctx.body = { success: false, errCode: 3002, info: '您输入的内容过多' };

    try {
      await ctx.model.EventActivities.create({
        theme, project, field, organizer, sponsor, content, registration, quota, first, second, third, compete, rttStartTime, rttEndTime, startTime, endTime, state, mode,
      });

      ctx.body = { success: true, errCode: '' };

    } catch (e) {

      ctx.body = { success: false, errCode: 3002 };// 3002数据错误
    }
  }


  // 修改
  async revise() {

    const { ctx } = this;
    const { actId, theme, project, field, organizer, contentsponsor, sponsor, content, registration, quota, first, second, third, compete, rttStartTime, rttEndTime, startTime, endTime, state, mode } = ctx.request.body;

    const updateData = {};
    const where = {};
    if (actId) where.actId = actId;

    if (theme) updateData.theme = theme;
    if (content) updateData.content = content;
    if (project) updateData.project = project;
    if (startTime) updateData.startTime = startTime;
    if (endTime) updateData.endTime = endTime;
    if (state) updateData.state = state;
    if (field) updateData.field = field;
    if (organizer) updateData.organizer = organizer;
    if (contentsponsor) updateData.contentsponsor = contentsponsor;
    if (sponsor) updateData.sponsor = sponsor;
    if (registration) updateData.registration = registration;
    if (quota) updateData.quota = quota;
    if (first) updateData.first = first;
    if (second) updateData.second = second;
    if (third) updateData.third = third;
    if (compete) updateData.compete = compete;
    if (rttStartTime) updateData.rttStartTime = rttStartTime;
    if (rttEndTime) updateData.rttEndTime = rttEndTime;
    if (mode) updateData.mode = mode;


    // 数据过滤


    try {
      await ctx.model.EventActivities.update(updateData, {
        where,
      });
      ctx.body = { success: true, errCode: '' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, errCode: 3002 };// 3002数据错误
    }
  }

  // 删除
  async cut() {
    const { ctx } = this;
    const { actId, theme, project, field, organizer, contentsponsor, sponsor, content, registration, quota, first, second, third, compete, rttStartTime, rttEndTime, startTime, endTime, state, mode } = ctx.request.body;
    const where = {};

    if (actId) where.actId = actId;
    if (theme) where.theme = theme;
    if (content) where.content = content;
    if (project) where.project = project;
    if (startTime) where.startTime = startTime;
    if (endTime) where.endTime = endTime;
    if (state) where.state = state;
    if (field) where.field = field;
    if (organizer) where.organizer = organizer;
    if (contentsponsor) where.contentsponsor = contentsponsor;
    if (sponsor) where.sponsor = sponsor;
    if (registration) where.registration = registration;
    if (quota) where.quota = quota;
    if (first) where.first = first;
    if (second) where.second = second;
    if (third) where.third = third;
    if (compete) where.compete = compete;
    if (rttStartTime) where.rttStartTime = rttStartTime;
    if (rttEndTime) where.rttEndTime = rttEndTime;
    if (mode) where.mode = mode;


    try {
      await ctx.model.EventActivities.destroy({
        where,
      });
      ctx.body = { success: true, errCode: '' };

    } catch (e) {
      ctx.body = { success: false, errCode: 3002 };// 3002数据错误
    }
  }

  // 查找
  async find() {
    const { ctx } = this;

    let { actId, theme, page, limit, project, field, organizer, contentsponsor, sponsor, content, registration, quota, first, second, third, compete, rttStartTime, rttEndTime, startTime, endTime, state, mode } = ctx.request.body;
    limit = limit ? limit : 10;
    page = page ? page : 1;
    const offset = (page - 1) * limit; // offset: 匹配的数据里 跳过多少条数据

    const where = {}; // 查询条件
    if (actId) where.actId = actId;
    if (theme) where.theme = theme;
    if (content) where.content = content;
    if (project) where.project = project;
    if (startTime) where.startTime = startTime;
    if (endTime) where.endTime = endTime;
    if (state) where.state = state;
    if (field) where.field = field;
    if (organizer) where.organizer = organizer;
    if (contentsponsor) where.contentsponsor = contentsponsor;
    if (sponsor) where.sponsor = sponsor;
    if (registration) where.registration = registration;
    if (quota) where.quota = quota;
    if (first) where.first = first;
    if (second) where.second = second;
    if (third) where.third = third;
    if (compete) where.compete = compete;
    if (rttStartTime) where.rttStartTime = rttStartTime;
    if (rttEndTime) where.rttEndTime = rttEndTime;
    if (mode) where.mode = mode;


    // const res = await ctx.model.Order.findAndCount({
    //   where, // where:where
    // });
    // count是匹配数据的总数， rows当前页面要显示的数据
    const { count, rows } = await ctx.model.EventActivities.findAndCountAll({
      offset,
      limit,
      where, // 查询条件
    });
    const res = { count, rows };

    ctx.body = res;

  }
}

module.exports = activityController;
