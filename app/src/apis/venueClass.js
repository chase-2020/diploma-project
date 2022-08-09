/**
 * desc：场馆课程表接口
 * params:{ 请求接口 }
 **/
import api from '../api';


// 培训
// 查询所有的课程类型
const _vnAll = async ({...params}) => {
    const res = await api.post('/venueClass/vnAll', params);
    return res.data;
};
export const vnAll = _vnAll;

// 查询所有课程/ 查询指定类型的课程
const _findAll = async ({...params}) => {
    const res = await api.post('/venueClass/findAll', params);
    return res.data;
};
export const findAll = _findAll;
