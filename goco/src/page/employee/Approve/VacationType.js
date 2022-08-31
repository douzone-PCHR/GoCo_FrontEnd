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
    <FormControl sx={{ m: 1, width: 120 }} size="small">
      <InputLabel id="demo-simple-select-label" style={{ fontFamily: 'GmarketSans' }}>
        휴가 유형
      </InputLabel>
      <Select
        style={{ fontFamily: 'GmarketSans' }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={vacationType}
        label="휴가 유형"
        onChange={handleChange}>
        <MenuItem className="" value={'연차'}>
          연차
        </MenuItem>
        <MenuItem value={'반차'}>반차</MenuItem>
        <MenuItem value={'병가'}>병가</MenuItem>
      </Select>
    </FormControl>
  );
}
