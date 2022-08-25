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
  const [loginEmp, setLoginEmp] = useState();
  const mediaQuery = window.matchMedia('(max-width: 1100px)');
  useEffect(() => {
    loginDefaultValue(setLoginEmp);

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
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

  return (
    // <>
    //   <AppBar position="static">
    //     <Tabs value={value} onChange={handleChange} aria-label="Main Tabs">
    //       <Tab label="Home" href="/" />
    //       <Tab label="결재관리" href="/approve"></Tab>

    //       <Tab label="Profile" />
    //     </Tabs>
    //   </AppBar>
    // </>

    <header className="Header">
      <img src={`${process.env.PUBLIC_URL}/assets/gocoLogo.png`} alt="logo" className="Logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit>
        <nav className="Nav">
          <Link to="/goco">일정 관리</Link>
          <Link to="/">휴가 신청</Link>
          <Link to="/">요청 내역</Link>
          <Link to="/">게시판</Link>
          <Link to="/">근무중</Link>
          {loginEmp !== undefined && loginEmp.authority === 'ROLE_MANAGER' ? (
            <button className="mangerChangeBtn">
              <Link to="/manager">매니저 모드 전환</Link>
            </button>
          ) : (
            ''
          )}

          <div className="dropdown">
            <button className="dropbtn">
              조명윤
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="#">Logout</a>
              <a href="#">설정</a>
            </div>
          </div>
          {/* <button>Logout</button> */}
        </nav>
      </CSSTransition>

      <button onClick={toggleNav} className="Burger">
        <FiMenu />
      </button>
    </header>
  );
};

export default Header;
