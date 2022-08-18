import axios from 'axios';

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
export function addBusinessTrip(business, file) {
  const url = '/api/business';
  const fd = new FormData();
  console.log(business);
  fd.append('businessTripDTO', new Blob([JSON.stringify(business)], { type: 'application/json' }));
  file ? fd.append('file', file) : fd.append('file', new Blob());
  axios
    .post(url, fd, { headers: { 'Content-Type': `multipart/form-data; ` } })
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
