import * as React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import styles from '../../../CSS/authcss/Login.module.css';

export default function LoginInsertID({ setValues, values }) {
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <>
      <div className={styles.InputText}>　아이디</div>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '96%' },
        }}>
        <TextField
          id="demo-helper-text-misaligned-no-helper"
          label="아이디를 입력하세요"
          onChange={handleChange('id')}
          error={values.idInputError}
        />
      </Box>
    </>
  );
}
