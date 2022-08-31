import client from './client';

// -------로그인, 회원가입, 아이디 찾기, 로그인 한 아이디의 정보 (Login.js) ------------
export const loginDefaultValue = () =>
  client({
    url: '/user/me',
    method: 'get',
  });

// -------Main (스케쥴, 주간 근로시간 , 날짜 없는 사내 및 개인 일정 등등) (Schedule.js) ----------

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
