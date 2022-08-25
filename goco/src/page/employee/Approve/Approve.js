import BusinessTrips from './BusinessTrip';
import Vacations from './Vacations';
import react, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Fab, Grid, IconButton, Stack, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ApproveForm from './ApproveForm';
import { getVacations } from '../../../api/vacationAPI';
import { getBusinessTrip } from '../../../api/businessTripAPI';
import ApproveSideBar from './ApproveSideBar';
import { getUser } from '../../../component/auth/Login/sessionLogin';

export default function Approve() {
  const [approveList, setApproveList] = useState([]);
  const [value, setValue] = useState('휴가');
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [state, setState] = useState('ALL');
  const [dateFilter, setDateFilter] = useState();
  const user = getUser();
  // const [approve, setApprove] = useState([]);
  // const [check, setCheck] = useState(false);

  useEffect(() => {
    if (value === '휴가') {
      getVacations(setApproveList, user.empNum);
    } else if (value === '출장') {
      getBusinessTrip(setApproveList, user.empNum);
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
      <Box sx={{ display: 'flex' }} justifyContent={'center'}>
        <ApproveSideBar
          approveList={approveList}
          setState={setState}
          setDateFilter={setDateFilter}
        />

        <Box sx={{ display: 'flex' }} flexDirection="column" position="sticky">
          <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
            <Tab value="휴가" label="휴가"></Tab>
            <Tab value="출장" label="출장"></Tab>
          </Tabs>
          <Box position={'fixed'} right={100}>
            <IconButton onClick={() => setOpen(true)}>
              <AddIcon></AddIcon>
            </IconButton>
          </Box>

          <Box>
            {approveList.length && approveList[0].vacationType ? (
              <Vacations
                vacationList={approveList}
                check={check}
                setCheck={setCheck}
                state={state}
                dateFilter={dateFilter}
              />
            ) : (
              <BusinessTrips
                businessList={approveList}
                check={check}
                setCheck={setCheck}
                state={state}
                dateFilter={dateFilter}
              />
            )}
            <ApproveForm
              open={open}
              setOpen={setOpen}
              type={value}
              check={check}
              setCheck={setCheck}></ApproveForm>
          </Box>
        </Box>
        <Box />
      </Box>
    </>
  );
}
