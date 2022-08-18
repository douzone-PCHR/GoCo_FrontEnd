import BusinessTrips from './BusinessTrip';
import Vacations from './Vacations';
import react, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ApproveForm from './ApproveForm';

export default function Approve() {
  const [value, setValue] = useState('휴가');
  const [open, setOpen] = useState(false);
  // const [approve, setApprove] = useState([]);
  // const [check, setCheck] = useState(false);

  // useEffect(() => {
  //   if (value == '휴가') {
  //     getVacations(setApprove, 1);
  //   } else {
  //     getBusinessTrip(setApprove, 1);
  //   }
  // }, [value, check]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div>
        <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
          <Tab value="휴가" label="휴가"></Tab>
          <Tab value="출장" label="출장"></Tab>
          {/* <div style={{ textAlign: 'right' }}> */}

          {/* </div> */}
          <Tooltip title="추가" sx={{ position: 'right' }}>
            <IconButton onClick={() => setOpen(true)}>
              <AddIcon></AddIcon>
            </IconButton>
          </Tooltip>
        </Tabs>
        <Box sx={{ width: '100' }}>
          <div style={{ textAlign: 'right' }}>
            {/* <Tooltip title="추가" sx={{ position: 'right' }}>
              <IconButton onClick={() => setOpen(true)}>
                <AddIcon></AddIcon>
              </IconButton>
            </Tooltip> */}
          </div>
          {value === '휴가' ? <Vacations /> : <BusinessTrips />}
          <ApproveForm open={open} setOpen={setOpen}></ApproveForm>
        </Box>
      </div>
    </>
  );
}
