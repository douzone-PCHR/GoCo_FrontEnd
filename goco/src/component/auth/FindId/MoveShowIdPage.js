import * as React from 'react';
import Button from '@mui/material/Button';
import { AuthCheckAPI } from '../../../api/AllAPI';
import Grid from '@mui/material/Grid';

export default function MoveShowIdPage({ data, setId }) {
  const AuthCheck = () => {
    // 인증번호를 체크하고 맞다면 id 셋팅
    AuthCheckAPI(data.authNum, data.email, setId);
  };
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#64a1bd',
            '&:hover': {
              backgroundColor: '#267194',
            },
            height: '60%',
          }}
          onClick={AuthCheck}>
          확인
        </Button>
      </Grid>
    </>
  );
}
