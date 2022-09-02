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
const urlLogin = '/api/auth/login';
export const loginAPI = async (id, password) => {
  await axios
    .post(urlLogin, {
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
        domain: 'localhost',
      });
      sweetAlertSuccess('로그인 성공', 'success', '/goco');
    })
    .catch(() => {
      sweetAlert2('아이디 혹은 비밀번호가 잘못 입력되었습니다.', 'warning');
    });
};
//////////////////// 아이디 찾을 때 이메일 보내는 함수
const urlFindId = '/api/auth/sendemailforemail';
export const FindIdAPI = async (name, email, handleOpen, handleClose) => {
  handleOpen(); // 모달창 띄우는 함수
  await axios
    .post(urlFindId, {
      name: name,
      email: email,
    })
    .then((response) => {
      handleClose(); // 모달창 끄는 함수
      sweetAlert2(response.data, 'success');
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning');
      handleClose(); // 모달을 끄는 함수
    });
};
//////////////////// 아이디 찾을 때 인증 번호 확인하는 함수
const urlAuthCheck = `/api/auth/find/2`;
export const AuthCheckAPI = async (authNum, email, setId) => {
  await axios
    .post(urlAuthCheck, {
      authenticationNumber: authNum,
      email: email,
    })
    .then((response) => {
      if (response.data === '올바른 인증번호를 입력하세요.') {
        sweetAlert2(response.data, 'warning');
      } else if (response.data === '인증 번호가 3회이상 잘못 입력되었습니다. 재인증 바랍니다.') {
        sweetAlert2(response.data, 'warning');
      } else {
        setId(response.data);
      }
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning');
    });
};
///////////////////pwd 찾기위해 인증번호 보내는 함수
const urlFindPwd = '/api/auth/sendEmailForPwd';
export const FindPwdAPI = async (empId, email, handleOpen, handleClose) => {
  handleOpen(); // 메일 보내는 중 표시하는 것
  await axios
    .post(urlFindPwd, {
      empId: empId,
      email: email,
    })
    .then((response) => {
      sweetAlert2(response.data, 'success');
      handleClose(); // pwd확인을 위해 인증번호가 정상 발송되면 '메일보내는 중' 을 끈다
    })
    .catch((error) => {
      handleClose(); // 에러이면 '메일보내는 중' 을 끈다
      sweetAlert2(error.response.data.message, 'warning'); // 메일 보내는 중 에러가 뜨면 에러 open 한다.
    });
};
/////////////// 인증 번호로 새로운 비번 받는 함수
const urlFindPassword = `/api/auth/find/3`;
export const FindPasswordAPI = async (authNum, email, handleOpen, handleClose) => {
  handleOpen(); //인증번호가 맞을 경우 '메일 보내는 중' 이라고 뜨게 만든다.
  if ((email === '') | (email === null) | (email === undefined)) {
    handleClose(); // 이메일이 입력되지 않았으면'메일보내는중 '메시지 끈다
    sweetAlert2('이메일을 입력해 주세요.', 'warning');
    return;
  }
  await axios
    .post(urlFindPassword, {
      authenticationNumber: authNum,
      email: email,
    })
    .then((response) => {
      handleClose();
      if (
        (response.data === '올바른 인증번호를 입력하세요.') |
        (response.data === '인증 번호가 3회이상 잘못 입력되었습니다. 재인증 바랍니다.')
      ) {
        sweetAlert2(response.data, 'warning');
      } else if (response.data === '이메일로 비밀번호가 발송 되었습니다.') {
        sweetAlertSuccess(response.data, 'success', '/login');
      }
    })
    .catch((error) => {
      handleClose(); // 에러이면 '메일보내는중 '메시지 끈다
      sweetAlert2(error.response.data.message, 'warning');
    });
};

/////////////////////////// ID 중복 체크
const urlCheckId = '/api/auth/checkInfo?info=';
export const IDCheck = async (data, setOkIdCheck, setSignupDataError) => {
  if (data.empId === '') {
    sweetAlert2('아이디 값이 입력되지 않았습니다.', 'warning');
    return;
  }
  await axios
    .get(`${urlCheckId}${data.empId}`)
    .then((response) => {
      setOkIdCheck(response.data); // 중복되지 않을 때 true가 담김
      if (response.data === true) {
        sweetAlert2('가입 가능 합니다.', 'success');
        setSignupDataError({ ...data, valid_empId: '' });
        setOkIdCheck(true);
      } else {
        sweetAlert2('아이디가 이미 존재 합니다.', 'warning');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
///////////////////////////// 회원 가입시 유효한 이메일인지 확인하는 것
const urlCheckEmail = '/api/auth/sendemailforemail';
export const SendEmailForSignUpAPI = async (email, handleOpen, handleClose, setAuthNumberOpen) => {
  handleOpen();
  await axios
    .post(urlCheckEmail, {
      email: email,
    })
    .then((response) => {
      handleClose();
      sweetAlert2(response.data, 'success');
      setAuthNumberOpen(true);
    })
    .catch((error) => {
      handleClose();
      sweetAlert2(error.response.data.message, 'warning');
    });
};
/////////////////////////// 회원 가입시 이메일 인증번호 확인하는 것
const urlCheckAuth = '/api/auth/find/1';
export const CheckAuthForSignUpAPI = async (data, setOkEmailCheck, setSignupDataError) => {
  await axios
    .post(urlCheckAuth, {
      authenticationNumber: data.authenticationNumber,
      email: data.email,
    })
    .then((response) => {
      if (
        (response.data === '올바른 인증번호를 입력하세요.') |
        (response.data === '인증 번호가 3회이상 잘못 입력되었습니다. 재인증 바랍니다.')
      ) {
        sweetAlert2(response.data, 'warning');
      } else if (data.authenticationNumber == response.data) {
        sweetAlert2('인증에 성공하였습니다.', 'success');
        setOkEmailCheck(true);
        setSignupDataError({ ...data, valid_email: '' });
      }
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning');
    });
};
///////////////////////// 회원 가입시 unit 불러오기
const urlUnit = '/api/auth/getAllUnit';
export const getUnitAPI = (setUnit) => {
  axios.get(urlUnit).then((response) => {
    setUnit(response.data);
  });
};
//////////////////////// 회원 가입 버튼
const urlSignup = '/api/auth/signup';
export const signupAPI = (data, setSignupDataError) => {
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
        sweetAlertSuccess('가입 성공', 'success', '/login');
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
        sweetAlert2(error.response.data.message, 'warning');
        console.log(error);
      }
    });
};
