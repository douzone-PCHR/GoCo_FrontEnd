import axios from 'axios';
import { resultConfirm } from '../common/confirm';

// 출장 전체 리스트
export function getBusinessTrip(setData, empNum) {
  const url = `/api/businesslist/${empNum}`;
  axios.get(url).then((response) => {
    setData(response.data);
  });
}

// 출장 결재 리스트
export function approveBusinessTripList(setData, unitId) {
  const url = `/api/businesslist/approve/${unitId}`;
  axios
    .get(url)
    .then((response) => setData(response.data))
    .catch((err) => console.log(err));
}

// 출장 등록
export function addBusinessTrip(business, file, setOpen, setCheckOpen, setCheck, check) {
  const url = '/api/business';
  const fd = new FormData();
  fd.append('businessTripDTO', new Blob([JSON.stringify(business)], { type: 'application/json' }));
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
          '',
          'error',
          document.getElementById('modal')
        ).then(() => {
          setCheckOpen(true);
          // setCheckDate(res.data.waitting.concat(res.data.success));
        });
      }
    })
    .catch((err) => console.log(err));
}

// 출장 결재
export function approveBusinessTrip(business, check, setCheck) {
  console.log(business);
  const url = '/api/business/approve';
  axios
    .put(url, business)
    .then(() => setCheck(!check))
    .catch((err) => console.log(err));
}

// 출장 취소
export function deleteBusinessTrip(business, check, setCheck) {
  const url = '/api/business/del';
  axios
    .post(url, business)
    .then(() => setCheck(!check))
    .catch((err) => console.log(err));
}

// check date
export function checkBusiness(setCheckDate, business) {
  const url = 'api/business/check';
  axios
    .post(url, business)
    .then((response) => setCheckDate(response.data.waitting.concat(response.data.success)));
}
