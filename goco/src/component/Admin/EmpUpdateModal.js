import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { deleteAdminEmpAPI, updateEmpAPI } from '../../api/employeeAPI';
import style from '../../CSS/admin.module.css';
import jobTitles from './jobTitle.json';
import teamPositions from './teamPosition.json';
const handleChange = (e, type, setUpdateValue, updateValue) => {
  if (type === 'reset') {
    setUpdateValue({
      ...updateValue,
      dept: null,
      team: null,
      teamPosition: null,
    });
    return;
  } else {
    type === 'dept'
      ? setUpdateValue({
          ...updateValue,
          [type]: e.target.value,
          team: null,
          teamPosition: null,
        })
      : setUpdateValue({
          ...updateValue,
          [type]: e.target.value,
        });
  }
};
export const EmpUpdateModal = ({
  processingData,
  updateModal,
  setUpdateModal,
  empInfo,
  check,
  setCheck,
}) => {
  const [dept, setDept] = useState();
  const [updateValue, setUpdateValue] = useState({
    jobTitle: empInfo.jobTitle.jobTitleId,
    dept: null,
    team: null,
    teamPosition: null,
  });
  return (
    <Modal open={updateModal} id="emp-update-modal">
      <Box className={style.modal}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>사원명</TableCell>
              <TableCell>{empInfo.name}</TableCell>
              <TableCell sx={{ padding: '0px' }} align="right">
                <Button
                  sx={{ color: '#dd2c00' }}
                  onClick={() => {
                    Swal.fire({
                      icon: 'warning',
                      title: '퇴사처리 하시겠습니까?',
                      text: '* 퇴사 처리시 되돌릴 수 없습니다.',
                      iconColor: 'red',
                      color: 'red',
                      showConfirmButton: true,
                      confirmButtonText: '퇴사처리',
                      cancelButtonText: '취소',
                      confirmButtonColor: '#ef4f00',
                      showCancelButton: true,
                      target: '#emp-update-modal',
                    }).then(() => {
                      deleteAdminEmpAPI(empInfo.id).then((result) => {
                        console.log(result);
                      });
                    });
                  }}>
                  퇴사처리
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>직급</TableCell>
              <TableCell>
                <Select
                  value={updateValue.jobTitle || jobTitles[0].id}
                  onChange={(e) => {
                    const type = 'jobTitle';
                    handleChange(e, type, setUpdateValue, updateValue);
                  }}>
                  {jobTitles.map((jobTitle, idx) => {
                    return (
                      <MenuItem key={idx} value={jobTitle.id}>
                        {jobTitle.content}
                      </MenuItem>
                    );
                  })}
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>부서</TableCell>
              <TableCell>
                <Select
                  inputRef={(ref) => {
                    setDept(ref?.value);
                  }}
                  value={updateValue?.dept || ''}
                  onChange={(e) => {
                    handleChange(e, 'dept', setUpdateValue, updateValue);
                  }}>
                  {processingData?.depts &&
                    processingData.depts.map((dept, idx) => {
                      return processingData.check.map((parentUnit) => {
                        return (
                          parentUnit === dept.unitId &&
                          dept.unitType === false && (
                            <MenuItem key={idx} value={dept.unitId}>
                              {dept.unitName}
                            </MenuItem>
                          )
                        );
                      });
                    })}
                  <MenuItem value={null}>없음</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>팀</TableCell>
              <TableCell>
                {updateValue.dept && (
                  <Select
                    value={updateValue.team || ''}
                    onChange={(e) => {
                      const type = 'team';
                      handleChange(e, type, setUpdateValue, updateValue);
                    }}>
                    {processingData &&
                      processingData.teams.map((team, idx) => {
                        return (
                          team.parentUnit?.unitId === dept && (
                            <MenuItem key={idx} value={team.unitId}>
                              {team.unitName}
                            </MenuItem>
                          )
                        );
                      })}
                  </Select>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>직책</TableCell>
              <TableCell>
                {updateValue.dept && (
                  <Select
                    value={updateValue.teamPosition || ''}
                    onChange={(e) => {
                      const type = 'teamPosition';
                      handleChange(e, type, setUpdateValue, updateValue);
                    }}>
                    {updateValue.team &&
                      teamPositions.map((teamPosition, idx) => {
                        return (
                          <MenuItem key={idx} value={teamPosition.id}>
                            {teamPosition.content}
                          </MenuItem>
                        );
                      })}
                  </Select>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box>
          <Button
            onClick={() => {
              processingData.teams.length !== 0
                ? Swal.fire({
                    title: '업데이트를 하시겠습니까?',
                    target: '#emp-update-modal',
                    cancelButtonText: '돌아가기',
                    confirmButtonText: '수정하기',
                    // confirmButtonColor: '#6af40f',
                    showCancelButton: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      updateValue.team
                        ? updateEmpAPI(empInfo.id, updateValue).then((data) => {
                            data
                              ? Swal.fire({
                                  title: '팀장이 존재하여 업데이트에 실패하였습니다.',
                                  target: '#emp-update-modal',
                                  confirmButtonText: '확인',
                                  icon: 'warning',
                                }).then(() => {
                                  setUpdateModal(false);
                                  handleChange(null, 'reset', setUpdateValue, updateValue);
                                  setCheck(!check);
                                })
                              : Swal.fire({
                                  title: '업데이트에 성공하였습니다.',
                                  target: '#emp-update-modal',
                                  confirmButtonText: '확인',
                                  icon: 'success',
                                  confirmButtonColor: '#6af40f',
                                }).then(() => {
                                  setUpdateModal(false);
                                  handleChange(null, 'reset', setUpdateValue, updateValue);
                                  setCheck(!check);
                                });
                          })
                        : Swal.fire({
                            icon: 'warning',
                            title: '팀이 선택되지 않았습니다.',
                            html: '팀을 없애겠습니까?<br> <확인 시> 팀에서 제외됩니다',
                            target: '#emp-update-modal',
                            confirmButtonText: '확인',
                            showCancelButton: true,
                            cancelButtonText: '취소',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              console.log(result);
                              updateEmpAPI(empInfo.id, updateValue).then((data) => {
                                console.log(data);
                                Swal.fire({
                                  title: '업데이트에 성공하였습니다.',
                                  target: '#emp-update-modal',
                                  confirmButtonText: '확인',
                                  icon: 'success',
                                  confirmButtonColor: '#6af40f',
                                }).then(() => {
                                  setUpdateModal(false);
                                  setCheck(!check);
                                });
                              });
                            }
                          });
                    }
                  })
                : Swal.fire({
                    title: '팀이 존재하지 않아 수정할 수 없습니다.',
                    target: '#emp-update-modal',
                    confirmButtonText: '확인',
                    icon: 'error',
                  });
            }}>
            수정하기
          </Button>
          <Button onClick={() => setUpdateModal(false)}>취소</Button>
        </Box>
      </Box>
    </Modal>
  );
};
