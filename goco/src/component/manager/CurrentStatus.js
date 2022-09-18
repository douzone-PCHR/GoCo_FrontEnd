import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import React, { useState } from 'react';

import {
  Button,
  Chip,
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
import { Search } from '@mui/icons-material';
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
        }}>
        팀 근무 현황
        <Box
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
            <Button sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
              <Search />
              더보기
            </Button>
          </Link>
        </Box>
      </Typography>

      <Divider />

      <TableContainer>
        <Table sx={{ width: '100%' }} aria-label="custom pagination table">
          <TableBody>
            {pageData.currentData().length !== 0 &&
              pageData.currentData().map((data, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '16px',
                      }}>
                      {data.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '16px',
                      }}>
                      {console.log(myTeamStatus(data))}
                      {myTeamStatus(data).result === '미출근' ? '' : myTeamStatus(data).result}
                    </TableCell>
                    <TableCell align="center">{myTeamStatus(data).check} </TableCell>
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
        size="medium"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Box>
  );
}
