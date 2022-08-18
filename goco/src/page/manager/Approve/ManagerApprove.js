import react, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ManagerVacations from './ManagerVacation';
import ManagerBusinessTrips from './ManagerBusinessTrip';

export default function Approve() {
  const [value, setValue] = useState('휴가결재');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100' }}>
      <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
        <Tab value="휴가결재" label="휴가결재"></Tab>
        <Tab value="출장결재" label="출장결재"></Tab>
      </Tabs>
      {value === '휴가결재' ? <ManagerVacations /> : <ManagerBusinessTrips />}
    </Box>
  );
}
