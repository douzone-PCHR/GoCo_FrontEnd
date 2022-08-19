import { SettingsCellOutlined } from '@mui/icons-material';
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
import { width } from '@mui/system';
import { Fragment, useEffect, useState } from 'react';
import { getManager } from '../../api/employeeAPI';
import { getUnitAPI, insertUnitAPI } from '../../api/unitAPI';
import { UnitModalComponent } from '../../component/Admin/Management/UnitModalComponent';
import styled from '../../CSS/Admin.module.css';

function getUnits(setUnits) {
  getUnitAPI(setUnits);
}

export const Management = () => {
  const [units, setUnits] = useState();
  const [insertBtn, setInsertBtn] = useState(false);
  const [dept, setDept] = useState();
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(true);
  const resultDept = [];
  const teams = [];
  useEffect(() => {
    getUnits(setUnits);
  }, [check]);

  units &&
    units.map((unit) => {
      if (!unit.unitType) {
        resultDept.push(unit);
      } else {
        teams.push(unit);
      }
    });

  return (
    <>
      <div className={styled.Container}>
        <div className={styled.item}>
          <div className={styled.btn}></div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>부서</TableCell>
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

                      {[...Array(teams.length + 3 - teams.length)].map((num, arrIdx) => {
                        return <TableCell key={arrIdx} />;
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

          <Modal open={insertBtn}>
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
                      insertUnitAPI(unitName);
                      setInsertBtn(false);
                      setCheck(!check);
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
          setCheck={setCheck}
          check={check}
        />
      </div>
    </>
  );
};
