import * as React from 'react';
import Editor from '../../component/Board/EditorComponent';
import styles from '../../CSS/board/NoticeBoard.module.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { userMeAPI } from '../../api/employeeAPI';
import { BoardInsertAPI } from '../../api/boardAPI';
import { sweetAlert2 } from '../../component/auth/AuthSweetAlert.js/sweetAlert2';
const NoticeWriteComponent = () => {
  const [user, setUser] = React.useState();
  const [data, setData] = React.useState({
    boardTitle: '',
    boardContent: '',
    boardType: '1',
  });
  const onEditorChange = (value) => {
    setData({ ...data, boardContent: value });
  }; // 내용 받아오기
  const handleChange = (event) => {
    // 제목, 게시판타입 받아오는것
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const BoardInsert = () => {
    // insert할 데이터를 작성해줌
    let insertData = {
      boardTitle: data.boardTitle,
      boardContent: data.boardContent,
      employee: { empNum: user.empNum },
      boardType: data.boardType,
    };
    console.log(insertData);
    BoardInsertAPI(insertData);
  };

  React.useEffect(() => {
    userMeAPI(setUser);
  }, []); //초기 로그인한 유저의 데이터 받아오는 것

  return (
    <div className={styles.OutterBox}>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ marginBottom: '5%' }}>
          <FormControl>
            <RadioGroup row onChange={handleChange} value={data.boardType} name="boardType">
              {user && user.authority === 'ROLE_USER' ? (
                <FormControlLabel disabled value="0" control={<Radio />} label="공지 게시판" />
              ) : (
                <FormControlLabel value="0" control={<Radio />} label="공지 게시판" />
              )}
              <FormControlLabel value="1" control={<Radio />} label="자유 게시판" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <div>작성자</div>
        </Grid>
        <Grid item xs={12}>
          <TextField disabled fullWidth label={user && user.name} />
        </Grid>
        <Grid item xs={12}>
          <div>제목</div>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="boardTitle" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <div>내용</div>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: '5%' }}>
          <Editor value={data.boardContent} onChange={onEditorChange} />
        </Grid>
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
      </Grid>
    </div>
  );
};

export default NoticeWriteComponent;
