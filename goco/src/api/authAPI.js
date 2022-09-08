import { Cookies } from 'react-cookie';
const cookies = new Cookies();
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};
export const getCookie = (name) => {
  return cookies.get(name);
};
export const deleteCookie = () => {
  localStorage.clear();
  const expires = new Date(); //유효시간
  expires.setDate(expires.getDate() - 1);
  return cookies.set('accessToken', '', {
    path: '/',
    expires,
  });
};
