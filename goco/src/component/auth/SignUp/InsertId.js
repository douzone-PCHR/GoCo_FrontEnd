import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { IDCheck } from '../../../api/authAPI';
export const InsertId = ({
  handleChange,
  setOkIdCheck,
  data,
  signupDataError,
  setSignupDataError,
}) => {
  // ID 중복확인 함수 // 중복확인될경우 setOkIdCheck를 true로 바꿔줌
  const idCheck = () => {
    IDCheck(data, setOkIdCheck, setSignupDataError, setOkIdCheck);
  };
  return (
    <>
      <Grid item xs={12} sm={12}>
        아이디
      </Grid>
      <Grid item xs={12} sm={9}>
        <TextField
          name="아이디를 입력하세요"
          required
          fullWidth
          id="empId"
          label="아이디를 입력하세요"
          autoFocus
          onChange={handleChange('empId')}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button
          variant="outlined"
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#64a1bd',
            '&:hover': {
              backgroundColor: '#267194',
            },
            color: 'AppWorkspace',
          }}
          onClick={idCheck}>
          중복확인
        </Button>
      </Grid>
      {signupDataError.valid_empId !== '' && (
        <>
          <Grid item xs={12} sx={{ color: 'red', fontSize: 'small' }}>
            {signupDataError.valid_empId}
          </Grid>
        </>
      )}
    </>
  );
};
