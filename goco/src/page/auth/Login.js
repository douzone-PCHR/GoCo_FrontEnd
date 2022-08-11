import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from '../../CSS/authcss/Login.module.css';
import loginAPI from '../../api/authAPI';

export default function Login() {
  // 로그아웃 시 쿠키 삭제
  // document.cookie = `Token=null; expires=Thu, 18 Dec 2000 12:00:00 UTC`;
  const [values, setValues] = React.useState({
    password: '',
    id: '',
    showPassword: false,
    idInputError: false,
    pwdInputError: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
  const LoginClick = (e) => {
    // 로그인 클릭
    if (values.id === '') {
      //ID가 비어잇을 경우 retrun
      setValues({ ...values, idInputError: true });
      return;
    }
    if (values.password === '') {
      //PWD가 비어잇을 경우 retrun
      setValues({ ...values, pwdInputError: true });
      return;
    }
    loginAPI(values.id, values.password);
    setValues({ ...values, idInputError: false, pwdInputError: false }); // input error reset
  };
  const FindId = () => {
    window.location.href = '/FindId';
  };
  const FindPwd = () => {
    window.location.href = '/FindPwd';
  };
  const SignUp = () => {
    window.location.href = '/signup';
  };

  return (
    <div className={styles.BackGround}>
      <div className={styles.Border}>
        <form method="POST">
          <div className={styles.LoginText}>로그인</div>
          {/* ----------------------아이디-------------------- */}
          <div className={styles.InputText}>　아이디</div>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '96%' },
            }}>
            <TextField
              id="demo-helper-text-misaligned-no-helper"
              label="아이디를 입력하세요"
              onChange={handleChange('id')}
              error={values.idInputError}
            />
          </Box>

          {/* ----------------------비밀번호-------------------- */}
          <div className={styles.InputText}>　비밀번호</div>
          <FormControl sx={{ m: 1, width: '96%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" error={values.pwdInputError}>
              비밀번호를 입력하세요
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
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
          {/* ------------------------------------------ */}

          <div className={styles.LoginButton}>
            <Button
              sx={{
                backgroundColor: '#64a1bd',
                '&:hover': {
                  backgroundColor: '#267194',
                },
              }}
              className={styles.LoginButton}
              variant="contained"
              onClick={LoginClick}>
              로그인
            </Button>
          </div>
        </form>
        {/* --------------------위까지 로그인 form 안이다.---------------------- */}
        <hr className={styles.Horizontal} />
        {/* --------------------3개---------------------- */}
        <ButtonGroup variant="text" aria-label="text button group" color="inherit" fullWidth={true}>
          <Button onClick={FindId}>아이디 찾기</Button>
          <Button onClick={FindPwd}>비밀번호 찾기</Button>
          <Button onClick={SignUp}>회원가입</Button>
        </ButtonGroup>
        {/* -------------------------------------------- */}
      </div>
    </div>
  );
}
