import { Box, FormControl, InputLabel, MenuItem, TableCell } from '@mui/material';
import React, { useState } from 'react';

export const SelectComponent = ({ data, title, setUnit, setUpdateData }) => {
  const [combo, setCombo] = useState('');
  const handleChange = (event) => {
    setCombo(event.target.value); // selectBox 변경 값
    data[0].unitType === false && setUnit(event.target.value); //부서에 따른 팀 변경
    // 업데이트 데이터 전송을 위한 객체
    setUpdateData((data) => {
      let newCondition = { ...data };
      newCondition[title] = parseInt(event.target.value);
      return newCondition;
    });
  };
  return (
    <TableCell align="center">
      <select onChange={handleChange} value={combo}>
        {data &&
          data.map((values, key) => {
            return (
              <option id={values.id || values.unitId} key={key} value={values.id || values.unitId}>
                {values.content}
                {values.unitName}
              </option>
            );
          })}
      </select>
    </TableCell>
  );
};
