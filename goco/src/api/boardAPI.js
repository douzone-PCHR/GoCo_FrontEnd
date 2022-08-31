import axios from 'axios';
import { getCookie } from './authAPI';
import { sweetAlertSuccess, sweetAlert2 } from '../component/auth/AuthSweetAlert.js/sweetAlert2';

// 공지사항 받아오기
const urlNoticeBoard = '/api/user/board/notice';
export const NoticeBoardAPI = async (setData, setShowData) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    url: urlNoticeBoard,
  };
  await axios(options)
    .then((response) => {
      setData(response.data);
      setShowData(response.data);
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 자유게시판 받아오기
const urlFreeBoard = '/api/user/board';
export const FreeBoardAPI = async (setData, setShowData) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    url: urlFreeBoard,
  };
  await axios(options)
    .then((response) => {
      setData(response.data);
      setShowData(response.data);
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 게시글 작성
const urlBoardInsert = '/api/user/board';
export const BoardInsertAPI = async (insertData) => {
  if ((insertData.boardTitle === '') | (insertData.boardContent === '')) {
    sweetAlert2('제목과 내용은 필수 입력 사항입니다.', 'warning');
    return;
  }
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    data: insertData,

    url: urlBoardInsert,
  };
  await axios(options)
    .then(() => {
      sweetAlertSuccess('작성이 완료되었습니다.', 'success', '/board');
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 게시글 수정
const urlBoardUpdate = '/api/user/board';
export const BoardUpdateAPI = async (updateData, boardId) => {
  if ((updateData.boardTitle === '') | (updateData.boardContent === '')) {
    sweetAlert2('제목과 내용은 필수 입력 사항입니다.', 'warning');
    return;
  }
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    data: updateData,
    url: `${urlBoardUpdate}/${boardId}`,
  };
  await axios(options)
    .then(() => {
      sweetAlertSuccess('수정이 완료되었습니다.', 'success', '/board');
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 게시글 상세 보기
const urlBoardSelect = '/api/user/board';
export const BoardSelectAPI = async (boardId, setData) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    url: `${urlBoardSelect}/${boardId}`,
  };
  await axios(options)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 게시글 삭제
const urlBoardDelete = '/api/user/board';
export const deleteBoardAPI = async (boardId) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    url: `${urlBoardDelete}/${boardId}`,
  };
  await axios(options)
    .then((response) => {
      sweetAlertSuccess('게시글이 삭제되었습니다.', 'success', '/board');
    })
    .catch((error) => {
      sweetAlert2(`${error.response.data.message}`, 'warning');
    });
};
