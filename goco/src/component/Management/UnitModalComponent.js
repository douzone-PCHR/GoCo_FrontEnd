import {
  Button,
  Chip,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import style from '../../CSS/admin.module.css';
import { ChildModal } from './ChildModal';
import * as api from '../../api/index';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const UnitModalComponent = ({
  open,
  setOpen,
  teams,
  dept,
  handleModal,
  setHandleModal,
  render,
  check,
}) => {
  const [managers, setManagers] = useState([]);
  useEffect(() => {
    dept?.unitId &&
      api.getManager(dept.unitId).then((res) => {
        setManagers(res.data);
      });
  }, [dept?.unitId, handleModal]);
  return (
    <>
      <Modal
        open={open}
        id="parent-modal"
        disableEnforceFocus={true}
        disableRestoreFocus={true}
        disableAutoFocus={true}>
        <div className={style.modal}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            fontWeight="bold"
            padding={2}>
            {dept?.unitName} 부서 정보
          </Typography>
          <div className={style.btn}>
            <Button
              size="large"
              sx={{ color: 'rgb(235,100,70)' }}
              onClick={() => {
                Swal.fire({
                  title: `${dept?.unitName}부서를 삭제 하시겠습니까?`,
                  icon: 'warning',
                  target: '#parent-modal',
                  confirmButtonText: '삭제하기',
                  showCancelButton: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    api.deleteUnit(dept.unitId, 1).then((res) => {
                      switch (res.data) {
                        case -1:
                          break;
                        case 1:
                          Swal.fire({
                            target: '#parent-modal',
                            title: `부서 내에 사원이 존재합니다.`,
                            confirmButtonText: '확인',
                            icon: 'warning',
                          });
                          break;
                        case 2:
                          Swal.fire({
                            target: '#parent-modal',
                            title: `${dept.unitName}부서가 삭제되었습니다.`,
                            confirmButtonText: '확인',
                            icon: 'success',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              setOpen(false);
                              render();
                            }
                          });
                          break;
                        default:
                          break;
                      }
                    });
                  }
                });
              }}>
              부서 삭제
              <DeleteIcon fontSize="medium" />
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>부서: {dept?.unitName}</TableCell>
                <TableCell>팀장</TableCell>
                <TableCell colSpan={5}>팀원</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams &&
                teams.map((team, idx) => {
                  let mgrCheck = false;
                  let empCheck = 0;
                  let member = [];
                  return dept && dept.unitName === team.parentUnit.unitName ? (
                    <TableRow key={idx}>
                      <TableCell>
                        <Chip label={team.unitName}></Chip>
                      </TableCell>
                      {managers.length !== 0 &&
                        managers.map((manager) => {
                          if (
                            manager.unit.unitName === team.unitName &&
                            manager.teamPosition.teamPositionId === 1
                          ) {
                            mgrCheck = true;
                            return <TableCell key={manager.empNum}>{manager.name}</TableCell>;
                          }
                          return null;
                        })}
                      {mgrCheck === false && <TableCell>없음</TableCell>}
                      {managers.length !== 0 &&
                        managers.map((manager) => {
                          if (
                            manager.unit.unitName === team.unitName &&
                            manager.teamPosition.teamPositionId === 2
                          ) {
                            if (empCheck >= 1) {
                              member.push(`${manager.name}`);
                              return null;
                            }
                            ++empCheck;
                            return <TableCell key={manager.empNum}>{manager.name}</TableCell>;
                          }
                          return null;
                        })}
                      {member.length !== 0 && (
                        <Tooltip
                          placement="right"
                          title={
                            <div style={{ whiteSpace: 'pre-line' }}> {member.join('\n')}</div>
                          }>
                          <TableCell>...</TableCell>
                        </Tooltip>
                      )}
                      <TableCell padding="none" align="right" colSpan={10}>
                        <IconButton
                          onClick={() => {
                            Swal.fire({
                              title: '팀명 변경',
                              input: 'text',
                              toast: true,
                              inputPlaceholder: '변경할 팀 이름을 입력해주세요:',
                              target: document.getElementById('parent-modal'),
                              showCancelButton: true,
                            }).then((result) => {
                              if (result.isConfirmed) {
                                api.updateUnit(team.unitId, result.value).then((res) => {
                                  if (res.data) {
                                    Swal.fire({
                                      icon: 'success',
                                      title: '팀명이 변경되었습니다.',
                                      target: '#parent-modal',
                                      text: `${team.unitName}이 ${result.value}로 변경되었습니다.`,
                                      confirmButtonText: '확인',
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        setOpen(false);
                                      }
                                    });
                                  } else {
                                    Swal.fire({
                                      title: '중복된 팀명입니다.',
                                      icon: 'error',
                                      target: '#parent-modal',
                                      showConfirmButton: true,
                                      confirmButtonText: '확인',
                                    });
                                  }
                                });
                              }
                            });
                          }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            Swal.fire({
                              title: `${team.unitName}팀을 삭제 하시겠습니까?`,
                              icon: 'warning',
                              target: '#parent-modal',
                              cancelButtonText: '돌아가기',
                              cancelButtonColor: 'gray',
                              confirmButtonText: '삭제하기',
                              confirmButtonColor: 'red',
                              showCancelButton: true,
                            }).then(async (result) => {
                              if (result.isConfirmed) {
                                await api.deleteUnit(team.unitId, 2).then((res) => {
                                  switch (res.data) {
                                    case -1:
                                      break;
                                    case 1:
                                      Swal.fire({
                                        target: '#parent-modal',
                                        title: `팀에 사원이 존재합니다.`,
                                        confirmButtonText: '확인',
                                        icon: 'warning',
                                      }).then(() => {
                                        render();
                                      });
                                      break;
                                    case 2:
                                      Swal.fire({
                                        target: '#parent-modal',
                                        title: `${team.unitName}팀이 삭제되었습니다.`,
                                        confirmButtonText: '확인',
                                        icon: 'success',
                                      }).then(() => {
                                        render();
                                      });
                                      break;
                                    default:
                                      break;
                                  }
                                });
                              } else {
                                Swal.fire({
                                  target: '#parent-modal',
                                  title: `팀 삭제가 취소되었습니다.`,
                                  confirmButtonText: '확인',
                                  icon: 'info',
                                });
                              }
                            });
                          }}>
                          <DeleteIcon></DeleteIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <Fragment key={idx}></Fragment>
                  );
                })}
            </TableBody>
          </Table>
          <div className={style.btn}>
            <Button
              onClick={() => {
                setHandleModal(true);
              }}>
              팀추가
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
              }}>
              취소
            </Button>
          </div>
        </div>
      </Modal>
      <ChildModal handleModal={handleModal} setHandleModal={setHandleModal} dept={dept} />
    </>
  );
};
