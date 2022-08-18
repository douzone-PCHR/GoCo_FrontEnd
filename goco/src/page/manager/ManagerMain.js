import React, { useEffect } from "react";
import CommuteCheck from "../../component/manager/CommuteCheck";
import Notice from "../../component/manager/Notice";
import RequestComponent from "../../component/manager/RequestComponent";
import CurrentStatus from "../../component/manager/CurrentStatus";
import { Grid } from "@mui/material";
const ManagerMain = () => {
  useEffect(() => {
    // loginDefaultValue(setLoginEmp);
  }, []);

  return (
    <div style={{ margin: "0 20%", height: "100%" }}>
      {/* <Grid container spacing={16}>
        <Grid item xs={12}>
          <CommuteCheck />
          <CurrentStatus />
          <RequestComponent />
          <Notice />
        </Grid>
      </Grid> */}
      <>
        <Grid container spacing={7} marginTop={1}>
          <Grid item xs={12} sm={6}>
            <CommuteCheck />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RequestComponent />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CurrentStatus />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Notice />
          </Grid>
        </Grid>
      </>
    </div>
  );
};

export default ManagerMain;
