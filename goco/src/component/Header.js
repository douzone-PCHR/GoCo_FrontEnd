import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './header.css';

import { headerData, loginDefaultValue } from '../api/work/workAPI';
import HeaderComponent from './HeaderComponent';

const Header = () => {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [modeChange, setModeChange] = useState(0);
  const [statusData, setStatusData] = useState();

  const mediaQuery = window.matchMedia('(max-width: 1600px)');
  useEffect(() => {
    headerData(setStatusData);

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
  console.log(statusData);
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

      {statusData !== undefined && (
        <HeaderComponent
          statusData={statusData}
          modeChange={modeChange}
          setModeChange={setModeChange}></HeaderComponent>
      )}
    </header>
  );
};

export default Header;
