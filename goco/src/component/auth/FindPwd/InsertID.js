import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function InsertID({ handleChange }) {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          name="아이디를 입력하세요"
          required
          fullWidth
          id="name"
          label="아이디를 입력하세요"
          autoFocus
          onChange={handleChange('empId')}
        />
      </Grid>
    </>
  );
}
