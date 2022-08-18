import * as React from 'react';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function InsertName({ handleChange }) {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          name="이름을 입력하세요"
          required
          fullWidth
          id="name"
          label="이름을 입력하세요"
          autoFocus
          onChange={handleChange('name')}
        />
      </Grid>
    </>
  );
}
