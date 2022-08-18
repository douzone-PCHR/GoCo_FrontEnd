import * as React from 'react';
import Button from '@mui/material/Button';
import styles from '../../CSS/authcss/Login.module.css';
import { loginAPI } from '../../api/authAPI';
import { ModalSendMailFail } from '../../component/auth/Modal';
import LoginButtonGroup from '../../component/auth/Login/LoginButtonGroup';
import LoginInsertID from '../../component/auth/Login/LoginInsertID';
import LoginInsertPwd from '../../component/auth/Login/LoginInsertPwd';

export default function Login() {
  // 로그아웃 시 쿠키 삭제
  // document.cookie = `Token=null; expires=Thu, 18 Dec 2000 12:00:00 UTC`;
  const [failModal, setFailModal] = React.useState(false); // 실패 모달함수
  const failModalhandleOpen = () => setFailModal(true); // 실패 모달함수
  const failModalhandleClose = () => setFailModal(false); // 실패 모달함수
  const [errorMessage, setErrorMessage] = React.useState(''); // 모달 에러 메세지 띄우는 변수
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
    loginAPI(values.id, values.password, failModalhandleOpen, setErrorMessage);
    setValues({ ...values, idInputError: false, pwdInputError: false }); // input error reset
  };

  return (
    <div className={styles.BackGround}>
      {/* ----------------------------------실패 모달함수----------------------------------*/}
      {ModalSendMailFail(failModal, failModalhandleClose, errorMessage)}

      <div className={styles.Border}>
        <form method="POST">
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
        </form>
        {/* --------------------위까지 로그인 form 안이다.---------------------- */}
        <hr className={styles.Horizontal} />
        {/* --------------------3개---------------------- */}
        <LoginButtonGroup />
        {/* -------------------------------------------- */}
      </div>
    </div>
  );
}
