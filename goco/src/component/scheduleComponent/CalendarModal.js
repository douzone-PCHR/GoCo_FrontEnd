import React, { useEffect, useState } from 'react';

import 'moment/locale/ko';
import moment from 'moment';
import { dateWorkList } from '../../api/work/workAPI';
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
  const detailListOpen = (workId) => {
    setWorkId(workId);
    setSecondOpen(true);
  };

  const addWorkBtnOpen = () => {
    setAddOpen(true);
  };

  useEffect(() => {
    dateWorkList(requestDate, setDetailList, getEmpId);
  }, []);

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
                  borderLeft: data.workType === true ? '4px solid #FF6363' : '4px solid #17A1FA',
                  backgroundColor: data.workType === true ? '#ff636359' : '#b3b3b354',
                }}
                button
                onClick={() => {
                  detailListOpen(data.workId);
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
                      {moment(data.workStartDate).format('hh:mm')}
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
                      {data.workTitle}
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

      {secondOpen && workId !== 0 && (
        <CalendarModalListDeTail open={secondOpen} setSecondOpen={setSecondOpen} workId={workId} />
      )}
      {addOpen && (
        <AddWork addOpen={addOpen} setAddOpen={setAddOpen} user={user} requestDate={requestDate} />
      )}
    </div>
  );
}
