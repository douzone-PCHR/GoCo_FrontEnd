import * as React from 'react';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { sweetAlert2, sweetAlertDeleteUser } from '../auth/AuthSweetAlert.js/sweetAlert2';

export default function DeleteEmp({ handleChange, textData }) {
  const deleteEmp = () => {
    if ('계정 탈퇴' === textData.text) {
      sweetAlertDeleteUser();
    } else {
      sweetAlert2('정확히 입력해 주세요', 'warning');
    }
  };
  return (
    <>
      <Grid item xs={12} sx={{ marginTop: '6%' }}>
        계정 탈퇴
      </Grid>
      <Grid item xs={12} sm={9}>
        <TextField
          sx={{
            color: '#e0e2e2',
          }}
          fullWidth
          id="deleteEmp"
          name="deleteEmp"
          placeholder="'계정 탈퇴' 를 입력해주세요."
          onChange={handleChange('text')}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            height: '100%',
            backgroundColor: '#FF8B8B',
            '&:hover': {
              backgroundColor: '#FF5363',
            },
          }}
          onClick={deleteEmp}>
          계정 탈퇴
        </Button>
      </Grid>
    </>
  );
}
