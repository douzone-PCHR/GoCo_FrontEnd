import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { display } from '@mui/system';
import { Fragment, useState } from 'react';
import { deleteUnitAPI } from '../../../api/unitAPI';
import style from '../../../CSS/Admin.module.css';

export const UnitModalComponent = ({ depts, open, setOpen, index, teams }) => {
  const [teamAdd, setTeamAdd] = useState(false);
  return (
    <>
      <Modal open={Object.values(open)[index]}>
        <div className={style.modal}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>부서</TableCell>
                <TableCell colSpan={20}>팀</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{depts.unitName}</TableCell>
                {teams &&
                  teams.map((data, idx) => {
                    return depts.unitName === data.parentUnit.unitName ? (
                      <TableCell key={idx}>{data.unitName}</TableCell>
                    ) : (
                      <Fragment key={idx}></Fragment>
                    );
                  })}
                {[...Array(teams.length + 5 - teams.length)].map((num, idx) => {
                  return <TableCell key={idx} />;
                })}
              </TableRow>
            </TableBody>
          </Table>
          <div className={style.btn}>
            <Button
              onClick={() => {
                // setOpen({ ...open, [`${index}`]: false });
                setTeamAdd(true);
              }}>
              팀추가
            </Button>
            <Button
              onClick={() => {
                // deleteUnitAPI(depts.unitId);
                setOpen({ ...open, [`${index}`]: false });
              }}>
              부서 삭제
            </Button>
            <Button
              onClick={() => {
                setOpen({ ...open, [`${index}`]: false });
              }}>
              취소
            </Button>
          </div>
        </div>
      </Modal>
      <Modal open={teamAdd}>
        <div className={style.modal}>
          <Typography variant="h3">팀 추가</Typography>
          <Button
            onClick={() => {
              console.log(depts.unitId); //부서

              setTeamAdd(false);
            }}>
            버튼
          </Button>
        </div>
      </Modal>
    </>
  );
};
