import * as React from 'react';
import Button from '@mui/material/Button';

import ButtonGroup from '@mui/material/ButtonGroup';

export default function LoginButtonGroup() {
  const FindId = () => {
    window.location.href = '/findId';
  };
  const FindPwd = () => {
    window.location.href = '/findPwd';
  };
  const SignUp = () => {
    window.location.href = '/signup';
  };
  return (
    <>
      <ButtonGroup variant="text" aria-label="text button group" color="inherit" fullWidth={true}>
        <Button onClick={FindId}>아이디 찾기</Button>
        <Button onClick={FindPwd}>비밀번호 찾기</Button>
        <Button onClick={SignUp}>회원가입</Button>
      </ButtonGroup>
    </>
  );
}
