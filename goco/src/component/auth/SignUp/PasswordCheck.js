import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

export default function PasswordCheck({ okPasswordCheck, signupDataError, data, setData }) {
  const [values, setShowPassword] = React.useState({}); // 비밀번호 가리는데 쓰임
  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    // 비밀번호 입력관련
    setShowPassword({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    // 비밀번호 입력관련
    event.preventDefault();
  };
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            비밀번호
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" error={values.pwdInputError}>
                비밀번호를 입력하세요
              </InputLabel>
              <OutlinedInput
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
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
                label="비밀번호를 입력하세요"
              />
            </FormControl>
          </Grid>
        </Grid>
        {signupDataError.valid_password !== '' && (
          <>
            <Grid item xs={12} sx={{ color: 'red', fontSize: 'small', marginTop: '10px' }}>
              {signupDataError.valid_password}
            </Grid>
          </>
        )}
      </Grid>
      {/* ------------------------------------ */}
      <Grid item xs={12} sm={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            비밀번호 재확인
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" error={values.pwdInputError}>
                비밀번호를 입력하세요
              </InputLabel>
              <OutlinedInput
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
                label="비밀번호를 입력하세요"
              />
            </FormControl>
          </Grid>
        </Grid>
        {okPasswordCheck === false && (
          <>
            <Grid item xs={12} sx={{ color: 'red', fontSize: 'small', marginTop: '10px' }}>
              비밀번호를 일치시켜 주세요
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
