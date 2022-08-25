import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getEmp } from '../../../api/employeeAPI';
import { insertUnitAPI } from '../../../api/unitAPI';
import style from '../../../CSS/admin.module.css';

export const ChildModal = ({ handleModal, setHandleModal, dept }) => {
  const [empTeamMembers, setEmpTeamMembers] = useState({ userRoles: [] });
  const [emps, setEmp] = useState();
  const [mgrNum, setmgrNum] = useState();
  const [check, setCheck] = useState(false);
  useEffect(() => {
    getEmp(setEmp, setmgrNum);
  }, []);
  const handleFieldChange = (event) => {
    setEmpTeamMembers({
      ...empTeamMembers,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Modal open={handleModal} id="child-modal">
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
          <FormControl sx={{ marginRight: '10px', fontSize: 'small', width: '20%' }}>
            <InputLabel id="InputLabelTeamk">팀장 선택</InputLabel>
            <Select
              labelId="InputLabelTeamk"
              label="팀장 선택"
              id="empSelect"
              defaultValue={emps ? emps[0]?.empNum : null}
              onChange={(e) => {
                setEmpTeamMembers({ userRoles: [] });
                setmgrNum(e.target.value);
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
            <TextField
              select
              name="userRoles"
              id="userRoles"
              variant="outlined"
              label="팀원 선택"
              SelectProps={{
                multiple: true,
                value: empTeamMembers.userRoles,
                onChange: handleFieldChange,
              }}>
              {emps &&
                emps.map((emp) => {
                  if (!emp.unit) {
                    if (mgrNum !== emp.empNum) {
                      return (
                        <MenuItem key={emp.empNum} value={emp.empNum}>
                          {emp.name}
                        </MenuItem>
                      );
                    }
                  }
                  return null;
                })}
            </TextField>
          </FormControl>
        </div>
        <Button
          onClick={() => {
            const teamName = document.getElementsByName('teamName')[0].value;
            if (teamName) {
              Swal.fire({
                title: `${teamName}팀을 추가 하시겠습니까?`,
                icon: 'info',
                target: '#child-modal',
                cancelButtonText: '돌아가기',
                // cancelButtonColor: 'gray',
                confirmButtonText: '추가하기',
                confirmButtonColor: '#6af40f',
                showCancelButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  insertUnitAPI(
                    teamName,
                    dept.unitId,
                    mgrNum,
                    empTeamMembers.userRoles,
                    setEmpTeamMembers
                  ).then((data) => {
                    data
                      ? Swal.fire({
                          title: `팀이 추가되었습니다.`,
                          text: `팀명 : ${teamName}`,
                          icon: 'success',
                          target: '#child-modal',
                          showConfirmButton: true,
                          confirmButtonText: '확인',
                          // cancelButtonColor: 'gray',
                        }).then(() => {
                          setHandleModal(false);
                          setCheck(!check);
                        })
                      : Swal.fire({
                          title: `중복된 이름입니다.`,
                          text: `${teamName}`,
                          icon: 'warning',
                          target: '#child-modal',
                          confirmButtonText: '완료',
                        });
                  });
                }
              });
            } else {
              Swal.fire({
                title: `팀 이름을 입력해주세요`,
                icon: 'warning',
                target: '#child-modal',
                cancelButtonText: '돌아가기',
                cancelButtonColor: 'gray',
              });
            }
          }}>
          추가하기
        </Button>
        <Button
          onClick={() => {
            setEmpTeamMembers({ userRoles: [] });
            setHandleModal(false);
          }}>
          취소
        </Button>
      </div>
    </Modal>
  );
};
