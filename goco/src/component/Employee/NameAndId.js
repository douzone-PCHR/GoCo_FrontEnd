import * as React from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function NameAndId({ data }) {
  return (
    <>
      <Grid item xs={12} sm={12}>
        이름
      </Grid>
      <Grid item xs={12} sm={9}>
        <TextField
          sx={{
            backgroundColor: '#e0e2e2',
          }}
          disabled
          fullWidth
          id="name"
          name="name"
          value={data.name}
        />
      </Grid>
      {/*--------------------------------아이디 불변------------------------------------*/}
      <Grid item xs={12} sm={12}>
        아이디
      </Grid>
      <Grid item xs={12} sm={9}>
        <TextField
          sx={{
            backgroundColor: '#e0e2e2',
          }}
          disabled
          fullWidth
          id="id"
          name="id"
          value={data.empId}
        />
      </Grid>
    </>
  );
}
