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
import { deleteVacation, getVacations } from '../../../api/vacationAPI';
import { confirm } from '../../../common/confirm';
import { TablePagination, Tooltip } from '@mui/material';

function createData(type, startDate, endDate, requestDate, approve, detail, vacation) {
  return {
    type,
    startDate,
    endDate,
    requestDate,
    approve,
    detail,
    vacation,
  };
}

function Row(props) {
  const { row, check, setCheck } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        {/* <TableCell component="th" scope="row"> */}
        <TableCell />
        <TableCell align="center">{row.type}</TableCell>
        <TableCell align="center">{row.startDate.split('T')[0]}</TableCell>
        <TableCell align="center">{row.endDate.split('T')[0]}</TableCell>
        <TableCell align="center">{row.requestDate.split('T')[0]}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.approve}</TableCell>

        <TableCell>
          {row.approve === 'APPROVE_WAITTING' ? (
            <Tooltip title="삭제">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  confirm('신청 내역을 삭제 하시겠습니까?').then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire('신청 내역이 삭제되었습니다', '', 'success');
                      deleteVacation(row.vacation, check, setCheck);
                    }
                  });
                }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <IconButton aria-label="delete" disabled color="primary">
              <DeleteIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} textAlign={'center'}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>
              <Box>
                <div>{row.detail.content}</div>
                <div>
                  {row.detail.approveDate && '결재일: ' + row.detail.approveDate.split('T')[0]}
                  {row.detail.file && row.detail.file.originalName}
                  {row.detail.file && (
                    <a href={row.detail.file.filePath}>
                      <Tooltip title="Download">
                        <IconButton color="primary">
                          <SimCardDownloadOutlinedIcon align="bottom"></SimCardDownloadOutlinedIcon>
                        </IconButton>
                      </Tooltip>
                    </a>
                  )}
                </div>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function Vacations() {
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
    getVacations(setVacationList, 1);
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
    <Box>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">요청 종류</TableCell>
              <TableCell align="center">휴가 시작일</TableCell>
              <TableCell align="center">휴가 종료일</TableCell>
              <TableCell align="center">신청 일자</TableCell>
              <TableCell />
              <TableCell align="right">승인 상태</TableCell>
              <TableCell />
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
    </Box>
  );
}
