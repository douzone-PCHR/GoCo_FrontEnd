import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FindIdAPI } from '../../../api/AllAPI';
import { ModalSendMail } from '../Modal';
export default function AuthNumButton({ data }) {
  const [open, setOpen] = React.useState(false); //메일보내는 중 모달을 위해 쓰는 함수
  const handleOpen = () => setOpen(true); //메일보내는 중 모달
  const handleClose = () => setOpen(false); //메일보내는 중 모달
  const SendAuth = () => {
    // 이메일 전달하는 함수
    FindIdAPI(data.name, data.email, handleOpen, handleClose);
  };

  return (
    <>
      {/* ----------------------------------메일보내는 중 모달함수----------------------------------*/}
      {ModalSendMail(open, handleClose)}
      <Grid item xs={12} sm={6}>
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
          onClick={SendAuth}>
          인증번호 발송
        </Button>
      </Grid>
    </>
  );
}
