import React, { useEffect, useState } from "react";
import CalendarComponent from "../../component/scheduleComponent/CalendarComponent";
import WorkTime from "../../component/scheduleComponent/WorkTime";
import WorkList from "../../component/scheduleComponent/WorkList";
import { Grid } from "@mui/material";
import { loginDefaultValue } from "../../api/work/workAPI";
import { workGetData } from "../../api/work/event-utils";

export default function Schedule() {
  const [loginEmp, setLoginEmp] = useState(14);
  const [getWorkList, setGetWorkList] = useState([
    { id: 0, title: "", start: "" },
  ]);

  useEffect(() => {
    loginDefaultValue(setLoginEmp);
    workGetData(setGetWorkList, loginEmp);
  }, [getWorkList]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <WorkTime />
      </Grid>
      <Grid item xs={7}>
        <CalendarComponent emp={loginEmp} workList={getWorkList} />
      </Grid>
      <Grid item xs={2}>
        <WorkList />
      </Grid>
    </Grid>
  );
}
