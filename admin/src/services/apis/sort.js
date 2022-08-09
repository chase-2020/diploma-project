/**
 * desc：场地
 * params:{ 请求接口 }
 **/
import api from '../../services/api'

//普通排场
const _arrange = async ({...params}) => {
  const res = await api.post('/site/arrange', params);
  return res.data;
};
export const arrange = _arrange;

//查询指定场地信息
const _siteFindAll = async ({...params}) => {
  const res = await api.post('/site/findAll', params);
  return res.data;
};
export const siteFindAll = _siteFindAll;

//创建特别排场
const _planCreate = async ({...params}) => {
  const res = await api.post('/plan/planCreate', params);
  return res.data;
};
export const planCreate = _planCreate;

//删除选定的特别排场
const _deletePlan = async ({...params}) => {
  const res = await api.post('/plan/deletePlan', params);
  return res.data;
};
export const deletePlan = _deletePlan;

//查询所有特别排场
const _planFindAll = async ({...params}) => {
  const res = await api.post('/plan/planFindAll', params);
  return res.data;
};
export const planFindAll = _planFindAll;
