import React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/authcss/Signup.module.css';
import SignUpComponents from '../../component/auth/SignUp/SignUpComponents';
const theme = createTheme();
export default function Signup() {
  return (
    <>
      <div className={styles.BackGround}>
        <div className={styles.Border}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <div className={styles.MainText}>회원가입</div>
              <SignUpComponents />
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
