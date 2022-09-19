import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import HeaderComponent from './HeaderComponent';
import * as api from '../api/index';
import { Cookies } from 'react-cookie';
const Header = () => {
  const [urlValue, setUrlValue] = useState(window.location.href.split('/')[3]);
  const [statusData, setStatusData] = useState();

  useEffect(() => {
    if (localStorage.getItem('modeChange') === null) {
      localStorage.setItem('modeChange', 0);
    }
    headerAPI();
  }, [urlValue]);
  const headerAPI = async () => {
    await api.headerData().then((response) => {
      if (response.data !== '') {
        console.log(response.data[0]?.employee.empNum);
        setStatusData(response.data);
        if (response.data[0]?.employee.authority !== 'ROLE_ADMIN') {
          localStorage.setItem('team', response.data[0]?.employee.teamPosition.teamPositionId);
          localStorage.setItem('id', response.data[0]?.employee.empId);
        }
      }
    });
  };

  return (
    <header className="Header">
      {statusData !== undefined && statusData.length !== 0 ? (
        <Link to="/goco" className="link-logo" onClick={() => window.location.href('/goco')}>
          <img src={`${process.env.PUBLIC_URL}/assets/gocoLogo.png`} alt="logo" className="Logo" />
        </Link>
      ) : (
        <img src={`${process.env.PUBLIC_URL}/assets/gocoLogo.png`} alt="logo" className="Logo" />
      )}
      {statusData !== undefined &&
      statusData !== '' &&
      statusData.length !== 0 &&
      localStorage.getItem('modeChange') !== null ? (
        <HeaderComponent statusData={statusData} setUrlValue={setUrlValue} urlValue={urlValue} />
      ) : (
        <nav className="Nav"></nav>
      )}
    </header>
  );
};

export default Header;
