import axios from 'axios';
import { getCookie, deleteCookie } from './authAPI';

const url = 'http://localhost:8080/';
export const employee = () => {
  axios.get();
};

export const updateEmp = (data) => {
  axios.put(`/api/admin/emp/${data.empNum}`, data).then((response) => {});
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
        deleteCookie(); //쿠키삭제
        window.location.href = '/login';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
////회원 비번 변경
const urlPwdChange = 'http://localhost:8080/api/user/changePwd';
export const pwdChangeAPI = async (textData) => {
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
        console.log('변경 성공');
        window.location.href = '/userupdate';
      } else {
        console.log('변경 실패');
      }
    })
    .catch((error) => {
      console.log(error.response.data.message); // 로그인 시간지낫거나, 토큰이 잘못됫을 꼉우
    });
};

// 회원 이메일 변경
const urlChangeEmail = 'http://localhost:8080/api/user/changeEmail';
export const changeEmailAPI = async (textData) => {
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
        console.log('변경 성공');
        window.location.href = '/userupdate';
      } else {
        console.log('변경 실패');
      }
    })
    .catch((error) => {
      console.log(error.response.data.message); // 로그인 시간지낫거나, 토큰이 잘못됫을 꼉우
    });
};
// 회원 번호 변경
const urlChangePhoneNumber = 'http://localhost:8080/api/user/changePhone';
export const changePhoneNumberAPI = async (textData) => {
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
        console.log('변경 성공');
        window.location.href = '/userupdate';
      } else {
        console.log('변경 실패');
      }
    })
    .catch((error) => {
      console.log(error.response.data.message); // 로그인 시간지낫거나, 토큰이 잘못됫을 꼉우
    });
};
