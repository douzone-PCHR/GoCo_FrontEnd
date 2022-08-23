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
const PrivateWork = (privateData) => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const count = Math.ceil(privateData.data.length / PER_PAGE);
  const pageData = usePagination(privateData.data, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };

  return (
    <Box
      style={{
        position: 'relative',
        border: '1px solid black',

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
        sx={{ mt: 4, mb: 2, marginTop: '1px' }}
        variant="h6"
        component="div"
        style={{
          width: '100%',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '20px',
        }}>
        개인 업무 리스트
      </Typography>

      <Divider />

      <TableContainer>
        <Table sx={{ width: '100%' }} aria-label="custom pagination table">
          <TableBody>
            {privateData &&
              pageData.currentData().map((data, index) => {
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

export default PrivateWork;
