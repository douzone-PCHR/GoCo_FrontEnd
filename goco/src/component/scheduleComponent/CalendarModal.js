import React, { useEffect, useState } from 'react';

import 'moment/locale/ko';
import moment from 'moment';
import { dateWorkList } from '../../api/work/workAPI';
import * as api from '../../api/index';
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import CalendarModalListDeTail from './CalendarModalListDeTail';
import AddWork from './AddWork';
import { style } from '@mui/system';

export default function CalendarModal({ open, setOpenInsert, requestDate, user, getEmpId }) {
  const [detailList, setDetailList] = useState([]);

  const [secondOpen, setSecondOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [workId, setWorkId] = useState(0);
  const [workType, setWorkType] = useState(100);
  const detailListOpen = (workId, workType) => {
    setWorkId(workId);
    setWorkType(workType);
    setSecondOpen(true);
  };

  const addWorkBtnOpen = () => {
    setAddOpen(true);
  };

  useEffect(() => {
    calendarModalAPI();
  },[]);
  const calendarModalAPI = async () => { 
    const data = {
      workStartDate: new Date(moment(requestDate).format('YYYY-MM-DD')),
      employee: {
        empId: getEmpId,
      },
    }
    await api.dateWorkList(data , getEmpId).then((response) => { 
      setDetailList(response.data);
    })
  }


  const handleClose = () => setOpenInsert(false);
  return (
    <div>
      {detailList.length !== 0 ? (
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiDialog-container': {
              '& .MuiPaper-root': {
                width: '100%',
                maxWidth: '40%',
                height: '70%',
              },
            },
          }}>
          <DialogTitle style={{ fontSize: '32px' }}>
            {moment(requestDate).format('YYYY-MM-DD (dd)')}

            <Button
              style={{
                float: 'right',
                fontSize: '24px',
                marginRight: '10%',
                borderRadius: '10px',
                border: '3px solid #616161',
                color: '#616161',
                fontWeight: '700',
              }}
              onClick={addWorkBtnOpen}>
              +
            </Button>
          </DialogTitle>

          <List sx={{ pt: 0 }} style={{ padding: '20px' }}>
            {detailList.map((data, index) => (
              <ListItem
                style={{
                  margin: '30px 0px',
                  borderLeft: data.workType === 1 ? '4px solid #FF6363' : '4px solid #17A1FA',
                  backgroundColor: data.workType === 1 ? '#ff636359' : '#b3b3b354',
                }}
                button
                onClick={() => {
                  detailListOpen(data.id , data.workType);
                }}
                key={index}>
                <ListItemText
                  primary={
                    <Typography
                      type="body2"
                      style={{
                        fontSize: '32px',
                        fontFamily: 'Inter',
                        color: '#616161',
                        fontWeight: '500',
                      }}>
                      {moment(data.start).format('hh:mm')}
                    </Typography>
                  }
                />
                <ListItemText
                  primary={
                    <Typography
                      type="body2"
                      style={{
                        fontSize: '32px',
                        fontFamily: 'Inter',
                        color: '#616161',
                        fontWeight: '500',
                      }}>
                      {data.title}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiDialog-container': {
              '& .MuiPaper-root': {
                width: '100%',
                maxWidth: '40%',
                height: '70%',
              },
            },
          }}>
          <DialogTitle style={{ fontSize: '32px' }}>
            {moment(requestDate).format('YYYY-MM-DD (dd)')}

            <Button style={{ float: 'right', fontSize: '32px' }} onClick={addWorkBtnOpen}>
              +
            </Button>
          </DialogTitle>

          <List sx={{ pt: 0 }}>
            <ListItemText
              primary={
                <Typography
                  type="body2"
                  style={{
                    fontSize: '32px',
                    fontFamily: 'Inter',
                    color: '#616161',
                    fontWeight: '500',
                    margin: '10px',
                  }}>
                  등록된 일정이 없습니다.
                </Typography>
              }
            />
          </List>
        </Dialog>
      )}

      {secondOpen && workId !== 0 && (workType !== 3 && workType !== 4) && (
        <CalendarModalListDeTail open={secondOpen} setSecondOpen={setSecondOpen} workId={workId} workType={workType} setOpenInsert={setOpenInsert} />
      )}
      {addOpen && (
        <AddWork addOpen={addOpen} setAddOpen={setAddOpen} user={user} requestDate={requestDate} setOpenInsert={setOpenInsert} />
      )}
    </div>
  );
}
