import { Box, Button, MenuItem, Modal, Select, Typography } from '@mui/material';
import { useState } from 'react';
import style from '../../CSS/admin.module.css';
import { EmpUpdateComponent } from './EmpUpdateComponent.js';
export const EmpUpdateModal = ({ type, updateModal, checkFnc, setUpdateModal }) => {
  const [value, setValue] = useState();
  function Emp() {
    return (
      <EmpUpdateComponent
        type={type}
        value={value}
        setValue={setValue}
        setUpdateModal={setUpdateModal}
        checkFnc={checkFnc}
      />
    );
  }
  return (
    <Modal open={updateModal} id="emp-update-modal">
      <Box className={style.empModal}>
        {type?.type === '직급' && <Emp />}
        {type?.type === '직책' && <Emp />}
        {type?.type === '부서' && <Emp />}
      </Box>
    </Modal>
  );
};
