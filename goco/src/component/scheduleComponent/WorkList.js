import React from 'react';
import PrivateWork from './PrivateWork';
import PublicWork from './PublicWork';
export default function WorkList({ privateData, publicData }) {
  return (
    <>
      {privateData && <PrivateWork data={privateData} />}
      {publicData && <PublicWork data={publicData} />}
    </>
  );
}
