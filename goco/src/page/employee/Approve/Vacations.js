import React, { useState, Fragment } from 'react';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import * as api from '../../../api';
import { deleteConfirm, resultConfirm } from '../../../common/confirm';
import { Chip, TablePagination, Tooltip } from '@mui/material';
import moment from 'moment';

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
const approveType = {
  APPROVE_WAITTING: '결재대기',
  APPROVE_SUCCESS: '결재승인',
  APPROVE_REFUSE: '결재반려',
  APPROVE_CANCEL: '승인취소',
};

function Row(props) {
  const { row, check, setCheck } = props;
  const [open, setOpen] = useState(false);
  row.startDate = moment(row.startDate).tz('Asia/Seoul').format('YYYY-MM-DD');
  row.endDate = moment(row.endDate).tz('Asia/Seoul').format('YYYY-MM-DD');
  row.requestDate = moment(row.requestDate).tz('Asia/Seoul').format('YYYY-MM-DD');
  return (
    <Fragment>
      <TableRow>
        {/* <TableCell component="th" scope="row"> */}
        <TableCell />
        <TableCell align="center">{row.type}</TableCell>
        <TableCell align="center">{row.startDate}</TableCell>
        <TableCell align="center">{row.endDate}</TableCell>
        <TableCell align="center">{row.requestDate}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">
          {approveType[row.approve] === '결재대기' && (
            <Chip color="primary" label={approveType[row.approve]} />
          )}
          {approveType[row.approve] === '결재승인' && (
            <Chip color="success" label={approveType[row.approve]} />
          )}
          {approveType[row.approve] === '결재반려' && (
            <Chip color="error" label={approveType[row.approve]} />
          )}

          {approveType[row.approve] === '승인취소' && (
            <Chip color="default" label={approveType[row.approve]} />
          )}
        </TableCell>

        <TableCell>
          {row.approve === 'APPROVE_WAITTING' ? (
            <Tooltip title="삭제">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  deleteConfirm(
                    '신청 내역을 삭제 하시겠습니까?',
                    '',
                    document.getElementById('modal2')
                  ).then((result) => {
                    if (result.isConfirmed) {
                      resultConfirm(
                        '신청 내역이 삭제되었습니다',
                        '',
                        'success',
                        document.getElementById('modal2')
                      )
                        .then((result) => {
                          api.deleteVacation(row.vacation).then(() => {
                            setCheck(!check);
                          });
                        })
                        .catch();
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
                기안 상세
              </Typography>
              <Box>
                <div>{row.detail.content}</div>
                <div>
                  {row.detail.approveDate && '결재일: ' + row.detail.approveDate.split('T')[0]}
                </div>

                <div>
                  {row.detail.file && row.detail.file.originalName}
                  {row.detail.file && (
                    <IconButton
                      color="primary"
                      onClick={() =>
                        api.fileDownload(row.detail.file.filePath, row.detail.file.originalName)
                      }>
                      <SimCardDownloadOutlinedIcon align="bottom"></SimCardDownloadOutlinedIcon>
                    </IconButton>
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

export default function Vacations({
  page,
  setPage,
  vacationList,
  check,
  setCheck,
  state,
  dateFilter,
  setCheckOpen,
}) {
  // const [vacationList, setVacationList] = useState([]);
  // const [check, setCheck] = useState(false);
  // const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // useEffect(() => {
  //   getVacations(setVacationList, 1);
  // }, [check]);
  const rows = [];
  if (vacationList.length) {
    // vacationList는 초기에 전체 데이터를 가지고있음
    // filter로 state가 ALL일 때는 그대로 리턴을 하고
    // state에 다른 값이 들어왔을 때 해당하는 요청 상태에
    // 맞는 vacationList로 새로운 배열을 만듦
    vacationList
      .filter((vacation) => {
        if (dateFilter) {
          if (
            state === 'ALL' &&
            vacation.vacationRequestDate >= dateFilter.startDate &&
            vacation.vacationRequestDate <= dateFilter.endDate
          ) {
            return vacation;
          } else if (
            vacation.approveYn === state &&
            vacation.vacationRequestDate >= dateFilter.startDate &&
            vacation.vacationRequestDate <= dateFilter.endDate
          ) {
            return vacation;
          }
        } else {
          if (state === 'ALL') {
            return vacation;
          } else if (vacation.approveYn === state) {
            return vacation;
          }
        }
      })
      .map((vacation) => {
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
  return (
    <Box>
      <TableContainer component={Paper} sx={{ maxHeight: 600, minWidth: 1000 }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">휴가 종류</TableCell>
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
            ).map((row, index) => {
              return <Row key={index} row={row} check={check} setCheck={setCheck} />;
            })}
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
