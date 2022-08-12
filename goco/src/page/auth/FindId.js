import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/authcss/FindId.module.css';
import { FindIdAPI, AuthCheckAPI } from '../../api/authAPI';
import ShowId from './ShowId';
const theme = createTheme();
const style = {
  // 모달을 위해 쓰는 스타일
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  textAlign: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function FindId() {
  const [id, setId] = React.useState(); // 찾은 ID값이 들어 있다.
  const [data, setData] = React.useState({}); // 이름, 이메일 , 인증 번호가 들어 있는 유즈스테이트
  const [showPage, setShowPage] = React.useState(false);

  const [open, setOpen] = React.useState(false); //메일보내는 중 모달을 위해 쓰는 함수
  const handleOpen = () => setOpen(true); //메일보내는 중 모달
  const handleClose = () => setOpen(false); //메일보내는 중 모달

  const [failModal, setFailModal] = React.useState(false); // 실패 모달함수
  const failModalhandleOpen = () => setFailModal(true); // 실패 모달함수
  const failModalhandleClose = () => setFailModal(false); // 실패 모달함수

  const [authModal, setAuthModal] = React.useState(false); // 인증번호 모달 함수
  const authModalhandleOpen = () => setAuthModal(true); // 인증번호 모달 함수
  const authModalhandleClose = () => setAuthModal(false); // 인증번호 모달 함수

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const LoginPage = () => {
    window.location.href = '/Login';
  };
  const SendAuth = () => {
    // 이메일 전달하는 함수
    FindIdAPI(data.name, data.email, handleOpen, handleClose, failModalhandleOpen);
  };
  const AuthCheck = () => {
    // 인증번호를 체크하고 맞다면 id 셋팅
    AuthCheckAPI(data.authNum, authModalhandleOpen, setId);
  };
  React.useEffect(() => {
    //ID 값을 받았을 때 ShowId 컴포넌트 호출
    setShowPage(!showPage);
  }, [id]);

  return (
    <>
      {showPage === true ? (
        <div className={styles.BackGround}>
          {/* ----------------------------------메일보내는 중 모달함수----------------------------------*/}
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Typography variant="h6" component="h2">
                메일을 보내는 중입니다.
              </Typography>
            </Box>
          </Modal>
          {/* ----------------------------------메일보내는 중 모달함수----------------------------------*/}
          {/* ----------------------------------실패 모달함수----------------------------------*/}
          <Modal open={failModal} onClose={failModalhandleClose}>
            <Box sx={style}>
              <Typography variant="h6" component="h2">
                이메일 혹은 이름을 다시 확인하세요.
              </Typography>
            </Box>
          </Modal>
          {/* ----------------------------------실패모달함수----------------------------------*/}
          {/* ----------------------------------인증 번호 다를 때 모달함수----------------------------------*/}
          <Modal open={authModal} onClose={authModalhandleClose}>
            <Box sx={style}>
              <Typography variant="h6" component="h2">
                올바른 인증번호를 입력하세요.
              </Typography>
            </Box>
          </Modal>
          {/* ----------------------------------인증 번호 다를 때 모달함수----------------------------------*/}

          <div className={styles.Border}>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="lg">
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <div className={styles.MainText}>
                    <Typography component="h1" variant="h5">
                      아이디 찾기
                    </Typography>
                  </div>
                  {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}> */}
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="이름을 입력하세요"
                        required
                        fullWidth
                        id="name"
                        label="이름을 입력하세요"
                        autoFocus
                        onChange={handleChange('name')}
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
                        취소
                      </Button>
                    </Grid>{' '}
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
                        onClick={AuthCheck}>
                        확인
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                {/* </Box> */}
              </Container>
            </ThemeProvider>
          </div>
        </div>
      ) : (
        <ShowId id={id} />
      )}
    </>
  );
}
