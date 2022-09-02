import * as React from 'react';
import styles from '../../CSS/board/NoticeBoard.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { NoticeBoardAPI, FreeBoardAPI } from '../../api/AllAPI';
import SearchBoard from '../../component/Board/SearchBoard';
import { SelectBoard } from '../../component/Board/BoardFunction';
import { ClickBoard } from '../../component/Board/BoardCSS';
import {
  StyledTableCell,
  StyledTableRow,
  WriteButtonStyles,
  MainButtonStyles1,
  MainButtonStyles2,
  BoardTitleStyles,
} from '../../component/Board/BoardCSS';
import usePagination from '../../component/Board/Pagination';
import moment from 'moment';

export default function Board() {
  const [pageInfo, setPageInfo] = React.useState(false); // false는 공지사항게시판, true는 자유 게시판
  const [data, setData] = React.useState(); // axios를 통해 data를 받아옴
  const [showData, setShowData] = React.useState(); // axios를 통해 data를 받아옴 검색기능을 위해 2개 받아옴
  const [search, setSearch] = React.useState(false);
  //// 페이지 네이션
  let [page, setPage] = React.useState(1);
  const PER_PAGE = 10;
  const dataLength = data && data.length;
  const count = Math.ceil(dataLength / PER_PAGE);
  const _DATA = usePagination(showData && showData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  /// 위로 페이지네이션
  const DATE = (registeredDate) => {
    let date = new Date(registeredDate);
    return moment(date).format('YYYY-MM-DD');
  };

  React.useEffect(() => {
    pageInfo ? FreeBoardAPI(setData, setShowData) : NoticeBoardAPI(setData, setShowData); // 자유게시판을 보여주는지, 공지사항을 보여준느지 css
    setSearch(false);
  }, [pageInfo]);
  return (
    <>
      <div className={styles.OutterBox}>
        <div className={styles.headerBox}>
          <div className={styles.MainText}>
            <Button
              sx={pageInfo === false ? MainButtonStyles1 : MainButtonStyles2} // 버튼 클릭시마다 디자인 바뀜
              onClick={() => setPageInfo(false)}>
              공지사항 게시판
            </Button>
            <Button
              sx={pageInfo === true ? MainButtonStyles1 : MainButtonStyles2} // 버튼 클릭시마다 디자인 바뀜
              onClick={() => setPageInfo(true)}>
              자유 게시판
            </Button>
          </div>
        </div>
        &nbsp;
        <div className={styles.MiddleText}>
          <Button
            onClick={() => {
              setSearch(!search);
            }}
            sx={WriteButtonStyles}>
            <SearchIcon fontSize="small" sx={{ marginRight: '6px' }} />
            검색
          </Button>
          <Button sx={WriteButtonStyles} onClick={() => (window.location.href = '/boardinsert')}>
            <EditIcon fontSize="small" sx={{ marginRight: '6px' }} />
            게시글 등록
          </Button>
        </div>
        {/* ------------------------ 검색 --------------- */}
        {search && <SearchBoard data={data} setShowData={setShowData} DATE={DATE} />}
        <div className={styles.Board}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700, borderTop: '2px solid #00AAFF' }}
              aria-label="customized table">
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
        </div>
        <div className={styles.Pagination}>
          <Pagination
            count={dataLength && count}
            page={page}
            size="large"
            variant="outlined"
            color="primary"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}
