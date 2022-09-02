import * as React from 'react';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { changePhoneNumberAPI } from '../../api/AllAPI';
export default function ChangePhoneNumber({ data, handleChange, textData }) {
  const changePhoneNumber = () => {
    changePhoneNumberAPI(textData);
  };
  return (
    <>
      <Grid item xs={12} sm={12}>
        연락처
      </Grid>
      <Grid item xs={12} sm={9}>
        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          placeholder={`${data.phoneNumber}  변경할 번호를 입력하세요`}
          onChange={handleChange('phoneNumber')}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            height: '100%',
            backgroundColor: '#64a1bd',
            '&:hover': {
              backgroundColor: '#267194',
            },
          }}
          onClick={changePhoneNumber}>
          연락처 변경
        </Button>
      </Grid>
    </>
  );
}
