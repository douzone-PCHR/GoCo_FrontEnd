import {
  Button,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import style from '../../CSS/admin.module.css';
import { Fragment, useEffect, useState } from 'react';
import { EmpUpdateModal } from './EmpUpdateModal';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { deleteAdminEmpAPI } from '../../api/employeeAPI';
import jobTitles from './jobTitle.json';
import teamPositions from './teamPosition.json';
import { confirm, resultConfirm } from '../../common/confirm';

function handlemodal(setUpdateModal, data, setType, typeName, empInfo) {
  setUpdateModal(true);
  setType({ empInfo: empInfo, type: typeName, data: data });
}
export const TableModalComponent = ({ processingData, open, setOpen, empInfo, checkFnc }) => {
  // const [units, setUnit] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  const [type, setType] = useState();
  return (
    <Fragment>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="emp-info-modal">
        <div className={style.modal}>
          <Table align="center">
            <TableHead>
              <TableRow>
                {/* 이름 */}
                <TableCell sx={{ padding: '0px 0px 0px 10px', width: 'auto', fontWeight: 'bold' }}>
                  사원명
                </TableCell>
                <TableCell sx={{ textAlign: 'left' }}>{empInfo.name}</TableCell>
                <TableCell sx={{ padding: '0px' }} colSpan={10} align="right">
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
                        target: document.getElementById('emp-info-modal'),
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteAdminEmpAPI(empInfo.id).then((result) => {
                            if (result.data === 1) {
                              resultConfirm(
                                '퇴사처리 되었습니다.',
                                '',
                                'success',
                                document.getElementById('emp-info-modal')
                              );
                            } else {
                              resultConfirm(
                                '퇴사처리 할 수 없습니다.',
                                '',
                                'error',
                                document.getElementById('emp-info-modal')
                              );
                            }
                            checkFnc();
                          });
                        }
                      });
                    }}>
                    퇴사처리
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableRow> */}
              {/* 직급 */}
              <TableRow>
                <TableCell sx={{ width: '10%', padding: '0px 0px 0px 10px', fontWeight: 'bold' }}>
                  직급
                </TableCell>
                <TableCell>{empInfo.jobTitle.jobTitleName}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      handlemodal(setUpdateModal, jobTitles, setType, '직급', empInfo);
                    }}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ width: '10%', fontWeight: 'bold' }}>이메일</TableCell>
                <TableCell>{empInfo.email}</TableCell>
                <TableCell colSpan={10} />
              </TableRow>
              {/* 부서 */}
              {/* 팀 */}
              <TableRow>
                <TableCell sx={{ width: '10px', padding: '0px 0px 0px 10px', fontWeight: 'bold' }}>
                  부서 / 팀
                </TableCell>
                <TableCell>
                  {empInfo.dept.deptName || '-'} / {empInfo.team.teamName || '-'}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      handlemodal(setUpdateModal, processingData, setType, '부서', empInfo);
                    }}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>휴대폰 번호</TableCell>
                <TableCell> {empInfo.phoneNumber} </TableCell>
                <TableCell colSpan={10} />
              </TableRow>

              {/* 직책 */}
              <TableRow>
                <TableCell sx={{ padding: '0px 0px 0px 10px', fontWeight: 'bold' }}>직책</TableCell>
                <TableCell>{empInfo.teamPosition.teamPositionName}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      handlemodal(setUpdateModal, teamPositions, setType, '직책', empInfo);
                    }}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ padding: 'none', fontWeight: 'bold' }}>입사일</TableCell>
                <TableCell>{empInfo.hiredate} </TableCell>
                <TableCell colSpan={10} />
              </TableRow>
            </TableBody>
          </Table>
          <Button
            onClick={() => {
              setOpen(false);
            }}>
            확인
          </Button>
        </div>
      </Modal>
      <EmpUpdateModal
        type={type}
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
        checkFnc={checkFnc}
      />
    </Fragment>
  );
};
