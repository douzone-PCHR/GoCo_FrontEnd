import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import React, { useState } from 'react';
import 'moment/locale/ko';
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
import moment from 'moment';

export default function Notice({ noticeList }) {
  let [page, setPage] = useState(1);

  const PER_PAGE = 4;
  const count = Math.ceil(noticeList.length / PER_PAGE);
  const pageData = usePagination(noticeList, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '90%',
        height: '75%',
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
        공지사항
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
          더보기
        </Button>
      </Typography>

      <Divider />

      <TableContainer>
        <Table sx={{ width: '100%' }} aria-label="custom pagination table">
          <TableBody>
            {pageData.currentData().map((data, index) => {
              return (
                <TableRow key={data.boardId}>
                  <TableCell
                    style={{
                      fontWeight: '500',
                      color: 'black',
                      fontSize: '20px',
                    }}>
                    {data.boardTitle}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: '500',
                      color: 'black',
                      fontSize: '20px',
                    }}>
                    {moment(data.registeredDate).format('YYYY-MM-DD')}
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
