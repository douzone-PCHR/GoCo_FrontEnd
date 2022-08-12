import { Box, FormControl, InputLabel, MenuItem, TableCell } from '@mui/material';
import React, { useState } from 'react';

export const Select = ({ data, title, setUnit }) => {
  const [combo, setCombo] = useState('');
  const handleChange = (event) => {
    setCombo(event.target.value);
    data[0].unitType === false && setUnit(event.target.value);
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
