import React, { useEffect, useState } from 'react';
import CalendarComponent from '../../component/scheduleComponent/CalendarComponent';
import WorkTime from '../../component/scheduleComponent/WorkTime';
import WorkList from '../../component/scheduleComponent/WorkList';
import { Grid } from '@mui/material';
import { getEmployeeList, loginDefaultValue } from '../../api/work/workAPI';

export default function Schedule() {
  const [loginEmp, setLoginEmp] = useState(0);
  const [getEmp, setEmp] = useState([]);

  useEffect(() => {
    loginDefaultValue(setLoginEmp);
    getEmployeeList(setEmp);
  }, []);

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={2} margin="50px 50px">
        <WorkTime />
      </Grid>
      <Grid item container direction="column" xs spacing={2} marginRight="40px">
        <Grid item xs={8}>
          {loginEmp.empId !== undefined && getEmp.length !== 0 && (
            <CalendarComponent user={loginEmp} empList={getEmp} />
          )}
        </Grid>
      </Grid>
      <Grid item xs={2} marginRight="30px" marginTop="50px">
        <WorkList />
      </Grid>
    </Grid>
  );
}
