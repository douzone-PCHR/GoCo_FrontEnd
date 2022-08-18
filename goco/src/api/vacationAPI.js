import { SettingsSystemDaydreamTwoTone } from '@mui/icons-material';
import { EightMpOutlined } from '@mui/icons-material';
import axios from 'axios';

// 휴가 전체 리스트
export function getVacations(setData, empNum) {
  const url = `/api/vacations/${empNum}`;
  axios.get(url).then((response) => {
    setData(response.data);
  });
  // .catch((error) => console.log(error));
}

// 휴가 결재 리스트
export function approveVacationList(setData, unitId) {
  const url = `/api/vacations/approve/${unitId}`;
  axios
    .get(url)
    .then((response) => setData(response.data))
    .catch((error) => console.log(error));
}

// 휴가 추가
export function addVacation(vacation) {
  const url = '/api/vacation';
  axios
    .post(url, vacation)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log(error));
}

// 휴가 결재
export function approveVacation(vacation, check, setCheck) {
  console.log(vacation);
  const url = '/api/vacation/approve';
  axios
    .put(url, vacation)
    .then(() => setCheck(!check))
    .catch((err) => console.log(err));
}

// 휴가 삭제
export const deleteVacation = (vacation, check, setCheck) => {
  const url = '/api/vacation/del';
  console.log(vacation);
  axios
    .post(url, vacation)
    .then(() => setCheck(!check))
    .catch((err) => console.log(err));
};
