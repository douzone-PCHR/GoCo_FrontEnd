import * as api from './index';
import { setCookie } from './authAPI';
import {
  sweetAlert2,
  sweetAlertSuccess,
  sweetAlertComment,
} from '../component/auth/AuthSweetAlert.js/sweetAlert2';
// 리프레쉬토큰으로 엑세스토큰 받아오는 것
export const getAccessTokenAPI = async () => {
  await api
    .getAccessToken()
    .then((response) => {
      console.log('accesstoken 함수의 리스펀스 : ', response);
      if (response.statusText === 'OK') {
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log('accesstoken 함수의 error : ', error);
    });
};
// 로그인 하는 것
export const loginAPI = async (id, password) => {
  await api
    .getLogin({
      empId: id,
      password: password,
    })
    .then((response) => {
      const expires = new Date(response.data.tokenExpiresIn); //axios로 유효시간을 받아오는것
      setCookie('accessToken', response.data.accessToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
        expires,
      });
      sweetAlertSuccess('로그인 성공', 'success', '/goco');
    })
    .catch(() => {
      sweetAlert2('아이디 혹은 비밀번호가 잘못 입력되었습니다.', 'warning');
    });
};
// 아이디 찾을 때 이메일 보내는 함수
export const FindIdAPI = async (name, email, handleOpen, handleClose) => {
  handleOpen(); // 모달창 띄우는 함수
  await api
    .getFindId({
      name: name,
      email: email,
    })
    .then((response) => {
      handleClose(); // 모달창 끄는 함수
      sweetAlert2(response.data, 'success');
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning');
      handleClose(); // 모달을 끄는 함수
    });
};
// 아이디 찾을 때 인증 번호 확인하는 함수
export const AuthCheckAPI = async (authNum, email, setId) => {
  await api
    .getAuthCheck({
      authenticationNumber: authNum,
      email: email,
    })
    .then((response) => {
      if (response.data === '올바른 인증번호를 입력하세요.') {
        sweetAlert2(response.data, 'warning');
      } else if (response.data === '인증 번호가 3회이상 잘못 입력되었습니다. 재인증 바랍니다.') {
        sweetAlert2(response.data, 'warning');
      } else {
        setId(response.data);
      }
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning');
    });
};
//pwd 찾기위해 인증번호 보내는 함수
export const FindPwdAPI = async (empId, email, handleOpen, handleClose) => {
  handleOpen(); // 메일 보내는 중 표시하는 것
  await api
    .getFindPwd({
      empId: empId,
      email: email,
    })
    .then((response) => {
      sweetAlert2(response.data, 'success');
      handleClose(); // pwd확인을 위해 인증번호가 정상 발송되면 '메일보내는 중' 을 끈다
    })
    .catch((error) => {
      handleClose(); // 에러이면 '메일보내는 중' 을 끈다
      sweetAlert2(error.response.data.message, 'warning'); // 메일 보내는 중 에러가 뜨면 에러 open 한다.
    });
};
// 인증 번호로 새로운 비번 받는 함수
export const FindPasswordAPI = async (authNum, email, handleOpen, handleClose) => {
  handleOpen(); //인증번호가 맞을 경우 '메일 보내는 중' 이라고 뜨게 만든다.
  if ((email === '') | (email === null) | (email === undefined)) {
    handleClose(); // 이메일이 입력되지 않았으면'메일보내는중 '메시지 끈다
    sweetAlert2('이메일을 입력해 주세요.', 'warning');
    return;
  }
  await api
    .getFindPassword({
      authenticationNumber: authNum,
      email: email,
    })
    .then((response) => {
      handleClose();
      if (
        (response.data === '올바른 인증번호를 입력하세요.') |
        (response.data === '인증 번호가 3회이상 잘못 입력되었습니다. 재인증 바랍니다.')
      ) {
        sweetAlert2(response.data, 'warning');
      } else if (response.data === '이메일로 비밀번호가 발송 되었습니다.') {
        sweetAlertSuccess(response.data, 'success', '/login');
      }
    })
    .catch((error) => {
      handleClose(); // 에러이면 '메일보내는중 '메시지 끈다
      sweetAlert2(error.response.data.message, 'warning');
    });
};
//ID 중복 체크
export const IDCheck = async (data, setOkIdCheck, setSignupDataError) => {
  if (data.empId === '') {
    sweetAlert2('아이디 값이 입력되지 않았습니다.', 'warning');
    return;
  }
  await api
    .getIDCheck(data)
    .then((response) => {
      setOkIdCheck(response.data); // 중복되지 않을 때 true가 담김
      if (response.data === true) {
        sweetAlert2('가입 가능 합니다.', 'success');
        setSignupDataError({ ...data, valid_empId: '' });
        setOkIdCheck(true);
      } else {
        sweetAlert2('아이디가 이미 존재 합니다.', 'warning');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
// 회원 가입시 유효한 이메일인지 확인하는 것
export const SendEmailForSignUpAPI = async (email, handleOpen, handleClose, setAuthNumberOpen) => {
  handleOpen();
  await api
    .getSendEmailForSignUp({
      email: email,
    })
    .then((response) => {
      handleClose();
      sweetAlert2(response.data, 'success');
      setAuthNumberOpen(true);
    })
    .catch((error) => {
      handleClose();
      sweetAlert2(error.response.data.message, 'warning');
    });
};
// 회원 가입시 이메일 인증번호 확인하는 것
export const CheckAuthForSignUpAPI = async (data, setOkEmailCheck, setSignupDataError) => {
  await api
    .getCheckAuthForSignUp({
      authenticationNumber: data.authenticationNumber,
      email: data.email,
    })
    .then((response) => {
      if (
        (response.data === '올바른 인증번호를 입력하세요.') |
        (response.data === '인증 번호가 3회이상 잘못 입력되었습니다. 재인증 바랍니다.')
      ) {
        sweetAlert2(response.data, 'warning');
      } else if (data.authenticationNumber == response.data) {
        sweetAlert2('인증에 성공하였습니다.', 'success');
        setOkEmailCheck(true);
        setSignupDataError({ ...data, valid_email: '' });
      }
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning');
    });
};
// 회원 가입시 unit 불러오기
export const getUnitAPI = (setUnit) => {
  api.getUnit().then((response) => {
    setUnit(response.data);
  });
};
//회원 가입 버튼
export const signupAPI = (data, setSignupDataError) => {
  const signupData = {
    empId: data.empId,
    password: data.password,
    name: data.name,
    phoneNumber: data.phoneNumber,
    email: data.email,
    hiredate: data.hiredate,
    unit: {
      unitId: data.unit,
    },
  };
  api
    .getSignup(signupData)
    .then((response) => {
      if (response.data.email === data.email) {
        sweetAlertSuccess('가입 성공', 'success', '/login');
      } else {
        setSignupDataError({
          valid_email: response.data.valid_email,
          valid_empId: response.data.valid_empId,
          valid_name: response.data.valid_name,
          valid_password: response.data.valid_password,
          valid_phoneNumber: response.data.valid_phoneNumber,
        });
      }
    })
    .catch((error) => {
      if (error.response.data) {
        sweetAlert2(error.response.data.message, 'warning');
        console.log(error);
      }
    });
};
// 공지사항 받아오기
export const NoticeBoardAPI = async (setData, setShowData) => {
  await api
    .getNoticeBoard()
    .then((response) => {
      setData(response.data);
      setShowData(response.data);
    })
    .catch((error) => {
      console.log(`NoticeBoardAPI 에러 발생 : ${error}`, 'error');
    });
};
// 자유게시판 받아오기
export const FreeBoardAPI = async (setData, setShowData) => {
  await api
    .getFreeBoard()
    .then((response) => {
      setData(response.data);
      setShowData(response.data);
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 게시글 작성
export const BoardInsertAPI = async (insertData) => {
  if ((insertData.boardTitle === '') | (insertData.boardContent === '')) {
    sweetAlert2('제목과 내용은 필수 입력 사항입니다.', 'warning');
    return;
  }
  await api
    .getBoardInsert(insertData)
    .then(() => {
      sweetAlertSuccess('작성이 완료되었습니다.', 'success', '/board');
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 게시글 수정
export const BoardUpdateAPI = async (updateData, boardId) => {
  if ((updateData.boardTitle === '') | (updateData.boardContent === '')) {
    sweetAlert2('제목과 내용은 필수 입력 사항입니다.', 'warning');
    return;
  }
  await api
    .getBoardUpdate(updateData, boardId)
    .then(() => {
      sweetAlertSuccess('수정이 완료되었습니다.', 'success', '/board');
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 게시글 상세 보기
export const BoardSelectAPI = async (boardId, setData) => {
  await api
    .getBoardSelect(boardId)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 게시글 삭제
export const deleteBoardAPI = async (boardId) => {
  await api
    .getDeleteBoard(boardId)
    .then((response) => {
      sweetAlertSuccess('게시글이 삭제되었습니다.', 'success', '/board');
    })
    .catch((error) => {
      sweetAlert2(`${error.response.data.message}`, 'warning');
    });
};
// 모든 댓글 받아오기
export const GetAllCommentAPI = async (boardId, setCommentData) => {
  await api
    .getGetAllComment(boardId)
    .then((response) => {
      console.log(response.data);
      setCommentData(response.data);
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 댓글 입력
export const CommentInsertAPI = async (comment) => {
  if (comment.commentContent === '') {
    sweetAlert2('댓글 내용은 반드시 입력되어야 합니다.', 'warning');
    return;
  }
  await api
    .getCommentInsert(comment)
    .then((response) => {
      sweetAlertComment('댓글이 입력되었습니다.', 'success', `/boardselect/${comment.boardId}`);
    })
    .catch((error) => {
      sweetAlert2(`에러 발생 : ${error}`, 'error');
    });
};
// 댓글 삭제
export const CommentDeleteAPI = async (comment) => {
  await api
    .getCommentDelete(comment)
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
export const CommentUpdateAPI = async (comment, commentContent) => {
  if (
    (commentContent.commentContent === '') |
    (commentContent.commentContent === null) |
    (commentContent.commentContent === undefined)
  ) {
    sweetAlert2('댓글 내용은 반드시 입력되어야 합니다.', 'warning');
    return;
  }
  await api
    .getCommentUpdate(comment, commentContent)
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
////// 회원 삭제
export const deleteEmpAPI = async () => {
  await api
    .getDeleteEmp()
    .then((response) => {
      if (response.data) {
        api.logOut();
        // deleteCookie(); //쿠키삭제
        sweetAlertSuccess('탈퇴 성공', 'success', '/login');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
////// 내가누군지 알려주는 것  userMe / empNum 반환해줌
export const WhoAmIAPI = async (setWhoAmI) => {
  await api.getWhoAmI().then((response) => {
    setWhoAmI(response.data.empNum);
  });
};
////회원 비번 변경
export const pwdChangeAPI = async (textData) => {
  const text = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=*()]).*$/;
  if (
    (textData.password1 === '') |
    (textData.password1 === undefined) |
    !text.test(textData.password1)
  ) {
    sweetAlert2('비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.', 'warning');
    return;
  }
  await api
    .getPwdChange({
      password: textData.password1,
      password2: textData.password2,
    })
    .then((response) => {
      if (response.data === 1) {
        sweetAlertSuccess('변경 성공', 'success', '/userupdate');
      } else {
        sweetAlert2('변경 실패', 'warning');
      }
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning'); // 로그인 시간지낫거나, 토큰이 잘못됫을 꼉우
    });
};
// 회원 이메일 변경
export const changeEmailAPI = async (textData) => {
  const text =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if ((textData.email === '') | (textData.email === undefined) | !text.test(textData.email)) {
    sweetAlert2('이메일 형식이 올바르지 않습니다.', 'warning');
    return;
  }
  await api
    .getChangeEmail({
      email: textData.email,
    })
    .then((response) => {
      if (response.data === 1) {
        sweetAlertSuccess('변경 성공', 'success', '/userupdate');
      } else {
        sweetAlert2('변경 실패', 'warning');
      }
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning'); // 로그인 시간지낫거나, 토큰이 잘못됫을 꼉우
    });
};
// 회원 번호 변경
export const changePhoneNumberAPI = async (textData) => {
  const text = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
  if (
    (textData.phoneNumber === '') |
    (textData.phoneNumber === undefined) |
    !text.test(textData.phoneNumber)
  ) {
    sweetAlert2('핸드폰 번호 형식이 올바르지 않습니다.(10~11자리 입력)', 'warning');
    return;
  }
  await api
    .getChangePhoneNumber({
      phoneNumber: textData.phoneNumber,
    })
    .then((response) => {
      if (response.data === 1) {
        sweetAlertSuccess('변경 성공', 'success', '/userupdate');
      } else {
        sweetAlert2('변경 실패', 'warning');
      }
    })
    .catch((error) => {
      sweetAlert2(error.response.data.message, 'warning'); // 로그인 시간지낫거나, 토큰이 잘못됫을 꼉우
    });
};
// 로그아웃
export const logOutAPI = async () => {
  await api
    .logOut()
    .then((response) => {
      if (response.data === 1) {
        window.location.href = '/login';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
// 쿠키삭제 요청
export const deleteCookieAPI = async () => {
  await api
    .logOut()
    .then((response) => {
      if (response.data === 1) {
        console.log('로그인 이동됨, 쿠키 정상 삭제');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
//////회원 정보확인 userMe
export const userMeAPI = async (setData) => {
  await api
    .userMe()
    .then((response) => {
      localStorage.setItem('authority', response.data.authority);
      setData(response.data);
    })
    .catch((error) => {
      if (error.response.data.message === '403') {
        window.location.href = '/login';
      }
    });
};
