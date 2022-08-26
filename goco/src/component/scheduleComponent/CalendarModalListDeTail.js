import React, { useEffect, useState } from 'react';

import 'moment/locale/ko';
import moment from 'moment';
import { dateWorkList, deleteWork, dialogDetailList, updateWork } from '../../api/work/workAPI';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextareaAutosize,
} from '@mui/material';
import { Box } from '@mui/system';

const CalendarModalListDeTail = ({ open, setSecondOpen, workId }) => {
  const [detailWorkList, setDetailWorkList] = useState([]);
  const handleClose = () => setSecondOpen(false);
  const [textarea, setTextArea] = useState('');

  useEffect(() => {
    dialogDetailList(workId, setDetailWorkList);
  }, []);

  const deleteHandler = () => {
    deleteWork(detailWorkList.workId);
  };

  const updateHandler = () => {
    let workData = {
      workId: detailWorkList.workId,
      workTitle: detailWorkList.workTitle,
      workContent: textarea,
      workStartDate: detailWorkList.workStartDate,
      workEndDate: detailWorkList.workEndDate,
      workType: detailWorkList.workType,
      employee: { empNum: detailWorkList.employee.empNum },
    };

    updateWork(workData);
  };

  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'red',
        },
      }}>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: '100%', height: '50%', display: 'flex' } }}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '40%',
              height: '80%',
            },
          },
        }}>
        <DialogTitle
          style={{
            fontSize: '40px',
            fontWeight: '600',
            fontFamily: 'Inter',
            color: '#000000',
            textAlign: 'center',
          }}>{`${moment(detailWorkList.workStartDate).format('hh:mm')} ${
          detailWorkList.workTitle
        }`}</DialogTitle>
        <TextareaAutosize
          minRows={30}
          aria-label="maximum height"
          placeholder="업무 내용 기입란"
          defaultValue={detailWorkList.workContent}
          onBlur={(e) => setTextArea(e.target.value)}
          style={{
            width: '80%',
            height: '70%',
            fontSize: '32px',
            fontWeight: '500',
            margin: '0px 60px',
            padding: '15px',
            backgroundColor: '#b3b3b354',
            // marginLeft: '15px',
          }}
        />
        <ButtonGroup
          style={{
            display: 'flex',
            height: '20%',
            margin: '0px 50px',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Button
            style={{
              width: '20%',
              backgroundColor: '#FFFFFF',
              color: '#616161',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: '700',
              height: '30%',
              border: '1px solid #000000',
              borderRadius: '5%',
            }}
            onClick={handleClose}>
            취소
          </Button>
          <Button
            style={{
              width: '20%',
              backgroundColor: '#02A8F1',
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: '700',
              height: '30%',
              borderRadius: '5%',
            }}
            onClick={updateHandler}>
            수정
          </Button>
          <Button
            style={{
              width: '20%',
              backgroundColor: '#FF6363',
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: '700',
              height: '30%',
              borderRadius: '5%',
            }}
            onClick={deleteHandler}>
            삭제
          </Button>
        </ButtonGroup>
      </Dialog>
    </Box>
  );
};

export default CalendarModalListDeTail;
