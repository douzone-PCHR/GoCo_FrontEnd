import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/authcss/FindId.module.css';
import { FindIdAPI, AuthCheckAPI } from '../../api/authAPI';
import ShowId from './ShowId';
import InsertName from '../../component/auth/FindId/InsertName';
import InsertEmail from '../../component/auth/FindId/InsertEmail';
import InsertAuthNum from '../../component/auth/FindId/InsertAuthNum';
import MoveLoginPage from '../../component/auth/FindId/MoveLoginPage';
import MoveShowIdPage from '../../component/auth/FindId/MoveShowIdPage';
import AuthNumButton from '../../component/auth/FindId/AuthNumButton';
import {
  ModalSendMail,
  ModalSendMailFail,
  ModalAuthNumberCheckFail,
} from '../../component/auth/Modal';
const theme = createTheme();

export default function FindId() {
  const [id, setId] = React.useState(-1); // 찾은 ID값이 들어 있다.
  const [data, setData] = React.useState({}); // 이름, 이메일 , 인증 번호가 들어 있는 유즈스테이트
  const [showPage, setShowPage] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState(''); // 에러 메세지 띄우는 변수

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

  const SendAuth = () => {
    // 이메일 전달하는 함수
    FindIdAPI(data.name, data.email, handleOpen, handleClose, failModalhandleOpen, setErrorMessage);
  };
  const AuthCheck = () => {
    // 인증번호를 체크하고 맞다면 id 셋팅
    AuthCheckAPI(data.authNum, data.email, authModalhandleOpen, setId, setErrorMessage);
  };
  React.useEffect(() => {
    //ID 값을 받았을 때 ShowId 컴포넌트 호출
    if (id !== -1) {
      setShowPage(false);
    }
  }, [id]);

  return (
    <>
      {showPage === true ? (
        <div className={styles.BackGround}>
          {/* ----------------------------------메일보내는 중 모달함수----------------------------------*/}
          {ModalSendMail(open, handleClose)}
          {/* ----------------------------------실패 모달함수----------------------------------*/}
          {ModalSendMailFail(failModal, failModalhandleClose, errorMessage)}
          {/* ----------------------------------인증 번호 다를 때 모달함수----------------------------------*/}
          {ModalAuthNumberCheckFail(authModal, authModalhandleClose, errorMessage)}

          <div className={styles.Border}>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="lg">
                <div className={styles.MainText}>아이디 찾기</div>
                <Grid container spacing={4}>
                  <InsertName handleChange={handleChange} />
                  <InsertEmail handleChange={handleChange} />
                  <AuthNumButton SendAuth={SendAuth} />
                  <InsertAuthNum handleChange={handleChange} />
                  <MoveLoginPage />
                  <MoveShowIdPage AuthCheck={AuthCheck} />
                </Grid>
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
