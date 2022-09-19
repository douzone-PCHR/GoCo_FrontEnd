import 'moment/locale/ko';
import moment from 'moment';
import { Button, Chip } from '@mui/material';

export function myTeamStatus(data) {
  let result = '';
  let check = '';
  if (data.vacation_approve === 'APPROVE_SUCCESS') {
    result = `${moment(data.vacation_start_date).format('YYYY-MM-DD')} ~ ${moment(
      data.vacation_end_date
    ).format('YYYY-MM-DD')}`;
    check = (
      <Chip
        style={{
          backgroundColor: '#FCC967',
          color: '#FFFFFF',
          fontSize: '16px',
          border: '1px solid #B3B3B3',
          fontWeight: '700',
        }}
        label="휴가"></Chip>
    );
  } else if (data.business_approve === 'APPROVE_SUCCESS') {
    result = `${moment(data.business_trip_start_date).format('YYYY-MM-DD')} ~ ${moment(
      data.business_trip_end_date
    ).format('YYYY-MM-DD')}`;
    check = (
      <Chip
        style={{
          backgroundColor: 'green',
          color: '#FFFFFF',
          fontSize: '16px',
          border: '1px solid #B3B3B3',
          fontWeight: '700',
        }}
        label="출장"></Chip>
    );
  } else {
    if (
      moment(data.clock_out).format('HH') === '00' &&
      moment(data.clock_in).format('HH') !== '00'
    ) {
      result = <Chip label={`${moment(data.clock_in).format('HH:mm')}`} />;
      check = (
        <Chip sx={{ width: '60%', backgroundColor: '#00AAFF', color: 'white' }} label="근무중" />
      );
    } else if (
      moment(data.clock_out).format('HH') === '00' &&
      moment(data.clock_in).format('HH') === '00'
    ) {
      result = `미출근`;
      check = <Chip sx={{ width: '70%' }} label="미출근" />;
    } else {
      result = (
        <Chip
          variant="outlined"
          sx={{ fontSize: '15px' }}
          label={`${moment(data.clock_in)?.format('HH:mm')} ~
 ${moment(data.clock_out)?.format('HH:mm')}`}
        />
      );

      check = (
        <Chip
          size="large"
          label="퇴근"
          sx={{
            width: '60%',
            backgroundColor: '#FF8B8B',
            color: '#FFFFFF',
          }}
        />
      );
    }
  }

  return { result, check };
}

export function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}
