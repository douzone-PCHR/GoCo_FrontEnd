import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import FullCalendar, { CalendarApi } from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { workGetData } from '../../api/work/event-utils';

import { Button, FormControl, InputLabel, Modal, Typography } from '@mui/material';
import CalendarHeader from './CalendarHeader';
import CalendarModal from './CalendarModal';

export default function CalendarComponent(empList) {
  const [getWorkList, setGetWorkList] = useState([]);
  const [getEmpId, setEmpId] = useState(empList.userId);
  const [requestDate, setRequestDate] = useState();
  const [empList2, setEmpList2] = useState(empList.empList);
  const calendarRef = useRef();
  const [openInsert, setOpenInsert] = useState(false);

  const handleDateClick = (info) => {
    setOpenInsert(true);
    setRequestDate(info.dateStr);
  };

  useEffect(() => {
    workGetData(setGetWorkList, getEmpId);
  }, [getEmpId]);

  return (
    <Box component="div" sx={{ width: '100%', marginTop: '100px' }}>
      <Box
        sx={{
          '& > :not(style)': {
            width: '100%',
          },
        }}>
        <CalendarHeader
          calendarRef={calendarRef}
          empList={empList.empList}
          getEmpId={getEmpId}
          setEmpId={setEmpId}
        />
        {getWorkList.length !== 0 && (
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: '',
              center: '',
              right: '',
            }}
            titleFormat={{ year: 'numeric', month: 'long' }}
            aspectRatio={'1.2'}
            initialEvents={getWorkList}
            googleCalendarApiKey="AIzaSyAX2St6JzA6IiOvPp7iSxZ0iSEDDpzBWD4"
            eventSources={{
              googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
              color: 'red',
            }}
            eventClick={(info) => {
              if (info.event.url) {
                info.jsEvent.preventDefault();
              }
            }}
            dateClick={(info) => handleDateClick(info)}
            locale="ko"
            height="80vh"
          />
        )}
      </Box>
      {openInsert && requestDate !== null && (
        <CalendarModal open={openInsert} setOpenInsert={setOpenInsert} requestDate={requestDate} />
      )}
    </Box>
  );
}
