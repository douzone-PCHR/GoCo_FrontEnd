import styled from "@emotion/styled";
import {
  Box,
  Divider,
  hexToRgb,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  rgbToHex,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { borderTop } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getCommuteCheck } from "../../api/manager/ManagerAPI";

const MyPaper = styled(Paper)({
  textAlign: "center",
  fontSize: 24,
  padding: 30,
  margin: 10,
  maxWidth: "50%",
});
export default function CommuteCheck() {
  const [commuteCheckData, setCommuteCheckData] = useState({
    notWorking: 0,
    late: 0,
    attendance: 0,
    vacationAndBusinessTrip: 0,
  });
  useEffect(() => {
    getCommuteCheck(setCommuteCheckData);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "70%",
          // bgcolor: "transparent",
          marginTop: "50px",
          // marginLeft: "50px",
          display: "grid",
          // bgcolor: "rgba(255, 255, 255, 0.6)",
          gridTemplateColumns: "repeat(2, 1fr)",
          rowGap: "50px",
        }}
      >
        <MyPaper
          elevation={0}
          variant="outlined"
          sx={{
            borderTop: "8px solid #00AAFF",
          }}
        >
          출근
          <p style={{ marginTop: "5px", color: "#00AAFF" }}>
            {commuteCheckData.attendance}
          </p>
        </MyPaper>
        <MyPaper
          elevation={0}
          variant="outlined"
          sx={{
            borderTop: "8px solid #FF6363",
          }}
        >
          지각
          <p style={{ marginTop: "5px", color: "#FF6363" }}>
            {commuteCheckData.late}
          </p>
        </MyPaper>
        <MyPaper
          elevation={0}
          variant="outlined"
          sx={{
            borderTop: "8px solid #FFA755",
          }}
        >
          미출근
          <p style={{ marginTop: "5px", color: "#FFA755" }}>
            {commuteCheckData.notWorking}
          </p>
        </MyPaper>
        <MyPaper
          elevation={0}
          variant="outlined"
          sx={{
            borderTop: "8px solid #06882A",
          }}
        >
          휴가
          <p style={{ marginTop: "5px", color: "#06882A" }}>
            {commuteCheckData.vacationAndBusinessTrip}
          </p>
        </MyPaper>
      </Box>
    </>
  );
}
