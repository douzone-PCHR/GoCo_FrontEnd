import axios from 'axios';

export const workGetData = async (setGetWorkList, getEmpId) => {
  const response = await axios.get(`http://localhost:8080/api/work/calendar?empId=${getEmpId}`, {
    headers: {
      'access-control-allow-origin': 'true',
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MTUxMjg2OTR9.1z0OmV0aP2brGlOlaSnntcFRkcailDkEHbbgsf60kLJX-kBwxfvs9494EhMNm2gwcvvKkXIohiuQq7thF68X_Q`,
    },
  });
  let data;

  if (response.data.length !== 0) {
    data = response.data.map((rowData) => ({
      id: rowData.workId,
      title: rowData.workTitle,
      start: rowData.workStartDate,
      end: rowData.workEndDate,
    }));
  } else {
    data = {
      id: 0,
      title: '',
      start: '',
      end: '',
    };
  }
  console.log(data);
  setGetWorkList(data);
};
