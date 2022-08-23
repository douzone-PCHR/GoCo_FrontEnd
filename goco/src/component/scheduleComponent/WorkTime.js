import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Divider, FormLabel, TableHead, Typography } from '@mui/material';
import { commuteTime } from '../../api/work/workAPI';

export default function WorkTime() {
  const [commuteTimeData, setCommuteTimeData] = useState([]);
  useEffect(() => {
    commuteTime(setCommuteTimeData);
  }, []);

  return (
    <>
      <Box
        sx={{
          '& > :not(style)': {
            m: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          },
        }}>
        <Typography
          elevation={0}
          sx={{ mt: 4, mb: 2, marginTop: '1px', borderLeft: '8px solid #00AAFF' }}
          variant="h6"
          component="div"
          style={{
            width: '40%',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '20px',
          }}>
          내 근로 통계
        </Typography>
        <Typography
          sx={{}}
          variant="h6"
          component="div"
          style={{
            width: '100%',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '15px',
          }}>
          {commuteTimeData.startDate} ~ {commuteTimeData.endDate}
        </Typography>

        <Divider />

        <TableContainer>
          <Table sx={{ width: '100%' }} aria-label="custom pagination table">
            <TableBody>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '15px',
                  }}>
                  소정 근로시간
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '15px',
                  }}
                  align="left">
                  40h
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '15px',
                  }}>
                  실제 근로 시간
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '15px',
                  }}
                  align="left">
                  {commuteTimeData.commute_work_time}h
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '15px',
                  }}>
                  연장 근로 시간
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '15px',
                  }}
                  align="left">
                  {commuteTimeData.commute_work_time >= 40
                    ? commuteTimeData.commute_work_time - 40
                    : 0}
                  h
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          '& > :not(style)': {
            m: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          },
        }}>
        <Typography
          elevation={0}
          sx={{ mt: 4, mb: 2, marginTop: '1px', borderLeft: '8px solid #FF8B8B' }}
          variant="h6"
          component="div"
          style={{
            width: '40%',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '20px',
          }}>
          내 휴가 통계
        </Typography>

        <Divider />
        <TableContainer>
          <Table sx={{ width: '100%' }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="left">휴가 그룹</TableCell>
                <TableCell align="left">총</TableCell>
                <TableCell align="left">사용</TableCell>
                <TableCell align="left">잔여</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '15px',
                  }}>
                  연차 휴가
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '15px',
                    textAlign: 'center',
                  }}>
                  11
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '15px',
                    textAlign: 'center',
                  }}>
                  {/* {parseInt(commuteTimeData.vacation_count) === parseInt(11)
                    ? parseInt(0)
                    : parseInt(11) - parseInt(commuteTimeData.vacation_count)} */}
                  {String(parseInt(11) - commuteTimeData.vacation_count)}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '15px',
                    textAlign: 'center',
                  }}>
                  {commuteTimeData.vacation_count}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
