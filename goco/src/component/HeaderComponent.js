import React from 'react';

const HeaderComponent = ({}) => {
  return (
    <header className="Header">
      <img src={`${process.env.PUBLIC_URL}/assets/gocoLogo.png`} alt="logo" className="Logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit>
        <nav className="Nav">
          {/* 미리 배열로 선언해서 map 으로 뿌리는 방법 고려 */}
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
            요청 내역
          </Link>
          <Link
            to="/board"
            onClick={() => setUrlValue('board')}
            style={{ color: urlValue === 'board' ? '#00AAFF' : '#A8A8A8' }}>
            게시판
          </Link>
          <Link
            to="/"
            onClick={() => setUrlValue('/')}
            style={{ color: urlValue === '/' ? '#00AAFF' : '#A8A8A8' }}>
            근무중
          </Link>

          <Link to="/manager">
            <button
              className="mangerChangeBtn"
              onClick={() => (setModeChange(1), setUrlValue('goco'))}>
              매니저 모드 전환
            </button>
          </Link>

          <div className="dropdown">
            <button className="dropbtn">
              {loginEmp !== undefined && loginEmp.name}
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="#">Logout</a>
              <a href="#">설정</a>
            </div>
          </div>
        </nav>
      </CSSTransition>

      <button onClick={toggleNav} className="Burger">
        <FiMenu />
      </button>
    </header>
  );
};

export default HeaderComponent;
