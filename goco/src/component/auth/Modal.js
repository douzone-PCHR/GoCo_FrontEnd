import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  // 모달을 위해 쓰는 스타일
  position: 'absolute',
  top: '50%',
  left: '50%',
  padding: '10px',
  transform: 'translate(-50%, -50%)',
  width: 400,
  textAlign: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

//========================================================= FindId 모달 함수 =====================================================//
export const ModalSendMail = (open, handleClose) => {
  /* ----------------------------------메일보내는 중 모달함수----------------------------------*/

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            메일을 보내는 중입니다.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const ModalSendMailFail = (failModal, failModalhandleClose, errorMessage) => {
  /* ----------------------------------실패 모달함수----------------------------------*/
  return (
    <div>
      <Modal open={failModal} onClose={failModalhandleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {errorMessage}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const ModalAuthNumberCheckFail = (authModal, authModalhandleClose, errorMessage) => {
  return (
    <div>
      <Modal open={authModal} onClose={authModalhandleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {errorMessage}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
//====================================================================================================================================//

//========================================================= FindPwd 모달 함수 =====================================================//
export const ModalError = (errorModalOpen, errorModalhandleClose, errorMessage) => {
  return (
    <div>
      <Modal open={errorModalOpen} onClose={errorModalhandleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {errorMessage}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
