import axios from 'axios';
import moment from 'moment';
import { sweetAlert2, sweetAlertSuccess } from '../../component/auth/AuthSweetAlert.js/sweetAlert2';
import { getCookie } from '../authAPI';

export const workGetData = async (setGetWorkList, getEmpId, user) => {
  const response = await axios.get(
    `http://localhost:8080/api/user/work/calendar?empId=${getEmpId}`,
    {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    }
  );
  let data;

  // backgroundColor: "rgb(0, 185, 186)",
  if (response.data.length !== 0) {


  


    data = response.data.map((rowData) => {
      if (rowData.workType === 0) { //  사내업무 0
        return {
          id: rowData.id,
          title: rowData.title,
          start: rowData.start,
          end: rowData.end,
          backgroundColor: "rgb(250,190,174)",
          textColor: "black"
        };
      } else if (rowData.workType === 1){ // 개인업무 1
        return {
          id: rowData.id,
          title: rowData.title,
          start: rowData.start,
          end: rowData.end,
          backgroundColor: "rgb(155,200,160)",
          textColor: "black"
        };
      }else if (rowData.workType === 3){ // 휴가 3
        return {
          id: rowData.id,
          title: rowData.title,
          start: rowData.start,
          end: rowData.end,
          backgroundColor: "rgb(145,200,250)",
          textColor: "black"
        };
      }else if (rowData.workType === 4){ // 출장 4  
        return {
          id: rowData.id,
          title: rowData.title,
          start: rowData.start,
          end: rowData.end,
          backgroundColor: "rgb(250,200,140)",
          textColor: "black"
        };
      }
    })
  }else {
      data = {
        id: 0,
        title: '',
        start: '',
        end: '',
      };
    }
 

  setGetWorkList(data);
};


export const addWork = async (workData,setAddOpen,setOpenInsert) => {
  await axios
    .post(`http://localhost:8080/api/user/work`, workData, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
    .then((response) => {
      setAddOpen(false);
      setOpenInsert(false);
      if (response.data.status === 'OK') {
        sweetAlertSuccess(response.data.message, 'success', '/goco')
      } else {
        sweetAlertSuccess(response.data.message, 'error', '/goco');
      }
    });
};

export const updateWork = async (workData,setSecondOpen , setOpenInsert) => {
  await axios
    .put(`http://localhost:8080/api/user/work`, workData, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
    .then((response) => {
     
    
    });
};

export const deleteWork = async (workId,setSecondOpen , setOpenInsert) => {
  await axios
    .delete(`http://localhost:8080/api/user/work/${workId}`, {
      headers: {
        'access-control-allow-origin': 'true',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
    .then((response) => {
   
    });
};

export const commuteUpdate = async (work) => {
  await axios
    .put(`http://localhost:8080/api/user/commute`, work, {
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
