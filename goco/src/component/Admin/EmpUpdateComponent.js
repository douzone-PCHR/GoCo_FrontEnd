import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import * as api from '../../api/index';
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
    // setValue(null);
  }
  function updateEmployee(type, value) {
    if (value) {
      if (type.type === '부서') {
        confirm(
          '팀 변경 시 직급이 팀원으로 변경됩니다.',
          '',
          document.getElementById('emp-update-modal')
        ).then((confirmData) => {
          if (confirmData.isConfirmed) {
            let updateType = null;
            switch (type.type) {
              case '부서':
                updateType = 1;
                break;
              case '직책':
                updateType = 2;
                break;
              case '직급':
                updateType = 3;
                break;
              default:
                break;
            }
            api
              .updateEmp(type, updateType, value)
              .then((res) => {
                if (res.data) {
                  resultConfirm(
                    '팀 변경이 완료되었습니다.',
                    '직급이 팀원으로 설정됩니다.',
                    'success',
                    document.getElementById('emp-update-modal')
                  ).then(() => {
                    if (localStorage.getItem('id') === type.empInfo.id) {
                    } else {
                      window.location.reload();
                    }
                  });
                } else {
                  resultConfirm(
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
            let updateType = null;
            switch (type.type) {
              case '부서':
                updateType = 1;
                break;
              case '직책':
                updateType = 2;
                break;
              case '직급':
                updateType = 3;
                break;
              default:
                break;
            }
            api.updateEmp(type, updateType, value).then((data) => {
              if (data) {
                resultConfirm(
                  `${type.type} 변경 성공하였습니다.`,
                  '',
                  'success',
                  document.getElementById('emp-update-modal')
                ).then(() => {
                  if (localStorage.getItem('id') === type.empInfo.id) {
                  } else {
                    window.location.reload();
                  }
                });
              } else {
                resultConfirm(
                  `${type.type} 변경을 실패하였습니다.`,
                  '기존값과 동일합니다.',
                  'error',
                  document.getElementById('emp-update-modal')
                ).then(() => {
                  if (localStorage.getItem('id') === type.empInfo.id) {
                  } else {
                    window.location.reload();
                  }
                });
              }
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
    <Box>
      <Typography
        sx={{
          color: 'black',
          fontSize: '32px',
          margin: '20px',
        }}>
        {type?.type} 수정
      </Typography>

      <FormControl style={{ width: '25%' }}>
        <InputLabel id="select-label">{type?.type}</InputLabel>
        <Select
          size="small"
          labelId="select-label"
          value={value || ''}
          onChange={(e) => handleChange(e, setValue)}>
          {type.data &&
            type.data.map((result) => {
              return (
                <MenuItem key={result.id} value={result.id}>
                  {result.content}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <ButtonGroup
        sx={{
          display: 'flex',
          margin: '15px 100px',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
        }}>
        <Button
          color="primary"
          variant="contained"
          style={{
            width: '100%',
            borderRadius: '5%',
          }}
          size="medium"
          onClick={() => updateEmployee(type, value)}>
          수정
        </Button>
        <Button
          color="primary"
          variant="contained"
          style={{
            width: '100%',
            borderRadius: '5%',
            backgroundColor: '#D9D9D9',
            color: '#616161',
          }}
          onClick={() => {
            setUpdateModal(false);
            setValue(null);
          }}>
          취소
        </Button>
      </ButtonGroup>
    </Box>
  ) : (
    // type이 팀인 경우
    <Box>
      <Typography
        sx={{
          color: 'black',
          fontSize: '32px',
          margin: '20px',
        }}>
        {type?.type} 수정
      </Typography>

      <FormControl style={{ width: '40%', margin: '10px' }}>
        <InputLabel id="first-label">부서</InputLabel>
        <Select
          size="small"
          labelId="first-label"
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
      </FormControl>

      <FormControl style={{ width: '40%', margin: '10px' }}>
        <InputLabel id="second-label">팀</InputLabel>
        <Select
          size="small"
          labelId="second-label"
          value={teamvalue || ''}
          onChange={(e) => handleChange(e, setTeamValue)}>
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
      </FormControl>
      <ButtonGroup
        sx={{
          display: 'flex',
          margin: '15px 100px',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        }}>
        <Button
          color="primary"
          variant="contained"
          style={{
            width: '100%',
            borderRadius: '5%',
          }}
          size="medium"
          onClick={() => updateEmployee(type, teamvalue)}>
          수정
        </Button>
        <Button
          color="primary"
          variant="contained"
          style={{
            width: '100%',
            borderRadius: '5%',
            backgroundColor: '#D9D9D9',
            color: '#616161',
          }}
          size="medium"
          onClick={() => {
            setUpdateModal(false);
            setValue(null);
          }}>
          취소
        </Button>
      </ButtonGroup>
    </Box>
  );
};
