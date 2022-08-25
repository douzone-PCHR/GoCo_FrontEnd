import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import { pwdChangeAPI } from '../../api/employeeAPI';
import { sweetAlert2 } from '../auth/AuthSweetAlert.js/sweetAlert2';
export default function PasswordChange({ handleChange, textData }) {
  const [values, setShowPassword] = React.useState({}); // 비밀번호 가리는데 쓰임
  const [passwordCheck, setPasswordCheck] = React.useState(true);
  const handleClickShowPassword = () => {
    // 비밀번호 입력관련
    setShowPassword({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (e) => {
    // 비밀번호 입력관련
    e.preventDefault();
  };
  //비밀번호 변경 버튼함수
  const pwdChange = () => {
    passwordCheck
      ? pwdChangeAPI(textData)
      : sweetAlert2('변경 실패 비밀번호가 서로 다릅니다.', 'warning');
  };

  React.useEffect(() => {
    textData.password1 === textData.password2 ? setPasswordCheck(true) : setPasswordCheck(false);
  }, [textData.password1, textData.password2]);

  return (
    <>
      <Grid item xs={12} sx={{ marginTop: '5%' }}>
        비밀번호
      </Grid>
      <Grid item xs={12} sm={9}>
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <OutlinedInput
            placeholder="변경할 비밀번호를 입력하세요."
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password1')}
            error={values.pwdInputError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        비밀번호 재확인
      </Grid>
      <Grid item xs={12} sm={9}>
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <OutlinedInput
            placeholder="비밀번호를 재확인 해주세요."
            id="passwordCheck"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password2')}
            error={values.pwdInputError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#64a1bd',
            '&:hover': {
              backgroundColor: '#267194',
            },
            height: '100%',
          }}
          onClick={pwdChange}>
          비밀번호 변경
        </Button>
      </Grid>
      {passwordCheck === false && (
        <>
          <Grid item xs={12} sx={{ color: 'red', fontSize: 'small' }}>
            비밀번호를 일치시켜 주세요
          </Grid>
        </>
      )}
    </>
  );
}
