import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { modeChange, status } from '../util/HeaderUtil';
import { Avatar, Box, Button, Chip, ListItemIcon, MenuItem } from '@mui/material';
import { logOutAPI } from '../api/AllAPI';
import { Home, Logout, Settings, Work } from '@mui/icons-material';
function HeaderComponent({ statusData, setUrlValue, urlValue }) {
  const [check, setCheck] = useState(false);
  const location = useLocation();
  useEffect(() => {
    window.onpopstate = () => {
      window.location.reload();
    };
    setUrlValue(window.location.href.split('/')[3]);
    modeChange(urlValue, setUrlValue, statusData[0]?.employee?.authority, setCheck, check);
  }, []);
  if (check) {
    if (statusData[0]?.employee.authority === 'ROLE_ADMIN') {
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
          <Box className="dropdown">
            <MenuItem className="dropbtn">
              <Avatar
                sx={{
                  marginRight: '5%',
                  backgroundColor: 'lightgray',
                }}
              />
              관리자
              <i className="fa fa-caret-down"></i>
            </MenuItem>
            <Box className="dropdown-content">
              <MenuItem
                sx={{ color: 'salmon' }}
                onClick={() => {
                  logOutAPI();
                }}>
                <ListItemIcon>
                  <Logout sx={{ color: 'salmon' }} />
                </ListItemIcon>
                로그아웃
              </MenuItem>
            </Box>
          </Box>
        </nav>
      );
    } else if (
      (statusData[0]?.employee?.authority === 'ROLE_MANAGER' ||
        localStorage.getItem('team') === '1') &&
      localStorage.getItem('modeChange') === '1'
    ) {
      return (
        <nav className="Nav">
          <Link
            to="/manager"
            onClick={() => setUrlValue('manager')}
            style={{
              color:
                urlValue === 'manager' && location.state?.mode !== 'approveteam'
                  ? '#00AAFF'
                  : '#A8A8A8',
            }}>
            팀원 근무 현황
          </Link>
          <Link
            to="/approveteam"
            onClick={() => setUrlValue('approveteam')}
            style={{
              color:
                urlValue === 'approveteam' || location.state?.mode === 'approveteam'
                  ? '#00AAFF'
                  : '#A8A8A8',
            }}>
            결재 관리
          </Link>

          <Link to="/goco">
            <Button
              sx={{
                fontSize: '15px',
                color: 'gray',
                borderColor: 'gray',
                borderBlockColor: 'gray',
                '&:hover': {
                  borderColor: '#00AAFF',
                  borderBlockColor: '#00AAFF',
                  color: '#00AAFF',
                },
              }}
              variant="outlined"
              size="large"
              // className="user-change-btn"
              onClick={() => (localStorage.setItem('modeChange', 0), setUrlValue('goco'))}>
              사원 Mode
            </Button>
          </Link>

          <Box className="dropdown">
            <MenuItem className="dropbtn">
              <Avatar
                sx={{
                  marginRight: '5%',
                  backgroundColor: 'lightgray',
                }}
              />
              {statusData !== undefined && statusData[0]?.employee.name}
              <Chip
                size="medium"
                sx={{ marginLeft: '10%', fontSize: '15px', color: 'gray' }}
                label={`${statusData[0]?.employee?.unit.unitName} ${statusData[0]?.employee?.jobTitle.jobTitleName}`}
              />
              <i className="fa fa-caret-down"></i>
            </MenuItem>
            <Box className="dropdown-content">
              <NavLink to="/userupdate" style={{ size: '10px', color: 'gray' }}>
                <MenuItem>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  사원정보수정
                </MenuItem>
              </NavLink>

              <MenuItem
                sx={{ color: 'salmon' }}
                onClick={() => {
                  logOutAPI();
                  // window.location.href = '/login';
                }}>
                <ListItemIcon>
                  <Logout sx={{ color: 'salmon' }} />
                </ListItemIcon>
                로그아웃
              </MenuItem>
            </Box>
          </Box>
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

          {localStorage.getItem('team') === '1' ? (
            <Link to="/manager">
              <Button
                sx={{
                  fontSize: '15px',
                  color: 'gray',
                  borderColor: 'gray',
                  borderBlockColor: 'gray',
                  '&:hover': {
                    borderColor: '#00AAFF',
                    borderBlockColor: '#00AAFF',
                    color: '#00AAFF',
                  },
                }}
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

          <Box className="dropdown">
            <MenuItem className="dropbtn">
              <Avatar
                sx={{
                  marginRight: '5%',
                  backgroundColor: 'lightgray',
                }}
              />
              {statusData !== undefined && statusData[0]?.employee.name}
              <Chip
                size="medium"
                sx={{ marginLeft: '10%', fontSize: '15px', color: 'gray' }}
                label={`${statusData[0]?.employee?.unit.unitName} ${statusData[0]?.employee?.jobTitle?.jobTitleName}`}
              />
              <i className="fa fa-caret-down"></i>
            </MenuItem>
            <Box className="dropdown-content">
              <NavLink to="/userupdate" style={{ size: '10px', color: 'black' }}>
                <MenuItem>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  사원정보수정
                </MenuItem>
              </NavLink>

              <MenuItem
                sx={{ color: 'salmon' }}
                onClick={() => {
                  logOutAPI();
                }}>
                <ListItemIcon>
                  <Logout sx={{ color: 'salmon' }} />
                </ListItemIcon>
                로그아웃
              </MenuItem>
            </Box>
          </Box>
          {status(statusData[0]?.commuteStatus) === ('미출근' || '퇴근' || '휴가') ? (
            <Chip
              size="large"
              sx={{
                color: 'white',
                border: '2px solid rgb(255,100,100)',
                backgroundColor: 'rgb(255,100,100)',
                opacity: 0.9,
                fontSize: '20px',
              }}
              icon={<Home style={{ color: 'white' }} />}
              label={status(statusData[0]?.commuteStatus)}
            />
          ) : (
            <Chip
              size="large"
              sx={{
                height: '50%',
                color: 'white',
                backgroundColor: '#0288d1',
                border: '2px solid',
                fontSize: '20px',
                opacity: 0.8,
              }}
              icon={<Work style={{ color: 'white' }} />}
              label={status(statusData[0]?.commuteStatus)}
            />
          )}
        </nav>
      );
    }
  }
}

export default HeaderComponent;
