import React, { useEffect, useState } from 'react';
import { getWorkListData } from '../../api/work/workAPI';
import PrivateWork from './PrivateWork';
import PublicWork from './PublicWork';

export default function WorkList() {
  const [privateData, privateSetData] = useState();
  const [publicData, publicSetData] = useState();

  useEffect(() => {
    getWorkListData(privateSetData, publicSetData);
  }, []);

  // console.log(privateData && privateData);
  //console.log(publicData);

  return (
    <>
      {privateData && <PrivateWork data={privateData} />}
      {publicData && <PublicWork data={publicData} />}
    </>
  );
}
