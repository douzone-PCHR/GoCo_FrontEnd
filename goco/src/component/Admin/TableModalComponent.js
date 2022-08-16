import { Button, Modal, Table, TableBody, TableCell, TableRow } from '@mui/material';
import style from '../../CSS/Admin.module.css';
import { Select } from './Select';
import jobTitle from './jobTitle.json';
import teamPosition from './teamPosition.json';
import { useEffect, useState } from 'react';
import { getUnit } from '../../api/unitAPI';
import { TableHeade } from './TableHead';
import { updateEmp } from '../../api/employeeAPI';
function updateDatafnc(updateData) {
  const data = {
    empNum: updateData.id,
    jobTitle: {
      jobTitleId: updateData.jobTitle,
    },
    teamPosition: {
      teamPositionId: updateData.teamPosition,
    },
    unit: {
      unitId: updateData.unit,
    },
  };
  updateEmp(data);
}
export const TableModalComponent = ({ open, setOpen, result }) => {
  const [units, setUnit] = useState();
  const [selectDept, setSelectDept] = useState('');
  const [resultTeam, setResultTeam] = useState([]);
  const resultDept = [];
  const [updateData, setUpdateData] = useState({ id: result.id });
  console.log(result);
  useEffect(() => {
    getUnit(setUnit);
  }, []);
  console.log(units);
  useEffect(() => {
    const teams = [];
    units &&
      units.map((unit) => {
        unit.parentUnit && unit.parentUnit?.unitId === parseInt(selectDept) && teams.push(unit);
      });
    setResultTeam([...teams]);
  }, [selectDept]);

  units &&
    units.map((unit) => {
      !unit.unitType && resultDept.push(unit);
    });

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={style.modal}>
        <Table sx={{ width: 750 }} align="center">
          <TableHeade />
          <TableBody>
            <TableRow>
              {/* 이름 */}
              <TableCell align="center">{result.name}</TableCell>
              {/* 직급 */}
              <Select data={jobTitle} title={'jobTitle'} setUpdateData={setUpdateData} />
              {/* 부서 */}
              <Select
                data={resultDept}
                title={'ParentUnit'}
                setUnit={setSelectDept}
                setUpdateData={setUpdateData}
              />
              {/* 팀 */}
              {resultTeam && (
                <Select data={resultTeam} title={'unit'} setUpdateData={setUpdateData} />
              )}
              {/* 직책 */}
              <Select
                data={teamPosition}
                title={'teamPosition'}
                result={result.teamPosition}
                setUpdateData={setUpdateData}
              />
              <TableCell align="center">
                <div className={style.bgBlack}>{result.status === '1' ? '근무중 ' : '휴가'}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          onClick={() => {
            // if (confirm('수정하시겠습니까?') == false) {
            updateDatafnc(updateData);
            setOpen(false);
            // } else {
            // return false;
            // }
            // alert('수정하시겠습니까?');
          }}>
          수정
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
          }}>
          취소
        </Button>
      </div>
    </Modal>
  );
};
