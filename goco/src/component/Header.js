import React, { Fragment, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Approve from '../page/employee/Approve/Approve';
import './header.css';
import {
  Button,
  IconButton,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CustomizedMenus from './CustomizedMenus';
import { display } from '@mui/system';
const Header = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const [secondValue, setSecondValue] = useState(0);
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  return (
    // <>
    //   <AppBar position="static">
    //     <Tabs value={value} onChange={handleChange} aria-label="Main Tabs">
    //       <Tab label="Home" href="/" />
    //       <Tab label="결재관리" href="/approve"></Tab>

    //       <Tab label="Profile" />
    //     </Tabs>
    //   </AppBar>
    // </>
    <Fragment>
      <AppBar sx={{ background: 'white' }} position="relative">
        <Toolbar>
          <Typography>회사로고</Typography>
          <Tabs
            textColor="primary"
            value={secondValue}
            onChange={(e, secondValue) => setSecondValue(secondValue)}
            variant="scrollable">
            <Tab label="일정 관리" />
            <Tab label="휴가 신청" />
            <Tab label="요청 내역" />
            <Tab label="게시판" />
            <Tab label="근무 중" />
          </Tabs>
          <Button variant="contained">매니저 모드 전환</Button>
          <CustomizedMenus style={{ float: 'right' }} />
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
