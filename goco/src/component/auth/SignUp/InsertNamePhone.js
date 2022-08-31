import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export const insertName = (data, setData, signupDataError) => {
  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  return (
    <Grid item xs={12} sm={6}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          이름
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            label="이름을 입력하세요"
            name="name"
            onChange={handleChange('name')}
          />
        </Grid>
        {signupDataError.valid_name !== '' && (
          <>
            <Grid item xs={12} sx={{ color: 'red', fontSize: 'small' }}>
              {signupDataError.valid_name}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export const insertPhoneNumber = (data, setData, signupDataError) => {
  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  return (
    <Grid item xs={12} sm={6}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          연락처
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="phoneNumber"
            label="연락처를 입력하세요 (숫자만 입력 가능)"
            name="phoneNumber"
            onChange={handleChange('phoneNumber')}
          />
        </Grid>
        {signupDataError.valid_phoneNumber !== '' && (
          <>
            <Grid item xs={12} sx={{ color: 'red', fontSize: 'small' }}>
              {signupDataError.valid_phoneNumber}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};
