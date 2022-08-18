import React, { useState, useEffect, Fragment } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import Swal from 'sweetalert2';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { approveVacationList, approveVacation, deleteVacation } from '../../../api/vacationAPI';
import { Button, TablePagination } from '@mui/material';
import { confirm } from '../../../common/confirm';

function createData(name, count, type, startDate, endDate, requestDate, approve, detail, vacation) {
  console.log(vacation);
  return {
    name,
    count,
    type,
    startDate,
    endDate,
    requestDate,
    approve,
    detail,
    vacation,
  };
}
const approveType = {
  APPROVE_WAITTING: '결재대기',
  APPROVE_SUCCESS: '승인',
  APPROVE_REFUSE: '반려',
  APPROVE_CANCEL: '승인취소',
};

function Row(props) {
  const { row, check, setCheck } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        {/* <TableCell component="th" scope="row"> */}
        <TableCell></TableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{row.count}일</TableCell>
        <TableCell align="center">{row.type}</TableCell>
        <TableCell align="center">{row.startDate.split('T')[0]}</TableCell>
        <TableCell align="center">{row.endDate.split('T')[0]}</TableCell>
        <TableCell align="center">{row.requestDate.split('T')[0]}</TableCell>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{approveType[row.approve]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} textAlign={'center'}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>
              <Box>
                <div>
                  {row.detail.approveDate && '결재일: ' + row.detail.approveDate.split('T')[0]}
                </div>
                <div>{row.detail.content}</div>
                <div>
                  {row.detail.file && row.detail.file.originalName}
                  {row.detail.file && (
                    <a href={row.detail.file.filePath}>
                      <IconButton color="primary">
                        <SimCardDownloadOutlinedIcon align="bottom"></SimCardDownloadOutlinedIcon>
                      </IconButton>
                    </a>
                  )}
                </div>
                {row.approve === 'APPROVE_WAITTING' && (
                  <div>
                    <Button
                      onClick={() => {
                        confirm('결재를 승인 하시겠습니까?').then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire('결재가 승인 되었습니다', '', 'success');
                            row.vacation.approveYn = 'APPROVE_SUCCESS';
                            approveVacation(row.vacation, check, setCheck);
                          }
                        });
                      }}>
                      결재승인
                    </Button>
                    <Button
                      onClick={() => {
                        confirm('결재를 반려 하시겠습니까?').then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire('결재가 반려 되었습니다', '', 'success');
                            row.vacation.approveYn = 'APPROVE_REFUSE';
                            approveVacation(row.vacation, check, setCheck);
                          }
                        });
                      }}>
                      결재반려
                    </Button>
                  </div>
                )}
                {row.approve === 'APPROVE_SUCCESS' && (
                  <div>
                    <Button
                      onClick={() => {
                        confirm('승인 된 결재 입니다. 승인을 취소 하시겠습니까? ').then(
                          (result) => {
                            if (result.isConfirmed) {
                              Swal.fire('승인이 취소 되었습니다', '', 'success');
                            }
                          }
                        );
                        row.vacation.approveYn = 'APPROVE_CANCEL';
                        approveVacation(row.vacation, check, setCheck);
                      }}>
                      승인취소
                    </Button>
                  </div>
                )}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function ManagerVacations() {
  const [vacationList, setVacationList] = useState([]);
  const [check, setCheck] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    approveVacationList(setVacationList, 1);
  }, [check]);
  const rows = [];
  if (vacationList.length) {
    vacationList.map((vacation) => {
      let detail = {
        content: vacation.vacationContent,
        approveDate: vacation.vacationApproveDate,
        file: vacation.file,
      };
      rows.push(
        createData(
          vacation.employee.name,
          vacation.employee.vacationCount,
          vacation.vacationType,
          vacation.vacationStartDate,
          vacation.vacationEndDate,
          vacation.vacationRequestDate,
          vacation.approveYn,
          detail,
          vacation
        )
      );
    });
  }
  console.log(vacationList);
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">팀원 이름</TableCell>
            <TableCell align="center">잔여 휴가 일수</TableCell>
            <TableCell align="center">휴가 종류</TableCell>
            <TableCell align="center">휴가 시작일</TableCell>
            <TableCell align="center">휴가 종료일</TableCell>
            <TableCell align="center">신청 일자</TableCell>
            <TableCell />
            <TableCell align="center">승인 상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <Row key={index} row={row} check={check} setCheck={setCheck} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
