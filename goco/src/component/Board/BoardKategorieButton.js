import Button from '@mui/material/Button';
import { MainButtonStyles1, MainButtonStyles2 } from './BoardCSS';
export default function BoardKategorieButton({ pageInfo, setPageInfo }) {
  return (
    <>
      <Button
        sx={pageInfo === false ? MainButtonStyles1 : MainButtonStyles2} // 버튼 클릭시마다 디자인 바뀜
        onClick={() => setPageInfo(false)}>
        공지사항 게시판
      </Button>
      <Button
        sx={pageInfo === true ? MainButtonStyles1 : MainButtonStyles2} // 버튼 클릭시마다 디자인 바뀜
        onClick={() => setPageInfo(true)}>
        자유 게시판
      </Button>
    </>
  );
}
