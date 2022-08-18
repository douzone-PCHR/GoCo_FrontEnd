import * as React from 'react';
import styles from '../../CSS/authcss/ShowId.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
export default function ShowId({ id }) {
  const LoginPage = () => {
    window.location.href = '/login';
  };
  const FindPwdPage = () => {
    window.location.href = '/findPwd';
  };
  return (
    <>
      <div className={styles.BackGround}>
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
                  <Typography component="h4" variant="h5">
                    아이디 확인
                  </Typography>
                </div>
                <div className={styles.SubText}>
                  <Typography>요청하신 ID 입니다.</Typography>
                </div>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField fullWidth value={`ID : ${id}`} />
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
                      onClick={FindPwdPage}>
                      비밀번호 찾기
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
