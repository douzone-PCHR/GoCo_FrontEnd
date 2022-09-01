import axios from 'axios';
import { sweetAlert2, sweetAlertComment } from '../component/auth/AuthSweetAlert.js/sweetAlert2';
import { getCookie } from './authAPI';

// 모든 댓글 받아오기
const urlCommentAll = '/api/user/comment';
export const GetAllCommentAPI = async (boardId, setCommentData) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    url: `${urlCommentAll}/${boardId}`,
  };
  await axios(options)
    .then((response) => {
      console.log(response.data);
      setCommentData(response.data);
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 댓글 입력
const urlCommentInsert = '/api/user/comment';
export const CommentInsertAPI = async (comment) => {
  if (comment.commentContent === '') {
    sweetAlert2('댓글 내용은 반드시 입력되어야 합니다.', 'warning');
    return;
  }
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    data: {
      commentContent: comment.commentContent,
    },
    url: `${urlCommentInsert}/${comment.empid}/${comment.boardId}`,
  };
  await axios(options)
    .then((response) => {
      sweetAlertComment('댓글이 입력되었습니다.', 'success', `/boardselect/${comment.boardId}`);
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 댓글 삭제
const urlCommentDelete = '/api/user/comment';
export const CommentDeleteAPI = async (comment) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    url: `${urlCommentDelete}/${comment.commentId}`,
  };
  await axios(options)
    .then((response) => {
      sweetAlertComment(
        '댓글이 삭제되었습니다.',
        'success',
        `/boardselect/${comment.boardDto.boardId}`
      );
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 댓글 업데이트
const urlCommentUpdate = '/api/user/comment';
export const CommentUpdateAPI = async (comment, commentContent) => {
  if (
    (commentContent.commentContent === '') |
    (commentContent.commentContent === null) |
    (commentContent.commentContent === undefined)
  ) {
    sweetAlert2('댓글 내용은 반드시 입력되어야 합니다.', 'warning');
    return;
  }
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    data: commentContent,
    url: `${urlCommentUpdate}/${comment.commentId}`,
  };
  await axios(options)
    .then((response) => {
      sweetAlertComment(
        '댓글이 수정되었습니다.',
        'success',
        `/boardselect/${comment.boardDto.boardId}`
      );
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
