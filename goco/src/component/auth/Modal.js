import * as React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
const buttonStyle = {
  width: '10px',
  marginTop: '30px',
  marginBottom: '20px',
  color: 'black',
};

//========================================================= FindId 모달 함수 =====================================================//
export const ModalSendMail = (open, handleClose) => {
  /* ----------------------------------메일보내는 중 모달함수----------------------------------*/

  return (
    <div>
      <Modal open={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            메일을 보내는 중입니다.
            <Typography>
              <Button
                sx={buttonStyle}
                variant="text"
                onClick={() => {
                  handleClose();
                }}>
                확인
              </Button>
            </Typography>
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
      <Modal open={failModal}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {errorMessage}{' '}
            <div>
              <Button
                sx={buttonStyle}
                variant="text"
                onClick={() => {
                  failModalhandleClose();
                }}>
                확인
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const ModalAuthNumberCheckFail = (authModal, authModalhandleClose, errorMessage) => {
  return (
    <div>
      <Modal open={authModal}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {errorMessage}
            <div>
              <Button
                sx={buttonStyle}
                variant="text"
                onClick={() => {
                  authModalhandleClose();
                }}>
                확인
              </Button>
            </div>
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
      <Modal open={errorModalOpen}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {errorMessage}
            <div>
              <Button
                sx={buttonStyle}
                variant="text"
                onClick={() => {
                  errorModalhandleClose();
                }}>
                확인
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
