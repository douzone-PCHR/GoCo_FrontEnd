import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { headerData } from '../api/work/workAPI';
import HeaderComponent from './HeaderComponent';

const Header = () => {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [modeChange, setModeChange] = useState(0);
  const [statusData, setStatusData] = useState();
  const [urlValue, setUrlValue] = useState(window.location.href.split('http://localhost:3000/')[1]);

  const mediaQuery = window.matchMedia('(max-width: 1600px)');
  useEffect(() => {
    headerData(setStatusData);

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

  return (
    <header className="Header">
      <img src={`${process.env.PUBLIC_URL}/assets/gocoLogo.png`} alt="logo" className="Logo" />

      {statusData !== undefined && statusData.length !== 0 ? (
        <HeaderComponent
          statusData={statusData}
          modeChange={modeChange}
          setModeChange={setModeChange}
        />
      ) : (
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
            요청 내역
          </Link>
          <Link
            to="/board"
            onClick={() => setUrlValue('board')}
            style={{ color: urlValue === 'board' ? '#00AAFF' : '#A8A8A8' }}>
            게시판
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
