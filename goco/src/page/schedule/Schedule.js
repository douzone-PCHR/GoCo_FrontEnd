import React, { useEffect, useState } from 'react';
import CalendarComponent from '../../component/scheduleComponent/CalendarComponent';
import WorkTime from '../../component/scheduleComponent/WorkTime';
import WorkList from '../../component/scheduleComponent/WorkList';
import { Grid } from '@mui/material';
import * as api from '../../api/index';

export default function Schedule() {
  const [loginEmp, setLoginEmp] = useState(0);
  const [getEmp, setEmp] = useState([]);
  const [commuteTimeData, setCommuteTimeData] = useState([]);
  const [privateData, privateSetData] = useState();
  const [publicData, publicSetData] = useState();
  useEffect(() => {
    scheduleAPI();
  }, []);
  const scheduleAPI = async () => {
    // 직원 목록
    await api.getEmployeeList().then((response) => {
      setEmp(response.data);
    });
    // 로그인의 기본값
    await api.loginDefaultValue().then((response) => {
      setLoginEmp(response.data);
    });
    // 이번주 소정 근로시간
    await api.commuteTime().then((response) => {
      setCommuteTimeData(response.data);
    });

    await api.getWorkListData().then((response) => {
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
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={2} margin="50px 50px">
        <WorkTime commuteTimeData={commuteTimeData} />
      </Grid>
      <Grid item container direction="column" xs spacing={2} marginRight="40px">
        <Grid item xs={8}>
          {loginEmp.empId !== undefined && getEmp.length !== 0 && (
            <CalendarComponent user={loginEmp} empList={getEmp} />
          )}
        </Grid>
      </Grid>
      <Grid item xs={2} marginRight="30px" marginTop="50px">
        <WorkList privateData={privateData} publicData={publicData} />
      </Grid>
    </Grid>
  );
}
