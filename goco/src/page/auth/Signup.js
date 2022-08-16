import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; //달력
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; //달력
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; //달력
import styles from '../../CSS/authcss/Signup.module.css';
import * as dayjs from 'dayjs';
import { CheckAuthForSignUpAPI, IDCheck, SendEmailForSignUpAPI } from '../../api/authAPI';
import { ModalSendMail, ModalSendMailFail } from '../../component/auth/Modal';
const theme = createTheme();
export default function Signup() {
  const [okIdCheck, setOkIdCheck] = React.useState(false);
  const [okPasswordCheck, setOkPasswordCheck] = React.useState(false);
  const [okEmailCheck, setOkEmailCheck] = React.useState(false);
  const [okHiredateCheck, setOkHiredateCheck] = React.useState(false);
  const [values, setShowPassword] = React.useState({}); // 비밀번호 가리는데 쓰임

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

  const [errorMessage, setErrorMessage] = React.useState(''); // 모달 에러 메세지 띄우는 변수
  const [failModal, setFailModal] = React.useState(false); // 실패 모달함수
  const failModalhandleOpen = () => setFailModal(true); // 실패 모달함수
  const failModalhandleClose = () => setFailModal(false); // 실패 모달함수

  const [open, setOpen] = React.useState(false); //메일보내는 중 모달을 위해 쓰는 함수
  const handleOpen = () => setOpen(true); //메일보내는 중 모달
  const handleClose = () => setOpen(false); //메일보내는 중 모달

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
  const LoginPage = () => {
    window.location.href = '/Login';
  };
  // ID 중복확인 함수 // 중복확인될경우 setOkIdCheck를 true로 바꿔줌
  const idCheck = () => {
    IDCheck(data.empId, setOkIdCheck, failModalhandleOpen, setErrorMessage);
  };
  // 회원 가입시 메일 보내는 함수
  const SendEmailForSignUp = () => {
    SendEmailForSignUpAPI(
      data.email,
      handleOpen,
      handleClose,
      setErrorMessage,
      failModalhandleOpen
    );
  };
  //회원 가입시 인증번호 확인하는 함수
  const CheckAuthForSignUp = () => {
    CheckAuthForSignUpAPI(
      data.authenticationNumber,
      data.email,
      failModalhandleOpen,
      setErrorMessage,
      setOkEmailCheck
    );
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
  React.useEffect(() => {
    console.log('empId: ', data.empId);
    console.log('password: ', data.password);
    console.log('password2: ', data.password2);
    console.log("name: ''", data.name);
    console.log(' phoneNumber: ', data.phoneNumber);
    console.log(' email: ', data.email);
    console.log('hiredate: ', data.hiredate);
    console.log('unit: ', data.unit);
  }, [data]);

  return (
    <>
      <div>
        {okEmailCheck === false ? <div>이메일 체크 안됨 </div> : <></>}
        {okPasswordCheck === false ? <div>패스워드 체크 안됨 </div> : <></>}
        {okIdCheck === false ? <div>아이디 체크 안됨 </div> : <></>}
        {okHiredateCheck === false ? <div>입사일 체크 안됨 </div> : <></>}
      </div>
      <div className={styles.BackGround}>
        {/* ----------------------------------메일보내는 중 모달함수----------------------------------*/}
        {ModalSendMail(open, handleClose)}
        {/* ----------------------------------실패 모달함수----------------------------------*/}
        {ModalSendMailFail(failModal, failModalhandleClose, errorMessage)}
        <div className={styles.Border}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <div className={styles.MainText}>
                  <Typography component="h1" variant="h5">
                    회원가입
                  </Typography>
                </div>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  {/* onSubmit={handleSubmit} */}
                  <Grid container spacing={3}>
                    {/*-------------------------------------------아이디 중복확인-----------------------------------------------*/}
                    <Grid item xs={12} sm={12}>
                      아이디
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        autoComplete="given-name"
                        name="아이디를 입력하세요"
                        required
                        fullWidth
                        id="empId"
                        label="아이디를 입력하세요"
                        autoFocus
                        onChange={handleChange('empId')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button
                        variant="outlined"
                        sx={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#64a1bd',
                          '&:hover': {
                            backgroundColor: '#267194',
                          },
                          color: 'AppWorkspace',
                        }}
                        onClick={idCheck}>
                        중복확인
                      </Button>
                    </Grid>
                    {/*---------------------------------비번과 비번 재확인 ------------------------------------*/}
                    <Grid item xs={12} sm={6}>
                      비밀번호
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      비밀번호 재확인
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ width: '100%' }} variant="outlined">
                        <InputLabel
                          htmlFor="outlined-adornment-password"
                          error={values.pwdInputError}>
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

                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ width: '100%' }} variant="outlined">
                        <InputLabel
                          htmlFor="outlined-adornment-password"
                          error={values.pwdInputError}>
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
                    {okPasswordCheck === false ? (
                      <>
                        <Grid item xs={12} sm={6}></Grid>
                        <Grid item xs={12} sm={6} sx={{ color: 'red', fontSize: 'small' }}>
                          비밀번호를 일치시켜 주세요
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                    {/*-----------------------------------이름과 연락처---------------------------------------*/}
                    <Grid item xs={12} sm={6}>
                      이름
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      연락처
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="이름을 입력하세요"
                        name="name"
                        onChange={handleChange('name')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="phoneNumber"
                        label="연락처를 입력하세요 (숫자만 입력 가능)"
                        name="phoneNumber"
                        onChange={handleChange('phoneNumber')}
                      />
                    </Grid>
                    {/*---------------------------------- 이메일적고 발송버튼------------------------------------*/}
                    <Grid item xs={12} sm={12}>
                      이메일
                    </Grid>

                    <Grid item xs={12} sm={9}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="이메일을 입력하세요"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange('email')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button
                        variant="outlined"
                        sx={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#64a1bd',
                          '&:hover': {
                            backgroundColor: '#267194',
                          },
                          color: 'AppWorkspace',
                        }}
                        onClick={SendEmailForSignUp}>
                        인증번호 발송
                      </Button>
                    </Grid>
                    {/*------------------------------------인증번호입력칸 + 확인버튼---------------------------------------------*/}
                    <Grid item xs={12} sm={9}>
                      <TextField
                        required
                        fullWidth
                        id="authenticationNumber"
                        label="인증번호를 입력하세요"
                        name="authenticationNumber"
                        onChange={handleChange('authenticationNumber')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button
                        variant="outlined"
                        sx={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#64a1bd',
                          '&:hover': {
                            backgroundColor: '#267194',
                          },
                          color: 'AppWorkspace',
                        }}
                        onClick={CheckAuthForSignUp}>
                        인증번호 확인
                      </Button>
                    </Grid>
                    {/*----------------------------------입사일----------------------------------------*/}
                    <Grid item xs={12}>
                      입사일
                    </Grid>

                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          inputFormat="yyyy-MM-dd"
                          label="입사일 지정"
                          value={data.hiredate}
                          onChange={(e) => {
                            setOkHiredateCheck(true);
                            setData({ ...data, hiredate: dayjs(new Date(e)).format('YYYY-MM-DD') });
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
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
                        }}>
                        회원 가입
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
