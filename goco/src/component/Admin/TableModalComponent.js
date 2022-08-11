import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import style from "../../CSS/Admin.module.css";
import { Select } from "./Select";
export const TableModalComponent = ({ open, setOpen }) => {
  const jobTitle = [
    {
      id: 1,
      content: "사원",
    },
    {
      id: 2,
      content: "대리",
    },
    {
      id: 3,
      content: "과장",
    },
    {
      id: 4,
      content: "부장",
    },
  ];
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={style.modal}>
        <Table sx={{ width: 750 }} align="center">
          <TableHead>
            <TableRow>
              <TableCell align="center">사원명</TableCell>
              <TableCell align="center">직급</TableCell>
              <TableCell align="center">부서</TableCell>
              <TableCell align="center">팀</TableCell>
              <TableCell align="center">직책</TableCell>
              <TableCell align="center">근무상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">
                <Select data={jobTitle} />
              </TableCell>
              <TableCell align="center">
                <Select />
              </TableCell>
              <TableCell align="center">
                <Select />
              </TableCell>
              <TableCell align="center">
                <Select />
              </TableCell>
              <TableCell align="center">
                <div className={style.back}>6</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          수정
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          취소
        </Button>
      </div>
    </Modal>
  );
};
