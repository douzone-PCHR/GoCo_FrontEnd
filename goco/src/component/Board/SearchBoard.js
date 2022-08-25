import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; //달력
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; //달력
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; //달력
import dayjs from 'dayjs'; //달력
import styles from '../../CSS/board/NoticeBoard.module.css';
import { sweetAlert2 } from '../auth/AuthSweetAlert.js/sweetAlert2';
export default function SearchBoard({ data, setShowData, DATE }) {
  const [info, setInfo] = React.useState({
    info: 1,
    keyWord: '',
  });
  const [dateInfo, setDateInfo] = React.useState({
    start: dayjs(new Date('1900-01-01')).format('YYYY-MM-DD'),
    end: dayjs(new Date()).format('YYYY-MM-DD'),
  });
  const handleChange = (prop) => (event) => {
    setInfo({ ...info, [prop]: event.target.value });
  };
  const Shearch = () => {
    if (info.keyWord === '') {
      setShowData(data);
      sweetAlert2('검색어를 입력해 주세요!', 'error');
      return;
    }
    SearchData(info.info);
    sweetAlert2('검색 완료', 'success');
  };

  const SearchData = (num) => {
    switch (num) {
      case 1:
        setShowData(FilterDate(data.filter((row) => row.boardTitle.includes(info.keyWord))));
        return;
      case 2:
        setShowData(FilterDate(data.filter((row) => row.employee.name.includes(info.keyWord))));
        return;
      case 3:
        setShowData(FilterDate(data.filter((row) => row.boardContent.includes(info.keyWord))));
        return;
      default:
        return;
    }
  };

  const FilterDate = (e) => {
    return e.filter((row) => {
      if (
        (dateInfo.start <= DATE(row.registeredDate)) &
        (DATE(row.registeredDate) <= dateInfo.end)
      ) {
        return row;
      }
    });
  };
  return (
    <>
      <div className={styles.SearchDate}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="yyyy-MM-dd"
            label="시작 날짜"
            value={dateInfo.start}
            onChange={(e) => {
              setDateInfo({
                ...dateInfo,
                start: dayjs(new Date(e)).format('YYYY-MM-DD'),
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="yyyy-MM-dd"
            label="종료 날짜"
            value={dateInfo.end}
            onChange={(e) => {
              setDateInfo({
                ...dateInfo,
                end: dayjs(new Date(e)).format('YYYY-MM-DD'),
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      {/* ===============================이상 날짜 검색======================================= */}
      <div className={styles.Margin}>
        <FormControl sx={{ minWidth: 120, background: 'white' }} size="small">
          <Select value={info.info} onChange={handleChange('info')}>
            <MenuItem value={1}>제목</MenuItem>
            <MenuItem value={2}>작성자</MenuItem>
            <MenuItem value={3}>내용</MenuItem>
          </Select>
        </FormControl>
        <TextField
          placeholder="검색할 키워드를 입력하세요"
          size="small"
          sx={{ width: '25%', background: 'white', margin: '0 3px' }}
          onChange={handleChange('keyWord')}
        />
        <Button
          onClick={Shearch}
          size="large"
          sx={{ color: 'black', background: 'white', border: '1px solid gray' }}>
          <SearchIcon fontSize="small" />
        </Button>
      </div>
    </>
  );
}
