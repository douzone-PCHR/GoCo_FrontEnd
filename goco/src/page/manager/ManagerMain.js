import React, { useEffect, useState } from 'react';
import CommuteCheck from '../../component/manager/CommuteCheck';
import Notice from '../../component/manager/Notice';
import RequestComponent from '../../component/manager/RequestComponent';
import CurrentStatus from '../../component/manager/CurrentStatus';
import { Grid } from '@mui/material';
import * as api from '../../api/index';
import moment from 'moment';
const ManagerMain = () => {
  const [currentStatus, setCurrentStatus] = useState([]);
  const [commuteCheckData, setCommuteCheckData] = useState({
    notWorking: 0,
    late: 0,
    attendance: 0,
    vacationAndBusinessTrip: 0,
  });
  const [getRequsetData, setRequsetData] = useState([]);
  let [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    myTeamAPI();
  }, []);
  const myTeamAPI = async () => {
    await api.getMyTeamCurrentStatus().then((response) => {
      setCurrentStatus(response.data);
    });
    await api.getRequestList().then((response) => {
      const filterData = response.data.filter(
        (data) =>
          moment(data.clock_in).format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')
      );
      setRequsetData(filterData);
    });
    await api.getNoticeList().then((response) => {
      setNoticeList(response.data);
    });

    await api.getCommuteCheck(setCommuteCheckData).then((response) => {
      let countA = 0;
      let countB = 0;
      let countC = 0;
      let countD = 0;
      response.data.forEach((element) => {
        switch (element.commuteStatus) {
          case '0':
            setCommuteCheckData({
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
          default:
            setCommuteCheckData({
              notWorking: 0,
              late: 0,
              attendance: 0,
              vacationAndBusinessTrip: 0,
            });
            break;
        }
      });
    });
  };
  return (
    currentStatus.length !== 0 && (
      <div style={{ margin: '0 20%', height: '100%' }}>
        <>
          <Grid container spacing={7} marginTop={1}>
            <Grid item xs={12} sm={6} style={{ backgroundColor: 'rgb(250,250,250)' }}>
              <CommuteCheck commuteCheckData={commuteCheckData} />
            </Grid>
            <Grid item xs={12} sm={6} style={{ backgroundColor: 'rgb(250,250,250)' }}>
              <RequestComponent getRequsetData={getRequsetData} />
            </Grid>
            <Grid item xs={12} sm={6} style={{ backgroundColor: 'rgb(250,250,250)' }}>
              <CurrentStatus currentStatus={currentStatus} />
            </Grid>
            <Grid item xs={12} sm={6} style={{ backgroundColor: 'rgb(250,250,250)' }}>
              <Notice noticeList={noticeList} />
            </Grid>
          </Grid>
        </>
      </div>
    )
  );
};

export default ManagerMain;
