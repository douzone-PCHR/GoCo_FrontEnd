import { TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { TableModalComponent } from './TableModalComponent';

export const TableCellComponent = ({ processingData, data, checkFnc }) => {
  const [open, setOpen] = useState(false);
  const empInfo = data && {
    id: data?.empNum, // id값을 넘겨받으며 사원 수정
    name: data?.name,
    empId: data?.empId,
    jobTitle: {
      jobTitleName: data.jobTitle?.jobTitleName,
      jobTitleId: data.jobTitle?.jobTitleId,
    },
    dept: {
      deptName: data.unit?.parentUnit?.unitName,
      deptId: data.unit?.parentUnit?.unitId,
    },
    team: {
      teamName: data.unit?.unitName,
      teamId: data.unit?.unitId,
    },
    teamPosition: {
      teamPositionName: data.teamPosition?.teamPositionName,
      teamPositionId: data.teamPosition?.teamPositionId,
    },
    phoneNumber: data.phoneNumber,
    email: data.email,
    hiredate:
      data.hiredate &&
      data.hiredate.split('T', 1)[0].replace('-', '년 ').replace('-', '월 ') + `일`,
  };

  return (
    <>
      <TableRow
        onClick={() => {
          setOpen(true);
        }}
        hover>
        <TableCell align="center">{empInfo.name}</TableCell>
        <TableCell align="center">{empInfo.jobTitle?.jobTitleName}</TableCell>
        <TableCell align="center">{empInfo.dept.deptName || '-'}</TableCell>
        <TableCell align="center">{empInfo.team.teamName || '-'}</TableCell>
        <TableCell align="center">{empInfo.teamPosition.teamPositionName}</TableCell>
      </TableRow>
      <TableModalComponent
        processingData={processingData}
        open={open}
        setOpen={setOpen}
        empInfo={empInfo}
        checkFnc={checkFnc}
      />
    </>
  );
};
