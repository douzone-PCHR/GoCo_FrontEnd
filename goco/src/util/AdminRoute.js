import React from 'react';
import { Navigate } from 'react-router-dom';
import { sweetAlert2 } from '../component/auth/AuthSweetAlert.js/sweetAlert2';

function AdminRoute({ authenticated, authority, component: Component }) {
  return (authority === 'ROLE_ADMIN' || localStorage.getItem('authority') === 'ROLE_ADMIN') &&
    authenticated
    ? Component
    : (localStorage.setItem('modeChange', '0'),
      (
        <Navigate to="/goco" replace={true} {...sweetAlert2('접근 권한이 없습니다.', 'warning')} />
      ));
}

export default AdminRoute;
