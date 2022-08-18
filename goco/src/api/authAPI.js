import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const deleteCookie = () => {
  const expires = new Date(); //유효시간
  expires.setDate(expires.getDate() - 1);
  return cookies.set('accessToken', '', {
    path: '/',
    expires,
  });
};

//////////////////// 로그인 하는 것
export const loginAPI = async (id, password, failModalhandleOpen, setErrorMessage) => {
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
      setErrorMessage('로그인 성공');
      failModalhandleOpen();
    })
    .catch(() => {
      setErrorMessage('아이디 혹은 비밀번호가 잘못 입력되었습니다.');
      failModalhandleOpen();
    });
};
//////////////////// 아이디 찾을 때 이메일 보내는 함수
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
  handleOpen(); //인증번호가 맞을 경우 '메일 보내는 중' 이라고 뜨게 만든다.
  if ((email === '') | (email === null) | (email === undefined)) {
    handleClose(); // 이메일이 입력되지 않았으면'메일보내는중 '메시지 끈다
    setErrorMessage('이메일을 입력해 주세요');
    errorModalhandleOpen();
    return;
  }
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

/////////////////////////// ID 중복 체크
const urlCheckId = 'http://localhost:8080/api/auth/checkInfo?info=';
export const IDCheck = async (
  data,
  setOkIdCheck,
  failModalhandleOpen,
  setErrorMessage,
  setSignupDataError
) => {
  if (data.empId === '') {
    failModalhandleOpen();
    setErrorMessage('아이디 값이 입력되지 않았습니다.');
    return;
  }
  await axios
    .get(`${urlCheckId}${data.empId}`)
    .then((response) => {
      setOkIdCheck(response.data); // 중복되지 않을 때 true가 담김
      if (response.data === true) {
        setErrorMessage('가입 가능 합니다.');
        setSignupDataError({ ...data, valid_empId: '' });
        setOkIdCheck(true);
      } else {
        setErrorMessage('아이디가 이미 존재 합니다.');
      }
      failModalhandleOpen();
    })
    .catch((error) => {
      console.log(error);
    });
};
///////////////////////////// 회원 가입시 유효한 이메일인지 확인하는 것
const urlCheckEmail = 'http://localhost:8080/api/auth/sendEmailForEmail';
export const SendEmailForSignUpAPI = async (
  email,
  handleOpen,
  handleClose,
  setErrorMessage,
  failModalhandleOpen,
  setAuthNumberOpen
) => {
  handleOpen();
  await axios
    .post(urlCheckEmail, {
      email: email,
    })
    .then((response) => {
      handleClose();
      failModalhandleOpen();
      setErrorMessage(response.data);
      setAuthNumberOpen(true);
    })
    .catch((error) => {
      handleClose();
      failModalhandleOpen();
      setErrorMessage(error.response.data.message);
    });
};
/////////////////////////// 회원 가입시 이메일 인증번호 확인하는 것
const urlCheckAuth = 'http://localhost:8080/api/auth/find/1';
export const CheckAuthForSignUpAPI = async (
  data,
  failModalhandleOpen,
  setErrorMessage,
  setOkEmailCheck,
  setSignupDataError
) => {
  await axios
    .post(urlCheckAuth, {
      authenticationNumber: data.authenticationNumber,
      email: data.email,
    })
    .then((response) => {
      if (response.data === '올바른 인증번호를 입력하세요') {
        setErrorMessage(response.data);
        failModalhandleOpen();
      } else if (response.data === '인증 번호가 3회이상 잘못 입력되었습니다. 재인증 바랍니다.') {
        setErrorMessage(response.data);
        failModalhandleOpen();
      } else if (data.authenticationNumber == response.data) {
        setErrorMessage('인증에 성공하였습니다.');
        failModalhandleOpen();
        setOkEmailCheck(true);
        setSignupDataError({ ...data, valid_email: '' });
      }
    })
    .catch((error) => {
      setErrorMessage(error.response.data.message);
      failModalhandleOpen();
    });
};
///////////////////////// 회원 가입시 unit 불러오기
const urlUnit = 'http://localhost:8080/api/auth/getAllUnit';
export const getUnitAPI = (setUnit) => {
  axios.get(urlUnit).then((response) => {
    setUnit(response.data);
  });
};
//////////////////////// 회원 가입 버튼
const urlSignup = 'http://localhost:8080/api/auth/signup';
export const signupAPI = (data, setErrorMessage, failModalhandleOpen, setSignupDataError) => {
  const signupData = {
    empId: data.empId,
    password: data.password,
    name: data.name,
    phoneNumber: data.phoneNumber,
    email: data.email,
    hiredate: data.hiredate,
    unit: {
      unitId: data.unit,
    },
  };
  axios
    .post(urlSignup, signupData)
    .then((response) => {
      if (response.data.email === data.email) {
        setErrorMessage('가입 성공');
        failModalhandleOpen();
        //  window.location.href = '/login';
      } else {
        setSignupDataError({
          valid_email: response.data.valid_email,
          valid_empId: response.data.valid_empId,
          valid_name: response.data.valid_name,
          valid_password: response.data.valid_password,
          valid_phoneNumber: response.data.valid_phoneNumber,
        });
      }
    })
    .catch((error) => {
      if (error.response.data) {
        console.log(error);
        setErrorMessage(error.response.data.message);
        failModalhandleOpen();
      }
    });
};
