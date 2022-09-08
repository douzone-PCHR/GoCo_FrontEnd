import React from 'react';
import styles from '../../CSS/authcss/ShowId.module.css';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShowIdButtonGroup from '../../component/auth/FindId/ShowIdButtonGroup';

const theme = createTheme();
export default function ShowId({ id }) {
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
                  <ShowIdButtonGroup />
                </Grid>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
