import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../CSS/employeecss/UserUpdate.module.css';
import { userMeAPI } from '../../api/employeeAPI';
import PasswordChange from '../../component/Employee/PasswordChange';
import DeleteEmp from '../../component/Employee/DeleteEmp';
import ChangeEmail from '../../component/Employee/ChangeEmail';
import ChangePhoneNumber from '../../component/Employee/ChangePhoneNumber';
import NameAndId from '../../component/Employee/NameAndId';
import ReturnButton from '../../component/Employee/ReturnButton';
const theme = createTheme();

export default function UserDataUpdate() {
  const [data, setData] = React.useState();
  const [textData, setTextData] = React.useState({
    email: '',
    phoneNumber: '',
    password1: '',
    password2: '',
    text: '',
  });
  const handleChange = (prop) => (e) => {
    setTextData({ ...textData, [prop]: e.target.value });
  };
  React.useEffect(() => {
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
                {
                  data && data && (
                    <>
                      {/*-------------------------------------------이름 , id불변-----------------------------------------------*/}
                      <NameAndId data={data} />
                      {/*----------------------------------- 연락처 변경 ---------------------------------------*/}
                      <ChangePhoneNumber
                        data={data}
                        handleChange={handleChange}
                        textData={textData}
                      />
                      {/*---------------------------------- 이메일변경 -----------------------------------*/}
                      <ChangeEmail data={data} handleChange={handleChange} textData={textData} />
                    </>
                  )
                  //   : (
                  //   <></>
                  // )
                }
                {/* 여기 까지 삼항 연산자 */}
                {/*----------------------------------비번변경 ----------------------------------------*/}
                <PasswordChange handleChange={handleChange} textData={textData} />
                {/*-------------------------------------계정 탈퇴---------------------------------------------*/}
                <DeleteEmp handleChange={handleChange} textData={textData} />
                {/*---------------------------------돌아가기 버튼-------------------------------------------------*/}
                <ReturnButton />
              </Grid>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
