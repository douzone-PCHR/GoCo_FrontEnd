import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

// import styled from '../../CSS/admin/sidebar.module.css';
import '../../CSS/admin/sidebar.module.css';
export const AdminSideBar = () => {
  const styled = [];
  return (
    <>
      <Box sx={{ width: '10%', height: '100%', border: 1 }} align="center">
        <Box className={styled.box}>
          <Link to={'/admin'}>AdminPage</Link>
        </Box>
        <Box className={styled.box}>
          <Link to={'/admin'}>AdminPage</Link>
        </Box>
        <Box className={styled.box}>
          <Link to={'/admin'}>AdminPage</Link>
        </Box>
        <Box className={styled.box}>
          <Link to={'/admin'}>AdminPage</Link>
        </Box>
      </Box>
    </>
  );
};
