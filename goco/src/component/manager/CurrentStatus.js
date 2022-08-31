import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import React, { useState } from 'react';

import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

import usePagination from '../../util/Pagination';
import { Link } from 'react-router-dom';
import { myTeamStatus } from '../../util/Utilfunction';
export default function CurrentStatus({ currentStatus }) {
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const count = Math.ceil(currentStatus.length / PER_PAGE);
  const pageData = usePagination(currentStatus, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '450px',
        bgcolor: 'rgba(255, 255, 255, 0.6)',
        padding: '10px',
      }}>
      <Typography
        sx={{ mt: 4, mb: 2, marginTop: '1px', padding: '15px' }}
        variant="h6"
        component="div"
        style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '24px',
        }}>
        현재 우리팀 근무 현황
        <Button
          style={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontSize: '20px',
            fontWeight: '700',
            float: 'right',
            lineHeight: '24px',
          }}>
          <Link
            to="/currentStatus"
            state={{ currentStatus }}
            style={{ color: 'black', textDecoration: 'none' }}>
            더보기
          </Link>
        </Button>
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
                      fontWeight: '700',
                      fontSize: '16px',
                    }}>
                    {data.name}
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: '700',
                      fontSize: '16px',
                    }}>
                    {myTeamStatus(data).result}
                  </TableCell>
                  <TableCell>{myTeamStatus(data).check}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        style={{
          position: 'absolute',
          left: '20px',
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
}
