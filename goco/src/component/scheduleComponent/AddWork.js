import React, { useState } from 'react';
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
import { DateTimePicker } from '@mui/x-date-pickers';

import * as api from '../../api/index';
import { sweetAlertSuccess } from '../auth/AuthSweetAlert.js/sweetAlert2';
import { resultConfirm } from '../../common/confirm';
export default function AddWork({ addOpen, setAddOpen, user, requestDate, setOpenInsert }) {
  const [startValue, setStartValue] = useState(requestDate);
  const [endValue, setEndValue] = useState(requestDate);
  const [radioValue, setRadioValue] = useState(0);

  const [textarea, setTextArea] = useState('');
  const [textTitle, setTextTitle] = useState('');

  const handleClose = () => setAddOpen(false);

  const startChange = (newValue) => {
    setStartValue(newValue);
  };
  const endChange = (newValue) => {
    setEndValue(newValue);
  };

  const addEvent = async () => {
    if (startValue <= endValue) {
      let workData = {
        workTitle: textTitle,
        workContent: textarea,
        workStartDate: startValue,
        workEndDate: endValue,
        workType: radioValue,
        employee: { empNum: user },
      };
      await api
        .addWork(workData)
        .then((response) => {
          setAddOpen(false);
          setOpenInsert(false);
          if (response.data.status === 'OK') {
            sweetAlertSuccess(response.data.message, 'success', '/goco');
          } else {
            sweetAlertSuccess(response.data.message, 'error', '/goco');
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            resultConfirm(
              error.response.data.errors[0].defaultMessage,
              '',
              'error',
              document.getElementById('modal')
            );
          }
        });
    } else {
      resultConfirm(
        '시작 날짜 또는 마지막 날짜를 정확히 설정 해주세요.',
        '',
        'error',
        document.getElementById('modal')
      );
    }
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
          id="modal"
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
              fontSize: '40px',
              fontWeight: '400',
              fontFamily: 'Inter',
              color: '#000000',
              textAlign: 'center',
            }}>
            업무 등록
          </DialogTitle>
          <Divider />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={radioValue}
            onChange={(e) => setRadioValue(Number(e.target.value))}
            style={{ display: 'inline-block', margin: '2% 20px' }}
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
            <FormControl style={{ width: '285px' }}>
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
            <FormControl style={{ width: '285px' }}>
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
            inputProps={{ maxLength: 50 }}
            placeholder="업무 제목을 입력하세요"></TextField>
          <TextareaAutosize
            minRows={30}
            maxLength={255}
            aria-label="maximum height"
            placeholder="업무 내용을 입력하세요"
            onBlur={(e) => setTextArea(e.target.value)}
            style={{
              width: '85%',
              height: '90%',
              fontSize: '20px',
              fontWeight: '500',
              margin: '0px 15px',
              padding: '15px',
              backgroundColor: '#b3b3b354',
            }}
          />

          <ButtonGroup
            sx={{
              display: 'flex',
              height: '10%',
              margin: '15px 100px',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ marginRight: '5%', width: '20%', borderRadius: '5%', fontWeight: 500 }}
              onClick={() => {
                textTitle
                  ? addEvent()
                  : resultConfirm('제목을 입력', '', 'error', document.getElementById('modal'));
              }}>
              추가
            </Button>
            <Button
              variant="contained"
              size="large"
              style={{
                marginLeft: '5%',
                width: '20%',
                backgroundColor: '#D9D9D9',
                color: '#616161',
                fontWeight: '500',
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
