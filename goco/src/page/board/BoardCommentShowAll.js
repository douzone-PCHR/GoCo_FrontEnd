import React, { useState } from 'react';
import styles from '../../CSS/board/NoticeBoard.module.css';
import { BoardCommentDeleteButton, BoardCommentUpdateButton } from '../../component/Board/BoardCSS';
import Button from '@mui/material/Button';
import { CommentDeleteAPI, CommentUpdateAPI } from '../../api/AllAPI';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs'; // 작성일자때문에 넣음
export default function BoardCommentShowAll({ comment, whoAmI }) {
  const [updateText, setUpdateText] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  return (
    <>
      <div className={styles.CommentOutter}>
        <div className={styles.CommentText}>
          <div className={styles.CommentName}>
            {comment.employeeDto.name} ( {comment.employeeDto.empId} )
          </div>
          <div className={styles.CommentRegisterDate}>
            등록일시 : {dayjs(comment.registeredDate).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        </div>
        {updateText ? (
          <>
            <TextField
              sx={{ width: '83%' }}
              multiline
              rows={2}
              placeholder="수정할 댓글을 작성해 주세요."
              onChange={(e) => {
                setCommentContent({ commentContent: e.target.value });
              }}
            />
            <div className={styles.BoardCommentDeleteButton}>
              <Button
                variant="contained"
                sx={BoardCommentUpdateButton}
                onClick={() => {
                  setUpdateText(false);
                }}>
                취소
              </Button>
              <Button
                variant="contained"
                sx={BoardCommentDeleteButton}
                onClick={() => {
                  CommentUpdateAPI(comment, commentContent);
                }}>
                저장
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.CommentContent}>{comment.commentContent}</div>
            {comment.employeeDto.empNum === whoAmI && (
              <div className={styles.BoardCommentDeleteButton}>
                <Button
                  variant="contained"
                  sx={BoardCommentUpdateButton}
                  onClick={() => {
                    setUpdateText(true);
                  }}>
                  수정
                </Button>
                <Button
                  variant="contained"
                  sx={BoardCommentDeleteButton}
                  onClick={() => {
                    CommentDeleteAPI(comment);
                  }}>
                  삭제
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
