import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
export default function ShowIdButtonGroup() {
  const LoginPage = () => {
    window.location.href = '/';
  };
  const FindPwdPage = () => {
    window.location.href = '/findPwd';
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
          onClick={LoginPage}>
          로그인
        </Button>
      </Grid>
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
          onClick={FindPwdPage}>
          비밀번호 찾기
        </Button>
      </Grid>
    </>
  );
}
