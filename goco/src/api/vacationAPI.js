import { SettingsSystemDaydreamTwoTone } from '@mui/icons-material';
import { EightMpOutlined } from '@mui/icons-material';
import axios from 'axios';
import { resultConfirm } from '../common/confirm';

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
export function addVacation(vacation, file, setOpen, setCheckOpen, setCheck, check) {
  const url = '/api/vacation';
  const fd = new FormData();
  fd.append('vacationDTO', new Blob([JSON.stringify(vacation)], { type: 'application/json' }));
  file ? fd.append('file', file) : fd.append('file', new Blob());
  axios
    .post(url, fd, { headers: { 'Content-Type': `multipart/form-data; ` } })
    .then((res) => {
      if (res.data.success.length === 0 && res.data.waitting.length === 0) {
        resultConfirm(
          '신청이 완료되었습니다',
          '결재대기중인 경우 삭제 할 수 있습니다.',
          'success',
          document.getElementById('modal')
        ).then(() => {
          setOpen(false);
          setCheck(!check);
        });
      } else {
        resultConfirm(
          '중복되는 신청일이 있습니다!',
          '삭제 후 다시 신청 해주십시오',
          'error',
          document.getElementById('modal')
        ).then(() => {
          setCheckOpen(true);
        });
      }
    })
    .catch((err) => console.log(err));
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

// check date
export function checkVacation(setCheckDate, vacation) {
  const url = 'api/vacation/check';
  axios
    .post(url, vacation)
    .then((response) => setCheckDate(response.data.waitting.concat(response.data.success)));
}

// check vacationCount
// /api/vacation/count/1?count=3
export function checkVacationCount(empNum, count, date, setDate) {
  const url = `api/vacation/count/${empNum}`;
  const today = new Date();
  axios
    .get(url)
    .then((response) => {
      if (response.data - count < 0) {
        resultConfirm(
          '잔여 휴가 일수를 확인하세요!!',
          `잔여 휴가 : ${response.data} 일`,
          'error',
          document.getElementById('modal')
        ).then();
        date.startDate = today;
        date.endDate = null;
      }
    })
    .catch((err) => console.log(err));
}
