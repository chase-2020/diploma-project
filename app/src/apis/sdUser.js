/**
 * desc：场馆表接口
 * params:{ 请求接口 }
 **/
import api from '../api';

// 查询所有运营商
const _redAll = async ({...params}) => {
  const res = await api.post('/courtclassfindAll', params);
  return res.data;
};
export const redAll = _redAll;

// 查询单个运营商
const _findOneAll = async ({...params}) => {
  const res = await api.post('/MerchantFindById', params);
  return res.data;
};
export const findOneAll = _findOneAll;

// 查询单个运营商指定条件的场馆
const _findAll = async ({...params}) => {
  const res = await api.post('/courtfindAll', params);
  return res.data;
};
export const findAll = _findAll;

// 查询指定场馆的所有场地
const _findSite = async ({...params}) => {
  const res = await api.post('/site/stAll1', params);
  return res.data;
};
export const findSite = _findSite;

// 赛事活动
// 请求获取所有发布活动的场馆
const _venueAll = async ({...params}) => {
  const res = await api.post('/competition/stAll', params);
  return res.data;
};
export const venueAll = _venueAll;

// 查询所有活动
const _activity = async ({...params}) => {
  const res = await api.post('/competition/findAll', params);
  return res.data;
};
export const activity = _activity;
