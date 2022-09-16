import React, { useEffect, useState } from 'react';
import CommuteCheck from '../../component/manager/CommuteCheck';
import Notice from '../../component/manager/Notice';
import RequestComponent from '../../component/manager/RequestComponent';
import CurrentStatus from '../../component/manager/CurrentStatus';
import { Box, Grid } from '@mui/material';
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
      console.log(response.data);
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
      <Box sx={{ height: '100%' }}>
        <>
          <Grid container spacing={6} marginTop={1}>
            <Grid
              item
              xs={10}
              sm={5}
              style={{
                paddingRight: '10%',
                marginLeft: '10%',
                // marginBottom: '3%',
                // backgroundColor: 'rgb(250,250,250)',
              }}>
              <CommuteCheck commuteCheckData={commuteCheckData} />
            </Grid>
            <Grid item xs={10} sm={5} style={{ paddingLeft: '3%' }}>
              <RequestComponent getRequsetData={getRequsetData} />
            </Grid>
            <Grid
              item
              xs={10}
              sm={5}
              style={{
                paddingRight: '10%',
                marginLeft: '10%',
                // backgroundColor: 'rgb(250,250,250)',
              }}>
              <CurrentStatus currentStatus={currentStatus} />
            </Grid>
            <Grid item xs={10} sm={5} style={{ paddingLeft: '3%' }}>
              <Notice noticeList={noticeList} />
            </Grid>
          </Grid>
        </>
      </Box>
    )
  );
};

export default ManagerMain;
