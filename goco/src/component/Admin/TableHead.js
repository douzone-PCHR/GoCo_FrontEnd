import { TableCell, TableHead, TableRow } from '@mui/material';

export const AdminTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">사원명</TableCell>
        <TableCell align="center">직급</TableCell>
        <TableCell align="center">부서</TableCell>
        <TableCell align="center">팀</TableCell>
        <TableCell align="center">직책</TableCell>
        <TableCell align="center">근무현황</TableCell>
      </TableRow>
    </TableHead>
  );
};
