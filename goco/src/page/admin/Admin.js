import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import style from '../../CSS/Admin.module.css';
import { TableCellComponent } from '../../component/Admin/TableCellComponent';
import { useEffect, useState } from 'react';
import { commuteGet } from '../../api/commuteAPI';
import { AdminTableHead } from '../../component/Admin/TableHead';
export const Admin = () => {
  const [data, setData] = useState();
  useEffect(() => {
    commuteGet(setData);
  }, []);

  return (
    <div className={style.Container}>
      <div className={style.item}>
        <div>
          <Table>
            <AdminTableHead />
            <TableBody>
              {data &&
                data.map((element, index) => {
                  return <TableCellComponent data={element} key={index} />;
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
