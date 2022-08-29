import { Box, Divider, TableHead } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { myTeamStatus } from '../../util/Utilfunction';
import usePagination from '../../util/Pagination';
import { getMyTeamCurrentStatus } from '../../api/manager/ManagerAPI';
import * as api from '../../api/index';
const Myteamcurrentstatus = () => {
  const [myTeamcurrentStatus, setMyTeamCurrentStatus] = useState([]);

  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const count = Math.ceil(myTeamcurrentStatus.length / PER_PAGE);
  const pageData = usePagination(myTeamcurrentStatus, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };
  useEffect(() => {
    myTeamAPI();
  }, []);

  const myTeamAPI = async () => {
    await api.getMyTeamCurrentStatus().then((response) => {
      setMyTeamCurrentStatus(response.data);
    });
  };
  // getMyTeamCurrentStatus(setMyTeamCurrentStatus);

  return (
    <Container>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '500px',
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
        </Typography>

        <Divider />

        <TableContainer>
          <Table sx={{ width: '100%' }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="left">팀원명</TableCell>
                <TableCell align="center">근무현황</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="left">이번주 근로 시간</TableCell>
                <TableCell align="left">연차 사용 횟수(사용 / 잔여)</TableCell>
              </TableRow>
            </TableHead>
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
                    <TableCell>{data.commute_work_time} / 40h </TableCell>
                    <TableCell>{data.vacation_count} / 11 </TableCell>
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
    </Container>
  );
};

export default Myteamcurrentstatus;
