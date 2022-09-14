import React, { useState, useEffect } from 'react';
import styles from '../../CSS/authcss/Login.module.css';
import { LoginButtonGroup, LoginInputButton } from '../../component/auth/Login/LoginButtonGroup';
import LoginInsertID from '../../component/auth/Login/LoginInsertID';
import LoginInsertPwd from '../../component/auth/Login/LoginInsertPwd';
import { deleteCookieAPI, loginAPI } from '../../api/AllAPI';

export default function Login() {
  const [values, setValues] = useState({
    password: '',
    id: '',
    showPassword: false,
    idInputError: false,
    pwdInputError: false,
  });
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
  useEffect(() => {
    deleteCookieAPI();
  }, []);

  return (
    <div className={styles.BackGround}>
      <div className={styles.Border}>
        <div className={styles.LoginText}>로그인</div>
        <LoginInsertID values={values} setValues={setValues} LoginClick={LoginClick} />
        <LoginInsertPwd values={values} setValues={setValues} LoginClick={LoginClick} />
        <LoginInputButton LoginClick={LoginClick} />
        {/* --------------------위까지 로그인 form 안이다.---------------------- */}
        <hr className={styles.Horizontal} />
        {/* --------------------버튼3개---------------------- */}
        <LoginButtonGroup />
      </div>
    </div>
  );
}
