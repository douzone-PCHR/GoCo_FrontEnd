import React, { useEffect, useState } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import 'moment/locale/ko';
import moment from 'moment';
import { addWork, dateWorkList } from '../../api/work/workAPI';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import CalendarModalListDeTail from './CalendarModalListDeTail';
import { DateTimePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { minWidth } from '@mui/system';
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function AddWork({ addOpen, setAddOpen, user }) {
  const [startValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(new Date());
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

  const addEvent = () => {
    let workData = {
      workTitle: textTitle,
      workContent: textarea,
      workStartDate: startValue,
      workEndDate: endValue,
      workType: radioValue,
      employee: { empId: user },
    };
    addWork(workData);
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
          sx={{ width: '100%' }}
          open={addOpen}
          onClose={handleClose}
          PaperProps={{ sx: { width: '100%', height: '100%', padding: '20px' } }}>
          <DialogTitle style={{ fontSize: '32px' }}>업무 등록 리스트</DialogTitle>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={radioValue}
            onChange={(e) => setRadioValue(e.target.value)}
            style={{ display: 'inline-block', margin: '0 20px' }}
            name="radio-buttons-group"
            id="radio-buttons-group">
            <FormControlLabel value="0" control={<Radio />} label="사내업무" />
            <FormControlLabel value="1" control={<Radio />} label="개인업무" />
          </RadioGroup>

          <Box
            sx={{
              '& > :not(style)': {
                m: 1,
                width: '100%',
                height: '100%',
              },
            }}>
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box
                  sx={{
                    '& > :not(style)': {
                      marginLeft: '10px',
                      marginBottom: '30px',
                    },
                  }}>
                  <DateTimePicker
                    label="시작일"
                    value={startValue}
                    onChange={startChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>

                <Box
                  sx={{
                    '& > :not(style)': {
                      marginLeft: '10px',
                    },
                  }}>
                  <DateTimePicker
                    label="종료일"
                    value={endValue}
                    onChange={endChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>

                {/* <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        /> */}
              </LocalizationProvider>
            </FormControl>
          </Box>
          <TextField
            style={{ width: '60%', marginLeft: '15px', fontSize: '16px' }}
            onBlur={(e) => setTextTitle(e.target.value)}
            placeholder="업무 제목"></TextField>
          <TextareaAutosize
            minRows={30}
            aria-label="maximum height"
            placeholder="업무 내용 기입란"
            onBlur={(e) => setTextArea(e.target.value)}
            style={{
              width: '90%',
              height: '50%',
              fontSize: '24px',
              margin: '10px',
              marginLeft: '15px',
            }}
          />
          <Stack direction="row" justifyContent={'end'}>
            <Button variant="contained" onClick={addEvent} style={{ marginRight: '10px' }}>
              추가
            </Button>
            <Button variant="contained">취소</Button>
          </Stack>
        </Dialog>
      </Box>
    </div>
  );
}
