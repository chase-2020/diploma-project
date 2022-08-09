/**
 * *author: Alice
 * describe：公共接口
 * date：2021-08-18
 * params:{  }
 * */
import axios from 'axios';
const $api = axios.create({
  // baseURL: 'http://120.76.174.253:7001',
  baseURL: 'http://192.168.1.104:7001',
  // baseURL: 'http://127.0.0.1:7001',
});
export default $api;
