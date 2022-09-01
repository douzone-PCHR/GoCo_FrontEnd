import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { CheckAuthForSignUpAPI, SendEmailForSignUpAPI } from '../../../api/authAPI';
import { sweetAlert2 } from '../AuthSweetAlert.js/sweetAlert2';
import { ModalSendMail } from '../Modal';
export const InsertEmail = ({
  signupDataError,
  okEmailCheck,
  data,
  setData,
  setOkEmailCheck,
  setSignupDataError,
}) => {
  const [authNumberOpen, setAuthNumberOpen] = React.useState(false);
  // 회원 가입시 메일 보내는 함수
  const [open, setOpen] = React.useState(false); //메일보내는 중 모달을 위해 쓰는 함수
  const handleOpen = () => setOpen(true); //메일보내는 중 모달
  const handleClose = () => setOpen(false); //메일보내는 중 모달
  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  const SendEmailForSignUp = () => {
    if ((data.email === '') | (data.email === undefined)) {
      sweetAlert2('이메일이 입력되지 않았습니다.', 'warning');
      return;
    }
    SendEmailForSignUpAPI(data.email, handleOpen, handleClose, setAuthNumberOpen);
  };
  //회원 가입시 인증번호 확인하는 함수
  const CheckAuthForSignUp = () => {
    CheckAuthForSignUpAPI(data, setOkEmailCheck, setSignupDataError);
  };
  return (
    <>
      {/* ----------------------------------메일보내는 중 모달함수----------------------------------*/}
      {ModalSendMail(open, handleClose)}
      <Grid item xs={12} sm={12}>
        이메일
      </Grid>

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
          }}
          onClick={SendEmailForSignUp}>
          인증번호 발송
        </Button>
      </Grid>
      {signupDataError.valid_email !== '' && (
        <>
          <Grid item xs={12} sx={{ color: 'red', fontSize: 'small' }}>
            {signupDataError.valid_email}
          </Grid>
        </>
      )}
      {/*------------------------------------인증번호입력칸 + 확인버튼---------------------------------------------*/}
      {authNumberOpen === true && (
        <>
          <Grid item xs={12} sm={9}>
            <TextField
              required
              fullWidth
              id="authenticationNumber"
              label="인증번호를 입력하세요"
              name="authenticationNumber"
              error={!okEmailCheck}
              onChange={handleChange('authenticationNumber')}
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
              }}
              onClick={CheckAuthForSignUp}>
              인증번호 확인
            </Button>
          </Grid>
        </>
      )}
    </>
  );
};
