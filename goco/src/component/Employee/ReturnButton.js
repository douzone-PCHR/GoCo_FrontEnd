import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function ReturnButton() {
  return (
    <>
      <Grid item xs={12} sm={4} />
      <Grid item xs={12} sm={4} sx={{ marginTop: '5%' }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#64a1bd',
            '&:hover': {
              backgroundColor: '#267194',
            },
            height: '70%',
          }}
          onClick={() => {
            window.location.href = '/goco';
          }}>
          돌아가기
        </Button>
      </Grid>
      <Grid item xs={12} sm={4} />
    </>
  );
}
