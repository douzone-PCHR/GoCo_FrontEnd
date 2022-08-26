import { Button, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { updateEmpAPI } from '../../api/employeeAPI';
import { confirm, resultConfirm } from '../../common/confirm';
function handleChange(e, setValue) {
  setValue(e.target.value);
}
export const EmpUpdateComponent = ({ type, setValue, value, setUpdateModal, checkFnc }) => {
  const [dept, setDept] = useState();
  const [teamvalue, setTeamValue] = useState();
  function handleReset() {
    checkFnc();
    setUpdateModal(false);
    setValue(null);
  }
  function updateEmployee(type, value) {
    console.log(type.type);
    if (value) {
      if (type.type === '부서') {
        confirm(
          '팀 변경 시 직급이 팀원으로 변경됩니다.',
          '',
          document.getElementById('emp-update-modal')
        ).then((confirmData) => {
          if (confirmData.isConfirmed) {
            updateEmpAPI(type, value)
              .then((data) => {
                if (data) {
                  return resultConfirm(
                    '팀 변경이 완료되었습니다.',
                    '직급이 팀원으로 설정됩니다.',
                    'success',
                    document.getElementById('emp-update-modal')
                  );
                } else {
                  return resultConfirm(
                    '현재 위치한 팀입니다.',
                    '',
                    'warning',
                    document.getElementById('emp-update-modal')
                  );
                }
              })
              .then(() => {
                handleReset();
              });
          }
        });
      } else {
        confirm(
          `${type.type}을 변경하시겠습니까?`,
          '',
          document.getElementById('emp-update-modal')
        ).then((confirmData) => {
          if (confirmData.isConfirmed) {
            updateEmpAPI(type, value)
              .then((data) => {
                console.log(data);
                if (data) {
                  return resultConfirm(
                    `${type.type} 변경 성공하였습니다.`,
                    '',
                    'success',
                    document.getElementById('emp-update-modal')
                  );
                } else {
                  return resultConfirm(
                    `${type.type} 변경을 실패하였습니다.`,
                    '기존값과 동일합니다.',
                    'error',
                    document.getElementById('emp-update-modal')
                  );
                }
              })
              .then(() => {
                handleReset();
              });
          }
        });
      }
    } else {
      resultConfirm(
        '값을 선택하지 않았습니다.',
        '선택하여주세요',
        'warning',
        document.getElementById('emp-update-modal')
      );
    }
  }

  return type?.type !== '부서' ? (
    <div>
      {type?.type}
      <Select value={value || ''} onChange={(e) => handleChange(e, setValue)}>
        {type.data &&
          type.data.map((result) => {
            return (
              <MenuItem key={result.id} value={result.id}>
                {result.content}
              </MenuItem>
            );
          })}
      </Select>
      <br />
      <Button onClick={() => updateEmployee(type, value)}>수정</Button>
      <Button
        onClick={() => {
          setUpdateModal(false);
          setValue(null);
        }}>
        취소
      </Button>
    </div>
  ) : (
    <div>
      {type?.type}
      <Select
        value={value || ''}
        onChange={(e) => handleChange(e, setValue)}
        inputRef={(ref) => setDept(ref?.value)}>
        {type?.data?.depts.map((dept) => {
          return (
            <MenuItem key={dept.unitId} value={dept.unitId}>
              {dept.unitName}
            </MenuItem>
          );
        })}
      </Select>
      <br />팀
      <Select value={teamvalue || ''} onChange={(e) => handleChange(e, setTeamValue)}>
        {type?.data?.teams.map((team) => {
          return (
            team.parentUnit?.unitId === dept && (
              <MenuItem key={team.unitId} value={team.unitId}>
                {team.unitName}
              </MenuItem>
            )
          );
        })}
      </Select>
      <Button onClick={() => updateEmployee(type, teamvalue)}>수정</Button>
      <Button
        onClick={() => {
          setUpdateModal(false);
          setValue(null);
        }}>
        취소
      </Button>
    </div>
  );
};
