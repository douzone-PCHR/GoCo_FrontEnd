import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const loginAPI = async (id, password, failModalhandleOpen) => {
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
    .catch(() => {
      failModalhandleOpen();
    });
};

export const FindIdAPI = async (name, email, handleOpen, handleClose, failModalhandleOpen) => {
  handleOpen(); // 모달창 띄우는 함수
  await axios
    .post('http://localhost:8080/auth/sendEmailForId', {
      name: name,
      email: email,
    })
    .then((response) => {
      handleClose(); // 모달창 끄는 함수
    })
    .catch(() => {
      handleClose(); // 모달을 끄는 함수
      failModalhandleOpen();
    });
};

export const AuthCheckAPI = async (authNum, authModalhandleOpen, setId) => {
  await axios
    .get(`http://localhost:8080/auth/find/2?authenticationNumber=${authNum}`)
    .then((response) => {
      setId(response.data);
    })
    .catch(() => {
      authModalhandleOpen();
    });
};
