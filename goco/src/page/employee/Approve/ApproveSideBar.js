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
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { resultConfirm } from '../../../common/confirm';
import style from '../../../CSS/approve.module.css';
import { Restore, Search } from '@mui/icons-material';

export default function ApproveSideBar({
  approveList,
  setState,
  setDateFilter,
  dateFilter,
  setPage,
  selectMember,
  type,
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
  return (
    <Box className={style.sidebar_container}>
      <Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={2}>
              <Typography className={style.title}>신청일자검색</Typography>
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
          <Box className={style.filter}>
            <Button size="medium" onClick={resetHandler}>
              <Restore fontSize="medium" /> 날짜 초기화
            </Button>
            <Button
              size="medium"
              onClick={() => {
                setPage(0);
                setDateFilter({ startDate, endDate });
              }}>
              <Search fontSize="medium" /> 검색
            </Button>
          </Box>
        </Box>
        <Typography
          id="sidebar-content"
          variant="button"
          gutterBottom
          component="div"
          marginTop="1vh">
          대기 요청 수
          <Chip
            size="small"
            sx={{ borderRadius: 2, marginLeft: '2vw' }}
            color="primary"
            label={
              approveList.filter((approve) => {
                if (
                  type === '휴가' &&
                  (selectMember === approve.employee.name ||
                    selectMember === '전체보기' ||
                    !selectMember)
                ) {
                  return dateFilter
                    ? approve.approveYn === 'APPROVE_WAITTING' &&
                        startDate <= approve.vacationRequestDate &&
                        approve.vacationRequestDate <= endDate
                    : approve.approveYn === 'APPROVE_WAITTING';
                } else if (
                  selectMember === approve.employee.name ||
                  selectMember === '전체보기' ||
                  !selectMember
                ) {
                  return dateFilter
                    ? approve.approveYn === 'APPROVE_WAITTING' &&
                        startDate <= approve.businessTripRequestDate &&
                        approve.businessTripRequestDate <= endDate
                    : approve.approveYn === 'APPROVE_WAITTING';
                }
                return null;
              }).length
            }></Chip>
        </Typography>

        <Typography
          id="sidebar-content"
          variant="button"
          gutterBottom
          component="div"
          marginTop="1vh"
          justifyContent="space-between">
          승인 요청 수
          <Chip
            size="small"
            sx={{ borderRadius: 2, marginLeft: '2vw' }}
            color="success"
            label={
              approveList.filter((approve) => {
                if (
                  type === '휴가' &&
                  (selectMember === approve.employee.name ||
                    selectMember === '전체보기' ||
                    !selectMember)
                ) {
                  return dateFilter
                    ? approve.approveYn === 'APPROVE_SUCCESS' &&
                        startDate <= approve.vacationRequestDate &&
                        approve.vacationRequestDate <= endDate
                    : approve.approveYn === 'APPROVE_SUCCESS';
                } else if (
                  selectMember === approve.employee.name ||
                  selectMember === '전체보기' ||
                  !selectMember
                ) {
                  return dateFilter
                    ? approve.approveYn === 'APPROVE_SUCCESS' &&
                        startDate <= approve.businessTripRequestDate &&
                        approve.businessTripRequestDate <= endDate
                    : approve.approveYn === 'APPROVE_SUCCESS';
                }
                return null;
              }).length
            }></Chip>
        </Typography>
        <Typography
          marginTop="1vh"
          id="sidebar-content"
          variant="button"
          gutterBottom
          component="div">
          반려 요청 수
          <Chip
            size="small"
            sx={{ borderRadius: 2, marginLeft: '2vw' }}
            color="error"
            label={
              approveList.filter((approve) => {
                if (
                  type === '휴가' &&
                  (selectMember === approve.employee.name ||
                    selectMember === '전체보기' ||
                    !selectMember)
                ) {
                  return dateFilter
                    ? approve.approveYn === 'APPROVE_REFUSE' &&
                        startDate <= approve.vacationRequestDate &&
                        approve.vacationRequestDate <= endDate
                    : approve.approveYn === 'APPROVE_REFUSE';
                } else if (
                  selectMember === approve.employee.name ||
                  selectMember === '전체보기' ||
                  !selectMember
                ) {
                  return dateFilter
                    ? approve.approveYn === 'APPROVE_REFUSE' &&
                        startDate <= approve.businessTripRequestDate &&
                        approve.businessTripRequestDate <= endDate
                    : approve.approveYn === 'APPROVE_REFUSE';
                }
                return null;
              }).length
            }></Chip>
        </Typography>
        <Typography
          margin="1vh 0vh"
          paddingBottom="5%"
          id="sidebar-content"
          variant="button"
          gutterBottom
          component="div">
          취소 요청 수
          <Chip
            size="small"
            sx={{ borderRadius: 2, marginLeft: '2vw' }}
            color="default"
            label={
              approveList.filter((approve) => {
                if (
                  type === '휴가' &&
                  (selectMember === approve.employee.name ||
                    selectMember === '전체보기' ||
                    !selectMember)
                ) {
                  return dateFilter
                    ? approve.approveYn === 'APPROVE_CANCEL' &&
                        startDate <= approve.vacationRequestDate &&
                        approve.vacationRequestDate <= endDate
                    : approve.approveYn === 'APPROVE_CANCEL';
                } else if (
                  selectMember === approve.employee.name ||
                  selectMember === '전체보기' ||
                  !selectMember
                ) {
                  return dateFilter
                    ? approve.approveYn === 'APPROVE_CANCEL' &&
                        startDate <= approve.businessTripRequestDate &&
                        approve.businessTripRequestDate <= endDate
                    : approve.approveYn === 'APPROVE_CANCEL';
                }
                return null;
              }).length
            }></Chip>
        </Typography>
        <Divider variant="fullWidth" />
        <Divider variant="fullWidth" />
        <FormControl sx={{ paddingTop: '10%' }}>
          <Typography className={style.title}>승인 상태별 요청</Typography>
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

// const CustomBox = withStyles({
//   root: {
//     fontSize: "1.1rem",
//     textAlign: "center",
//     outline: "none!important",
//     fontWeight: "bold",
//     background: "#ffffff",
//     color: "#000000",
//   },
//   selected: {
//     color: "#ffffff",
//     background: "#8BC7FF",
//     fontWeight: "bolder",
//   },
// })(Box);
