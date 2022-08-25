import react, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ManagerVacations from './ManagerVacation';
import ManagerBusinessTrips from './ManagerBusinessTrip';
import { approveBusinessTripList } from '../../../api/businessTripAPI';
import { approveVacationList } from '../../../api/vacationAPI';
import ApproveSideBar from '../../employee/Approve/ApproveSideBar';

export default function Approve() {
  const [approveList, setApproveList] = useState([]);
  const [value, setValue] = useState('휴가결재');
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [state, setState] = useState('ALL');
  const [dateFilter, setDateFilter] = useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === '휴가결재') {
      approveVacationList(setApproveList, 1);
    } else if (value === '출장결재') {
      approveBusinessTripList(setApproveList, 1);
    }
  }, [check, value]);

  return (
    <>
      <Box sx={{ display: 'flex' }} justifyContent={'center'}>
        <ApproveSideBar
          approveList={approveList}
          setState={setState}
          setDateFilter={setDateFilter}
        />

        <Box sx={{ width: '100' }}>
          <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
            <Tab value="휴가결재" label="휴가결재"></Tab>
            <Tab value="출장결재" label="출장결재"></Tab>
          </Tabs>
          <Box>
            {approveList.length && approveList[0].vacationType ? (
              <ManagerVacations
                vacationList={approveList}
                check={check}
                setCheck={setCheck}
                state={state}
              />
            ) : (
              <ManagerBusinessTrips
                businessList={approveList}
                check={check}
                setCheck={setCheck}
                state={state}
              />
            )}
          </Box>
        </Box>
        <Box />
      </Box>
    </>
  );
}
