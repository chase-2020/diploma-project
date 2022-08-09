// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 发送验证码 POST /api/login/captcha */

export async function getFakeCaptcha(params, options) {
  return request('/api/login/captcha', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function Login(params, options) {
  return request('/api/login/captcha', {
    method: 'post',
    params: { ...params },
    ...(options || {}),
  });
}
