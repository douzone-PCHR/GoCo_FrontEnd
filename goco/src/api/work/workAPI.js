import axios from 'axios';
import moment from 'moment';
import { sweetAlert2, sweetAlertSuccess } from '../../component/auth/AuthSweetAlert.js/sweetAlert2';
import { getCookie } from '../authAPI';

export const workGetData = async (setGetWorkList, getEmpId, user) => {
  const response = await axios.get(`api/user/work/calendar?empId=${getEmpId}`, {
    headers: {
      'access-control-allow-origin': 'true',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
  });

  let data;

  // backgroundColor: "rgb(0, 185, 186)",
  console.log(response.data);
  if (response.data.length !== 0) {
    // if () {

    // }
    //     사내업무 0
    // 개인업무 1
    // 출장 4
    // 휴가 3
    // rgb(250,190,174)
    // rgb(155,200,160)
    // rgb(145,200,250)
    // rgb(250,200,140)

    data = response.data.map((rowData) => {
      if (rowData.workType === 0) {
        //  사내업무 0
        return {
          id: rowData.id,
          title: rowData.title,
          start: rowData.start,
          end: rowData.end,
          backgroundColor: 'rgb(250,190,174)',
          textColor: 'black',
        };
      } else if (rowData.workType === 1) {
        return {
          id: rowData.id,
          title: rowData.title,
          start: rowData.start,
          end: rowData.end,
          backgroundColor: 'rgb(155,200,160)',
          textColor: 'black',
        };
      } else if (rowData.workType === 3) {
        return {
          id: rowData.id,
          title: rowData.title,
          start: rowData.start,
          end: rowData.end,
          backgroundColor: 'rgb(145,200,250)',
          textColor: 'black',
        };
      } else if (rowData.workType === 4) {
        return {
          id: rowData.id,
          title: rowData.title,
          start: rowData.start,
          end: rowData.end,
          backgroundColor: 'rgb(250,200,140)',
          textColor: 'black',
        };
      }
    });
  } else {
    data = {
      id: 0,
      title: '',
      start: '',
      end: '',
    };
  }

  setGetWorkList(data);
};

export const getWorkListData = async (privateSetData, publicSetData) => {
  await axios
    .get('/api/user/work', {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
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
    .get(`/api/user/commute/time`, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
    .then((response) => {
      setCommuteTimeData(response.data);
    });
};

export const getEmployeeList = async (setEmp) => {
  await axios
    .get('/api/user/work/emplist', {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
    .then((response) => {
      setEmp(response.data);
    });
};

export const loginDefaultValue = async (setLoginEmp) => {
  await axios
    .get('/api/user/me', {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
    .then((response) => {
      setLoginEmp(response.data);
    });
};

export const headerData = async (setStatusData) => {
  await axios
    .get('/api/user/menu/commute', {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
    .then((response) => {
      setStatusData(response.data);
    });
};

export const dateWorkList = async (requestDate, setDetailList, getEmpId) => {
  await axios
    .post(
      `/api/user/work/detail?empId=${getEmpId}`,
      {
        workStartDate: new Date(moment(requestDate).format('YYYY-MM-DD')),
        employee: {
          empId: getEmpId,
        },
      },
      {
        headers: {
          'access-control-allow-origin': 'true',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      setDetailList(response.data);
    });
};

export const dialogDetailList = async (workId, setDetailWorkList, workType) => {
  if (workType !== 3 || workType !== 4) {
    await axios
      .get(`/api/user/work/${workId}`, {
        headers: {
          'access-control-allow-origin': 'true',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((response) => {
        setDetailWorkList(response.data);
      });
  }
};

export const addWork = async (workData) => {
  await axios
    .post(`/api/user/work`, workData, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
    .then((response) => {
      if (response.data) {
        window.location.replace('/goco');
      } else {
        alert('등록이 안되었습니다.');
      }
    });
};

export const updateWork = async (workData) => {
  await axios
    .put(`/api/user/work`, workData, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
    .then((response) => {
      if (response.data) {
        window.location.replace('/goco');
      } else {
        alert('수정이 실패 했습니다.');
      }
    });
};

export const deleteWork = async (workId) => {
  await axios
    .delete(`/api/user/work/${workId}`, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
    .then((response) => {
      if (response.data) {
        window.location.replace('/goco');
      } else {
        alert('삭제가 실패 했습니다.');
      }
    });
};

export const commuteUpdate = async (work) => {
  await axios
    .put(`/api/user/commute`, work, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
    .then((response) => {
      if (response.data.status === 'ALREADY_DONE') {
        sweetAlertSuccess(response.data.message, 'error', '/goco');
      } else if (response.data.status === 'OK') {
        sweetAlertSuccess(response.data.message, 'success', '/goco');
      }
    });
};
