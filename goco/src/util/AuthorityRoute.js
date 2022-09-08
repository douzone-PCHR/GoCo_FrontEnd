import React from 'react';
import { Navigate } from 'react-router-dom';
import { sweetAlert2 } from '../component/auth/AuthSweetAlert.js/sweetAlert2';

function AuthorityRoute({ authenticated, authority, component: Component }) {
  return localStorage.getItem('team') === '1' && authenticated
    ? Component
    : (localStorage.setItem('modeChange', '0'),
      (
        <Navigate to="/goco" replace={true} {...sweetAlert2('접근 권한이 없습니다.', 'warning')} />
      ));
}

export default AuthorityRoute;
