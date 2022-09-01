import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/authcss/FindId.module.css';
import InsertID from '../../component/auth/FindPwd/InsertID';
import InsertEmail from '../../component/auth/FindPwd/InsertEmail';
import SendAuthButton from '../../component/auth/FindPwd/SendAuthButton';
import InsertAuthNumber from '../../component/auth/FindPwd/InsertAuthNumber';
import MoveLoginPage from '../../component/auth/FindPwd/MoveLoginPage';
import SendNewPassword from '../../component/auth/FindPwd/SendNewPassword';
const theme = createTheme();

export default function FindPwd() {
  const [data, setData] = React.useState({}); // 이름, 이메일 , 인증 번호가 들어 있는 유즈스테이트
  return (
    <>
      <div className={styles.BackGround}>
        <div className={styles.Border}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <div className={styles.MainText}>비밀번호 찾기</div>
              <Grid container spacing={4}>
                <InsertID data={data} setData={setData} />
                <InsertEmail data={data} setData={setData} />
                <SendAuthButton data={data} />
                <InsertAuthNumber data={data} setData={setData} />
                <MoveLoginPage />
                <SendNewPassword data={data} />
              </Grid>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
