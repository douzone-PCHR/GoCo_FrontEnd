import * as React from 'react';
import { useParams } from 'react-router-dom';
import { BoardSelectAPI } from '../../api/boardAPI';
import styles from '../../CSS/board/NoticeBoard.module.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Editor from '../../component/Board/UpdateEditorComponent';
import { BoardTypeStyle, BoardButtonStyle } from '../../component/Board/BoardCSS';
import { sweetAlertDeleteBoard } from '../../component/auth/AuthSweetAlert.js/sweetAlert2';
import { errorCheck } from '../../component/Board/BoardFunction';
import { BoardUpdateAPI } from '../../api/boardAPI';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs'; // 작성일자때문에 넣음
import { WhoAmIAPI } from '../../api/employeeAPI';
import { GetAllCommentAPI } from '../../api/commentAPI';
export default function BoardUpdate() {
  const boardId = useParams().boardId;
  const [data, setData] = React.useState();
  const [whoAmI, setWhoAmI] = React.useState();
  const [commentData, setCommentData] = React.useState(); // 모든 댓글 가져오는 것
  const onEditorChange = (value) => {
    setData({ ...data, boardContent: value });
  }; // 내용 받아오기
  const handleChange = (event) => {
    // 제목, 게시판타입 받아오는것
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const BoardUpdateFunc = () => {
    // insert할 데이터를 작성해줌
    let updateData = {
      boardTitle: data.boardTitle,
      boardContent: data.boardContent,
    };
    BoardUpdateAPI(updateData, boardId);
  };

  React.useEffect(() => {
    WhoAmIAPI(setWhoAmI);
    BoardSelectAPI(boardId, setData);
    GetAllCommentAPI(boardId, setCommentData); // 모든 댓글 받아오는것
  }, []);
  React.useEffect(() => {
    errorCheck(data, whoAmI); //본인이 아닌 다른사람이 수정을 하려할 경우 에러 창을 표시해준다.
  }, [data]);

  return (
    <div>
      {commentData && data && (
        <div className={styles.OutterBox}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} sx={{ fontSize: '80%' }}>
              등록일 : {dayjs(data.registeredDate).format('YYYY-MM-DD HH:mm:ss')}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ fontSize: '80%', textAlign: 'right' }}>
              조회수 : {data.count} | 댓글 : {commentData.length}
            </Grid>
            <Grid item xs={12} sx={BoardTypeStyle}>
              {data.boardType === 0 ? '공지 게시판' : '자유 게시판'}
            </Grid>
            <Grid item xs={12}>
              <div>작성자</div>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth value={`${data.employee.name} ( ${data.employee.empId} )`} />
            </Grid>
            <Grid item xs={12}>
              <div>제목</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={data.boardTitle}
                name="boardTitle"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <div>내용</div>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: '5%' }}>
              <Editor value={data.boardContent} onChange={onEditorChange} />
            </Grid>
          </Grid>
          <Grid container sx={{ textAlign: 'center' }}>
            <Grid item xs={12} sm={4} sx={{ textAlign: 'left' }}>
              <Button
                type="submit"
                variant="contained"
                sx={BoardButtonStyle}
                onClick={BoardUpdateFunc}>
                저장
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                variant="contained"
                sx={BoardButtonStyle}
                onClick={() => {
                  sweetAlertDeleteBoard(data.boardId);
                }}>
                게시글 삭제
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
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
