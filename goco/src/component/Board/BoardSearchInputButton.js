import { WriteButtonStyles } from './BoardCSS';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../../CSS/board/NoticeBoard.module.css';
import Button from '@mui/material/Button';
export default function BoardSearchInputButton({ setSearch, search }) {
  return (
    <>
      <div className={styles.MiddleText}>
        <Button
          onClick={() => {
            setSearch(!search);
          }}
          sx={WriteButtonStyles}>
          <SearchIcon fontSize="small" sx={{ marginRight: '6px' }} />
          검색
        </Button>
        <Button sx={WriteButtonStyles} onClick={() => (window.location.href = '/boardinsert')}>
          <EditIcon fontSize="small" sx={{ marginRight: '6px' }} />
          게시글 등록
        </Button>
      </div>
    </>
  );
}
