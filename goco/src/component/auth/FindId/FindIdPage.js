import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../../CSS/authcss/FindId.module.css';
import InsertName from './InsertName';
import InsertEmail from './InsertEmail';
import InsertAuthNum from './InsertAuthNum';
import MoveLoginPage from './MoveLoginPage';
import MoveShowIdPage from './MoveShowIdPage';
import AuthNumButton from './AuthNumButton';
const theme = createTheme();

export default function FindIdPage({ setId }) {
  const [data, setData] = useState({}); // 이름, 이메일 , 인증 번호가 들어 있는 유즈스테이트
  return (
    <>
      <div className={styles.BackGround}>
        <div className={styles.Border}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <div className={styles.MainText}>아이디 찾기</div>
              <Grid container spacing={4}>
                <InsertName data={data} setData={setData} />
                <InsertEmail data={data} setData={setData} />
                <AuthNumButton data={data} />
                <InsertAuthNum data={data} setData={setData} />
                <MoveLoginPage />
                <MoveShowIdPage data={data} setId={setId} />
              </Grid>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
