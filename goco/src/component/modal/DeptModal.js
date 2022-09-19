import { Button, Modal, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import styled from '../../CSS/admin.module.css';
import * as api from '../../api/index';
export function DeptModal({ insertBtn, setInsertBtn, render }) {
  return (
    <Modal open={insertBtn} id="dept-insert-modal" disableAutoFocus={false}>
      <div className={styled.modal}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          부서추가
        </Typography>
        <div>
          <TextField
            name={styled.textField}
            size="normal"
            margin="normal"
            inputProps={{ maxLength: 12 }}
          />
          <br />
          <Button
            onClick={() => {
              const unitName = document.getElementsByName(styled.textField)[0].value;
              if (unitName) {
                Swal.fire({
                  title: `[${unitName}]부서를 추가 하시겠습니까?`,
                  icon: 'info',
                  target: '#dept-insert-modal',
                  cancelButtonText: '돌아가기',
                  confirmButtonText: '추가하기',
                  confirmButtonColor: '#6af40f',
                  showCancelButton: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    const unit = { unitName: unitName };
                    api.insertUnit(unit).then((res) => {
                      res.data
                        ? Swal.fire({
                            title: `${unitName} 부서가 추가되었습니다.`,
                            icon: 'success',
                            target: '#dept-insert-modal',
                            confirmButtonText: '완료',
                          }).then(() => {
                            setInsertBtn(false);
                            render();
                          })
                        : Swal.fire({
                            title: `중복된 부서이름입니다.`,
                            text: `${unitName}`,
                            icon: 'warning',
                            target: '#dept-insert-modal',
                            confirmButtonText: '완료',
                          });
                    });
                  }
                });
              }
            }}>
            추가
          </Button>

          <Button
            onClick={() => {
              setInsertBtn(false);
            }}>
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}
