import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/authcss/Signup.module.css';
import UnitSelect from '../../component/auth/UnitSelect';
import PasswordCheck from '../../component/auth/PasswordCheck';
import { Hiredate } from '../../component/auth/Hiredate';
import { InsertEmail } from '../../component/auth/InsertEmail';
import { insertName, insertPhoneNumber } from '../../component/auth/InsertNamePhone';
import { InsertId } from '../../component/auth/InsertId';
import { signupAPI } from '../../api/authAPI';
import { ModalSendMail, ModalSendMailFail } from '../../component/auth/Modal';

const theme = createTheme();
export default function Signup() {
  const [okIdCheck, setOkIdCheck] = React.useState(false);
  const [okPasswordCheck, setOkPasswordCheck] = React.useState(false);
  const [okEmailCheck, setOkEmailCheck] = React.useState(false);
  const [okHiredateCheck, setOkHiredateCheck] = React.useState(false);
  const [okUnitCheck, setOkUnitCheck] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState(''); // 모달 에러 메세지 띄우는 변수
  const [failModal, setFailModal] = React.useState(false); // 실패 모달함수
  const failModalhandleOpen = () => setFailModal(true); // 실패 모달함수
  const failModalhandleClose = () => setFailModal(false); // 실패 모달함수

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
  const LoginPage = () => {
    window.location.href = '/login';
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

    signupAPI(data, setErrorMessage, failModalhandleOpen, setSignupDataError, signupDataError);
  };
  return (
    <>
      <div className={styles.BackGround}>
        {/* ----------------------------------메일보내는 중 모달함수----------------------------------*/}
        {ModalSendMail(open, handleClose, setErrorMessage, failModalhandleOpen, signupDataError)}
        {/* ----------------------------------실패 모달함수----------------------------------*/}
        {ModalSendMailFail(failModal, failModalhandleClose, errorMessage)}
        <div className={styles.Border}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              {/* <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}> */}
              <div className={styles.MainText}>회원가입</div>

              <Grid container spacing={3}>
                {/*-------------------------------------------아이디 중복확인-----------------------------------------------*/}
                <InsertId
                  handleChange={handleChange}
                  data={data}
                  setOkIdCheck={setOkIdCheck}
                  setErrorMessage={setErrorMessage}
                  failModalhandleOpen={failModalhandleOpen}
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
                <Grid item xs={12} sm={6}>
                  {insertName(handleChange, signupDataError)}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {insertPhoneNumber(handleChange, signupDataError)}
                </Grid>

                {/*---------------------------------- 이메일적고 발송버튼------------------------------------*/}
                <InsertEmail
                  handleChange={handleChange}
                  signupDataError={signupDataError}
                  okEmailCheck={okEmailCheck}
                  setErrorMessage={setErrorMessage}
                  failModalhandleOpen={failModalhandleOpen}
                  data={data}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  setOkEmailCheck={setOkEmailCheck}
                  setSignupDataError={setSignupDataError}
                />
                {/*----------------------------------입사일----------------------------------------*/}
                <Grid item xs={12} sm={6}>
                  <Hiredate data={data} setData={setData} setOkHiredateCheck={setOkHiredateCheck} />
                </Grid>
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
                <Grid item xs={12} sm={5}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: '#64a1bd',
                      '&:hover': {
                        backgroundColor: '#267194',
                      },
                      height: '60%',
                    }}
                    onClick={LoginPage}>
                    취소
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
                <Grid item xs={12} sm={5}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: '#64a1bd',
                      '&:hover': {
                        backgroundColor: '#267194',
                      },
                      height: '60%',
                    }}
                    onClick={SignUpData}>
                    회원 가입
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
