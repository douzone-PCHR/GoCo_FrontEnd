import { Button, Modal, Table, TableBody, TableCell, TableRow } from '@mui/material';
import style from '../../CSS/Admin.module.css';
import { Select } from './Select';
import jobTitle from './jobTitle.json';
import teamPosition from './teamPosition.json';
import { useEffect, useState } from 'react';
import { getUnit } from '../../api/unitAPI';
import { TableHeade } from './TableHead';

export const TableModalComponent = ({ open, setOpen, result }) => {
  const [units, setUnit] = useState();
  const [selectDept, setSelectDept] = useState('');
  const [resultTeam, setResultTeam] = useState([]);
  const resultDept = [];
  useEffect(() => {
    getUnit(setUnit);
  }, []);

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
              <Select data={jobTitle} title={'jobTitle'} />
              {/* 부서 */}
              <Select data={resultDept} title={'ParentUnit'} setUnit={setSelectDept} />
              {/* 팀 */}
              {resultTeam && <Select data={resultTeam} title={'unit'} />}
              {/* 직책 */}
              <Select data={teamPosition} title={'teamPosition'} result={result.teamPosition} />
              <TableCell align="center">
                <div className={style.bgBlack}>{result.status === '1' ? '근무중 ' : '휴가'}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          onClick={() => {
            setOpen(false);
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
