import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAllUnitAPI } from '../../api/authAPI';
import axios from 'axios';
export function GroupedSelect() {
  const [value, setValue] = React.useState();
  const [unit, setUnit] = React.useState(); // 유닛 자식 컴포넌트에 주려고 작전중
  const [dept, setDept] = React.useState();
  const [team, setTeam] = React.useState();
  const [item, setItem] = React.useState(3);

  const getUnit = () => {
    // getAllUnitAPI(setUnit);

    axios
      .get(`http://localhost:8080/api/auth/getAllUnit`)
      .then((response) => {
        // setUnit(setUnit);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showUnit = () => {
    console.log(unit[0]);
  };
  return (
    <div>
      <button onClick={getUnit}>유닛 불러오기 </button>
      <button onClick={showUnit}>유닛 데이터 확인하기 </button>
      <FormControl sx={{ m: 1, width: '300px' }}>
        <InputLabel htmlFor="grouped-native-select">부서지정</InputLabel>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          label="부서지정"
          onChange={(e) => {
            setValue(e);
            console.log('e : ', e.target.value);
          }}>
          <option aria-label="None" value="" />
          <optgroup label="카테고리다1">
            <option value={1}>옵션1</option>
            <option value={2}>Option 2</option>
          </optgroup>
          <optgroup label="카테고리다2">
            <option value={3}>옵션3</option>
            <option value={4}>Option 4</option>
          </optgroup>
        </Select>
      </FormControl>
    </div>
  );
}
