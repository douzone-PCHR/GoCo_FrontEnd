import React, { useState } from 'react';
import Box from '@mui/material/Box';
import {
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import usePagination from '../../util/Pagination';
const PublicWork = (publicData) => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const count = Math.ceil(publicData.data.length / PER_PAGE);
  const pageData = usePagination(publicData.data, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };

  return (
    <Box
      style={{
        position: 'relative',
        border: '1px solid lightgray',
        width: '100%',
        height: '40%',
        backgroundColor: '#ffffff80',
      }}
      sx={{
        '& > :not(style)': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        },
      }}>
      <Typography
        elevation={0}
        sx={{ mt: 4, mb: 2, marginTop: '3%' }}
        variant="h6"
        component="div"
        style={{
          width: '100%',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '20px',
        }}>
        사내 업무 리스트
      </Typography>

      <Divider />

      <TableContainer>
        <Table sx={{ width: '100%' }} aria-label="custom pagination table">
          <TableBody>
            {pageData.currentData().map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell
                    style={{
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      fontSize: '15px',
                      borderBottomColor: 'transparent',
                    }}
                    align="center">
                    {data.workTitle}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        style={{
          position: 'absolute',
          left: '0px',
          bottom: '10px',
          height: '40px',
        }}
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Box>
  );
};

export default PublicWork;
