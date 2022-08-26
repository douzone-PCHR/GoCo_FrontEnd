import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getUnitsAPI, insertUnitAPI } from '../../api/unitAPI';
import { AdminSideBar } from '../../component/Admin/AdminSideBar';
import { UnitModalComponent } from '../../component/Admin/Management/UnitModalComponent';
import styled from '../../CSS/admin.module.css';

function getUnits(setUnits) {
  getUnitsAPI(setUnits);
}

export const Management = () => {
  const [units, setUnits] = useState();
  const [insertBtn, setInsertBtn] = useState(false);
  const [dept, setDept] = useState();
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(true);
  const [handleModal, setHandleModal] = useState(false);
  const resultDept = [];
  const teams = [];
  useEffect(() => {
    getUnits(setUnits);
  }, [check, open, handleModal]);

  units &&
    units.map((unit) => {
      if (!unit.unitType) {
        resultDept.push(unit);
      } else {
        teams.push(unit);
      }
      return unit;
    });

  return (
    <>
      <div className={styled.Container}>
        <AdminSideBar />
        <div className={styled.item}>
          <div className={styled.btn}></div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '15%' }}>부서</TableCell>
                <TableCell colSpan={10}>팀</TableCell>
                <TableCell padding="none" align="right">
                  <Button
                    onClick={() => {
                      setInsertBtn(true);
                      // insertUnitAPI();
                    }}>
                    부서추가
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultDept &&
                resultDept.map((element, index) => {
                  // 부서(key)값
                  return (
                    <TableRow key={index}>
                      {/* 부서에 대한 값 */}
                      <TableCell>{element.unitName}</TableCell>
                      {teams &&
                        teams.map((team, idx) => {
                          return element.unitName === team.parentUnit.unitName ? (
                            <Fragment key={idx}>
                              <TableCell>{team.unitName}</TableCell>
                            </Fragment>
                          ) : (
                            <Fragment key={idx}></Fragment>
                          );
                        })}

                      <TableCell align="right" colSpan={20} padding="none">
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setDept(element);
                          }}>
                          수정하기
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          <Modal open={insertBtn} id="dept-insert-modal" disableAutoFocus={false}>
            <div className={styled.modal}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                부서추가
              </Typography>
              <div>
                <TextField name={styled.textField} size="normal" margin="normal" />
                <br />
                <Button
                  onClick={() => {
                    const unitName = document.getElementsByName(styled.textField)[0].value;
                    if (unitName) {
                      Swal.fire({
                        title: `${unitName}부서를 추가 하시겠습니까?`,
                        icon: 'info',
                        target: '#dept-insert-modal',
                        cancelButtonText: '돌아가기',
                        // cancelButtonColor: 'gray',
                        confirmButtonText: '추가하기',
                        confirmButtonColor: '#6af40f',
                        showCancelButton: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          insertUnitAPI(unitName).then((data) => {
                            data
                              ? Swal.fire({
                                  title: `${unitName} 부서가 추가되었습니다.`,
                                  icon: 'success',
                                  target: '#dept-insert-modal',
                                  confirmButtonText: '완료',
                                }).then(() => {
                                  setInsertBtn(false);
                                  setCheck(!check);
                                })
                              : Swal.fire({
                                  title: `중복된 이름입니다.`,
                                  text: `${unitName}`,
                                  icon: 'warning',
                                  target: '#dept-insert-modal',
                                  confirmButtonText: '완료',
                                });
                          });
                        }
                      });
                    }
                  }}>
                  추가
                </Button>
                <Button
                  onClick={() => {
                    setInsertBtn(false);
                  }}>
                  취소
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <UnitModalComponent
          open={open}
          setOpen={setOpen}
          teams={teams}
          dept={dept}
          check={check}
          setCheck={setCheck}
          handleModal={handleModal}
          setHandleModal={setHandleModal}
        />
        <div />
      </div>
    </>
  );
};
