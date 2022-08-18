import Swal from 'sweetalert2';
import { deleteEmpAPI } from '../../../api/employeeAPI';
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
