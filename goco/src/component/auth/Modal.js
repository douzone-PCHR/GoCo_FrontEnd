import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  // 모달을 위해 쓰는 스타일
  position: 'absolute',
  top: '50%',
  left: '50%',
  paddingTop: '30px',
  paddingLeft: '30px',
  paddingRight: '30px',
  transform: 'translate(-50%, -50%)',

  textAlign: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  //  p: 4,
};
const progressStyle = {
  marginTop: '30px',
  marginBottom: '20px',
};

//========================================================= 메일 보내는 모달 =====================================================//
export const ModalSendMail = (open, handleClose) => {
  /* ----------------------------------메일보내는 중 모달함수----------------------------------*/
  return (
    <div>
      <Modal open={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            메일을 보내는 중입니다.
            <Box sx={progressStyle} onClick={handleClose}>
              <CircularProgress />
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
