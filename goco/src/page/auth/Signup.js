import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/authcss/Signup.module.css';

const theme = createTheme();
export default function Signup() {
  const [values, setValues] = React.useState({});
  const [data, setData] = React.useState({}); // 이름, 이메일 , 인증 번호가 들어 있는 유즈스테이트

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    // 비밀번호 입력관련
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    // 비밀번호 입력관련
    event.preventDefault();
  };
  const LoginPage = () => {
    window.location.href = '/Login';
  };
  return (
    <>
      <div className={styles.BackGround}>
        <div className={styles.Border}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <div className={styles.MainText}>
                  <Typography component="h1" variant="h5">
                    회원가입
                  </Typography>
                </div>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  {/* onSubmit={handleSubmit} */}
                  {/*-------------------------------------------아이디 중복확인-----------------------------------------------*/}
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        autoComplete="given-name"
                        name="아이디를 입력하세요"
                        required
                        fullWidth
                        id="empId"
                        label="아이디를 입력하세요"
                        autoFocus
                        onChange={handleChange('empId')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
                        }}>
                        중복확인
                      </Button>
                    </Grid>
                    {/*---------------------------------비번과 비번 재확인 ------------------------------------*/}
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, width: '96%' }} variant="outlined">
                        <InputLabel
                          htmlFor="outlined-adornment-password"
                          error={values.pwdInputError}>
                          비밀번호를 입력하세요
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange('password')}
                          error={values.pwdInputError}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="비밀번호를 입력하세요"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, width: '96%' }} variant="outlined">
                        <InputLabel
                          htmlFor="outlined-adornment-password"
                          error={values.pwdInputError}>
                          비밀번호를 입력하세요
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange('password')}
                          error={values.pwdInputError}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="비밀번호를 입력하세요"
                        />
                      </FormControl>
                    </Grid>
                    {/*-----------------------------------이름과 연락처---------------------------------------*/}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="이름을 입력하세요"
                        name="name"
                        autoComplete="name"
                        onChange={handleChange('name')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="phoneNumber"
                        label="연락처를 입력하세요"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        onChange={handleChange('phoneNumber')}
                      />
                    </Grid>
                    {/*-----------------------------------부서와 팀---------------------------------------*/}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="부서를 입력하세요"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange('email')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="팀을 입력하세요"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange('email')}
                      />
                    </Grid>
                    {/*---------------------------------- 이메일적고 발송버튼------------------------------------*/}
                    <Grid item xs={12} sm={9}>
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
                    <Grid item xs={12} sm={3}>
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
                        }}>
                        인증번호 발송
                      </Button>
                    </Grid>
                    {/*------------------------------------인증번호입력칸 + 확인버튼---------------------------------------------*/}
                    <Grid item xs={12} sm={9}>
                      <TextField
                        required
                        fullWidth
                        id="authNum"
                        label="인증번호를 입력하세요"
                        name="authNum"
                        onChange={handleChange('authNum')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
                        }}>
                        인증번호 확인
                      </Button>
                    </Grid>
                    {/*----------------------------------입사일----------------------------------------*/}
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="hiredate"
                        label="입사일을 입력하세요"
                        name="hiredate"
                        onChange={handleChange('hiredate')}
                      />
                    </Grid>
                    {/*------------------------------------------------------------------------------------------*/}
                    <Grid item xs={12} sm={5}>
                      <Button
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
                    </Grid>
                    <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={5}>
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
                        }}>
                        회원 가입
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
