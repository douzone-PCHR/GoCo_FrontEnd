import * as React from 'react';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; //달력
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; //달력
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; //달력

//import * as dayjs from 'dayjs';
import dayjs from 'dayjs';
export const Hiredate = ({ data, setData, setOkHiredateCheck }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          입사일
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="yyyy-MM-dd"
              label="입사일 지정"
              value={data.hiredate}
              onChange={(e) => {
                setOkHiredateCheck(true);
                setData({
                  ...data,
                  hiredate: dayjs(new Date(e)).format('YYYY-MM-DD'),
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
};
