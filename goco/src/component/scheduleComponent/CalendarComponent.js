import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import CalendarHeader from './CalendarHeader';
import CalendarModal from './CalendarModal';
import { workGetData } from '../../api/work/workAPI';
export default function CalendarComponent({ user, empList }) {
  const [getWorkList, setGetWorkList] = useState([]);
  const [getEmpId, setEmpId] = useState(user.empId);
  const [requestDate, setRequestDate] = useState();
  const calendarRef = useRef();
  const [openInsert, setOpenInsert] = useState(false);

  const handleDateClick = (info) => {
    setOpenInsert(true);
    setRequestDate(info);
  };

  useEffect(() => {
    workGetData(setGetWorkList, getEmpId, user.empId);
  }, [getEmpId, user.empId]);
  // 일정표 받기
  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        marginTop: '50px',
      }}>
      <Box
        sx={{
          '& > :not(style)': {
            width: '100%',
          },
        }}>
        <CalendarHeader
          calendarRef={calendarRef}
          empList={empList}
          getEmpId={getEmpId}
          setEmpId={setEmpId}
          user={user.empNum}
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
            moreLinkContent={(e) => (e.text = ` +${e.num} 더보기`)}
            dayMaxEvents={2}
            titleFormat={{ year: 'numeric', month: 'long' }}
            aspectRatio={'1.2'}
            // events={}
            googleCalendarApiKey="AIzaSyAX2St6JzA6IiOvPp7iSxZ0iSEDDpzBWD4"
            eventSources={[
              getWorkList,
              {
                googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
                color: 'red',
              },
            ]}
            eventClick={(info) => {
              if (info.event.url) {
                info.jsEvent.preventDefault();
              } else {
                handleDateClick(info.event.startStr);
              }
            }}
            dateClick={(info) => handleDateClick(info.date)}
            locale="ko"
            height="80vh"
          />
        )}
      </Box>
      {openInsert && requestDate !== null && (
        <CalendarModal
          open={openInsert}
          setOpenInsert={setOpenInsert}
          requestDate={requestDate}
          user={user.empNum}
          getEmpId={getEmpId}
        />
      )}
    </Box>
  );
}
