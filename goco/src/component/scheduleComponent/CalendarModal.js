import React, { useEffect, useState } from 'react';

import 'moment/locale/ko';
import moment from 'moment';
import { dateWorkList } from '../../api/work/workAPI';
import { Button, Dialog, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import CalendarModalListDeTail from './CalendarModalListDeTail';
import AddWork from './AddWork';

export default function CalendarModal({ open, setOpenInsert, requestDate }) {
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
    dateWorkList(requestDate, setDetailList);
  }, []);

  const handleClose = () => setOpenInsert(false);
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle style={{ fontSize: '32px' }}>
          {requestDate}{' '}
          <Button style={{ float: 'right', fontSize: '32px' }} onClick={addWorkBtnOpen}>
            +
          </Button>
        </DialogTitle>

        <List sx={{ pt: 0 }}>
          {detailList.map((data, index) => (
            <ListItem
              button
              onClick={() => {
                detailListOpen(data.workId);
              }}
              key={index}>
              <ListItemText primary={moment(data.workStartDate).format('hh:mm')} />
              <ListItemText primary={data.workTitle} />
            </ListItem>
          ))}
        </List>
      </Dialog>

      {secondOpen && workId !== 0 && (
        <CalendarModalListDeTail open={secondOpen} setSecondOpen={setSecondOpen} workId={workId} />
      )}
      {addOpen && <AddWork addOpen={addOpen} setAddOpen={setAddOpen} />}
    </div>
  );
}
