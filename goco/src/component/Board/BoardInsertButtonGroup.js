import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
export default function BoardInsertButtonGroup({ BoardInsert }) {
  return (
    <ButtonGroup
      sx={{
        display: 'flex',
        margin: '15px 10px',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '50px',
        width: '100%',
        position: 'absolute',
        bottom: '0',
        left: '10',
      }}>
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
          width: '30%',
          height: '60%',
        }}
        onClick={() => {
          window.location.href = '/board';
        }}>
        돌아가기
      </Button>
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
          width: '30%',
          height: '60%',
        }}
        onClick={BoardInsert}>
        저장
      </Button>
    </ButtonGroup>
  );
}
