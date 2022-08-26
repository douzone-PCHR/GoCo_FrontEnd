import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { resultConfirm } from '../../../common/confirm';
import Vacations from './Vacations';
import BusinessTrips from './BusinessTrip';
import { checkBusiness } from '../../../api/businessTripAPI';
import { checkVacation } from '../../../api/vacationAPI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CheckDateModal(props) {
  const { checkOpen, setCheckOpen, type, newApprove } = props;
  const [check, setCheck] = useState(false);
  const [checkDate, setCheckDate] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (type === '출장') {
      checkBusiness(setCheckDate, newApprove);
    } else if (type === '휴가') {
      checkVacation(setCheckDate, newApprove);
    }
  }, [check]);
  return (
    <Modal id="modal2" open={checkOpen}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          중복 날짜
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        {type === '휴가' ? (
          <Vacations
            vacationList={checkDate}
            check={check}
            setCheck={setCheck}
            state={'ALL'}
            page={page}
            setPage={setPage}
          />
        ) : (
          <BusinessTrips
            businessList={checkDate}
            check={check}
            setCheck={setCheck}
            state={'ALL'}
            page={page}
            setPage={setPage}
          />
        )}
        <Button
          onClick={() => {
            setCheckOpen(false);
          }}>
          닫기
        </Button>
      </Box>
    </Modal>
  );
}
