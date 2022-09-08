import * as React from 'react';
import styles from '../../CSS/authcss/Login.module.css';
import { LoginButtonGroup, LoginInputButton } from '../../component/auth/Login/LoginButtonGroup';
import LoginInsertID from '../../component/auth/Login/LoginInsertID';
import LoginInsertPwd from '../../component/auth/Login/LoginInsertPwd';
import { deleteCookie } from '../../api/authAPI';
export default function Login() {
  React.useEffect(() => {
    deleteCookie('accessToken');
  });
  const [values, setValues] = React.useState({
    password: '',
    id: '',
    showPassword: false,
    idInputError: false,
    pwdInputError: false,
  });

  return (
    <div className={styles.BackGround}>
      <div className={styles.Border}>
        <div className={styles.LoginText}>로그인</div>
        <LoginInsertID values={values} setValues={setValues} />
        <LoginInsertPwd values={values} setValues={setValues} />
        <LoginInputButton values={values} setValues={setValues} />
        {/* --------------------위까지 로그인 form 안이다.---------------------- */}
        <hr className={styles.Horizontal} />
        {/* --------------------버튼3개---------------------- */}
        <LoginButtonGroup />
      </div>
    </div>
  );
}
