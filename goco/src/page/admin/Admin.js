import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import style from '../../CSS/Admin.module.css';
import { TableCellComponent } from '../../component/Admin/TableCellComponent';
import { useEffect, useState } from 'react';
import { commuteGet } from '../../api/commuteAPI';
import { TableHeade } from '../../component/Admin/TableHead';
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
            <TableHeade />
            <TableBody>
              {data &&
                data.map((dat, index) => {
                  return <TableCellComponent data={dat} key={index} />;
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
