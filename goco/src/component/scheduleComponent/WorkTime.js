import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FormLabel } from "@mui/material";
import axios from "axios";

export default function WorkTime() {
  const [commuteTimeData, setCommuteTimeData] = useState(0);
  const commuteTime = async (event) => {
    const workTime = {
      startDate: event[0]._d,
      endDate: event[1]._d,
    };
    await axios
      .post(`http://localhost:8080/api/commute/time`, workTime, {
        headers: {
          "access-control-allow-origin": "true",
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NjA0NjM3MDF9.AjO8QQfvdXlmsJhUNGeC2snOY-on8UKepqZpoG2lCAmlYLGwl0QuAHQZf4cbHQxyypFTmkwuEg2ypU--a6YxHA`,
        },
      })
      .then((response) => {
        setCommuteTimeData(response.data);
      });
  };

  return (
    <>
      <Box
        sx={{
          "& > :not(style)": {
            m: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 300,
          },
        }}
      >
        <FormLabel>내 근로 통계</FormLabel>
        {/* <LocalizationProvider>
          <DatePicker label="Basic example" onChange={commuteTime} />
          <DatePicker label="Basic example" onChange={commuteTime} />
        </LocalizationProvider> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  소정 근로시간
                </TableCell>
                <TableCell align="right">40</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  실제 근로 시간
                </TableCell>
                <TableCell align="right">{commuteTimeData}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  연장 근로 시간
                </TableCell>
                <TableCell align="right">
                  {commuteTimeData >= 40 ? commuteTimeData - 40 : 0}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          "& > :not(style)": {
            m: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 300,
          },
        }}
      >
        <FormLabel>내 휴가 통계</FormLabel>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  휴가 그룹
                </TableCell>
                <TableCell component="th" scope="row">
                  총
                </TableCell>
                <TableCell component="th" scope="row">
                  사용
                </TableCell>
                <TableCell component="th" scope="row">
                  잔여
                </TableCell>
                <TableCell align="left">연차 휴가</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  연차 휴가
                </TableCell>
                <TableCell align="center">11</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
