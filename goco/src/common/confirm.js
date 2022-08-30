import Swal from 'sweetalert2';
import '../common/confirm.css';

export const deleteConfirm = (title, text, target) => {
  return target
    ? Swal.fire({
        target: target,
        title: title,
        text: text,
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#00aaff', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정

        reverseButtons: true, // 버튼 순서 거꾸로
      })
    : Swal.fire({
        title: title,
        text: text,
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#00aaff', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정

        reverseButtons: true, // 버튼 순서 거꾸로;
      });
};

export const confirm = (title, text, target) => {
  return target
    ? // modal 일 때
      Swal.fire({
        target: target,
        title: title,
        text: text,
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#00aaff', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정

        reverseButtons: true, // 버튼 순서 거꾸로
      })
    : // modal 없을 때
      Swal.fire({
        title: title,
        text: text,
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#00aaff', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정

        reverseButtons: true, // 버튼 순서 거꾸로
      });
};

export const addConfirm = (title, text, target) => {
  return target
    ? Swal.fire({
        target: target,
        title: title,
        text: text,
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#00aaff', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '등록', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정

        reverseButtons: true, // 버튼 순서 거꾸로
      })
    : Swal.fire({
        title: title,
        text: text,
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#00aaff', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '등록', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정

        reverseButtons: true, // 버튼 순서 거꾸로
      });
};

export const resultConfirm = (title, text, icon, target) => {
  return target
    ? Swal.fire({
        target: target,
        title: title,
        text: text,
        icon: icon,

        // showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#00aaff', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        // cancelButtonText: '취소', // cancel 버튼 텍스트 지정]

        reverseButtons: true, // 버튼 순서 거꾸로
      })
    : Swal.fire({
        title: title,
        text: text,
        icon: icon,

        // showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#00aaff', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        // cancelButtonText: '취소', // cancel 버튼 텍스트 지정]

        reverseButtons: true, // 버튼 순서 거꾸로;
      });
};
