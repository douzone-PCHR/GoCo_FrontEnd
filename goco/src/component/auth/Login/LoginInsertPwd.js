import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from '../../../CSS/authcss/Login.module.css';

export default function LoginInsertPwd({ values, setValues, LoginClick }) {
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const keypress = (e) => {
    if (e.keyCode === 13) {
      LoginClick();
    }
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className={styles.InputText}>　비밀번호</div>
      <FormControl sx={{ m: 1, width: '96%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" error={values.pwdInputError}>
          비밀번호를 입력하세요
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onKeyDown={keypress}
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
    </>
  );
}
