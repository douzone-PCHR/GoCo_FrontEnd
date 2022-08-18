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
import { getUnit, insertUnit } from '../../api/unitAPI';
import { UnitModalComponent } from '../../component/Admin/Management/UnitModalComponent';
import styled from '../../CSS/Admin.module.css';

function getUnits(setUnits) {
  getUnit(setUnits);
}

export const Management = () => {
  const [units, setUnits] = useState();
  const [insertBtn, setInsertBtn] = useState(false);
  const [open, setOpen] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
  });

  const resultDept = [];
  const teams = [];

  useEffect(() => {
    getUnits(setUnits);
  }, [units]);
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
                    <TableRow key={element + index}>
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

                      <UnitModalComponent
                        depts={element}
                        open={open}
                        setOpen={setOpen}
                        index={index}
                        teams={teams}
                      />
                      {[...Array(teams.length + 3 - teams.length)].map((num, arrIdx) => {
                        return <TableCell key={arrIdx} />;
                      })}
                      <TableCell align="right" colSpan={20} padding="none">
                        <Button
                          onClick={() => {
                            setOpen({ ...open, [`${index}`]: true });
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
                    const data = document.getElementsByName(styled.textField)[0].value;
                    const unit = {
                      unitName: data,
                    };
                    if (data) {
                      insertUnit(unit);
                      setInsertBtn(false);
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
      </div>
    </>
  );
};
