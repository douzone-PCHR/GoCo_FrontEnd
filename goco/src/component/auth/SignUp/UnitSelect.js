import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; //달력
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; //달력
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getUnitAPI } from '../../../api/AllAPI';
export default function UnitSelect({ data, setData, setOkUnitCheck, okUnitCheck }) {
  const [units, setUnit] = useState();
  const resultDept = [];
  const teams = [];
  useEffect(() => {
    getUnitAPI(setUnit);
  }, []);
  units &&
    units.map((unit) => {
      if (!unit.unitType) {
        resultDept.push(unit); // 부서 정렬하는 것
      } else {
        teams.push(unit); // 팀정렬 하는 것
      }
    });

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            부서
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControl
                sx={{ width: '100%' }}
                onChange={(e) => {
                  setData({ ...data, unit: e.target.value });
                  setOkUnitCheck(true);
                }}>
                <InputLabel htmlFor="grouped-native-select">부서를 지정해 주세요</InputLabel>
                <Select
                  error={!okUnitCheck}
                  native
                  defaultValue=""
                  id="grouped-native-select"
                  label="부서를 지정해 주세요">
                  <option aria-label="None" value="" />
                  {resultDept &&
                    resultDept.map((unit, idex) => {
                      return (
                        <optgroup key={idex} label={unit.unitName}>
                          {teams &&
                            teams.map((team, idex) => {
                              if (unit.unitId === team.parentUnit.unitId) {
                                return (
                                  <option key={idex} value={team.unitId}>
                                    {team.unitName}
                                  </option>
                                );
                              }
                            })}
                        </optgroup>
                      );
                    })}
                </Select>
              </FormControl>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
