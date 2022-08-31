import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ModalSendMail } from '../Modal';
import { FindPasswordAPI } from '../../../api/authAPI';
export default function SendNewPassword({ data }) {
  const [open, setOpen] = React.useState(false); //메일보내는 중 모달을 위해 쓰는 함수
  const handleOpen = () => setOpen(true); //메일보내는 중 모달
  const handleClose = () => setOpen(false); //메일보내는 중 모달

  const FindPassword = () => {
    // 인증번호를 체크하고 맞다면 비밀번호 재발송
    FindPasswordAPI(data.authNum, data.email, handleOpen, handleClose);
  };
  return (
    <>
      {ModalSendMail(open, handleClose)}
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
          onClick={FindPassword}>
          새로운 비밀번호 발송
        </Button>
      </Grid>
    </>
  );
}
