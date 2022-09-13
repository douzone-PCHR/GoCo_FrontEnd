import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item={true} xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</Typography>
            <Button variant="contained">
              <Link to="/goco" style={{ color: 'white' }}>
                Home
              </Link>
            </Button>
          </Grid>

          <Grid item={true} xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
