import { TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { TableModalComponent } from './TableModalComponent';
export const TableCellComponent = ({ data }) => {
  const [open, setOpen] = useState(false);
  const result = {
    id: data.employee.empNum,
    name: data.employee.name,
    jobTitle: data.employee.jobTitle?.jobTitleName,
    dept: data.employee.unit.unitName,
    team: data.employee.unit.unitName,
    teamPosition: data.employee.teamPosition.teampPositionName,
    status: data.commuteStatus,
  };
  return (
    <>
      <TableRow
        onClick={() => {
          setOpen(true);
        }}
        hover>
        <TableCell align="center">{result.name}</TableCell>
        <TableCell align="center">{result.jobTitle}</TableCell>
        <TableCell align="center">{result.dept}</TableCell>
        <TableCell align="center">{result.team}</TableCell>
        <TableCell align="center">{result.teamPosition}</TableCell>
        <TableCell align="center">{result.status === '1' ? '근무중' : null}</TableCell>
      </TableRow>
      <TableModalComponent open={open} setOpen={setOpen} result={result} />
    </>
  );
};
