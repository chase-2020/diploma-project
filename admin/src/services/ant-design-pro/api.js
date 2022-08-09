// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
// import { requests } from '../../app';
/** 获取当前的用户 GET /api/currentUser */

export async function currentUser(options) {
  return request('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/login/account */

export async function login(body, options) {
  return request('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 此处后端没有提供注释 GET /api/notices */

export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取规则列表 GET /api/rule */

export async function rule(params, options) {
  return request('/api/rule', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建规则 PUT /api/rule */

export async function updateRule(options) {
  return request('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/rule */

export async function addRule(options) {
  return request('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */

export async function removeRule(options) {
  return request('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

// 查询场馆
export async function findCourt(data) {
  return request('/admin/sdUser/find', {
    method: 'POST',
    data: {...data},
  });
}

// 添加场馆
export async function createCourt(data) {
  return request('/admin/sdUser/create', {
    method: 'POST',
    data: {...data},
  });
}

// 修改场馆
export async function updateCourt(data) {
  return request('/admin/sdUser/update', {
    method: 'POST',
    data: {...data},
  });
}

// 查询运营商
export async function boss(data) {
  return request('/admin/merchantAdmin/find', {
    method: 'POST',
    data: {...data},
  });
}

// 添加运营商
export async function bossCreate(data) {

  const res = await  request('/admin/merchantAdmin/create', {
    method: 'POST',
    data: {...data},
  });
  return res
}

// 修改运营商
export async function bossUpdate(data) {
  return request('/admin/merchantAdmin/update', {
    method: 'POST',
    data: {...data},
  });
}

// 删除运营商
export async function bossDestroy(data) {
  return request('/admin/merchantAdmin/destroy', {
    method: 'POST',
    data: {...data},
  });
}

// 查询所有会员卡
export async function findMember(body) {
  return request('/admin/member/findAll', {
    method: 'POST',
    data: {...body},
  });
}

// 修改会员卡
export async function updateMember(body) {
  return request('/admin/member/update', {
    method: 'POST',
    data: {...body},
  });
}

// 添加会员卡
export async function createMember(body) {
  return request('/admin/member/create', {
    method: 'POST',
    data: {...body},
  });
}

// 删除会员卡
export async function deleteMember(body) {
  return request('/admin/member/delete', {
    method: 'POST',
    data: {...body},
  });
}


// 查询所有商品订单
export async function findMorder(body) {
  return request('/admin/commodityOrder/findAll', {
    method: 'POST',
    data: {...body},
  });
}

// 修改商品订单
export async function updateMorder(body) {
  return request('/admin/commodityOrder/update', {
    method: 'POST',
    data: {...body},
  });
}

// 添加商品订单
export async function createMorder(body) {
  return request('/admin/commodityOrder/create', {
    method: 'POST',
    data: {...body},
  });
}

// 删除商品订单
export async function deleteMorder(body) {
  return request('/admin/commodityOrder/delete', {
    method: 'POST',
    data: {...body},
  });
}

// 查询所有场地信息
export async function findSort(body) {
  return request('/admin/site/find', {
    method: 'POST',
    data: {...body},
  });
}

// 修改场地信息
export async function updateSort(body) {
  return request('/admin/site/update', {
    method: 'POST',
    data: {...body},
  });
}

// 添加场地信息
export async function createSort(body) {
  return request('/admin/site/create', {
    method: 'POST',
    data: {...body},
  });
}

// 删除场地信息
export async function destroySort(body) {
  return request('/admin/site/destroy', {
    method: 'POST',
    data: {...body},
  });
}

// 查询所有教练信息
export async function findCoach(body) {
  return request('/admin/coach/findAll', {
    method: 'POST',
    data: {...body},
  });
}

// 修改教练信息
export async function updateCoach(body) {
  return request('/admin/coach/update', {
    method: 'POST',
    data: {...body},
  });
}

// 添加教练信息
export async function createCoach(body) {
  return request('/admin/coach/create', {
    method: 'POST',
    data: {...body},
  });
}

// 删除教练信息
export async function destroyCoach(body) {
  return request('/admin/coach/delete', {
    method: 'POST',
    data: {...body},
  });
}

// 查询所有赛事和活动信息
export async function eventActivitiesAll(body) {
  return request('/activityText/findAll', {
    method: 'POST',
    data: {...body},
  });
}

// 添加报名信息
export async function evenTcreate(body) {
  return request('/activityText/create', {
    method: 'POST',
    data: {...body},
  });
}

// 修改报名信息
export async function evenUpdate(body) {
  return request('/activityText/update', {
    method: 'POST',
    data: {...body},
  });
}

// 删除报名信息
export async function evenDestroy(body) {
  return request('/activityText/destroy', {
    method: 'POST',
    data: {...body},
  });
}

// 查找赛事活动信息表单个信息
export async function eventFindAll(body) {
  return request('/admin/event/findAll', {
    method: 'POST',
    data: {...body},
  });
}

// 查找会员卡信息
export async function cardfindAll(body) {
  return request('/admin/courseCard/find', {
    method: 'POST',
    data: {...body},
  });
}

// 添加会员卡信息
export async function cardCreate(body) {
  return request('/admin/courseCard/create', {
    method: 'POST',
    data: {...body},
  });
}

// 修改会员卡信息
export async function cardUpdate(body) {
  return request('/admin/courseCard/update', {
    method: 'POST',
    data: {...body},
  });
}

// 删除会员卡信息
export async function cardDelete(body) {
  return request('/admin/courseCard/delete', {
    method: 'POST',
    data: {...body},
  });
}