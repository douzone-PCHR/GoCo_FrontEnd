import * as React from 'react';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function InsertAuthNum({ data, setData }) {
  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  return (
    <>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="authNum"
          label="인증번호를 입력하세요"
          name="authNum"
          onChange={handleChange('authNum')}
        />
      </Grid>
    </>
  );
}
