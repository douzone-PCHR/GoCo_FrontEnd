import axios from 'axios';
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
      // window.location.href = '/';
    }
    if (error.response.status === 401) {
      // window.location.href = '/login';
      console.error(error);
    }
    if (error.response.status === 403) {
      window.location.href = '/login';
    }
    if (error.response.status === 500) {
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
