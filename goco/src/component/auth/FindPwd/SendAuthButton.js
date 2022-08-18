import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function SendAuthButton({ SendAuth }) {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Button
          variant="outlined"
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#64a1bd',
            '&:hover': {
              backgroundColor: '#267194',
            },
            color: 'AppWorkspace',
          }}
          onClick={SendAuth}>
          인증번호 발송
        </Button>
      </Grid>
    </>
  );
}
