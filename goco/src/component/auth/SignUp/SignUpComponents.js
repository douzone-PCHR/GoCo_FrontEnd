import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import UnitSelect from './UnitSelect';
import PasswordCheck from './PasswordCheck';
import { Hiredate } from './Hiredate';
import { InsertEmail } from './InsertEmail';
import { insertName, insertPhoneNumber } from './InsertNamePhone';
import { InsertId } from './InsertId';
import { signupAPI } from '../../../api/AllAPI';
import MoveLoginPage from './MoveLoginPage';
import SignUpButton from './SignUpButton';
export default function SignUpComponents() {
  const [okIdCheck, setOkIdCheck] = useState(false);
  const [okPasswordCheck, setOkPasswordCheck] = useState(false);
  const [okEmailCheck, setOkEmailCheck] = useState(false);
  const [okHiredateCheck, setOkHiredateCheck] = useState(false);
  const [okUnitCheck, setOkUnitCheck] = useState(false);
  const [signupDataError, setSignupDataError] = useState({
    valid_password: '',
    valid_name: '',
    valid_empId: '',
    valid_phoneNumber: '',
    valid_email: '',
  });

  const [data, setData] = useState({
    empId: '',
    password: '',
    password2: '',
    name: '',
    phoneNumber: '',
    email: '',
    hiredate: '',
    unit: '',
  }); // 이름, 이메일 , 인증 번호등 모든 데이터가 가 들어 있는 유즈스테이트

  const SignUpData = () => {
    if (!okIdCheck) {
      setSignupDataError({ ...data, valid_empId: '아이디 인증을 진행해주세요' });
      return false;
    } else if (!okEmailCheck) {
      setSignupDataError({ ...data, valid_email: '이메일 인증을 진행해주세요' });
      return false;
    } else if (!okHiredateCheck) {
      return false;
    } else if (!okUnitCheck) {
      return false;
    }
    signupAPI(data, setSignupDataError, signupDataError);
  };
  useEffect(() => {
    setOkIdCheck(false);
  }, [data.empId]); // 아이디 입력을 바꿀때마다 id 체크 값이 false가 된다.
  useEffect(() => {
    if (data.password === data.password2) {
      setOkPasswordCheck(true);
    } else {
      setOkPasswordCheck(false);
    }
  }, [data.password, data.password2]); // 비밀번호가 다를 때마다 경고문구를 띄워 준다.
  useEffect(() => {
    setOkEmailCheck(false);
  }, [data.email]); // 입사일 지정 되었나 확인

  return (
    <>
      <Grid container spacing={3}>
        {/*-------------------------------------------아이디 중복확인-----------------------------------------------*/}
        <InsertId
          setData={setData}
          data={data}
          setOkIdCheck={setOkIdCheck}
          signupDataError={signupDataError}
          setSignupDataError={setSignupDataError}
        />
        {/*---------------------------------비번과 비번 재확인 ------------------------------------*/}
        <PasswordCheck
          okPasswordCheck={okPasswordCheck}
          data={data}
          setData={setData}
          signupDataError={signupDataError}
        />
        {/*-----------------------------------이름과 연락처---------------------------------------*/}
        {insertName(data, setData, signupDataError)}
        {insertPhoneNumber(data, setData, signupDataError)}
        {/*---------------------------------- 이메일적고 발송버튼------------------------------------*/}
        <InsertEmail
          signupDataError={signupDataError}
          okEmailCheck={okEmailCheck}
          data={data}
          setData={setData}
          setOkEmailCheck={setOkEmailCheck}
          setSignupDataError={setSignupDataError}
        />
        {/*----------------------------------입사일----------------------------------------*/}
        <Hiredate data={data} setData={setData} setOkHiredateCheck={setOkHiredateCheck} />
        {/*-------------------------------------부서지정---------------------------------------------*/}
        <UnitSelect
          setData={setData}
          data={data}
          setOkUnitCheck={setOkUnitCheck}
          okUnitCheck={okUnitCheck}
        />
        {/*----------------------------------------------------------------------------------*/}
        <MoveLoginPage />
        <Grid item xs={12} sm={2} />
        <SignUpButton SignUpData={SignUpData} />
      </Grid>
    </>
  );
}
