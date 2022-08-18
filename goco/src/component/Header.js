import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Approve from '../page/employee/Approve/Approve';

const Header = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="Main Tabs">
          <Tab label="Home" href="/" />
          <Tab label="결재관리" href="/approve"></Tab>

          <Tab label="Profile" />
        </Tabs>
      </AppBar>
    </>
  );
};

export default Header;
