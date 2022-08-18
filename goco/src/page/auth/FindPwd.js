import * as React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/authcss/FindId.module.css';
import { FindPwdAPI, FindPasswordAPI } from '../../api/authAPI';
import { ModalSendMail } from '../../component/auth/Modal';
import InsertID from '../../component/auth/FindPwd/InsertID';
import InsertEmail from '../../component/auth/FindPwd/InsertEmail';
import SendAuthButton from '../../component/auth/FindPwd/SendAuthButton';
import InsertAuthNumber from '../../component/auth/FindPwd/InsertAuthNumber';
import MoveLoginPage from '../../component/auth/FindPwd/MoveLoginPage';
import SendNewPassword from '../../component/auth/FindPwd/SendNewPassword';
const theme = createTheme();

export default function FindPwd() {
  const [data, setData] = React.useState({}); // 이름, 이메일 , 인증 번호가 들어 있는 유즈스테이트
  const [open, setOpen] = React.useState(false); //메일보내는 중 모달을 위해 쓰는 함수
  const handleOpen = () => setOpen(true); //메일보내는 중 모달
  const handleClose = () => setOpen(false); //메일보내는 중 모달
  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const SendAuth = () => {
    // 이메일 전달하는 함수
    FindPwdAPI(data.empId, data.email, handleOpen, handleClose);
  };
  const FindPassword = () => {
    // 인증번호를 체크하고 맞다면 비밀번호 재발송
    FindPasswordAPI(data.authNum, data.email, handleOpen, handleClose);
  };

  return (
    <>
      <div className={styles.BackGround}>
        {/* ----------------------------------메일보내는 중 모달함수----------------------------------*/}
        {ModalSendMail(open, handleClose)}
        <div className={styles.Border}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <div className={styles.MainText}>비밀번호 찾기</div>
              <Grid container spacing={4}>
                <InsertID handleChange={handleChange} />
                <InsertEmail handleChange={handleChange} />
                <SendAuthButton SendAuth={SendAuth} />
                <InsertAuthNumber handleChange={handleChange} />
                <MoveLoginPage />
                <SendNewPassword FindPassword={FindPassword} />
              </Grid>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
