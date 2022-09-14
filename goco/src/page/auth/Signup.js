import React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/authcss/Signup.module.css';
import SignUpComponents from '../../component/auth/SignUp/SignUpComponents';
import { Authheader } from '../../component/auth/AuthHeader';
import { AuthFooter } from '../../component/auth/AuthFooter';
const theme = createTheme();
export default function Signup() {
  return (
    <>
      <div className={styles.BackGround}>
        <Authheader />
        <div className={styles.Border}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <div className={styles.MainText}>회원가입</div>
              <SignUpComponents />
            </Container>
          </ThemeProvider>
        </div>
        <AuthFooter />
      </div>
    </>
  );
}
