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
import { MenuItem, Select } from '@mui/material';

export default function ManagerApprove() {
  const [approveList, setApproveList] = useState([]);
  const [value, setValue] = useState('휴가결재');
  const [check, setCheck] = useState(false);
  const [state, setState] = useState('ALL');
  const [dateFilter, setDateFilter] = useState();
  const [userInfo, setUserInfo] = useState({});
  // const user = getUser();
  const [selectMember, setSelectMember] = useState('전체보기');
  const [page, setPage] = useState(0);
  let memberInfo = { 0: '전체보기' };
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
  // console.log(userInfo?.unit?.unitId);
  // console.log(approveList);
  // console.log(setPage);
  // console.log(1231231312);
  approveList.length !== 0 &&
    approveList.map((emp) => {
      memberInfo = { ...memberInfo, [emp.employee.empNum]: emp.employee.name };
    });
  let memberInfoResult = Object.entries(memberInfo);
  console.log(memberInfoResult);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <ApproveSideBar
          approveList={approveList}
          setState={setState}
          setDateFilter={setDateFilter}
          dateFilter={dateFilter}
          setPage={setPage}
          selectMember={selectMember}
        />

        <Box
          sx={{ display: 'flex', marginLeft: '5%', marginTop: '3%', minWidth: '60%' }}
          flexDirection="column"
          position="sticky">
          <Box sx={{ display: 'flex' }} justifyContent="space-between">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary">
              <Tab value="휴가결재" label="휴가결재"></Tab>
              <Tab value="출장결재" label="출장결재"></Tab>
            </Tabs>
            <Select
              size="small"
              value={selectMember || '전체보기'}
              onChange={(e) => {
                setSelectMember(e.target.value);
                setPage(0);
              }}>
              {memberInfoResult.map((emp) => {
                return (
                  <MenuItem key={emp[1]} value={emp[1] || ''}>
                    {emp[1]}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
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
                selectMember={selectMember}
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
                selectMember={selectMember}
              />
            )}
          </Box>
        </Box>
        <Box />
      </Box>
    </>
  );
}
