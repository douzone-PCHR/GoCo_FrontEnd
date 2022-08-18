import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import workList from '../../api/work/workAPI';
import axios from 'axios';

export default function WorkList() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [workListData, workListSetData] = useState([]);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    // const getData = async () => {
    //   await axios
    //     .get(
    //       "http://localhost:8080/api/work",
    //       {
    //         headers: {
    //           "access-control-allow-origin": "true",
    //           Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NjAzMjUyMDV9.cxefj3OA80c8bUNJuR90o0LSilPrssbIqgUGeue3s_QsavERIwjoZex_KQ22njzkSBwAeM2aZeP6cOfYJ8wwlw`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       const filterData = response.data.filter(
    //         (work) => work.workStartDate === null && work.workEndDate === null
    //       );
    //       workListSetData(filterData);
    //     });
    // };
    // getData();
  }, []);

  return (
    <>
      <Box
        sx={{
          '& > :not(style)': {
            m: 1,
            margin: 5,
            marginTop: 10,
            width: 250,
            height: 250,
          },
        }}>
        <List component="nav" aria-label="secondary mailbox folder">
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            개인 일정
          </Typography>
          {workListData.map((data) => {
            return data.workType == false ? (
              <ListItemButton key={data.workId}>
                <ListItemText primary={data.workTitle} />
              </ListItemButton>
            ) : (
              ''
            );
          })}
        </List>

        <List component="nav" aria-label="secondary mailbox folder">
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            사내 일정
          </Typography>
          {workListData.map((data) => {
            return data.workType == true ? (
              <ListItemButton key={data.workId}>
                <ListItemText primary={data.workTitle} />
              </ListItemButton>
            ) : (
              ''
            );
          })}
        </List>
      </Box>
    </>
  );
}
