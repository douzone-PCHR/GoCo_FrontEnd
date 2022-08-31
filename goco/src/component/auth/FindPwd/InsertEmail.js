import * as React from 'react';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function InsertEmail({ data, setData }) {
  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="email"
          label="이메일을 입력하세요"
          name="email"
          autoComplete="email"
          onChange={handleChange('email')}
        />
      </Grid>
    </>
  );
}
