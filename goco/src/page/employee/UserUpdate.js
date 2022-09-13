import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/employeecss/UserUpdate.module.css';
import PasswordChange from '../../component/Employee/PasswordChange';
import DeleteEmp from '../../component/Employee/DeleteEmp';
import ChangeEmail from '../../component/Employee/ChangeEmail';
import ChangePhoneNumber from '../../component/Employee/ChangePhoneNumber';
import NameAndId from '../../component/Employee/NameAndId';
import ReturnButton from '../../component/Employee/ReturnButton';
import { userMeAPI } from '../../api/AllAPI';
const theme = createTheme();

export default function UserDataUpdate() {
  const [data, setData] = useState();
  const [textData, setTextData] = useState({
    email: '',
    phoneNumber: '',
    password1: '',
    password2: '',
    text: '',
  });
  useEffect(() => {
    userMeAPI(setData);
  }, []); //초기 데이터 받아오는 것

  return (
    <>
      <div className={styles.BackGround}>
        <div className={styles.Border}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <div className={styles.MainText}>사용자 정보 변경</div>
              <Grid container spacing={1}>
                {data && data && (
                  <>
                    <NameAndId data={data} />
                    <ChangePhoneNumber data={data} setTextData={setTextData} textData={textData} />
                    <ChangeEmail data={data} setTextData={setTextData} textData={textData} />
                  </>
                )}
                <PasswordChange setTextData={setTextData} textData={textData} />
                <DeleteEmp setTextData={setTextData} textData={textData} />
                <ReturnButton />
              </Grid>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
