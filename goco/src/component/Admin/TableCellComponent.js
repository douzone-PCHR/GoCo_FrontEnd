import { TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { TableModalComponent } from "./TableModalComponent";

export const TableCellComponent = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        onClick={() => {
          setOpen(true);
        }}
      >
        <TableCell align="center">{data}1</TableCell>
        <TableCell align="center">{data}2</TableCell>
        <TableCell align="center">{data}3</TableCell>
        <TableCell align="center">{data}4</TableCell>
        <TableCell align="center">{data}5</TableCell>
        <TableCell align="center">{data}6</TableCell>
      </TableRow>
      {/* <TableModalComponent open={open} setOpen={setOpen} oneEmp={oneEmp} /> */}
      <TableModalComponent open={open} setOpen={setOpen} />
    </>
  );
};
