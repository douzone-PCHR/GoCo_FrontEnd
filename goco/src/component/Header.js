import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import HeaderComponent from './HeaderComponent';
import * as api from '../api/index';
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
      console.log(response.data);
      if (response.data !== '') {
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
      {statusData !== undefined &&
      statusData.length !== 0 &&
      statusData[0]?.employee.authority !== 'ROLE_ADMIN' ? (
        <Link to="/goco" className="link-logo" onClick={() => window.location.href('/goco')}>
          <img src={`${process.env.PUBLIC_URL}/assets/goco.png`} alt="logo" className="Logo" />
        </Link>
      ) : (
        <img src={`${process.env.PUBLIC_URL}/assets/goco.png`} alt="logo" className="Logo" />
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
