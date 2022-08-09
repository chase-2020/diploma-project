/**
 * desc：用户表接口
 * params:{ 请求接口 }
 **/
import api from '../api';

// 用户注册
const _register = async ({...params}) => {
  const res = await api.post('/register', params);
  return res.data;
};
export const register = _register;

// 获取验证码
const _yzmreg = async ({...params}) => {
  const res = await api.post('/user/yzmupdate', params);
  return res.data;
};
export const yzmreg = _yzmreg;

// 账号密码登录
const _login = async ({...params}) => {
  const res = await api.post('/login', params);
  return res.data;
};
export const login = _login;

// 验证码快捷登录 或 验证用户身份
const _yzmlogin = async ({...params}) => {
  const res = await api.post('/vcloger', params);
  return res.data;
};
export const yzmlogin = _yzmlogin;

// 重置密码
const _setpwd = async ({...params}) => {
  const res = await api.post('/user/resetpwd', params);
  return res.data;
};
export const setpwd = _setpwd;

// 更新用户信息
const _useUpdate = async ({...params}) => {
  const res = await api.post('/user/useUpdate', params);
  return res.data;
};
export const useUpdate = _useUpdate;

// 查询个人用户信息
const _findUser = async ({...params}) => {
  const res = await api.post('/user/useAll', params);
  return res.data;
};
export const findUser = _findUser;

// 用户场地预定下单
const _order = async ({...params}) => {
  const res = await api.post('/user/order', params);
  return res.data;
};
export const Corder = _order;

// 用户单个订单场地记录
const _siteOrder = async ({...params}) => {
  const res = await api.post('/user/siteOrder', params);
  return res.data;
};
export const siteOrder = _siteOrder;

// 用户单个订单查询
const _findOrder = async ({...params}) => {
  const res = await api.post('/user/findOrder', params);
  return res.data;
};
export const findOrder = _findOrder;

// 查询用户预约的场地记录
const _findSite = async ({...params}) => {
  const res = await api.post('/user/findSite', params);
  return res.data;
};
export const findSite = _findSite;

// 查询用户所有订单
const _findAll = async ({...params}) => {
  const res = await api.post('/user/findAll', params);
  return res.data;
};
export const findAll = _findAll;

// 修改订单
const _modifyOrder = async ({...params}) => {
  const res = await api.post('/orderAmend', params);
  return res.data;
};
export const modifyOrder = _modifyOrder;
