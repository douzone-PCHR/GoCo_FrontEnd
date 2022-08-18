import Swal from 'sweetalert2';

export const deleteConfirm = (title, content) => {
  return Swal.fire({
    title: title,
    text: '',
    icon: 'warning',

    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
    confirmButtonColor: '#00aaff', // confrim 버튼 색깔 지정
    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
    confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
    cancelButtonText: '취소', // cancel 버튼 텍스트 지정

    reverseButtons: true, // 버튼 순서 거꾸로
  });
};

export const confirm = (title, content) => {
  return Swal.fire({
    title: title,
    text: '',
    icon: 'warning',

    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
    confirmButtonColor: '#00aaff', // confrim 버튼 색깔 지정
    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
    confirmButtonText: '확인', // confirm 버튼 텍스트 지정
    cancelButtonText: '취소', // cancel 버튼 텍스트 지정

    reverseButtons: true, // 버튼 순서 거꾸로
  });
};

export const addConfirm = (title, content) => {
  return Swal.fire({
    title: title,
    text: '',
    icon: 'warning',

    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
    confirmButtonColor: '#00aaff', // confrim 버튼 색깔 지정
    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
    confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
    cancelButtonText: '취소', // cancel 버튼 텍스트 지정

    reverseButtons: true, // 버튼 순서 거꾸로
  });
};
