import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/authcss/FindId.module.css';
import { FindPwdAPI, FindPasswordAPI } from '../../api/authAPI';
import { ModalSendMail, ModalError } from '../../component/auth/Modal';
const theme = createTheme();

export default function FindPwd() {
  const [data, setData] = React.useState({}); // 이름, 이메일 , 인증 번호가 들어 있는 유즈스테이트
  const [errorMessage, setErrorMessage] = React.useState('');

  const [open, setOpen] = React.useState(false); //메일보내는 중 모달을 위해 쓰는 함수
  const handleOpen = () => setOpen(true); //메일보내는 중 모달
  const handleClose = () => setOpen(false); //메일보내는 중 모달

  const [errorModalOpen, setErrorModalOpen] = React.useState(false); // 에러 메시지 표시하는 모달
  const errorModalhandleOpen = () => setErrorModalOpen(true); // 에러 메시지 표시하는 모달 중 모달을 키는 함수
  const errorModalhandleClose = () => setErrorModalOpen(false); // 에러 메시지 표시하는 모달 중 모달을 끄는 함수

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const LoginPage = () => {
    window.location.href = '/login';
  };
  const SendAuth = () => {
    // 이메일 전달하는 함수
    FindPwdAPI(
      data.empId,
      data.email,
      handleOpen,
      handleClose,
      setErrorMessage,
      errorModalhandleOpen
    );
  };
  const FindPassword = () => {
    // 인증번호를 체크하고 맞다면 비밀번호 재발송
    FindPasswordAPI(
      data.authNum,
      data.email,
      errorModalhandleOpen,
      setErrorMessage,
      handleOpen,
      handleClose
    );
  };

  return (
    <>
      <div className={styles.BackGround}>
        {/* ----------------------------------메일보내는 중 모달함수----------------------------------*/}
        {ModalSendMail(open, handleClose)}
        {ModalError(errorModalOpen, errorModalhandleClose, errorMessage)}

        <div className={styles.Border}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <div className={styles.MainText}>비밀번호 찾기</div>

              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="아이디를 입력하세요"
                    required
                    fullWidth
                    id="name"
                    label="아이디를 입력하세요"
                    autoFocus
                    onChange={handleChange('empId')}
                  />
                </Grid>
                {/*---------------------------------- 이메일과 인증번호 버튼------------------------------------*/}
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                    onClick={SendAuth}>
                    인증번호 발송
                  </Button>
                </Grid>
                {/*------------------------------------------------------------------------------------------*/}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="authNum"
                    label="인증번호를 입력하세요"
                    name="authNum"
                    onChange={handleChange('authNum')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                    onClick={LoginPage}>
                    로그인
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
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
                    onClick={FindPassword}>
                    새로운 비밀번호 발송
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
