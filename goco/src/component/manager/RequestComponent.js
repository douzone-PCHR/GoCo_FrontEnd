import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import React, { useState } from 'react';

import {
  Button,
  Chip,
  IconButton,
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
import { Add, Search } from '@mui/icons-material';
// function typeName(vacationType) {
//   let result = '';
//   switch (vacationType) {
//     case '0':
//       result = '연차 신청';
//       break;
//     case '1':
//       result = '휴가 신청';
//       break;
//     case '2':
//       result = '병가 신청';
//       break;
//     case '10':
//       result = '출장 신청';
//       break;
//     default:
//       result = '신청';
//   }

//   return result;
// }
export default function RequestComponent({ getRequsetData }) {
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const count = Math.ceil(getRequsetData.length / PER_PAGE);
  const pageData = usePagination(getRequsetData, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };
  console.log(getRequsetData);
  return (
    <Box
      sx={{
        position: 'relative',
        width: '90%',
        height: '100%',
        bgcolor: 'rgba(255, 255, 255, 0.6)',
        padding: '10px',
        minHeight: '450px',
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
        결재 대기
        <Box
          style={{
            float: 'right',
          }}>
          <Link to="/approveteam" style={{ textDecoration: 'none' }}>
            <Button sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
              <Search />
              더보기
            </Button>
          </Link>
        </Box>
      </Typography>
      <Divider />

      <TableContainer>
        <Table
          sx={{
            width: '100%',
          }}
          aria-label="custom pagination table">
          <TableBody>
            {pageData.currentData().map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell
                    align="center"
                    style={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}>
                    {data.name && data.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}>
                    <Chip
                      variant="outlined"
                      color="info"
                      label={data.vacationType === '10' ? '출장' : data.vacationType}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      color="primary"
                      label={data.approveEnum === 'APPROVE_WAITTING' ? '결재대기' : '결재완료'}
                    />
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
          left: '20px',
          bottom: '10px',
          height: '50px',
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
