import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { IconButton, TextareaAutosize, TextField } from '@mui/material';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css files
import { ko } from 'react-date-range/dist/locale';
import { Info } from '@mui/icons-material';
import { addConfirm, resultConfirm } from '../../../common/confirm';
import CheckDateModal from './CheckDateModal';
import VacationType from './VacationType';
import * as api from '../../../api';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '55%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  // minHeight: '70%',
  maxHeight: '100%',
};
export default function ApproveForm({ open, setOpen, type, check, setCheck, userInfo }) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(0);
  maxDate.setMonth(11);
  maxDate.setFullYear(today.getFullYear());
  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setDate([
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection',
      },
    ]);
  };
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

  const addApprove = (approveApi, fd) => {
    approveApi(fd).then((res) => {
      if (res.data.success.length === 0 && res.data.waitting.length === 0) {
        handleClose();
        resultConfirm(
          '신청이 완료되었습니다',
          '결재대기중인 경우 삭제 할 수 있습니다.',
          'success'
        ).then(() => {
          handleClose();
          setCheck(!check);
        });
      } else {
        resultConfirm(
          '중복되는 신청일이 있습니다!',
          '삭제 후 다시 신청 해주십시오',
          'error',
          document.getElementById('modal')
        ).then(() => {
          setCheckOpen(true);
        });
      }
    });
  };

  return (
    // <div>
    <Modal
      id="modal"
      hideBackdrop
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h3" align="center">
          {type} 신청
        </Typography>{' '}
        <Box>
          {type === '휴가' ? (
            <Button
              startIcon={
                <FileDownloadIcon sx={{ verticalAlign: 'middle', color: 'rgb(61, 145, 255)' }} />
              }
              download={`휴가기안서_${moment(today).format('yyMMDD')}_${userInfo?.empId}_${
                userInfo?.name
              }`}
              href="/assets/vacation.xls">
              {type}기안서 양식 다운로드
            </Button>
          ) : (
            <Button
              startIcon={
                <FileDownloadIcon sx={{ verticalAlign: 'middle', color: 'rgb(61, 145, 255)' }} />
              }
              download={`출장기안서_${moment(today).format('yyMMDD')}_${userInfo?.empId}_${
                userInfo?.name
              }`}
              href="/assets/vacation.xls">
              {type}기안서 양식 다운로드
            </Button>
          )}
        </Box>
        <hr />
        <Box textAlign={'center'}>
          <Box sx={{ minHeight: '400px' }}>
            <DateRange
              // editableDateInputs={true}
              minDate={today}
              maxDate={maxDate}
              dateDisplayFormat={'yyyy/MM/dd'}
              onChange={(item) => {
                let count = 0;
                if (vacationType === '반차' || vacationType === '연차') {
                  vacationType === '반차'
                    ? (count = 0.5 & (item.selection.endDate = item.selection.startDate))
                    : (count =
                        (item.selection.endDate - item.selection.startDate) /
                          (60 * 60 * 24 * 1000) +
                        1);
                  api.checkVacationCount(userInfo.empNum).then((res) => {
                    if (res.data - count < 0) {
                      resultConfirm(
                        '잔여 휴가 일수를 확인하세요!!',
                        `잔여 휴가 : ${res.data} 일`,
                        'error',
                        document.getElementById('modal')
                      ).then(() => {
                        item.selection.startDate = new Date();
                        item.selection.endDate = null;
                      });
                    }
                  });
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
          <Box display="flex" flexDirection="column">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
            {type === '휴가' && (
              <VacationType vacationType={vacationType} setVacationType={setVacationType} />
            )}
            <TextareaAutosize
              id="content"
              maxRows={10}
              maxLength="255"
              placeholder=" 신청 사유를 입력하세요 "
              style={{
                padding: '1%',
                marginTop: 10,
                marginLeft: 5,
                minHeight: '15%',
                maxWidth: '95%',
                resize: 'none',
              }}
            />
            <hr></hr>

            <Box className="filebox" sx={{ display: 'flex' }} justifyContent="space-around">
              <TextField
                className="upload-name"
                variant="outlined"
                size="small"
                sx={{ width: '93%', height: '40px' }}
                value={file?.name || ''}
                placeholder={`첨부파일명: "${type}기안서_신청일자_사원번호_이름"`}
                disabled
              />
              <IconButton sx={{ borderRadius: 0 }}>
                <label htmlFor="file">
                  <UploadFileIcon
                    sx={{
                      fontSize: '30px',
                      verticalAlign: 'center',
                      cursor: 'pointer',
                      color: 'rgb(61, 145, 255)',
                    }}
                  />
                </label>
              </IconButton>
              <input
                type="file"
                id="file"
                hidden
                onChange={(e) => {
                  if (e.target.files[0]) {
                    if (e.target?.files[0]?.size <= 1024 * 1024) {
                      setFile(e.target.files[0]);
                    } else {
                      resultConfirm(
                        '1MB미만 파일만 첨부가능 합니다',
<<<<<<< HEAD
                        `현재 파일 크기 : ${(e.target.files[0]?.size / 1024 / 1024).toFixed(2)} MB`,
=======
                        `현재 파일 크기 : ${(e.target.files[0].size / 1024 / 1024).toFixed(2)} MB`,
>>>>>>> origin
                        'error',
                        document.getElementById('modal')
                      );
                      setFile(null);
                    }
                  }
                }}></input>
            </Box>
            <Box marginLeft="1%">
              <Typography align="left" sx={{ fontSize: '13px', color: 'red' }}>
                <Info sx={{ fontSize: '20px', verticalAlign: 'middle' }} />
                기안서 양식을 다운로드 받은 후 작성하여 첨부 하십시오.
              </Typography>
              <Typography align="left" sx={{ fontSize: '13px', color: 'red' }}>
                <Info sx={{ fontSize: '20px', verticalAlign: 'middle' }} />
                양식이 다를 경우 결재가 반려 될 수 있습니다
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" marginTop="2%" marginBottom="2%">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (date[0].endDate && file) {
                  addConfirm('등록 하시겠습니까?', '', document.getElementById('modal')).then(
                    (result) => {
                      const newApprove = {};
                      if (result.isConfirmed) {
                        const fd = new FormData();
                        if (type === '출장') {
                          newApprove.businessTripContent = document.getElementById('content').value;
                          newApprove.businessTripStartDate = new Date(
                            date[0].startDate - new Date().getTimezoneOffset() * 60000
                          ).toISOString();
                          newApprove.businessTripEndDate = new Date(
                            date[0].endDate - new Date().getTimezoneOffset() * 60000
                          ).toISOString();
                          newApprove.businessTripStartDate = moment(
                            newApprove.businessTripStartDate
                          )
                            .hours('00')
                            .minutes('00')
                            .seconds('00')
                            .format();
                          newApprove.businessTripEndDate = moment(newApprove.businessTripEndDate)
                            .hours('23')
                            .minutes('59')
                            .seconds('59')
                            .format();

                          newApprove.employee = {
                            empNum: userInfo.empNum,
                            unit: { unitId: userInfo.unit.unitId },
                          };
                          fd.append(
                            'businessTripDTO',
                            new Blob([JSON.stringify(newApprove)], { type: 'application/json' })
                          );
                          file ? fd.append('file', file) : fd.append('file', new Blob());
                          addApprove(api.addBusinessTrip, fd);
                        } else if (type === '휴가') {
                          newApprove.vacationContent = document.getElementById('content').value;
                          newApprove.vacationType = vacationType;
                          newApprove.vacationStartDate = new Date(
                            moment(date[0].startDate)
                              .hours('00')
                              .minutes('00')
                              .seconds('00')
                              .format()
                          );
                          newApprove.vacationEndDate = new Date(
                            moment(date[0].endDate).hours('23').minutes('59').seconds('59').format()
                          );
                          newApprove.employee = {
                            empNum: userInfo.empNum,
                            unit: { unitId: userInfo.unit.unitId },
                          };
                          fd.append(
                            'vacationDTO',
                            new Blob([JSON.stringify(newApprove)], { type: 'application/json' })
                          );
                          file ? fd.append('file', file) : fd.append('file', new Blob());
                          addApprove(api.addVacation, fd);
                        }
                      }
                      // 중복일자 체크 하기위해서
                      setNewApprove(newApprove);
                    }
                  );
                } else if (date[0].endDate === null) {
                  resultConfirm(
                    '종료일을 지정해주세요',
                    '',
                    'error',
                    document.getElementById('modal')
                  );
                } else {
                  resultConfirm(
                    '첨부 파일이 없습니다',
                    '왼쪽 상단 기안서 양식을 다운로드 후 작성하여 첨부하십시오',
                    'error',
                    document.getElementById('modal')
                  );
                }
              }}>
              신청
            </Button>

            <Button
              sx={{ marginLeft: '3%' }}
              variant="contained"
              color="inherit"
              onClick={handleClose}>
              취소
            </Button>
          </Box>
          {checkOpen && (
            <CheckDateModal
              checkOpen={checkOpen}
              setCheckOpen={setCheckOpen}
              type={type}
              newApprove={newApprove}
            />
          )}
        </Box>
      </Box>
    </Modal>
    // </div>
  );
}
