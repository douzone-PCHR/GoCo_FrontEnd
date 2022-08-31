import * as React from 'react';
import ShowId from './ShowId';
import FindIdPage from '../../component/auth/FindId/FindIdPage';

export default function FindId() {
  const [id, setId] = React.useState(-1); // 찾은 ID값이 들어 있다.
  const [showPage, setShowPage] = React.useState(true);
  React.useEffect(() => {
    //ID 값을 받았을 때 ShowId 컴포넌트 호출
    if (id !== -1) {
      setShowPage(false);
    }
  }, [id]);

  return <>{showPage === true ? <FindIdPage setId={setId} /> : <ShowId id={id} />}</>;
}
