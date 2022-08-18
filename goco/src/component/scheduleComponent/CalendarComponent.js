import React, { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { INITIAL_EVENTS, workGetData } from "../../api/work/event-utils";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import {
  getEmployeeList,
  getWorkListData,
  loginDefaultValue,
} from "../../api/work/workAPI";
import CalendarModal from "./CalendarModal";
import { empNum } from "../../page/schedule/Schedule";

export default function CalendarComponent(loginEmp) {
  const [getEmp, setEmp] = useState([]);
  const [getWorkList, setGetWorkList] = useState([
    { id: 0, title: "", start: "" },
  ]);
  const calendarRef = useRef();
  const [getEmpNum, setEmpNum] = useState(0);
  // const [getEmpNum, setEmpNum] = useState(3);
  const [eventMode, setEventMode] = useState(false);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    getEmployeeList(setEmp);
    workGetData(setGetWorkList, loginEmp.emp);
  }, [getEmpNum]);
  const open = () => {
    setEventMode(true);
  };
  const handleChange = (event) => {
    setEmpNum(event.target.value);
  };

  console.log(getWorkList);

  return (
    <Box component="div" sx={{ width: 1000 }}>
      <Box component="div" sx={{ display: "inline" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">직원 목록</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={loginEmp.emp}
            label="emp"
            onChange={handleChange}
          >
            {getEmp.map((data) => {
              return (
                <MenuItem
                  key={data.empNum}
                  // onClick={(e) => {
                  //   setEmp(data.empNum);
                  // }}
                  value={data.empNum}
                >
                  {data.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box component="div" sx={{ display: "inline" }}>
        <Button
          variant="outlined"
          sx={{
            m: 2,
            width: "10%",
            height: "10%",
            backgroundColor: "#64a1bd",
            "&:hover": {
              backgroundColor: "#267194",
            },
            color: "AppWorkspace",
          }}
        >
          출근
        </Button>
      </Box>
      <Box component="div" sx={{ display: "inline" }}>
        <Button
          variant="outlined"
          sx={{
            m: 2,
            width: "10%",
            height: "10%",
            backgroundColor: "#64a1bd",
            "&:hover": {
              backgroundColor: "#267194",
            },
            color: "AppWorkspace",
          }}
        >
          퇴근
        </Button>
      </Box>

      <Box
        sx={{
          "& > :not(style)": {
            marginTop: 2,
            width: 1000,
          },
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "today",
          }}
          // 타이틀 설정
          titleFormat={{ year: "numeric", month: "long" }}
          // 달력 일칸 사이즈 비율 고정
          aspectRatio={"1.2"}
          initialEvents={loginEmp.workList}
          googleCalendarApiKey="AIzaSyAX2St6JzA6IiOvPp7iSxZ0iSEDDpzBWD4"
          eventSources={{
            googleCalendarId:
              "ko.south_korea#holiday@group.v.calendar.google.com",
            color: "red",
          }}
          dateClick={setEventMode}
          locale="ko"
          height="70vh"
        />
        {/* {open && <CalendarModal></CalendarModal>} */}
      </Box>
    </Box>
  );
}
