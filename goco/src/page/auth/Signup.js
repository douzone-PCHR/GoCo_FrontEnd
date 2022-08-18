import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/authcss/Signup.module.css';
import UnitSelect from '../../component/auth/SignUp/UnitSelect';
import PasswordCheck from '../../component/auth/SignUp/PasswordCheck';
import { Hiredate } from '../../component/auth/SignUp/Hiredate';
import { InsertEmail } from '../../component/auth/SignUp/InsertEmail';
import { insertName, insertPhoneNumber } from '../../component/auth/SignUp/InsertNamePhone';
import { InsertId } from '../../component/auth/SignUp/InsertId';
import { signupAPI } from '../../api/authAPI';
import { ModalSendMail } from '../../component/auth/Modal';
import MoveLoginPage from '../../component/auth/SignUp/MoveLoginPage';
import SignUpButton from '../../component/auth/SignUp/SignUpButton';

const theme = createTheme();
export default function Signup() {
  const [okIdCheck, setOkIdCheck] = React.useState(false);
  const [okPasswordCheck, setOkPasswordCheck] = React.useState(false);
  const [okEmailCheck, setOkEmailCheck] = React.useState(false);
  const [okHiredateCheck, setOkHiredateCheck] = React.useState(false);
  const [okUnitCheck, setOkUnitCheck] = React.useState(false);
  const [open, setOpen] = React.useState(false); //메일보내는 중 모달을 위해 쓰는 함수
  const handleOpen = () => setOpen(true); //메일보내는 중 모달
  const handleClose = () => setOpen(false); //메일보내는 중 모달
  const [signupDataError, setSignupDataError] = React.useState({
    valid_password: '',
    valid_name: '',
    valid_empId: '',
    valid_phoneNumber: '',
    valid_email: '',
  });

  const [data, setData] = React.useState({
    empId: '',
    password: '',
    password2: '',
    name: '',
    phoneNumber: '',
    email: '',
    hiredate: '',
    unit: '',
  }); // 이름, 이메일 , 인증 번호등 모든 데이터가 가 들어 있는 유즈스테이트

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  React.useEffect(() => {
    setOkIdCheck(false);
  }, [data.empId]); // 아이디 입력을 바꿀때마다 id 체크 값이 false가 된다.
  React.useEffect(() => {
    if (data.password === data.password2) {
      setOkPasswordCheck(true);
    } else {
      setOkPasswordCheck(false);
    }
  }, [data.password, data.password2]); // 비밀번호가 다를 때마다 경고문구를 띄워 준다.
  React.useEffect(() => {
    setOkEmailCheck(false);
  }, [data.email]); // 입사일 지정 되었나 확인

  const SignUpData = () => {
    if (!okIdCheck) {
      setSignupDataError({ ...data, valid_empId: '아이디 인증을 진행해주세요' });
      return false;
    } else if (!okEmailCheck) {
      setSignupDataError({ ...data, valid_email: '이메일 인증을 진행해주세요' });
      return false;
    } else if (!okHiredateCheck) {
      return false;
    } else if (!okUnitCheck) {
      return false;
    }
    signupAPI(data, setSignupDataError, signupDataError);
  };
  return (
    <>
      <div className={styles.BackGround}>
        {/* ----------------------------------메일보내는 중 모달함수----------------------------------*/}
        {ModalSendMail(open, handleClose)}
        <div className={styles.Border}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <div className={styles.MainText}>회원가입</div>

              <Grid container spacing={3}>
                {/*-------------------------------------------아이디 중복확인-----------------------------------------------*/}
                <InsertId
                  handleChange={handleChange}
                  data={data}
                  setOkIdCheck={setOkIdCheck}
                  signupDataError={signupDataError}
                  setSignupDataError={setSignupDataError}
                />
                {/*---------------------------------비번과 비번 재확인 ------------------------------------*/}
                <PasswordCheck
                  okPasswordCheck={okPasswordCheck}
                  handleChange={handleChange}
                  signupDataError={signupDataError}
                />

                {/*-----------------------------------이름과 연락처---------------------------------------*/}
                {insertName(handleChange, signupDataError)}
                {insertPhoneNumber(handleChange, signupDataError)}
                {/*---------------------------------- 이메일적고 발송버튼------------------------------------*/}
                <InsertEmail
                  handleChange={handleChange}
                  signupDataError={signupDataError}
                  okEmailCheck={okEmailCheck}
                  data={data}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  setOkEmailCheck={setOkEmailCheck}
                  setSignupDataError={setSignupDataError}
                />
                {/*----------------------------------입사일----------------------------------------*/}
                <Hiredate data={data} setData={setData} setOkHiredateCheck={setOkHiredateCheck} />
                {/*-------------------------------------부서지정---------------------------------------------*/}
                <Grid item xs={12} sm={6}>
                  <UnitSelect
                    setData={setData}
                    data={data}
                    setOkUnitCheck={setOkUnitCheck}
                    okUnitCheck={okUnitCheck}
                  />
                </Grid>
                {/*----------------------------------------------------------------------------------*/}
                <MoveLoginPage />
                <Grid item xs={12} sm={2} />
                <SignUpButton SignUpData={SignUpData} />
              </Grid>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
