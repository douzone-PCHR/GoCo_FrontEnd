import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { modeChange, status } from '../util/HeaderUtil';
import { Button } from '@mui/material';
import { logOutAPI } from '../api/AllAPI';
function HeaderComponent({ statusData, setUrlValue, urlValue }) {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    window.onpopstate = () => {
      window.location.reload();
    };
    setUrlValue(window.location.href.split('http://localhost:3000/')[1]);
    modeChange(urlValue, setUrlValue, statusData[0]?.employee?.authority, setCheck, check);
  }, []);
  if (check) {
    if (
      (statusData[0]?.employee?.authority === 'ROLE_MANAGER' ||
        localStorage.getItem('team') === '1') &&
      localStorage.getItem('modeChange') === '1'
    ) {
      return (
        <nav className="Nav">
          <Link
            to="/manager"
            onClick={() => setUrlValue('manager')}
            style={{ color: urlValue === 'manager' ? '#00AAFF' : '#A8A8A8' }}>
            팀원 근무 현황
          </Link>
          <Link
            to="/approveteam"
            onClick={() => setUrlValue('approveteam')}
            style={{ color: urlValue === 'approveteam' ? '#00AAFF' : '#A8A8A8' }}>
            결재 관리
          </Link>

          <Link to="/goco">
            <Button
              variant="outlined"
              size="large"
              // className="user-change-btn"
              onClick={() => (localStorage.setItem('modeChange', 0), setUrlValue('goco'))}>
              사원 Mode
            </Button>
          </Link>

          <div className="nav-text">{statusData[0]?.employee?.name}</div>
          <div className="nav-text leader">{statusData[0]?.employee?.unit.unitName} </div>
        </nav>
      );
    } else if (localStorage.getItem('modeChange') === '0') {
      return (
        <nav className="Nav">
          <Link
            to="/goco"
            onClick={() => setUrlValue('goco')}
            style={{ color: urlValue === 'goco' ? '#00AAFF' : '#A8A8A8' }}>
            일정 관리
          </Link>
          <Link
            to="/approve"
            onClick={() => setUrlValue('approve')}
            style={{ color: urlValue === 'approve' ? '#00AAFF' : '#A8A8A8' }}>
            결재 관리
          </Link>
          <Link
            to="/board"
            onClick={() => setUrlValue('board')}
            style={{ color: urlValue === 'board' ? '#00AAFF' : '#A8A8A8' }}>
            게시판
          </Link>

          <Link
            to={window.location.href.split('http://localhost:3000/')[1]}
            style={{ color: '#00AAFF' }}>
            {status(statusData[0]?.commuteStatus)}
          </Link>

          {localStorage.getItem('team') === '1' ? (
            <Link to="/manager">
              <Button
                sx={{ color: 'gray', borderColor: 'gray', fontWeight: '500' }}
                size="large"
                variant="outlined"
                // className="mangerChangeBtn"
                onClick={() => (localStorage.setItem('modeChange', 1), setUrlValue('manager'))}>
                매니저 Mode
              </Button>
            </Link>
          ) : (
            ''
          )}

          {statusData[0]?.employee.authority === 'ROLE_ADMIN' ? (
            <Link to="/admin">
              <Button
                sx={{ color: 'gray', borderColor: 'gray', fontWeight: '500' }}
                size="large"
                variant="outlined"
                // className="mangerChangeBtn"
                onClick={() => (localStorage.setItem('modeChange', 3), setUrlValue('admin'))}>
                관리자 Mode
              </Button>
            </Link>
          ) : (
            ''
          )}

          <div className="dropdown">
            <button className="dropbtn">
              {statusData !== undefined && statusData[0]?.employee.name}
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to="/userupdate">설정</Link>
              <a
                onClick={() => {
                  logOutAPI();
                }}>
                로그아웃
              </a>
            </div>
          </div>
        </nav>
      );
    } else if (
      statusData[0]?.employee.authority === 'ROLE_ADMIN' &&
      localStorage.getItem('modeChange') === '3'
    ) {
      return (
        <nav className="Nav">
          <Link
            to="/admin"
            onClick={() => setUrlValue('admin')}
            style={{ color: urlValue === 'admin' ? '#00AAFF' : '#A8A8A8' }}>
            직원 관리
          </Link>
          <Link
            to="/management"
            onClick={() => setUrlValue('management')}
            style={{ color: urlValue === 'management' ? '#00AAFF' : '#A8A8A8' }}>
            부서 관리
          </Link>

          <Link to="/goco">
            <Button
              sx={{ color: '#00AAFF', borderColor: '#00AAFF', fontWeight: '500' }}
              variant="outlined"
              size="large"
              // className="user-change-btn"
              onClick={() => (localStorage.setItem('modeChange', 0), setUrlValue('goco'))}>
              직원 Mode
            </Button>
          </Link>
        </nav>
      );
    }
  }
}

export default HeaderComponent;
