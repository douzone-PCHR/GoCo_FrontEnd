import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { deleteCookie } from '../api/authAPI';
function HeaderComponent({ statusData, modeChange, setModeChange }) {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const status = (data) => {
    let result = '';
    switch (data) {
      case '0':
        result = '미출근';
        break;
      case '1':
        result = '지각';
        break;
      case '2':
        result = '근무중';
        break;
      case '3':
        result = '휴가';
        break;
      case '4':
        result = '출장';
        break;
      case '5':
        result = '퇴근';
        break;
    }
    return result;
  };
  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const [urlValue, setUrlValue] = useState(window.location.href.split('http://localhost:3000/')[1]);
  if (statusData[0]?.employee?.authority === 'ROLE_MANAGER' && modeChange === 1) {
    return (
      <nav className="Nav">
        <Link
          to="/goco"
          onClick={() => setUrlValue('goco')}
          style={{ color: urlValue === 'goco' ? '#00AAFF' : '#A8A8A8' }}>
          팀원 근무 현황
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
          공지사항
        </Link>

        <Link to="/goco">
          <button className="user-change-btn" onClick={() => setModeChange(0)}>
            사원 모드 전환
          </button>
        </Link>

        <div className="nav-text">{statusData[0]?.employee?.name}</div>
        <div className="nav-text leader">{statusData[0]?.employee?.unit.unitName} </div>
      </nav>
    );
  } else if (modeChange === 0) {
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

        <Link to="/goco" style={{ color: '#00AAFF' }}>
          {status(statusData[0]?.commuteStatus)}
        </Link>

        {statusData[0]?.employee?.authority === 'ROLE_MANAGER' ? (
          <Link to="/manager">
            <button
              className="mangerChangeBtn"
              onClick={() => (setModeChange(1), setUrlValue('goco'))}>
              매니저 모드 전환
            </button>
          </Link>
        ) : (
          ''
        )}

        {statusData[0]?.employee.authority === 'ROLE_ADMIN' ? (
          <Link to="/admin">
            <button
              className="mangerChangeBtn"
              onClick={() => (setModeChange(3), setUrlValue('admin'))}>
              인사 모드로 전환
            </button>
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
            <a href="/login" onClick={deleteCookie}>Logout</a>
            <Link to="/userupdate">설정</Link>
          </div>
        </div>

        <button onClick={toggleNav} className="Burger">
          <FiMenu />
        </button>
      </nav>
    );
  } else if (statusData[0]?.employee.authority === 'ROLE_ADMIN') {
    return (
      //   // link to 주소값
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
          <button className="user-change-btn" onClick={() => setModeChange(0)}>
            사원 모드 전환
          </button>
        </Link>
      </nav>
    );
  }
}

export default HeaderComponent;
