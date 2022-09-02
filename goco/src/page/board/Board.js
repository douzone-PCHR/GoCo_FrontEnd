import * as React from 'react';
import styles from '../../CSS/board/NoticeBoard.module.css';
import Pagination from '@mui/material/Pagination';
import { NoticeBoardAPI, FreeBoardAPI } from '../../api/AllAPI';
import SearchBoard from '../../component/Board/SearchBoard';
import BoardSearchInputButton from '../../component/Board/BoardSearchInputButton';
import usePagination from '../../component/Board/Pagination';
import moment from 'moment';
import BoardKategorieButton from '../../component/Board/BoardKategorieButton';
import BoardTable from '../../component/Board/BoardTable';

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
            <BoardKategorieButton pageInfo={pageInfo} setPageInfo={setPageInfo} />
          </div>
        </div>
        &nbsp;
        <BoardSearchInputButton setSearch={setSearch} search={search} />
        <div className={styles.MiddleText}></div>
        {/* ------------------------ 검색 --------------- */}
        {search && <SearchBoard data={data} setShowData={setShowData} DATE={DATE} />}
        <div className={styles.Board}>
          <BoardTable showData={showData} _DATA={_DATA} DATE={DATE} />
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
