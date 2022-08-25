import { Button, Modal, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getManager } from '../../../api/employeeAPI';
import { deleteUnitAPI, updateUnitAPI } from '../../../api/unitAPI';
import style from '../../../CSS/admin.module.css';
import { ChildModal } from './ChildModal';
export const handleChange = (e, setHandleDept) => {
  setHandleDept(e.target.value);
};

export const UnitModalComponent = ({
  open,
  setOpen,
  teams,
  dept,
  check,
  setCheck,
  handleModal,
  setHandleModal,
}) => {
  const [teamManagers, setteamManagers] = useState();
  useEffect(() => {
    dept?.unitId && getManager(dept.unitId, setteamManagers);
  }, [dept?.unitId, open, handleModal]);
  return (
    <>
      <Modal
        open={open}
        id="parent-modal"
        disableEnforceFocus={true}
        disableRestoreFocus={true}
        disableAutoFocus={true}>
        <div className={style.modal}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>부서: {dept?.unitName}</TableCell>
                <TableCell colSpan={5}>
                  <span>팀장</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams &&
                teams.map((team, idx) => {
                  return dept && dept.unitName === team.parentUnit.unitName ? (
                    <TableRow key={idx}>
                      <TableCell>{team.unitName}</TableCell>
                      {teamManagers &&
                        teamManagers.map((teamManager) => {
                          return teamManager.unit.unitId === team.unitId ? (
                            <TableCell key={teamManager.empNum}>{teamManager.name}</TableCell>
                          ) : (
                            <Fragment key={teamManager.empNum} />
                          );
                        })}

                      <TableCell padding="none" align="right">
                        <Button
                          onClick={() => {
                            Swal.fire({
                              title: '팀명 변경',
                              input: 'text',
                              toast: true,
                              inputPlaceholder: '변경할 팀 이름을 입력해주세요:',
                              // html: `<Select
                              //     onChange={(e) => {
                              //       handleChange(e, setHandleDept);
                              //     }}
                              //     value={handleDept}>
                              //     {/* {resultDept.map((data, index) => {
                              //       <MenuItem value={data.unitId} key={index}>
                              //         {data.unitName}
                              //       </MenuItem>;
                              //     })} */}
                              //   </Select>`,
                              target: '#parent-modal',
                              showCancelButton: true,
                              // showConfirmButton: true,
                            }).then((result) => {
                              if (result.isConfirmed) {
                                updateUnitAPI(team.unitId, result.value).then((results) => {
                                  if (results) {
                                    Swal.fire({
                                      icon: 'success',
                                      title: '팀명이 변경되었습니다.',
                                      target: '#parent-modal',
                                      text: `${team.unitName}이 ${result.value}로 변경되었습니다.`,
                                      // showConfirmButton: true,
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
                          팀 수정
                        </Button>

                        <Button
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
                                await deleteUnitAPI(team.unitId, 2).then((data) => {
                                  switch (data) {
                                    case -1:
                                      break;
                                    case 1:
                                      Swal.fire({
                                        target: '#parent-modal',
                                        title: `팀에 사원이 존재합니다.`,
                                        confirmButtonText: '확인',
                                        icon: 'warning',
                                      }).then(() => {
                                        setCheck(!check);
                                      });
                                      break;
                                    case 2:
                                      Swal.fire({
                                        target: '#parent-modal',
                                        title: `${team.unitName}팀이 삭제되었습니다.`,
                                        confirmButtonText: '확인',
                                        icon: 'success',
                                      }).then(() => {
                                        setCheck(!check);
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
                          팀 삭제
                        </Button>
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
                Swal.fire({
                  title: `${dept?.unitName}부서를 삭제 하시겠습니까?`,
                  icon: 'warning',
                  target: '#parent-modal',
                  confirmButtonText: '삭제하기',
                  showCancelButton: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    // if()
                    deleteUnitAPI(dept.unitId, 1).then((data) => {
                      switch (data) {
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
                              setCheck(!check);
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
      <ChildModal
        handleModal={handleModal}
        setHandleModal={setHandleModal}
        dept={dept}
        check={check}
        setCheck={setCheck}
      />
    </>
  );
};
