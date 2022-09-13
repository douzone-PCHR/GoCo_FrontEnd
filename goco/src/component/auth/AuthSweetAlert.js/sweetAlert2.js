import Swal from 'sweetalert2';
import { deleteBoardAPI, deleteEmpAPI, getAccessTokenAPI, logOutAPI } from '../../../api/AllAPI';
export const sweetAlert2 = (text, icon) => {
  Swal.fire({
    text: text,
    icon: icon,
    confirmButtonColor: '#3085d6',
  });
};
export const sweetAlertSuccess = (text, icon, url) => {
  Swal.fire({
    text: text,
    icon: icon,
    confirmButtonColor: '#3085d6',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = url;
    }
  });
};
export const sweetAlertDeleteUser = () => {
  Swal.fire({
    title: '정말 탈퇴 하시겠습니까?',
    text: '탈퇴 클릭시 다시 되돌릴 수 없습니다.',
    icon: 'warning',

    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
    confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
    confirmButtonText: '탈퇴', // confirm 버튼 텍스트 지정
    cancelButtonText: '취소', // cancel 버튼 텍스트 지정
  }).then((result) => {
    // 만약 Promise리턴을 받으면,
    if (result.isConfirmed) {
      // 만약 모달창에서 confirm 버튼을 눌렀다면
      deleteEmpAPI(); //회원 탈퇴 api
    }
  });
};

export const sweetAlertDeleteBoard = (boardId) => {
  Swal.fire({
    title: '정말 삭제 하시겠습니까?',
    text: '삭제 클릭시 다시 되돌릴 수 없습니다.',
    icon: 'warning',

    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
    confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
    confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
    cancelButtonText: '취소', // cancel 버튼 텍스트 지정
  }).then((result) => {
    // 만약 Promise리턴을 받으면,
    if (result.isConfirmed) {
      // 만약 모달창에서 confirm 버튼을 눌렀다면
      deleteBoardAPI(boardId); //회원 탈퇴 api
    }
  });
};
// 댓글 삭제 , 입력시 주소 이동하는 것
export const sweetAlertComment = (text, icon, url) => {
  Swal.fire({
    text: text,
    icon: icon,
    confirmButtonColor: '#3085d6',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.replace(url);
    }
  });
};
// 쿠키 재발급 관련 alert
export const sweetAlertCookie = () => {
  Swal.fire({
    title: '로그인 시간이 만료되었습니다.',
    text: '로그인 시간을 연장하시겠습니까?',
    icon: 'warning',

    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
    confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
    confirmButtonText: '연장', // confirm 버튼 텍스트 지정
    cancelButtonText: '취소', // cancel 버튼 텍스트 지정
  }).then((result) => {
    // 만약 Promise리턴을 받으면,
    if (result.isConfirmed) {
      // 만약 모달창에서 confirm 버튼을 눌렀다면
      getAccessTokenAPI();
    } else {
      logOutAPI();
    }
  });
};
