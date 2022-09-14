import BusinessTrips from './BusinessTrip';
import Vacations from './Vacations';
import react, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ApproveForm from './ApproveForm';
import ApproveSideBar from './ApproveSideBar';
import style from '../../../CSS/approve.module.css';
import { userMeAPI } from '../../../api/AllAPI';
import * as api from '../../../api';
export default function Approve() {
  const [approveList, setApproveList] = useState([]);
  const [value, setValue] = useState('휴가');
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [state, setState] = useState('ALL');
  const [dateFilter, setDateFilter] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [page, setPage] = useState(0);

  // const user = getUser();
  // const [approve, setApprove] = useState([]);
  // const [check, setCheck] = useState(false);

  useEffect(() => {
    userMeAPI(setUserInfo);
  }, []);

  useEffect(() => {
    if (userInfo.empNum) {
      if (value === '휴가') {
        api.getVacations(userInfo.empNum).then((res) => {
          setApproveList(res.data);
        });
      } else if (value === '출장') {
        api.getBusinessTrip(userInfo.empNum).then((res) => {
          setApproveList(res.data);
        });
      }
    }
  }, [check, value, userInfo.empNum]);

  const handleChange = (event, newValue) => {
    setPage(0);
    setValue(newValue);
  };
  return (
    <>
      {/* <Box sx={{ display: 'flex' }} justifyContent={'center'}> */}
      <Box sx={{ display: 'flex' }}>
        <ApproveSideBar
          approveList={approveList}
          setState={setState}
          setDateFilter={setDateFilter}
          dateFilter={dateFilter}
          setPage={setPage}
          type={value}
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
              <Tab className={style.tab} value="휴가" label="휴가"></Tab>
              <Tab className={style.tab} value="출장" label="출장"></Tab>
            </Tabs>
            <Box>
              <IconButton onClick={() => setOpen(true)}>
                <AddIcon></AddIcon>
              </IconButton>
            </Box>
          </Box>

          <Box>
            {approveList.length && approveList[0].vacationType ? (
              <Vacations
                vacationList={approveList}
                check={check}
                setCheck={setCheck}
                state={state}
                dateFilter={dateFilter}
                setPage={setPage}
                page={page}
              />
            ) : (
              <BusinessTrips
                businessList={approveList}
                check={check}
                setCheck={setCheck}
                state={state}
                dateFilter={dateFilter}
                setPage={setPage}
                page={page}
              />
            )}
            <ApproveForm
              open={open}
              setOpen={setOpen}
              type={value}
              check={check}
              setCheck={setCheck}
              userInfo={userInfo}></ApproveForm>
          </Box>
        </Box>
        <Box />
      </Box>
    </>
  );
}
