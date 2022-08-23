import React, { useEffect, useState } from 'react';

import 'moment/locale/ko';
import moment from 'moment';
import { dateWorkList } from '../../api/work/workAPI';
import { Button, Checkbox, Dialog, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import CalendarModalListDeTail from './CalendarModalListDeTail';
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

export default function AddWork({ addOpen, setAddOpen }) {
  useEffect(() => {}, []);

  const handleClose = () => setAddOpen(false);
  return (
    <div>
      <Dialog open={addOpen} onClose={handleClose} fullWidth>
        <DialogTitle style={{ fontSize: '32px' }}>업무 등록 리스트</DialogTitle>
        {/* <Box>
          <Checkbox></Checkbox>
        </Box> */}
      </Dialog>
    </div>
  );
}
