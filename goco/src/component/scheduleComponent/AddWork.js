import React, { useEffect, useState } from 'react';
import 'moment/locale/ko';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import CalendarModalListDeTail from './CalendarModalListDeTail';
import { DatePicker, DateTimePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { minWidth } from '@mui/system';
import * as api from '../../api/index';
import { sweetAlertSuccess } from '../auth/AuthSweetAlert.js/sweetAlert2';
import moment from 'moment';
export default function AddWork({ addOpen, setAddOpen, user, requestDate , setOpenInsert }) {
  const [startValue, setStartValue] = useState(requestDate);
  const [endValue, setEndValue] = useState(requestDate);
  const [radioValue, setRadioValue] = useState(0);  
  
  const [textarea, setTextArea] = useState('');
  const [textTitle, setTextTitle] = useState('');
  useEffect(() => {}, []);

  const handleClose = () => setAddOpen(false);

  const startChange = (newValue) => {
    setStartValue(newValue);
  };
  const endChange = (newValue) => {
    setEndValue(newValue);
  };

  const addEvent = async () => {
    let workData = {
      workTitle: textTitle,
      workContent: textarea,
      workStartDate: startValue,
      workEndDate: endValue,
      workType: radioValue,
      employee: { empNum: user },
    };
    await api.addWork(workData).then((response) => { 
      setAddOpen(false);
      setOpenInsert(false);
      if (response.data.status === 'OK') {
        sweetAlertSuccess(response.data.message, 'success', '/goco');
      } else {
        sweetAlertSuccess(response.data.message, 'error', '/goco');
      }
     
    })
  };
  return (
    <div>
      <Box
        sx={{
          '& > :not(style)': {
            m: 1,
            width: '100%',
            height: '100%',
          },
        }}>
        <Dialog
          sx={{
            '& .MuiDialog-container': {
              '& .MuiPaper-root': {
                width: '100%',
                maxWidth: '40%',
                height: '90%',
              },
            },
          }}
          open={addOpen}
          onClose={handleClose}
          PaperProps={{ sx: { width: '100%', height: '100%', padding: '20px' } }}>
          <DialogTitle
            style={{
              fontSize: '50px',
              fontWeight: '400',
              fontFamily: 'Inter',
              color: '#000000',
              textAlign: 'center',
            }}>
            업무 등록 리스트
          </DialogTitle>
          <Divider />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={radioValue}
            onChange={(e) => setRadioValue(Number(e.target.value))}
            style={{ display: 'inline-block', margin: '0 20px' }}
            name="radio-buttons-group"
            id="radio-buttons-group">
            <FormControlLabel value="0" control={<Radio />} label="사내업무" />
            <FormControlLabel value="1" control={<Radio />} label="개인업무" />
          </RadioGroup>

          <Box
            style={{ display: 'flex' }}
            sx={{
              '& > :not(style)': {
                m: 2,
                width: '100%',
              },
            }}>
            <FormControl style={{ width: '50%' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>

                <DateTimePicker
                  inputFormat="yyyy/MM/dd hh:mm aa "
                  label="시작일"
                  value={startValue}
                  onChange={startChange}
                  renderInput={(params) => <TextField {...params} />}
                />

              </LocalizationProvider>
            </FormControl>
            <FormControl style={{ width: '50%' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  inputFormat="yyyy/MM/dd hh:mm aa "
                  label="종료일"
                  id="endDate"
                  value={endValue}
                  onChange={endChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
          <TextField
            style={{ width: '90%', margin: '20px 15px', fontSize: '16px' }}
            onBlur={(e) => setTextTitle(e.target.value)}
            placeholder="업무 제목"></TextField>
          <TextareaAutosize
            minRows={30}
            aria-label="maximum height"
            placeholder="업무 내용 기입란"
            onBlur={(e) => setTextArea(e.target.value)}
            style={{
              width: '85%',
              height: '90%',
              fontSize: '32px',
              fontWeight: '500',
              margin: '0px 15px',
              padding: '15px',
              backgroundColor: '#b3b3b354',
            }}
          />

          <ButtonGroup
            style={{
              display: 'flex',
              height: '10%',
              margin: '15px 100px',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Button
              style={{
                width: '20%',
                backgroundColor: '#00AAFF',
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontWeight: '700',
                height: '100%',
                border: '1px solid transparent',
                borderRadius: '5%',
              }}
              onClick={addEvent}>
              추가
            </Button>
            <Button
              style={{
                width: '20%',
                backgroundColor: '#D9D9D9',
                color: '#616161',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontWeight: '700',
                height: '100%',
                border: '1px solid transparent',
                borderRadius: '5%',
              }}
              onClick={handleClose}>
              취소
            </Button>
          </ButtonGroup>
        </Dialog>
      </Box>
    </div>
  );
}
