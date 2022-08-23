import * as React from 'react';
import Editor from './EditorComponent';
import styles from '../../CSS/board/NoticeBoard.module.css';
const NoticeWriteComponent = () => {
  const [data, setData] = React.useState({
    boardTitle: '',
    boardContent: '',
    employee: { empNum: 1 },
    boardType: '',
  });
  function onEditorChange(value) {
    setData({ ...data, boardContent: value });
    console.log('data.boardContent : ', data.boardContent);
  }

  return (
    <div className={styles.OutterBox}>
      <div>사용자</div>
      <div>제목</div>
      <Editor value={data.boardContent} onChange={onEditorChange} />
    </div>
  );
};

export default NoticeWriteComponent;
