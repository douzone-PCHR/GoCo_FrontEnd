import client from './client';

// -------로그인, 회원가입, 아이디 찾기, 로그인 한 아이디의 정보 (Login.js) ------------
export const loginDefaultValue = () =>
  client({
    url: '/user/me',
    method: 'get',
  });

export const headerData = () =>
  client({
    url: '/user/menu/commute',
    method: 'get',
  });

// -------Main (스케쥴, 주간 근로시간 , 날짜 없는 사내 및 개인 일정 등등) (Schedule.js) ----------

// 출근 퇴근 버튼 클릭 후 근태 관리

export const commuteUpdate = (data) =>
  client({
    url: '/user/commute',
    method: 'put',
    data: data,
  });
// 셀렉트 박스 직원 목록 출력
export const getEmployeeList = () =>
  client({
    url: '/user/work/emplist',
    method: 'get',
  });
// 주간 근로시간
export const commuteTime = () =>
  client({
    url: '/user/commute/time',
    method: 'get',
  });
// 날짜 없는 개인 일정 , 사내일정
export const getWorkListData = () =>
  client({
    url: '/user/work',
    method: 'get',
  });

// 날짜가 있는 개인일정 및 사내일정 empolyee 아이디 값에 따라서 사내일정만 보임
export const workGetData = (getEmpId) =>
  client({
    url: `/user/work/calendar?empId=${getEmpId}`,
    method: 'get',
  });

// 날짜 클릭 후 캘린더 리스트 값 출력

export const dateWorkList = (data, getEmpId) =>
  client({
    url: `/user/work/detail?empId=${getEmpId}`,
    method: 'post',
    data: data,
  });

// 캘린더 리스트 디테일

export const dialogDetailList = (workId) =>
  client({
    url: `/user/work/${workId}`,
    method: 'get',
  });

//캘린더 일정 추가
export const addWork = (data) =>
  client({
    url: `/user/work`,
    method: 'post',
    data: data,
  });

// 캘린더에 일정 값 수정
export const updateWork = (data) =>
  client({
    url: `/user/work`,
    method: 'put',
    data: data,
  });

// 캘린더에 일정 삭제
export const deleteWork = (workId) =>
  client({
    url: `/user/work/${workId}`,
    method: 'delete',
  });

// -------MangerMain (매니저 화면 우리팀 근태 관리 , 공지사항 게시판 , 요청 사항 등등) -------------

// 나의 팀 상태 조회
export const getMyTeamCurrentStatus = () =>
  client({
    url: '/manager/commute/myteam',
    method: 'get',
  });

// 나의 팀 출근 미출근 지각 휴각 갯수
export const getCommuteCheck = () =>
  client({
    url: '/manager/commute',
    method: 'get',
  });

// 요청 사항
export const getRequestList = () =>
  client({
    url: '/manager/vacation/list',
    method: 'get',
  });

// 공지 사항
export const getNoticeList = () =>
  client({
    url: '/user/board/notice',
    method: 'get',
  });

//////////////////////////////이하 로그인 , 보드관련///////////////////////////////// kyj
// 로그인 API
export const getLogin = (data) =>
  client({
    url: '/auth/login',
    method: 'post',
    data: data,
  });
// 아이디 찾기 API
export const getFindId = (data) =>
  client({
    url: '/auth/sendEmailForId',
    method: 'post',
    data: data,
  });
// 아아디 찾기 인증번호
export const getAuthCheck = (data) =>
  client({
    url: '/auth/find/2',
    method: 'post',
    data: data,
  });
// 비번 찾기
export const getFindPwd = (data) =>
  client({
    url: '/auth/sendEmailForPwd',
    method: 'post',
    data: data,
  });
// 인증번호로 새비번 받기
export const getFindPassword = (data) =>
  client({
    url: '/auth/find/3',
    method: 'post',
    data: data,
  });
// 아이디 중복체크
export const getIDCheck = (data) =>
  client({
    url: `/auth/checkInfo?info=${data.empId}`,
    method: 'get',
    data: data,
  });
// 회원 가입시 유효한 이메일인지 확인하는 것
export const getSendEmailForSignUp = (data) =>
  client({
    url: '/auth/sendEmailForEmail',
    method: 'post',
    data: data,
  });
// 회원 가입시 이메일 인증번호 확인하는 것
export const getCheckAuthForSignUp = (data) =>
  client({
    url: '/auth/find/1',
    method: 'post',
    data: data,
  });
///// 회원 가입시 unit 불러오기
export const getUnit = () =>
  client({
    url: '/auth/getAllUnit',
    method: 'get',
  });
/// 회원 가입 버튼
export const getSignup = (signupData) =>
  client({
    url: '/auth/signup',
    method: 'post',
    data: signupData,
  });
/// 공지게시판받기
export const getNoticeBoard = () =>
  client({
    url: '/user/board/notice',
    method: 'get',
  });
/// 자유게시판받기
export const getFreeBoard = () =>
  client({
    url: '/user/board',
    method: 'get',
  });
// 게시글 작성
export const getBoardInsert = (insertData) =>
  client({
    url: '/user/board',
    method: 'post',
    data: insertData,
  });
// 게시글 수정
export const getBoardUpdate = (updateData, boardId) =>
  client({
    url: `/user/board/${boardId}`,
    method: 'put',
    data: updateData,
  });
// 게시글 상세 보기
export const getBoardSelect = (boardId) =>
  client({
    url: `/user/board/${boardId}`,
    method: 'get',
  });
// 게시글 삭제
export const getDeleteBoard = (boardId) =>
  client({
    url: `/user/board/${boardId}`,
    method: 'delete',
  });
// 모든 댓글 받아오기
export const getGetAllComment = (boardId) =>
  client({
    url: `/user/comment/${boardId}`,
    method: 'get',
  });
// 댓글 입력
export const getCommentInsert = (comment) =>
  client({
    url: `/user/comment/${comment.empid}/${comment.boardId}`,
    method: 'post',
    data: {
      commentContent: comment.commentContent,
    },
  });
// 댓글 삭제
export const getCommentDelete = (comment) =>
  client({
    url: `/user/comment/${comment.commentId}`,
    method: 'delete',
  });
// 댓글 업데이트
export const getCommentUpdate = (comment, commentContent) =>
  client({
    url: `/user/comment/${comment.commentId}`,
    method: 'put',
    data: commentContent,
  });

//회원삭제
export const getDeleteEmp = () =>
  client({
    url: `/user/delete`,
    method: 'delete',
  });
// 내가누군지 알려주는 것
export const getWhoAmI = () =>
  client({
    url: '/user/me',
    method: 'get',
  });
//회원 비번 변경
export const getPwdChange = (data) =>
  client({
    url: '/user/changePwd',
    method: 'put',
    data: data,
  });
// 회원 이메일 변경
export const getChangeEmail = (data) =>
  client({
    url: '/user/changeEmail',
    method: 'put',
    data: data,
  });
// 회원 번호 변경
export const getChangePhoneNumber = (data) =>
  client({
    url: '/user/changePhone',
    method: 'put',
    data: data,
  });
// 리프레쉬 토큰을 통해 엑세스 토큰을 받아 오는 것
export const getAccessToken = () =>
  client({
    url: '/user/newtoken',
    method: 'get',
  });
// 로그아웃
export const logOut = () =>
  client({
    url: '/auth/logOut',
    method: 'get',
  });
// userMe
export const userMe = () =>
  client({
    url: '/user/me',
    method: 'get',
  });

export const getEmp = () =>
  client({
    url: '/admin/findAll',
    method: 'get',
  });

export const getResignation = () =>
  client({
    url: '/admin/ResignationAll',
    method: 'get',
  });

export const deleteAdminEmpAPI = (id) =>
  client({
    url: `/admin/delete/${id}`,
    method: 'delete',
  });

export const getManager = (unitId) =>
  client({
    url: `/admin/findmanager/${unitId}`,
    method: 'get',
  });

export const updateEmp = (type, updateType, updateValue) =>
  client({
    url: `/admin/emp/jobtitle/${type.empInfo.id}/${updateType}/${updateValue}`,
  });

export const deleteUnit = (unitId, type) =>
  client({
    url: `/admin/unit/${type}/${unitId}`,
    method: 'delete',
  });

export const updateUnit = (unitId, unit) =>
  client({
    url: `/admin/unit/${unitId}`,
    method: 'put',
    data: unit,
  });

export const insertUnit = (unit) => {
  client({
    url: `/admin/unit`,
    method: 'post',
    data: unit,
  });
};

// 휴가 및 출장 관련 api

// getVacations /vacations/${empNum}`

// approveVacationList /mananger/vacations/approve/${unitId}`
