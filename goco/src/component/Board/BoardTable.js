import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BoardTitleStyles, ClickBoard, StyledTableCell, StyledTableRow } from './BoardCSS';
import { SelectBoard } from './BoardFunction';
export default function BoardTable({ showData, _DATA, DATE }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, borderTop: '2px solid #00AAFF' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={BoardTitleStyles} align="center">
                번호
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 'bold', fontSize: '100%' }} align="center">
                제목
              </StyledTableCell>
              <StyledTableCell sx={BoardTitleStyles} align="center">
                작성자
              </StyledTableCell>
              <StyledTableCell sx={BoardTitleStyles} align="center">
                작성 일자
              </StyledTableCell>
              <StyledTableCell sx={BoardTitleStyles} align="center">
                조회수
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showData &&
              _DATA.currentData().map((list) => (
                <StyledTableRow
                  key={list.boardId}
                  sx={ClickBoard}
                  onClick={() => {
                    SelectBoard(list.boardId);
                  }}>
                  <StyledTableCell align="center">{list.boardId}</StyledTableCell>
                  <StyledTableCell align="center">{list.boardTitle}</StyledTableCell>
                  <StyledTableCell align="center">{list.employee.name}</StyledTableCell>
                  <StyledTableCell align="center">{DATE(list.registeredDate)}</StyledTableCell>
                  <StyledTableCell align="center">{list.count}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
