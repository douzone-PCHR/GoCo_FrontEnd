import axios from 'axios';
import {
  sweetAlertComment,
  sweetAlertCookie,
} from '../component/auth/AuthSweetAlert.js/sweetAlert2';
import { getCookie } from './authAPI';

const client = axios.create();

client.defaults.baseURL = '/api';
client.defaults.headers.common['Authorization'] = `Bearer ${getCookie('accessToken')}`;

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 400) {
      console.error(error);
    } else if (error.response.status === 401) {
      if (
        !error.response.headers.refresh === 'true' ||
        error.response.headers.refresh === undefined
      ) {
        sweetAlertComment('로그인 정보가 없습니다.', 'warning', '/login');
      } else if (error.response.headers.refresh === 'true') {
        sweetAlertCookie();
      }
    } else if (error.response.status === 403) {
      if (
        !error.response.headers.refresh === 'true' ||
        error.response.headers.refresh === undefined
      ) {
        sweetAlertComment('권한이 없습니다.', 'warning', '/goco');
      }
    } else if (error.response.status === 500) {
      console.error(error);
    }
    // if (error.response.headers.refresh === 'true') {
    //   sweetAlertCookie();
    // }
    // if (error.response.headers.refresh === 'false') {
    //   sweetAlertComment('로그인 정보가 없습니다.', 'warning', '/login');
    // }
    return Promise.reject(error);
  }
);

export default client;
