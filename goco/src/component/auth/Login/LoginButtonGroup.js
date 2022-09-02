import * as React from 'react';
import Button from '@mui/material/Button';
import styles from '../../../CSS/authcss/Login.module.css';
import ButtonGroup from '@mui/material/ButtonGroup';
import { loginAPI } from '../../../api/AllAPI';
export function LoginButtonGroup() {
  const FindId = () => {
    window.location.href = '/findId';
  };
  const FindPwd = () => {
    window.location.href = '/findPwd';
  };
  const SignUp = () => {
    window.location.href = '/signup';
  };
  return (
    <>
      <ButtonGroup variant="text" aria-label="text button group" color="inherit" fullWidth={true}>
        <Button onClick={FindId}>아이디 찾기</Button>
        <Button onClick={FindPwd}>비밀번호 찾기</Button>
        <Button onClick={SignUp}>회원가입</Button>
      </ButtonGroup>
    </>
  );
}

export function LoginInputButton({ values, setValues }) {
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
  return (
    <>
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
    </>
  );
}
