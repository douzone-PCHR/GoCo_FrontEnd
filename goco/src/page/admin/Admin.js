import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import style from "../../CSS/Admin.module.css";
import { TableCellComponent } from "../../component/Admin/TableCellComponent";
import { useState } from "react";
import { TableModalComponent } from "../../component/Admin/TableModalComponent";
export const Admin = () => {
  const data = [1, 2, 3, 4, 5]; //DB에 대한 값 받아올 예정(훅을 사용하여)
  return (
    <div className={style.Container}>
      <div className={style.item}>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">사원명</TableCell>
                <TableCell align="center">직급</TableCell>
                <TableCell align="center">부서</TableCell>
                <TableCell align="center">팀</TableCell>
                <TableCell align="center">직책</TableCell>
                <TableCell align="center">퇴사여부 </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((dat, index) => {
                return <TableCellComponent data={dat} key={index} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
