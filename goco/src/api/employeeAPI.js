import axios from 'axios';
import { getCookie } from './authAPI';

const url = 'http://localhost:8080/';
export const employee = () => {
  axios.get();
};
export const updateEmpAPI = async (type, updateValue, setResult) => {
  let updateType = null;

  switch (type.type) {
    case '부서':
      updateType = 1;
      break;
    case '직책':
      updateType = 2;
      break;
    case '직급':
      updateType = 3;
      break;
  }
  return await axios
    .put(`${url}api/admin/emp/jobtitle/${type.empInfo.id}/${updateType}/${updateValue}`)
    .then((response) => {
      return response.data;
    });
};

//////회원 정보확인 userMe
const urlUserMe = '/api/user/me';
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

//매니저 조회
export const getManager = (unitId, setManager) => {
  axios.get(`/api/admin/findmanager/${unitId}`).then((response) => {
    setManager(response.data);
  });
};

//모든 유저 조회
export const getEmp = (setEmp, setmgrNum) => {
  axios
    .get('/api/admin/findAll')
    .then((response) => {
      setEmp(response.data);
      setmgrNum && setmgrNum(response.data[0].empNum);
    })
    .catch((error) => {
      console.log(error);
    });
};

// 재직자 삭제(퇴사처리)
export const deleteAdminEmpAPI = async (id) => {
  return await axios.delete(`/api/admin/delete/${id}`).then((response) => {
    return response.data;
  });
};

// 퇴사자 조회
export const getResignationAPI = async (setResignation) => {
  axios.get(`/api/admin/ResignationAll`).then((response) => {
    setResignation(response.data);
  });
};
