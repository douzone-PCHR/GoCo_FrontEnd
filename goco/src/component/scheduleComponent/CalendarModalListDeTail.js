import React, { useEffect, useState } from 'react';

import 'moment/locale/ko';
import moment from 'moment';
import { dateWorkList, dialogDetailList } from '../../api/work/workAPI';
import {
  Button,
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
  useEffect(() => {
    dialogDetailList(workId, setDetailWorkList);
  }, []);
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
        PaperProps={{ sx: { width: '100%', height: '50%', display: 'flex' } }}>
        <DialogTitle>{`${moment(detailWorkList.workStartDate).format('hh:mm')} ${
          detailWorkList.workTitle
        }`}</DialogTitle>
        <Paper elevation={3} style={{ height: '100%', padding: '20px' }}>
          {detailWorkList.workContent}
        </Paper>
        <Button>취소</Button> <Button>수정</Button>
      </Dialog>
    </Box>
  );
};

export default CalendarModalListDeTail;
