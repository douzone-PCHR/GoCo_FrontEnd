import * as React from 'react';
import Button from '@mui/material/Button';
import styles from '../../CSS/authcss/Login.module.css';
import { loginAPI } from '../../api/authAPI';
import LoginButtonGroup from '../../component/auth/Login/LoginButtonGroup';
import LoginInsertID from '../../component/auth/Login/LoginInsertID';
import LoginInsertPwd from '../../component/auth/Login/LoginInsertPwd';
export default function Login() {
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
    <div className={styles.BackGround}>
      <div className={styles.Border}>
        <div className={styles.LoginText}>로그인</div>
        {/* ----------------------아이디 입력 컴포넌트-------------------- */}
        <LoginInsertID handleChange={handleChange} values={values} />
        {/* ----------------------비밀번호-------------------- */}
        <LoginInsertPwd handleChange={handleChange} values={values} setValues={setValues} />
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

        {/* --------------------위까지 로그인 form 안이다.---------------------- */}
        <hr className={styles.Horizontal} />
        {/* --------------------버튼3개---------------------- */}
        <LoginButtonGroup />
        {/* -------------------------------------------- */}
      </div>
    </div>
  );
}
