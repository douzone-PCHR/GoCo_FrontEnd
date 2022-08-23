import axios from 'axios';

export const getWorkListData = async (privateSetData, publicSetData) => {
  await axios
    .get('http://localhost:8080/api/work', {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MTUxMjg2OTR9.1z0OmV0aP2brGlOlaSnntcFRkcailDkEHbbgsf60kLJX-kBwxfvs9494EhMNm2gwcvvKkXIohiuQq7thF68X_Q`,
      },
    })
    .then((response) => {
      let privatedata = response.data.filter(
        (work) => work.workStartDate === null && work.workEndDate === null && work.workType === true
      );
      let publicdata = response.data.filter(
        (work) =>
          work.workStartDate === null && work.workEndDate === null && work.workType === false
      );
      privateSetData(privatedata);
      publicSetData(publicdata);
    });
};

export const commuteTime = async (setCommuteTimeData) => {
  await axios
    .get(`http://localhost:8080/api/commute/time`, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MTUxMjg2OTR9.1z0OmV0aP2brGlOlaSnntcFRkcailDkEHbbgsf60kLJX-kBwxfvs9494EhMNm2gwcvvKkXIohiuQq7thF68X_Q`,
      },
    })
    .then((response) => {
      setCommuteTimeData(response.data);
    });
};

export const getEmployeeList = async (setEmp) => {
  await axios
    .get('http://localhost:8080/api/work/emplist', {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MTUxMjg2OTR9.1z0OmV0aP2brGlOlaSnntcFRkcailDkEHbbgsf60kLJX-kBwxfvs9494EhMNm2gwcvvKkXIohiuQq7thF68X_Q`,
      },
    })
    .then((response) => {
      setEmp(response.data);
    });
};

export const loginDefaultValue = async (setLoginEmp) => {
  await axios
    .get('http://localhost:8080/api/user/me', {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MTUxMjg2OTR9.1z0OmV0aP2brGlOlaSnntcFRkcailDkEHbbgsf60kLJX-kBwxfvs9494EhMNm2gwcvvKkXIohiuQq7thF68X_Q`,
      },
    })
    .then((response) => {
      setLoginEmp(response.data);
    });
};

export const dateWorkList = async (requestDate, setDetailList) => {
  await axios
    .post('http://localhost:8080/api/work/detail', new Date(requestDate), {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MTUxMjg2OTR9.1z0OmV0aP2brGlOlaSnntcFRkcailDkEHbbgsf60kLJX-kBwxfvs9494EhMNm2gwcvvKkXIohiuQq7thF68X_Q`,
      },
    })
    .then((response) => {
      setDetailList(response.data);
    });
};

export const dialogDetailList = async (workId, setDetailWorkList) => {
  await axios
    .get(`http://localhost:8080/api/work/${workId}`, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MTUxMjg2OTR9.1z0OmV0aP2brGlOlaSnntcFRkcailDkEHbbgsf60kLJX-kBwxfvs9494EhMNm2gwcvvKkXIohiuQq7thF68X_Q`,
      },
    })
    .then((response) => {
      setDetailWorkList(response.data);
    });
};

export const addWork = async (workData) => {
  console.log(workData);
  await axios
    .post(`http://localhost:8080/api/work`, workData, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MTUxMjg2OTR9.1z0OmV0aP2brGlOlaSnntcFRkcailDkEHbbgsf60kLJX-kBwxfvs9494EhMNm2gwcvvKkXIohiuQq7thF68X_Q`,
      },
    })
    .then((response) => {
      console.log(response);
    });
};
