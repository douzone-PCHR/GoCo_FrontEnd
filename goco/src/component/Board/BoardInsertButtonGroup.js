import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
export default function BoardInsertButtonGroup({ BoardInsert }) {
  return (
    <>
      <Grid item xs={12} sm={4}>
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
          onClick={() => {
            window.location.href = '/board';
          }}>
          돌아가기
        </Button>
      </Grid>
      <Grid item xs={12} sm={4} />
      <Grid item xs={12} sm={4}>
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
          onClick={BoardInsert}>
          저장
        </Button>
      </Grid>
    </>
  );
}
