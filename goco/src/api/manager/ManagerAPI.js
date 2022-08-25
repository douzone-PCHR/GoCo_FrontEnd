import axios from 'axios';

// export const getCurrentStatus = async (setCurrentStatus) => {
//   await axios
//     .get('http://localhost:8080/api/commute/myteam', {
//       // .get("http://localhost:8080/api/commute/status", {
//       headers: {
//         'access-control-allow-origin': 'true',
//         Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjIyMDA3ODMxMDZ9.NAfhWRU0X9rxVHFhRgJEG1XkC_3XepvQwuNWo9PnzQZMWR5bSauX5XGngSw-KnY3FxNbNjyDkL7QeWcKIUw_bA`,
//       },
//     })
//     .then((response) => {
//       setCurrentStatus(response.data);
//     });
// };

export const getMyTeamCurrentStatus = async (setCurrentStatus) => {
  await axios
    .get('http://localhost:8080/api/manager/commute/myteam', {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjIyMDA3ODMxMDZ9.NAfhWRU0X9rxVHFhRgJEG1XkC_3XepvQwuNWo9PnzQZMWR5bSauX5XGngSw-KnY3FxNbNjyDkL7QeWcKIUw_bA`,
      },
    })
    .then((response) => {
      setCurrentStatus(response.data);
    });
};

export const getCommuteCheck = async (setCommuteCheckData) => {
  await axios
    .get('http://localhost:8080/api/manager/commute', {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjIyMDA3ODMxMDZ9.NAfhWRU0X9rxVHFhRgJEG1XkC_3XepvQwuNWo9PnzQZMWR5bSauX5XGngSw-KnY3FxNbNjyDkL7QeWcKIUw_bA`,
      },
    })
    .then((response) => {
      let countA = 0;
      let countB = 0;
      let countC = 0;
      let countD = 0;
      response.data.forEach((element) => {
        // console.log(element);
        switch (element.commuteStatus) {
          case '0':
            setCommuteCheckData({
              // notWorking: (countA = countA + 1),
              notWorking: ++countA,
              late: countB,
              attendance: countC,
              vacationAndBusinessTrip: countD,
            });

            break;
          case '1':
            setCommuteCheckData({
              notWorking: countA,
              late: ++countB,
              attendance: countC,
              vacationAndBusinessTrip: countD,
            });

            break;
          case '2':
            setCommuteCheckData({
              notWorking: countA,
              late: countB,
              attendance: ++countC,
              vacationAndBusinessTrip: countD,
            });

            break;
          case '3':
            setCommuteCheckData({
              notWorking: countA,
              late: countB,
              attendance: countC,
              vacationAndBusinessTrip: ++countD,
            });

            break;
        }
      });
    });
};

export const getRequestList = async (setData) => {
  await axios
    .get(`http://localhost:8080/api/manager/vacation/list`, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjIyMDA3ODMxMDZ9.NAfhWRU0X9rxVHFhRgJEG1XkC_3XepvQwuNWo9PnzQZMWR5bSauX5XGngSw-KnY3FxNbNjyDkL7QeWcKIUw_bA`,
      },
    })
    .then((response) => {
      setData(response.data);
    });
};

export const getNoticeList = async (setPageList) => {
  await axios
    .get('http://localhost:8080/api/user/board/notice', {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjIyMDA3ODMxMDZ9.NAfhWRU0X9rxVHFhRgJEG1XkC_3XepvQwuNWo9PnzQZMWR5bSauX5XGngSw-KnY3FxNbNjyDkL7QeWcKIUw_bA`,
      },
    })
    .then((response) => {
      setPageList(response.data);
    });
};
