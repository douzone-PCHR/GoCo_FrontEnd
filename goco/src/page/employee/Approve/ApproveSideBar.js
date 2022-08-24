import React, { useState } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function ApproveSideBar({ approveList, setState, setDateFilter }) {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const resetHandler = () => {
    setStartDate(today);
    setEndDate(today);
    setDateFilter();
  };
  console.log(startDate);
  console.log(approveList);
  return (
    <Box
      display="flex"
      minHeight="70vh"
      alignItems="center"
      marginTop="5%"
      marginRight="5%"
      border="solid black 1px"
      width="20%"
      justifyContent="space-around"
      flexDirection="column">
      <Box textAlign={'center'}>
        <Box maxHeight={'30%'}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={2}>
              <DesktopDatePicker
                label="시작일"
                inputFormat="yyyy/MM/dd"
                value={startDate}
                onChange={(newValue) => {
                  if (endDate < newValue) {
                    alert('시작일이 종료일 보다 큼');
                  } else {
                    setStartDate(moment(newValue).hours('00').minutes('00').seconds('00').format());
                  }
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
              <DesktopDatePicker
                label="종료일"
                inputFormat="yyyy/MM/dd"
                value={endDate}
                onChange={(newValue) => {
                  if (startDate > newValue) {
                    alert('종료일이 시작이보다 작음');
                  } else {
                    setEndDate(moment(newValue).hours('23').minutes('59').seconds('59').format());
                  }
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Stack>
          </LocalizationProvider>
          <Button size="small" onClick={resetHandler}>
            날짜 초기화
          </Button>
          <Button size="small" onClick={() => setDateFilter({ startDate, endDate })}>
            검색
          </Button>
        </Box>
        <Divider variant="middle" />
        <Typography
          id="sidebar-content"
          variant="button"
          gutterBottom
          component="div"
          justifyContent="space-between">
          대기 요청 수
          <Button>
            {approveList.filter((approve) => approve.approveYn === 'APPROVE_WAITTING').length}
          </Button>
        </Typography>

        <Typography
          id="sidebar-content"
          variant="button"
          gutterBottom
          component="div"
          justifyContent="space-between">
          승인 요청 수
          <Button>
            {approveList.filter((approve) => approve.approveYn === 'APPROVE_SUCCESS').length}
          </Button>
        </Typography>
        <Typography id="sidebar-content" variant="button" gutterBottom component="div">
          반려 요청 수
          <Button>
            {approveList.filter((approve) => approve.approveYn === 'APPROVE_REFUSE').length}
          </Button>
        </Typography>
        <Typography id="sidebar-content" variant="button" gutterBottom component="div">
          취소 요청 수
          <Button>
            {approveList.filter((approve) => approve.approveYn === 'APPROVE_CANCEL').length}
          </Button>
        </Typography>
        <Divider variant="middle" />
        <FormControl>
          <br></br>
          <FormLabel id="demo-radio-buttons-group-label">승인 상태별 요청</FormLabel>
          <RadioGroup
            onChange={(e) => setState(e.currentTarget.value)}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="ALL"
            name="radio-buttons-group">
            <FormControlLabel value="ALL" control={<Radio />} label="모든 요청" />
            <FormControlLabel value="APPROVE_WAITTING" control={<Radio />} label="대기중인 요청" />
            <FormControlLabel value="APPROVE_SUCCESS" control={<Radio />} label="승인 된 요청" />
            <FormControlLabel value="APPROVE_REFUSE" control={<Radio />} label="반려 된 요청" />
            <FormControlLabel value="APPROVE_CANCEL" control={<Radio />} label="취소 된 요청" />
          </RadioGroup>
        </FormControl>
        <div></div>
      </Box>
    </Box>
  );
}
