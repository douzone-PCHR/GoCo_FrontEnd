import { Pagination, Table, TableBody } from '@mui/material';
import { TableCellComponent } from './TableCellComponent';
import { AdminTableHead } from './TableHead';

export const Incumbent = ({ check, setCheck, emp, setEmp, processingData }) => {
  return (
    <>
      <Table>
        <AdminTableHead />
        <TableBody>
          {emp &&
            emp.map((element, index) => {
              return (
                <TableCellComponent
                  processingData={processingData}
                  data={element}
                  key={index}
                  check={check}
                  setCheck={setCheck}
                />
              );
            })}
        </TableBody>
      </Table>
      <Pagination sx={{ width: '100%' }} justifycontent="center" count={10} />
    </>
  );
};
