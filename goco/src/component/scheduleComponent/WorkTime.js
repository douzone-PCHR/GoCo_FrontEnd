import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Chip, Divider, TableHead, Typography } from '@mui/material';
import { isOverflowing } from 'rsuite/esm/DOMHelper';

export default function WorkTime({ commuteTimeData }) {
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
          sx={{ mt: 4, mb: 2, marginTop: '1px', borderLeft: '5px solid #00AAFF' }}
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
                  <Chip color="default" size="small" sx={{ width: '70px' }} label="40h" />
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
                  <Chip
                    size="small"
                    sx={{ backgroundColor: '#00AAFF', color: 'white', width: '70px' }}
                    label={`${
                      commuteTimeData.commute_work_hour ? commuteTimeData.commute_work_hour : '0'
                    }h ${
                      commuteTimeData.commute_work_min ? commuteTimeData.commute_work_min : '0'
                    }m`}
                  />
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
                  <Chip
                    size="small"
                    sx={{ backgroundColor: '#FF8B8B', width: '70px' }}
                    color="error"
                    label={` ${
                      commuteTimeData.commute_work_hour >= 40
                        ? `${commuteTimeData.commute_work_hour - 40}h ${
                            commuteTimeData.commute_work_min
                          }m`
                        : '0h 0m'
                    }`}
                  />
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
          sx={{ mt: 4, mb: 2, marginTop: '1px', borderLeft: '5px solid #FF8B8B' }}
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
                <TableCell align="left"></TableCell>
                <TableCell align="center">총</TableCell>
                <TableCell align="center">사용</TableCell>
                <TableCell align="center">잔여</TableCell>
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
                  연차
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '10px',
                    textAlign: 'center',
                  }}>
                  <Chip size="small" sx={{ width: '40px' }} color="default" label="11" />
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '15px',
                    textAlign: 'center',
                  }}>
                  <Chip
                    size="small"
                    sx={{ backgroundColor: '#00AAFF', color: 'white', width: '40px' }}
                    label={commuteTimeData.vacation_count ? 11 - commuteTimeData.vacation_count : 0}
                  />
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '15px',
                    textAlign: 'center',
                  }}>
                  <Chip
                    size="small"
                    color="info"
                    sx={{ backgroundColor: '#FF8B8B', color: 'white', width: '40px' }}
                    label={commuteTimeData.vacation_count}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
