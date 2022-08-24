import * as React from 'react';
import { useParams } from 'react-router-dom';
import { BoardSelectAPI } from '../../api/boardAPI';
import styles from '../../CSS/board/NoticeBoard.module.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Editor from '../../component/Board/ShowEditorComponent';
import { BoardTypeStyle, BoardButtonStyle } from '../../component/Board/BoardCSS';
import { UpdateBoard } from '../../component/Board/BoardFunction';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs'; // 작성일자때문에 넣음

export default function BoardSelect() {
  const boardId = useParams().boardId;
  const [data, setData] = React.useState();

  React.useEffect(() => {
    BoardSelectAPI(boardId, setData);
  }, []);
  return (
    <div>
      {data && (
        <div className={styles.OutterBox}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} sx={{ fontSize: '80%' }}>
              등록일 : {dayjs(data.registeredDate).format('YYYY-MM-DD HH:mm:ss')}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ fontSize: '80%', textAlign: 'right' }}>
              조회수 : {data.count} | 댓글 : {data.comments === null ? '0' : data.comments}
            </Grid>
            <Grid item xs={12} sx={BoardTypeStyle}>
              {data.boardType === 0 ? '공지 게시판' : '자유 게시판'}
            </Grid>
            <Grid item xs={12}>
              <div>작성자</div>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth value={data.employee.name} />
            </Grid>
            <Grid item xs={12}>
              <div>제목</div>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth value={data.boardTitle} />
            </Grid>
            <Grid item xs={12}>
              <div>내용</div>
            </Grid>
            <Grid item xs={12}>
              <Editor value={data.boardContent} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                sx={BoardButtonStyle}
                onClick={() => {
                  UpdateBoard(data.boardId);
                }}>
                게시글 수정
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
              <Button
                type="submit"
                variant="contained"
                sx={BoardButtonStyle}
                onClick={() => {
                  window.location.href = '/board';
                }}>
                돌아가기
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
