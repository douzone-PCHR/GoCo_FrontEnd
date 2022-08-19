import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { border, display, margin, width } from '@mui/system';
import { Fragment, useEffect, useState } from 'react';
import { getEmp, getManager } from '../../../api/employeeAPI';
import { deleteUnitAPI, insertUnitAPI } from '../../../api/unitAPI';
import style from '../../../CSS/Admin.module.css';

const onHandleChange = (e, setChange) => setChange(e.target.value);
export const UnitModalComponent = ({ open, setOpen, teams, dept, setCheck, check }) => {
  const [handleModal, setHandleModal] = useState(false);
  const [teamManagers, setteamManagers] = useState();
  const [emps, setEmp] = useState();
  const [empNum, setEmpNum] = useState();
  const [empTeamMembers, setEmpTeamMember] = useState([]);

  const [teamEmp, setTeamEmp] = useState([]);
  useEffect(() => {
    getEmp(setEmp);
  }, [check]);
  useEffect(() => {
    dept?.unitId && getManager(dept.unitId, setteamManagers);
  }, [dept?.unitId, check]);

  return (
    // dept, teams, teamManagers,deleteUnitAPI, seCheck, setOpen,open,setcheck,check
    <>
      <Modal open={open}>
        <div className={style.modal}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>부서: {dept?.unitName}</TableCell>
                <TableCell colSpan={20}>팀장</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams &&
                teams.map((team, idx) => {
                  return dept?.unitName === team.parentUnit.unitName ? (
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
                      {[...Array(5)].map((num, idx) => {
                        return <TableCell key={idx} />;
                      })}
                      <TableCell padding="none" align="right">
                        <Button
                          onClick={() => {
                            deleteUnitAPI(team.unitId);
                            setCheck(!check);
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
                // insertUnitAPI(team);
                setHandleModal(true);

                setCheck(!check);
              }}>
              팀추가
            </Button>
            <Button
              onClick={() => {
                deleteUnitAPI(dept.unitId);
                setOpen(false);
                setCheck(!check);
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

      <Modal open={handleModal}>
        {/* <div className={style.modal}> */}
        <div className={style.modal}>
          <Typography variant="h3">팀 추가</Typography>
          <br />
          <br />
          <div style={{ display: 'flex', marginLeft: '10px' }}>
            <Input
              align="center"
              name="teamName"
              placeholder="팀이름"
              sx={{ fontSize: 'small', border: 'solid', marginRight: '10px', width: '15%' }}
            />
            <FormControl sx={{ marginRight: '10px', fontSize: 'small', width: '15%' }}>
              <InputLabel id="InputLabelTeamk">팀장 선택</InputLabel>
              <Select
                labelId="InputLabelTeamk"
                id="empSelect"
                defaultValue={emps ? emps[0].empNum : '2'}
                onChange={(e) => {
                  setEmpNum(e.target.value);
                }}>
                {emps &&
                  emps.map((emp, idx) => {
                    return (
                      <MenuItem key={idx} value={emp.empNum}>
                        {emp.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '30%' }}>
              <InputLabel id="mutiple-select-label" sx={{ width: '100px' }}>
                팀원 선택
              </InputLabel>
              <Select
                labelId="mutiple-select-label"
                multiple
                value={teamEmp}
                onChange={(e) => {
                  console.log(e.target.value);
                  e.target.value.map((teamMember) => {
                    setEmpTeamMember([...empTeamMembers, teamMember.empNum]);
                  });
                  setEmpNum(e.target.value);
                }}
                renderValue={(name) =>
                  name
                    .map((data) => {
                      return data.name;
                    })
                    .join(',')
                }>
                {emps &&
                  emps.map((emp) => {
                    if (!emp.unit) {
                      if (empNum !== emp.empNum) {
                        return (
                          // <MenuItem key={emp.empNum} value={emp.name}>
                          <MenuItem key={emp.empNum} value={emp}>
                            <Checkbox checked={teamEmp.indexOf(emp.name) > -1} />
                            <ListItemText primary={emp.name} />
                          </MenuItem>
                        );
                      }
                    }
                  })}
              </Select>
            </FormControl>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button
            onClick={() => {
              const teamName = document.getElementsByName('teamName')[0].value;
              if (teamName) {
                insertUnitAPI(teamName, dept.unitId, empNum, empTeamMembers, setTeamEmp);
                setHandleModal(false);
                setCheck(!check);
              } else {
                console.log('팀 이름입력해주세요.');
              }
            }}>
            추가하기
          </Button>
          <Button
            onClick={() => {
              setHandleModal(false);
              setTeamEmp([]);
            }}>
            취소
          </Button>
        </div>
      </Modal>
    </>
  );
};
