import react, { useState, useEffect, Fragment } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import { checkBusiness, deleteBusinessTrip, getBusinessTrip } from '../../../api/businessTripAPI';
import Swal from 'sweetalert2';
import { confirm, deleteConfirm, resultConfirm } from '../../../common/confirm';
import { Chip, TablePagination, Tooltip } from '@mui/material';

function createData(startDate, endDate, requestDate, approve, detail, business) {
  return {
    startDate,
    endDate,
    requestDate,
    approve,
    detail,
    business,
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

  return (
    <Fragment>
      <TableRow>
        {/* <TableCell component="th" scope="row"> */}
        <TableCell></TableCell>
        <TableCell align="center">{row.startDate.split('T')[0]}</TableCell>
        <TableCell align="center">{row.endDate.split('T')[0]}</TableCell>
        <TableCell align="center">{row.requestDate.split('T')[0]}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">
          {' '}
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
                      ).then(() => {
                        deleteBusinessTrip(row.business, check, setCheck);
                      });
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} textAlign={'center'}>
              <Typography variant="h6" gutterBottom component="div">
                기안 상세
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
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
export default function BusinessTrips({
  page,
  setPage,
  businessList,
  check,
  setCheck,
  state,
  dateFilter,
}) {
  // const [businessList, setBusinessList] = useState([]);
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
  //   getBusinessTrip(setBusinessList, 1);
  // }, [check]);
  const rows = [];
  if (businessList.length) {
    console.log(businessList);
    businessList
      .filter((business) => {
        if (dateFilter) {
          if (
            state === 'ALL' &&
            business.businessTripRequestDate >= dateFilter.startDate &&
            business.businessTripRequestDate <= dateFilter.endDate
          ) {
            return business;
          } else if (
            business.approveYn === state &&
            business.businessTripRequestDate >= dateFilter.startDate &&
            business.businessTripRequestDate <= dateFilter.endDate
          ) {
            return business;
          }
        } else {
          if (state === 'ALL') {
            return business;
          } else if (business.approveYn === state) {
            return business;
          }
        }
      })
      .map((business) => {
        let detail = {
          content: business.businessTripContent,
          approveDate: business.businessTripApproveDate,
          file: business.file,
        };
        rows.push(
          createData(
            business.businessTripStartDate,
            business.businessTripEndDate,
            business.businessTripRequestDate,
            business.approveYn,
            detail,
            business
          )
        );
      });
  }
  return (
    <TableContainer component={Paper} sx={{ marginTop: '5%', maxHeight: 600, minWidth: 1000 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">출장 시작일</TableCell>
            <TableCell align="center">출장 종료일</TableCell>
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
  );
}
