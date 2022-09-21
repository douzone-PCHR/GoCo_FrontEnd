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
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as api from '../../api/index';
import style from '../../CSS/admin.module.css';
import { resultConfirm } from '../../common/confirm';
export const ChildModal = ({ handleModal, setHandleModal, dept }) => {
  const [empTeamMembers, setEmpTeamMembers] = useState({ userRoles: [] });
  const [emps, setEmps] = useState();
  const [mgrNum, setmgrNum] = useState();
  const [check, setCheck] = useState(false);
  useEffect(() => {
    api.getEmp().then((res) => {
      setEmps(res.data);
      setmgrNum(res.data[0].empNum);
    });
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

        <Box sx={{ margin: '1vw 0px 2vw 10px', fontWeight: 'bold' }} align="left">
          {dept && `부서명 : ${dept.unitName}`}
        </Box>
        <div style={{ display: 'flex', marginLeft: '10px' }}>
          <Input
            align="center"
            name="teamName"
            placeholder="팀이름"
            sx={{ fontSize: 'small', border: '1px solid', marginRight: '10px', width: '15%' }}
          />
          <FormControl sx={{ marginRight: '10px', fontSize: 'small', width: '20%' }}>
            <InputLabel id="InputLabelTeamk">팀장 선택</InputLabel>
            <Select
              labelId="InputLabelTeamk"
              label="팀장 선택"
              id="empSelect"
              // defaultValue={emps ? emps[0]?.empNum : null}
              value={mgrNum || ''}
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
                  if (mgrNum !== emp.empNum) {
                    return (
                      <MenuItem key={emp.empNum} value={emp.empNum}>
                        {emp.name}
                      </MenuItem>
                    );
                  }
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
                  const unit = {
                    unitName: teamName,
                    parentUnit: {
                      unitId: dept.unitId,
                    },
                    managerNum: mgrNum, //매니저
                    employeeList: empTeamMembers.userRoles, // 리스트형태
                  };
                  api.insertUnit(unit).then((res) => {
                    res.data
                      ? resultConfirm(
                          `팀이 추가되었습니다.`,
                          `팀명 : ${teamName}`,
                          'success',
                          '#child-modal'
                        ).then(() => {
                          setmgrNum('');

                          setHandleModal(false);
                          setCheck(!check);
                        })
                      : resultConfirm(
                          `${teamName}은 중복된 이름입니다.`,
                          '',
                          'warning',
                          '#child-modal'
                        );
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
            setmgrNum('');
          }}>
          취소
        </Button>
      </div>
    </Modal>
  );
};
