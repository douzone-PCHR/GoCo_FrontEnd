import { TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { TableModalComponent } from './TableModalComponent';

function commuteState(status) {
  switch (status) {
    case '0':
      return '근무중';
    case '1':
      return '지각';
    case '2':
      return '미출근';
  }
}

export const TableCellComponent = ({ data }) => {
  const [open, setOpen] = useState(false);
  const result = {
    id: data.employee.empNum, //id값을 넘겨받으며 사원 수정
    name: data.employee.name,
    jobTitle: data.employee.jobTitle?.jobTitleName,
    dept: data.employee.unit?.parentUnit.unitName,
    team: data.employee.unit?.unitName,
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
        <TableCell align="center">{commuteState(result.status)}</TableCell>
      </TableRow>
      <TableModalComponent open={open} setOpen={setOpen} result={result} />
    </>
  );
};
