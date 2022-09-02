import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { changeEmailAPI } from '../../api/AllAPI';

export default function ChangeEmail({ data, setTextData, textData }) {
  const changeEmail = () => {
    changeEmailAPI(textData);
  };
  const handleChange = (prop) => (e) => {
    setTextData({ ...textData, [prop]: e.target.value });
  };
  return (
    <>
      <Grid item xs={12} sm={12}>
        이메일
      </Grid>
      <Grid item xs={12} sm={9}>
        <TextField
          fullWidth
          id="email"
          name="email"
          placeholder={`${data.email}  변경할 이메일을 입력하세요`}
          onChange={handleChange('email')}
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
          onClick={changeEmail}>
          이메일 변경
        </Button>
      </Grid>
    </>
  );
}
