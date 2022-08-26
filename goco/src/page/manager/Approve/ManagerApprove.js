import react, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ManagerVacations from './ManagerVacation';
import ManagerBusinessTrips from './ManagerBusinessTrip';
import { approveBusinessTripList } from '../../../api/businessTripAPI';
import { approveVacationList } from '../../../api/vacationAPI';
import ApproveSideBar from '../../employee/Approve/ApproveSideBar';
import { userMeAPI } from '../../../api/employeeAPI';
import { getUser } from '../../../component/auth/Login/sessionLogin';

export default function Approve() {
  const [approveList, setApproveList] = useState([]);
  const [value, setValue] = useState('휴가결재');
  const [check, setCheck] = useState(false);
  const [state, setState] = useState('ALL');
  const [dateFilter, setDateFilter] = useState();
  const [userInfo, setUserInfo] = useState({});
  // const user = getUser();
  const [page, setPage] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    userMeAPI(setUserInfo);
  }, []);

  useEffect(() => {
    if (userInfo?.unit?.unitId) {
      if (value === '휴가결재') {
        approveVacationList(setApproveList, userInfo?.unit?.unitId);
      } else if (value === '출장결재') {
        approveBusinessTripList(setApproveList, userInfo?.unit?.unitId);
      }
    }
  }, [check, value, userInfo?.unit?.unitId]);
  console.log(userInfo?.unit?.unitId);
  console.log(approveList);
  console.log(setPage);
  console.log(1231231312);
  return (
    <>
      <Box sx={{ display: 'flex' }} justifyContent={'center'}>
        <ApproveSideBar
          approveList={approveList}
          setState={setState}
          setDateFilter={setDateFilter}
          dateFilter={dateFilter}
          setPage={setPage}
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
                dateFilter={dateFilter}
                setPage={setPage}
                page={page}
              />
            ) : (
              <ManagerBusinessTrips
                businessList={approveList}
                check={check}
                setCheck={setCheck}
                state={state}
                dateFilter={dateFilter}
                setPage={setPage}
                page={page}
              />
            )}
          </Box>
        </Box>
        <Box />
      </Box>
    </>
  );
}
