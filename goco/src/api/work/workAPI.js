import axios from 'axios';

export const getWorkListData = async (privateSetData, publicSetData) => {
  await axios
    .get('http://localhost:8080/api/work', {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NjA5MjU1MzZ9.gfh5KH_Ca3R_rUO8paWtGFsT-eEloHr2l74VUxh7TqKPtYUEUd4yW8iUEOxFVFx9-WMf7uyR4VWqK28roDTkYw`,
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
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NjA5MjU1MzZ9.gfh5KH_Ca3R_rUO8paWtGFsT-eEloHr2l74VUxh7TqKPtYUEUd4yW8iUEOxFVFx9-WMf7uyR4VWqK28roDTkYw`,
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
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NjA5MjU1MzZ9.gfh5KH_Ca3R_rUO8paWtGFsT-eEloHr2l74VUxh7TqKPtYUEUd4yW8iUEOxFVFx9-WMf7uyR4VWqK28roDTkYw`,
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
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NjA5MjU1MzZ9.gfh5KH_Ca3R_rUO8paWtGFsT-eEloHr2l74VUxh7TqKPtYUEUd4yW8iUEOxFVFx9-WMf7uyR4VWqK28roDTkYw`,
      },
    })
    .then((response) => {
      setLoginEmp(response.data);
    });
};
