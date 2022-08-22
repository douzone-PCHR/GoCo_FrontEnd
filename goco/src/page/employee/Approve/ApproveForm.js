import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Paper, TextareaAutosize, TextField } from '@mui/material';
import { addBusinessTrip } from '../../../api/businessTripAPI';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css files
import { ko } from 'react-date-range/dist/locale';
import { Today } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { addConfirm, resultConfirm } from '../../../common/confirm';
import { border } from '@mui/system';
import CheckDateModal from './CheckDateModal';
import VacationType from './VacationType';
import { addVacation, checkVacationCount } from '../../../api/vacationAPI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ApproveForm({ open, setOpen, type }) {
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState('');
  // checkDate 할 때 사용할 입력받은 객체
  const [newApprove, setNewApprove] = useState({});
  const [vacationType, setVacationType] = useState('연차');
  // 일자 중복 확인 모달 open
  const [checkOpen, setCheckOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  return (
    // <div>
    <Modal
      id="modal"
      hideBackdrop
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
          {type} 신청
        </Typography>
        <hr />
        <Box textAlign={'center'}>
          <DateRange
            // editableDateInputs={true}
            dateDisplayFormat={'yyyy/MM/dd'}
            onChange={(item) => {
              let count = 0;
              console.log(date);
              const today = new Date();
              console.log(today.getTime / (60 * 60 * 24 * 1000));
              console.log(today.toISOString());
              console.log(item.selection.startDate.toISOString());

              if (vacationType === '반차') {
                item.selection.endDate = item.selection.startDate;
                count = 0.5;
                checkVacationCount(1, count, item.selection);
              } else if (vacationType === '연차') {
                count =
                  (item.selection.endDate - item.selection.startDate) / (60 * 60 * 24 * 1000) + 1;
                checkVacationCount(1, count, item.selection);
              }
              setDate([item.selection]);
            }}
            locale={ko}
            moveRangeOnFirstSelection={false}
            ranges={date}
            startDatePlaceholder={'시작일'}
            endDatePlaceholder={'종료일'}
            // retainEndDateOnFirstSelection={false}
          />
        </Box>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        {type === '휴가' && (
          <VacationType vacationType={vacationType} setVacationType={setVacationType} />
        )}
        <TextareaAutosize
          id="content"
          maxRows={10}
          aria-label="maximum height"
          placeholder=" 신청 사유를 입력하세요 "
          style={{ marginTop: 10, paddingTop: 10, minHeight: 200, width: '100%', resize: 'none' }}
        />
        <hr></hr>

        <input
          type="file"
          onChange={(e) => {
            console.log(e.target.files);
            setFile(e.target.files[0]);
          }}></input>

        <hr></hr>
        <Button
          onClick={() => {
            if (date[0].endDate) {
              addConfirm('등록 하시겠습니까?', '', document.getElementById('modal')).then(
                (result) => {
                  if (result.isConfirmed) {
                    const newApprove = {};
                    if (type === '출장') {
                      newApprove.businessTripContent = document.getElementById('content').value;

                      newApprove.businessTripStartDate = new Date(
                        date[0].startDate - new Date().getTimezoneOffset() * 60000
                      ).toISOString();

                      newApprove.businessTripEndDate = new Date(
                        date[0].endDate - new Date().getTimezoneOffset() * 60000
                      ).toISOString();
                      newApprove.employee = { empNum: 1, unit: { unitId: 1 } };
                      addBusinessTrip(newApprove, file, setOpen, setCheckOpen);
                    } else if (type === '휴가') {
                      newApprove.vacationContent = document.getElementById('content').value;
                      newApprove.vacationType = vacationType;
                      newApprove.vacationStartDate = new Date(
                        date[0].startDate - new Date().getTimezoneOffset() * 60000
                      ).toISOString();

                      newApprove.vacationEndDate = new Date(
                        date[0].endDate - new Date().getTimezoneOffset() * 60000
                      ).toISOString();
                      newApprove.employee = { empNum: 1, unit: { unitId: 1 } };
                      addVacation(newApprove, file, setOpen, setCheckOpen);
                    }
                    setNewApprove(newApprove);
                  }
                }
              );
            } else {
              console.log(date[0].endDate);
              resultConfirm('종료일을 지정해주세요', '', 'error', document.getElementById('modal'));
            }
          }}>
          신청
        </Button>
        <Button onClick={handleClose}>취소</Button>
        {checkOpen && (
          <CheckDateModal
            checkOpen={checkOpen}
            setCheckOpen={setCheckOpen}
            type={type}
            newApprove={newApprove}
          />
        )}
      </Box>
    </Modal>
    // </div>
  );
}
