import { sweetAlertSuccess } from '../auth/AuthSweetAlert.js/sweetAlert2';

export const SelectBoard = (boardId) => {
  window.location.href = `/boardselect/${boardId}`;
};
export const UpdateBoard = (boardId) => {
  window.location.href = `/boardupdate/${boardId}`;
};
export const errorCheck = (data, whoAmI) => {
  if (data && data.employee.empNum !== whoAmI) {
    sweetAlertSuccess('잘못된 접근 입니다.', 'error', '/board');
  }
};
