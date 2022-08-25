import { Button, Modal, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import style from '../../CSS/admin.module.css';
import { Fragment, useEffect, useState } from 'react';
import { EmpUpdateModal } from './EmpUpdateModal';

export const TableModalComponent = ({
  processingData,
  open,
  setOpen,
  empInfo,
  check,
  setCheck,
}) => {
  // const [units, setUnit] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  return (
    <Fragment>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className={style.modal}>
          <Table align="center">
            <TableHead>
              <TableRow>
                {/* 이름 */}
                <TableCell sx={{ padding: '0px 0px 0px 10px', width: 'auto', fontWeight: 'bold' }}>
                  사원명
                </TableCell>
                <TableCell sx={{ padding: '16px 0px 16px 0px', textAlign: 'center' }}>
                  {empInfo.name}
                </TableCell>
                <TableCell colSpan={10} />
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
                <TableCell sx={{ width: '10%', fontWeight: 'bold' }}>이메일</TableCell>
                <TableCell>{empInfo.email}</TableCell>
              </TableRow>
              {/* 부서 */}
              <TableRow>
                <TableCell sx={{ padding: '0px 0px 0px 10px', fontWeight: 'bold' }}>부서</TableCell>
                <TableCell>{empInfo.dept.deptName || '-'}</TableCell>
                <TableCell sx={{ padding: 'none', fontWeight: 'bold' }}>입사일</TableCell>
                <TableCell>{empInfo.hiredate} </TableCell>
              </TableRow>
              {/* 팀 */}
              <TableRow>
                <TableCell sx={{ width: '10px', padding: '0px 0px 0px 10px', fontWeight: 'bold' }}>
                  팀
                </TableCell>
                <TableCell>{empInfo.team.teamName || '-'}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>휴대폰 번호</TableCell>
                <TableCell> {empInfo.phoneNumber} </TableCell>
              </TableRow>

              {/* 직책 */}
              <TableRow>
                <TableCell sx={{ padding: '0px 0px 0px 10px', fontWeight: 'bold' }}>직책</TableCell>
                <TableCell>{empInfo.teamPosition.teamPositionName}</TableCell>
                <TableCell colSpan={10} />
              </TableRow>
            </TableBody>
          </Table>
          <Button
            onClick={() => {
              // updateDatafnc(updateData);
              setUpdateModal(true);
            }}>
            정보 수정하기
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}>
            취소
          </Button>
        </div>
      </Modal>
      <EmpUpdateModal
        processingData={processingData}
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
        empInfo={empInfo}
        check={check}
        setCheck={setCheck}
      />
    </Fragment>
  );
};
