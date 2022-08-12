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
    .post('http://localhost:8080/api/auth/login', {
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

export const FindIdAPI = async (
  name,
  email,
  handleOpen,
  handleClose,
  failModalhandleOpen,
  setErrorMessage
) => {
  handleOpen(); // 모달창 띄우는 함수
  await axios
    .post('http://localhost:8080/api/auth/sendEmailForId', {
      name: name,
      email: email,
    })
    .then(() => {
      handleClose(); // 모달창 끄는 함수
    })
    .catch((error) => {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
      handleClose(); // 모달을 끄는 함수
      failModalhandleOpen();
    });
};

export const AuthCheckAPI = async (authNum, email, authModalhandleOpen, setId, setErrorMessage) => {
  await axios
    .post(`http://localhost:8080/api/auth/find/2`, {
      authenticationNumber: authNum,
      email: email,
    })
    .then((response) => {
      if (response.data === '올바른 인증번호를 입력하세요') {
        setErrorMessage(response.data);
        authModalhandleOpen();
      } else if (response.data === '인증 번호가 3회이상 잘못 입력되었습니다. 재인증 바랍니다.') {
        setErrorMessage(response.data);
        authModalhandleOpen();
      } else {
        setId(response.data);
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
      authModalhandleOpen();
    });
};
///////////////////pwd 찾기위해 인증번호 보내는 함수
export const FindPwdAPI = async (
  empId,
  email,
  handleOpen,
  handleClose,
  setErrorMessage,
  errorModalhandleOpen
) => {
  handleOpen(); // 메일 보내는 중 표시하는 것
  await axios
    .post('http://localhost:8080/api/auth/sendEmailForPwd', {
      empId: empId,
      email: email,
    })
    .then(() => {
      handleClose(); // pwd확인을 위해 인증번호가 정상 발송되면 '메일보내는 중' 을 끈다
    })
    .catch((error) => {
      handleClose(); // 에러이면 '메일보내는 중' 을 끈다
      setErrorMessage(error.response.data.message);
      errorModalhandleOpen(); // 메일 보내는 중 에러가 뜨면 에러 모달을 open 한다.
      console.log(error.response.data.message);
    });
};
/////////////// 인증 번호로 새로운 비번 받는 함수
export const FindPasswordAPI = async (
  authNum,
  email,
  errorModalhandleOpen,
  setErrorMessage,
  handleOpen,
  handleClose
) => {
  handleOpen(); //비번이 맞을 경우 '메일 보내는 중' 이라고 뜨게 만든다.
  await axios
    .post(`http://localhost:8080/api/auth/find/3`, {
      authenticationNumber: authNum,
      email: email,
    })
    .then((response) => {
      handleClose();
      if (response.data === '올바른 인증번호를 입력하세요') {
        setErrorMessage(response.data);
      } else if (response.data === '인증 번호가 3회이상 잘못 입력되었습니다. 재인증 바랍니다.') {
        setErrorMessage(response.data);
      } else if (response.data === '이메일로 비밀번호가 발송 되었습니다.') {
        setErrorMessage(response.data);
      }
      errorModalhandleOpen(); // 결과모달오픈
    })
    .catch((error) => {
      handleClose(); // 에러이면 '메일보내는중 '메시지 끈다
      setErrorMessage(error.response.data.message); // 에러 모달에 띄울 에러 텍스트 셋팅
      console.log(error.response.data.message);
      errorModalhandleOpen(); //에러 모달 오픈
    });
};
