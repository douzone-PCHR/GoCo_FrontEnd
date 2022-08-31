import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import 'moment/locale/ko';
import moment, { utc } from 'moment';
import { lineHeight } from '@mui/system';
import { commuteUpdate } from '../../api/work/workAPI';
import { confirm } from '../../common/confirm';
const CalendarHeader = ({ calendarRef, empList, getEmpId, setEmpId, user }) => {
  const initialFormData = Object.freeze({
    empId: '',
    name: '',
  });
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
    confirm('지금 출근 하시겠습니까?').then((result) => {
      if (result.isConfirmed) {
        let work = {
          clockIn: new Date(),
          employee: {
            empNum: user,
          },
        };
        commuteUpdate(work);
      }
    });
  };

  const goToHome = () => {
    confirm('지금 퇴근 하시겠습니까?').then((result) => {
      if (result.isConfirmed) {
        const HomeTime = new Date();
        let work = {
          clockOut: HomeTime,
          employee: {
            empNum: user,
          },
        };

        commuteUpdate(work);
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
      <ButtonGroup style={{ width: '80%' }}>
        <Button
          style={{
            width: '5%',
            backgroundColor: '#E6F7FF',
            color: '#000000',
            height: '5%',
            border: '1px solid #000000',
            borderRadius: '5%',
          }}
          className="btn-theme text-white f-12 wid-55"
          onClick={() => prevHandle()}>
          &lt;
        </Button>
        <Button
          style={{
            width: '5%',
            marginRight: '20px',
            backgroundColor: '#E6F7FF',
            color: '#000000',
            height: '5%',
            border: '1px solid #000000',
            borderRadius: '5%',
          }}
          className="btn-theme text-white f-12 wid-55"
          onClick={() => nextHandle()}>
          &gt;
        </Button>
        <Button
          style={{
            width: '10%',
            height: '5%',
            border: '1px solid #000000',
            marginRight: '10px',
            color: '#000000',
            borderRadius: '5%',
            fontFamily: 'Inter',
            fontWeight: '600',
            fontSize: '11px',
          }}
          className="btn-theme text-white f-12 wid-55"
          onClick={() => todayHandle()}>
          오늘
        </Button>

        <FormControl style={{ width: '25%', marginRight: '60px' }}>
          <InputLabel id="demo-simple-select-label">직원 목록</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="empId"
            name="empId"
            value={dataEmpId}
            label="우리팀 직원 목록"
            onChange={handleChange}>
            {empList.map((data) => {
              return (
                <MenuItem key={data.empId} value={data.empId}>
                  {data.name},{data.empId}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Typography
          elevation={0}
          sx={{ mt: 4, mb: 2, marginTop: '1px' }}
          variant="h3"
          component="div"
          id="title"
          style={{
            width: '20%',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '20px',
          }}>
          {title}
        </Typography>
      </ButtonGroup>

      <ButtonGroup style={{ width: '20%' }}>
        <Button
          style={{
            marginRight: '20px',
            width: '60%',
            height: '20%',
            color: '#FFFFFF',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '24px',
            backgroundColor: '#00AAFF',
            borderRadius: '5px',
          }}
          className="btn-theme text-white f-12 wid-55"
          onClick={() => goToWork()}>
          출근
        </Button>
        <Button
          style={{
            width: '60%',
            height: '20%',
            color: '#FFFFFF',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '24px',
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
