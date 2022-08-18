import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Paper, TextareaAutosize, TextField } from '@mui/material';
import { addBusinessTrip } from '../../../api/businessTripAPI';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css files
import { ko } from 'react-date-range/dist/locale';
import { Today } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { addConfirm } from '../../../common/confirm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ApproveForm({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState('');
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  console.log(date);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            출장 신청
          </Typography>
          <hr />

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            출장일
            <Box>
              <DateRange
                // editableDateInputs={true}
                dateDisplayFormat={'yyyy/MM/dd'}
                onChange={(item) => setDate([item.selection])}
                locale={ko}
                moveRangeOnFirstSelection={false}
                ranges={date}
                startDatePlaceholder={'시작일'}
                endDatePlaceholder={'종료일'}
              />
            </Box>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          <TextareaAutosize
            id="content"
            maxRows={10}
            aria-label="maximum height"
            placeholder=" 신청 사유를 입력하세요 "
            style={{ marginTop: 10, paddingTop: 10, minHeight: 200, width: '100%', resize: 'none' }}
          />
          <input
            type="file"
            onChange={(e) => {
              console.log(e.target.files);
              setFile(e.target.files[0]);
            }}></input>

          <Button
            onClick={() => {
              addConfirm('등록 하시겠습니까?').then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    '신청이 완료되었습니다',
                    '결재대기중인 경우 삭제 할 수 있습니다.',
                    'success'
                  );

                  const newBusinessTrip = {};
                  newBusinessTrip.businessTripContent = document.getElementById('content').value;

                  newBusinessTrip.businessTripStartDate = new Date(
                    date[0].startDate - new Date().getTimezoneOffset() * 60000
                  ).toISOString();
                  newBusinessTrip.businessTripEndDate = new Date(
                    date[0].endDate - new Date().getTimezoneOffset() * 60000
                  ).toISOString();
                  //   newBusinessTrip.businessTripEndDate = date[0].endDate.toISOString();
                  newBusinessTrip.employee = { empNum: 1, unit: { unitId: 1 } };
                  console.log(newBusinessTrip);
                  addBusinessTrip(newBusinessTrip, file);
                }
              });
            }}>
            신청
          </Button>
          <Button onClick={handleClose}>취소</Button>
        </Box>
      </Modal>
    </div>
  );
}
