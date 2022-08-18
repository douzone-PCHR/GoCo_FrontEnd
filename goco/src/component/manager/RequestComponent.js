import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";

import {
  Button,
  ListItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  getRequestList,
  getRequestList1,
  getRequestList2,
} from "../../api/manager/ManagerAPI";
import { loginDefaultValue } from "../../api/work/workAPI";
import usePagination from "../../util/Pagination";
function typeName(vacationType) {
  let result = "";
  switch (vacationType) {
    case "0":
      result = "연차 신청";
      break;
    case "1":
      result = "휴가 신청";
      break;
    case "2":
      result = "병가 신청";
      break;
    case "10":
      result = "출장 신청";
      break;
  }

  return result;
}
export default function RequestComponent(unit) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [LoginEmp, setLoginEmp] = useState([]);
  const [getData, setData] = useState([]);

  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const count = Math.ceil(getData.length / PER_PAGE);
  const pageData = usePagination(getData, PER_PAGE);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };
  useEffect(() => {
    getRequestList(setData);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        bgcolor: "rgba(255, 255, 255, 0.6)",
        padding: "10px",
        minHeight: "450px",
      }}
    >
      <Typography
        sx={{ mt: 4, mb: 2, marginTop: "1px", padding: "15px" }}
        variant="h6"
        component="div"
        style={{
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "24px",
        }}
      >
        요청사항
        <Button
          style={{
            color: "black",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontSize: "20px",
            fontWeight: "700",
            float: "right",
            lineHeight: "24px",
          }}
        >
          더보기
        </Button>
      </Typography>
      <Divider />

      <TableContainer>
        <Table
          sx={{
            width: "100%",
          }}
          aria-label="custom pagination table"
        >
          <TableBody>
            {pageData.currentData().map((data, index) => {
              // console.log(data);
              return (
                <TableRow key={index}>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    {data.ename && data.ename}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    {typeName(data.vacation_type)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: "#FF8B8B",
                        color: "#FFFFFF",
                        fontSize: "24px",
                        border: "#FF8B8B",
                      }}
                    >
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
          position: "absolute",
          left: "20px",
          bottom: "10px",
          height: "40px",
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
