import BusinessTrips from './BusinessTrip';
import Vacations from './Vacations';
import react, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ApproveForm from './ApproveForm';
import { getVacations } from '../../../api/vacationAPI';
import { getBusinessTrip } from '../../../api/businessTripAPI';

export default function Approve() {
  const [approveList, setApproveList] = useState([]);
  const [value, setValue] = useState('휴가');
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  // const [approve, setApprove] = useState([]);
  // const [check, setCheck] = useState(false);

  useEffect(() => {
    if (value === '휴가') {
      getVacations(setApproveList, 1);
    } else if (value === '출장') {
      getBusinessTrip(setApproveList, 1);
    }
  }, [check, value]);
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
        </Tabs>

        <Tooltip title="추가">
          <IconButton onClick={() => setOpen(true)}>
            <AddIcon></AddIcon>
          </IconButton>
        </Tooltip>
        <Box sx={{ width: '100' }}>
          {/* <div style={{ textAlign: 'right' }}> */}

          {approveList.length && approveList[0].vacationType ? (
            <Vacations vacationList={approveList} check={check} setCheck={setCheck} />
          ) : (
            <BusinessTrips businessList={approveList} check={check} setCheck={setCheck} />
          )}
          <ApproveForm open={open} setOpen={setOpen} type={value}></ApproveForm>
        </Box>
      </div>
    </>
  );
}
