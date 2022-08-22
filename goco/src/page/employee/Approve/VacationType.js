import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// 연차 반차 병가
export default function VacationType(props) {
  const { vacationType, setVacationType } = props;

  const handleChange = (event) => {
    setVacationType(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">휴가 유형</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={vacationType}
        label="vacationType"
        onChange={handleChange}>
        <MenuItem value={'연차'}>연차</MenuItem>
        <MenuItem value={'반차'}>반차</MenuItem>
        <MenuItem value={'병가'}>병가</MenuItem>
      </Select>
    </FormControl>
  );
}
