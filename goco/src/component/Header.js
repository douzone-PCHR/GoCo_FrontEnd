import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './header.css';
import { FiMenu } from 'react-icons/fi';
import { loginDefaultValue } from '../api/work/workAPI';

const Header = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [modeChange, setModeChange] = useState(0);
  const [loginEmp, setLoginEmp] = useState();
  const [urlValue, setUrlValue] = useState(window.location.href.split('http://localhost:3000/')[1]);
  const mediaQuery = window.matchMedia('(max-width: 1600px)');
  useEffect(() => {
    loginDefaultValue(setLoginEmp);

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
  console.log(loginEmp);
  return (
    <>
      {/* {modeChange === 0 && (
        
      )} */}

      {/* 컴포넌트로 1개로 props로 전달  */}
      {modeChange === 0 && (
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
                팀원 근무 현황
              </Link>
              <Link
                to="/approve"
                onClick={() => setUrlValue('approve')}
                style={{ color: urlValue === 'approve' ? '#00AAFF' : '#A8A8A8' }}>
                요청 관리
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

              <div className="nav-text">{loginEmp !== undefined && loginEmp.name}</div>
              <div className="nav-text leader">개발 2팀 팀장</div>
              {/* <button>Logout</button> */}
            </nav>
          </CSSTransition>

          <button onClick={toggleNav} className="Burger">
            <FiMenu />
          </button>
        </header>
      )}
    </>
  );
};

export default Header;
