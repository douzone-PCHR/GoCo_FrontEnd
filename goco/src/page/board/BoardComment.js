import * as React from 'react';
import styles from '../../CSS/board/NoticeBoard.module.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { BoardCommentButton } from '../../component/Board/BoardCSS';
import TextField from '@mui/material/TextField';
import { GetAllCommentAPI, CommentInsertAPI } from '../../api/commentAPI';
import BoardCommentShowAll from './BoardCommentShowAll';
export default function BoardComment({ boardId, whoAmI, commentData }) {
  const [comment, setComment] = React.useState({
    boardId: boardId,
    empid: whoAmI,
    commentContent: '',
  }); // insert시 데이터가 저장 되는 곳

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
    console.log('comment : ', comment);
  };

  return (
    <>
      {commentData &&
        commentData.map((comment) => (
          <BoardCommentShowAll key={comment.commentId} comment={comment} whoAmI={whoAmI} />
        ))}
      {/* -------------------------------위까지 뎃글내용들-=---------------------------------- */}
      <div className={styles.CommentWriteOutter}>
        <div className={styles.CommentWriteText}>댓글 쓰기</div>
        <Grid container>
          <Grid item xs={12} sm={10}>
            <TextField
              fullWidth
              multiline
              name="commentContent"
              rows={2}
              placeholder="댓글을 작성해 주세요."
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              type="submit"
              variant="contained"
              sx={BoardCommentButton}
              onClick={() => {
                CommentInsertAPI(comment);
              }}>
              등록
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
