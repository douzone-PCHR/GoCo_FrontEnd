import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export default async function loginAPI(id, password) {
  await axios
    .post('http://localhost:8080/auth/login', {
      empId: id,
      password: password,
    })
    .then((response) => {
      const expires = new Date(response.data.tokenExpiresIn); //유효시간
      setCookie('accessToken', response.data.accessToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
        expires,
      });
      alert('로그인 성공');
    })
    .catch((error) => {
      if (error.response.status == 401) {
        alert('아이디 비밀번호가 잘못 입력되었습니다.');
      }
    });
}
