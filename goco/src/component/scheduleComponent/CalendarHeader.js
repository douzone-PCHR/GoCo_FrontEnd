import {
  Box,
  Button,
  ButtonGroup,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import 'moment/locale/ko';
import moment, { utc } from 'moment';
import { confirm } from '../../common/confirm';
import * as api from '../../api/index';
import { sweetAlertSuccess } from '../auth/AuthSweetAlert.js/sweetAlert2';
import AddIcon from '@mui/icons-material/Add';
import AddBoxOutlined from '@mui/icons-material/AddBoxOutlined';
import { PostAddSharp } from '@mui/icons-material';
const CalendarHeader = ({ calendarRef, empList, getEmpId, setEmpId, user, setAddOpen }) => {
  const [dataEmpId, setDataEmpId] = useState(getEmpId);
  const [title, settitle] = useState(new moment().format('YYYY년 MM월'));

  const nextHandle = () => {
    calendarRef.current._calendarApi.next();
    settitle(calendarRef.current._calendarApi.currentDataManager.data.viewTitle);
  };
  const prevHandle = () => {
    calendarRef.current._calendarApi.prev();
    settitle(calendarRef.current._calendarApi.currentDataManager.data.viewTitle);
  };
  const todayHandle = () => {
    calendarRef.current._calendarApi.today();
    settitle(calendarRef.current._calendarApi.currentDataManager.data.viewTitle);
  };

  const goToWork = () => {
    confirm('지금 출근 하시겠습니까?').then(async (result) => {
      if (result.isConfirmed) {
        let work = {
          clockIn: new Date(),
          employee: {
            empNum: user,
          },
        };
        await api.commuteUpdate(work).then((response) => {
          if (response.data.status === 'ALREADY_DONE') {
            sweetAlertSuccess(response.data.message, 'error', '/goco');
          } else if (response.data.status === 'OK') {
            sweetAlertSuccess(response.data.message, 'success', '/goco');
          }
        });
      }
    });
  };

  const goToHome = () => {
    confirm('지금 퇴근 하시겠습니까?').then(async (result) => {
      if (result.isConfirmed) {
        const HomeTime = new Date();
        let work = {
          clockOut: HomeTime,
          employee: {
            empNum: user,
          },
        };

        await api.commuteUpdate(work).then((response) => {
          if (response.data.status === 'ALREADY_DONE') {
            sweetAlertSuccess(response.data.message, 'error', '/goco');
          } else if (response.data.status === 'OK') {
            sweetAlertSuccess(response.data.message, 'success', '/goco');
          }
        });
      }
    });
  };

  const handleChange = (e) => {
    setDataEmpId(e.target.value);
    setEmpId(e.target.value);
  };
  return (
    <Box
      className="mb-3"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        margintop: '100px',
      }}>
      <FormControl style={{ width: '25%' }}>
        <InputLabel id="demo-simple-select-label">직원 목록</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="empId"
          name="empId"
          value={dataEmpId}
          label="우리팀 직원 목록"
          onChange={handleChange}>
          {empList.map((data) => {
            return (
              <MenuItem key={data.empId} value={data.empId}>
                {data.name}({data.empId})
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        size="medium"
        style={{
          color: 'black',
          backgroundColor: 'lightgray',
          opacity: '0.4',
          borderColor: 'lightgray',
          borderRadius: '5%',
          fontSize: '13px',
        }}
        className="btn-theme text-white f-12 wid-55"
        onClick={() => todayHandle()}>
        today
      </Button>
      <Button variant="text" sx={{ height: '5%', color: 'gray' }} onClick={() => prevHandle()}>
        &lt;
      </Button>
      <Typography
        elevation={0}
        sx={{ marginTop: '1px', textAlign: 'center' }}
        variant="h3"
        component="div"
        id="title"
        style={{
          width: '15%',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '20px',
        }}>
        {title}
      </Typography>
      <Button variant="text" sx={{ height: '5%', color: 'gray' }} onClick={() => nextHandle()}>
        &gt;
      </Button>

      <Button
        color="primary"
        variant="outlined"
        size="medium"
        aria-label="add"
        onClick={() => {
          setAddOpen(true);
        }}>
        <PostAddSharp fontSize="small" color="primary" />
        일정등록
      </Button>

      <ButtonGroup style={{ width: '20%' }}>
        <Button
          variant="contained"
          size="small"
          style={{
            marginLeft: '10%',
            marginRight: '10%',
            height: '20%',
            width: '50%',
            color: '#FFFFFF',
            fontFamily: 'Inter',
            fontWeight: '500',
            fontSize: '20px',
            backgroundColor: '#00AAFF',
            borderRadius: '5px',
          }}
          className="btn-theme text-white f-12 wid-55"
          onClick={() => goToWork()}>
          출근
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{
            height: '20%',
            width: '50%',
            color: '#FFFFFF',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '20px',
            backgroundColor: '#FF6363',
            borderRadius: '5px',
          }}
          className="btn-theme text-white f-12 wid-55"
          onClick={() => goToHome()}>
          퇴근
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default CalendarHeader;
