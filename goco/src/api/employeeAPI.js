import axios from 'axios';
import { getCookie, deleteCookie } from './authAPI';
import { sweetAlert2, sweetAlertSuccess } from '../component/auth/AuthSweetAlert.js/sweetAlert2';
const url = 'http://localhost:8080/';
export const employee = () => {
  axios.get();
};

export const updateEmpAPI = async (empId, updateValue) => {
  const data = {
    jobTitle: {
      jobTitleId: updateValue.jobTitle,
    },
    teamPosition: {
      teamPositionId: updateValue.teamPosition || 2,
    },
    unit: {
      unitId: updateValue.team,
    },
  };
  return await axios.put(`/api/admin/emp/${empId}`, data).then((response) => {
    return response.data;
  });
};

//////회원 정보수정 userMe
const urlUserMe = 'http://localhost:8080/api/user/me';
export const userMeAPI = async (setData) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    url: urlUserMe,
  };
  await axios(options).then((response) => {
    setData(response.data);
  });
};

////// 회원 삭제
const urlDeleteEmp = 'http://localhost:8080/api/user/delete';
export const deleteEmpAPI = async () => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    url: urlDeleteEmp,
  };
  await axios(options)
    .then((response) => {
      if (response.data) {
        sweetAlertSuccess('탈퇴 성공', 'success', '/login');
        deleteCookie(); //쿠키삭제
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
////회원 비번 변경
const urlPwdChange = 'http://localhost:8080/api/user/changePwd';
export const pwdChangeAPI = async (textData) => {
  console.log('textData.password1 : ', textData.password1);
  const text = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=*()]).*$/;
  if (
    (textData.password1 === '') |
    (textData.password1 === undefined) |
    !text.test(textData.password1)
  ) {
    sweetAlert2('비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.', 'warning');
    return;
  }
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    data: {
      password: textData.password1,
      password2: textData.password2,
    },
    url: urlPwdChange,
  };
  await axios(options)
    .then((response) => {
      if (response.data === 1) {
        sweetAlertSuccess('변경 성공', 'success', '/userupdate');
      } else {
        sweetAlert2('변경 실패', 'warning');
      }
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning'); // 로그인 시간지낫거나, 토큰이 잘못됫을 꼉우
    });
};

// 회원 이메일 변경
const urlChangeEmail = 'http://localhost:8080/api/user/changeEmail';
export const changeEmailAPI = async (textData) => {
  const text =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if ((textData.email === '') | (textData.email === undefined) | !text.test(textData.email)) {
    sweetAlert2('이메일 형식이 올바르지 않습니다.', 'warning');
    return;
  }
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    data: {
      email: textData.email,
    },
    url: urlChangeEmail,
  };
  await axios(options)
    .then((response) => {
      if (response.data === 1) {
        sweetAlertSuccess('변경 성공', 'success', '/userupdate');
      } else {
        sweetAlert2('변경 실패', 'warning');
      }
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning'); // 로그인 시간지낫거나, 토큰이 잘못됫을 꼉우
    });
};
// 회원 번호 변경
const urlChangePhoneNumber = 'http://localhost:8080/api/user/changePhone';
export const changePhoneNumberAPI = async (textData) => {
  const text = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
  if (
    (textData.phoneNumber === '') |
    (textData.phoneNumber === undefined) |
    !text.test(textData.phoneNumber)
  ) {
    sweetAlert2('핸드폰 번호 형식이 올바르지 않습니다.(10~11자리 입력)', 'warning');
    return;
  }
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    data: {
      phoneNumber: textData.phoneNumber,
    },
    url: urlChangePhoneNumber,
  };
  await axios(options)
    .then((response) => {
      if (response.data === 1) {
        sweetAlertSuccess('변경 성공', 'success', '/userupdate');
      } else {
        sweetAlert2('변경 실패', 'warning');
      }
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning'); // 로그인 시간지낫거나, 토큰이 잘못됫을 꼉우
    });
};

export const getManager = (unitId, setManager) => {
  axios.get(`http://localhost:8080/api/admin/findmanager/${unitId}`).then((response) => {
    setManager(response.data);
  });
};

//모든 유저
export const getEmp = (setEmp, setmgrNum) => {
  axios
    .get('http://localhost:8080/api/admin/findAll')
    .then((response) => {
      setEmp(response.data);
      setmgrNum && setmgrNum(response.data[0].empNum);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteAdminEmpAPI = async (id) => {
  return await axios.delete(`http://localhost:8080/api/admin/delete/${id}`).then((response) => {
    return response.data;
  });
};

export const getResignationAPI = async (setResignation) => {
  axios.get(`http://localhost:8080/api/admin/ResignationAll`).then((response) => {
    setResignation(response.data);
  });
};
