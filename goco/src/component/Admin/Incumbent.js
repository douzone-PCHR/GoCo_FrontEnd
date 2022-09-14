import { Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import { useState } from 'react';
import { TableCellComponent } from './TableCellComponent';
import { AdminTableHead } from './TableHead';

export const Incumbent = ({ processingData, checkFnc, emp }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper} sx={{ minWidth: 1000 }}>
      <Table>
        <AdminTableHead />
        <TableBody>
          {emp &&
            (rowsPerPage > 0
              ? emp?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : emp
            ).map((element, index) => {
              console.log(element);
              return (
                <TableCellComponent
                  processingData={processingData}
                  data={element}
                  key={index}
                  checkFnc={checkFnc}
                />
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={emp?.length || 1}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
