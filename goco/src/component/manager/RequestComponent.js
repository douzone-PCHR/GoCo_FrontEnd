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
function typeName(vacationType) {
  let result = '';
  switch (vacationType) {
    case '0':
      result = '연차 신청';
      break;
    case '1':
      result = '휴가 신청';
      break;
    case '2':
      result = '병가 신청';
      break;
    case '10':
      result = '출장 신청';
      break;
    default:
      result = '신청';
  }

  return result;
}
export default function RequestComponent({ getRequsetData }) {
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const count = Math.ceil(getRequsetData.length / PER_PAGE);
  const pageData = usePagination(getRequsetData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };
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
          fontSize: '24px',
        }}>
        요청사항
        <Button
          style={{
            color: 'black',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontSize: '20px',
            fontWeight: '700',
            float: 'right',
            lineHeight: '24px',
          }}>
          <Link to="/approveteam" style={{ color: 'black', textDecoration: 'none' }}>
            더보기
          </Link>
        </Button>
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
                    style={{
                      fontSize: '20px',
                      fontWeight: '700',
                    }}>
                    {data.name && data.name}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '20px',
                      fontWeight: '700',
                    }}>
                    {typeName(data.vacationType)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: '#FF8B8B',
                        color: '#FFFFFF',
                        fontSize: '24px',
                        border: '#FF8B8B',
                      }}>
                      승인 대기
                    </Button>
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
