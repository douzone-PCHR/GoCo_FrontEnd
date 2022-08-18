import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import "moment/locale/ko";
import {
  Button,
  ListItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getNoticeList } from "../../api/manager/ManagerAPI";
import usePagination from "../../util/Pagination";
import moment, { now, Moment } from "moment";

export default function Notice() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  let [page, setPage] = useState(1);
  let [pageList, setPageList] = useState([]);
  const PER_PAGE = 4;
  const count = Math.ceil(pageList.length / PER_PAGE);
  const pageData = usePagination(pageList, PER_PAGE);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };

  useEffect(() => {
    getNoticeList(setPageList);
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "75%",
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
        공지사항
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
        <Table sx={{ width: "100%" }} aria-label="custom pagination table">
          <TableBody>
            {pageData.currentData().map((data, index) => {
              // console.log(data);
              return (
                <TableRow key={data.boardId}>
                  <TableCell
                    style={{
                      fontWeight: "500",
                      color: "black",
                      fontSize: "20px",
                    }}
                  >
                    {data.boardTitle}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "500",
                      color: "black",
                      fontSize: "20px",
                    }}
                  >
                    {moment(data.registeredDate).format("YYYY-MM-DD")}
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
