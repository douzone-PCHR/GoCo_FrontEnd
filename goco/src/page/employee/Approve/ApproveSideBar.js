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
import { resultConfirm } from '../../../common/confirm';

export default function ApproveSideBar({
  approveList,
  setState,
  setDateFilter,
  dateFilter,
  setPage,
}) {
  const today = new Date();
  const [startDate, setStartDate] = useState(
    moment(today).hours('00').minutes('00').seconds('00').format()
  );
  const [endDate, setEndDate] = useState(
    moment(today).hours('23').minutes('59').seconds('59').format()
  );
  const resetHandler = () => {
    setStartDate(moment(today).hours('00').minutes('00').seconds('00').format());
    setEndDate(moment(today).hours('23').minutes('59').seconds('59').format());
    setDateFilter();
  };
  //   console.log(startDate);
  //   console.log(endDate);
  //   console.log(approveList);
  return (
    <Box
      display="flex"
      position="sticky"
      minHeight="75vh"
      alignItems="center"
      marginTop="2%"
      marginRight="5%"
      border="solid black 1px"
      width="23%"
      justifyContent="space-around"
      flexDirection="column">
      <Box textAlign={'center'}>
        <Box maxHeight={'30%'}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={2}>
              <Typography>신청일자검색</Typography>
              <DesktopDatePicker
                label="시작일"
                inputFormat="yyyy/MM/dd"
                value={startDate}
                onChange={(newValue) => {
                  if (endDate) {
                    if (endDate < moment(newValue).format()) {
                      resultConfirm('날짜를 확인 해주세요', '시작일이 종료일보다 큽니다', 'error');
                    } else {
                      setStartDate(
                        moment(newValue).hours('00').minutes('00').seconds('00').format()
                      );
                    }
                  }
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
              <DesktopDatePicker
                label="종료일"
                inputFormat="yyyy/MM/dd"
                value={endDate}
                onChange={(newValue) => {
                  if (startDate) {
                    if (startDate > moment(newValue).format()) {
                      resultConfirm(
                        '날짜를 확인 해주세요',
                        '종료일이 시작일보다 작습니다',
                        'error'
                      );
                    } else {
                      setEndDate(moment(newValue).hours('23').minutes('59').seconds('59').format());
                    }
                  }
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Stack>
          </LocalizationProvider>
          <Button size="small" onClick={resetHandler}>
            날짜 초기화
          </Button>
          <Button
            size="small"
            onClick={() => {
              setPage(0);
              setDateFilter({ startDate, endDate });
            }}>
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
            {
              approveList.filter((approve) =>
                dateFilter
                  ? approve.approveYn === 'APPROVE_WAITTING' &&
                    startDate <= approve.vacationRequestDate &&
                    approve.vacationRequestDate <= endDate
                  : approve.approveYn === 'APPROVE_WAITTING'
              ).length
            }
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
            {
              approveList.filter((approve) =>
                dateFilter
                  ? approve.approveYn === 'APPROVE_SUCCESS' &&
                    startDate <= approve.vacationRequestDate &&
                    approve.vacationRequestDate <= endDate
                  : approve.approveYn === 'APPROVE_SUCCESS'
              ).length
            }
          </Button>
        </Typography>
        <Typography id="sidebar-content" variant="button" gutterBottom component="div">
          반려 요청 수
          <Button>
            {
              approveList.filter((approve) =>
                dateFilter
                  ? approve.approveYn === 'APPROVE_REFUSE' &&
                    startDate <= approve.vacationRequestDate &&
                    approve.vacationRequestDate <= endDate
                  : approve.approveYn === 'APPROVE_REFUSE'
              ).length
            }
          </Button>
        </Typography>
        <Typography id="sidebar-content" variant="button" gutterBottom component="div">
          취소 요청 수
          <Button>
            {
              approveList.filter((approve) =>
                dateFilter
                  ? approve.approveYn === 'APPROVE_CANCEL' &&
                    startDate <= approve.vacationRequestDate &&
                    approve.vacationRequestDate <= endDate
                  : approve.approveYn === 'APPROVE_CANCEL'
              ).length
            }
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
