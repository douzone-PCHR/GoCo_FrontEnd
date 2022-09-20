import { Box, Button, Input, MenuItem, Select, Tab, Tabs } from '@mui/material';
import style from '../../CSS/admin.module.css';
import { Fragment, useEffect, useState } from 'react';
import * as api from '../../api/index';
import { Incumbent } from '../../component/Admin/Incumbent.js';
import { Resignation } from '../../component/Admin/Resignation';
import { Search } from '@mui/icons-material';
import { width } from '@mui/system';

const handleSelectValue = (selectValue, processingData, checkFnc, emp, searchName) => {
  switch (selectValue) {
    case 1:
      return (
        <Incumbent
          processingData={processingData}
          checkFnc={checkFnc}
          emp={emp.filter((data) => data.name.includes(searchName))}
        />
      );

    case 2:
      return (
        <Incumbent
          processingData={processingData}
          checkFnc={checkFnc}
          emp={emp.filter((data) => data.jobTitle.jobTitleName.includes(searchName))}
        />
      );
    case 3:
      return (
        <Incumbent
          processingData={processingData}
          checkFnc={checkFnc}
          emp={emp.filter((data) => data.unit.parentUnit.unitName.includes(searchName))}
        />
      );
    case 4:
      return (
        <Incumbent
          processingData={processingData}
          checkFnc={checkFnc}
          emp={emp.filter((data) => data.unit.unitName.includes(searchName))}
        />
      );
    default:
      break;
  }
};
const unitProcessing = (units) => {
  let teams, depts, check;
  let processing = {
    teams: null,
    depts: null,
    check: null,
  };
  if (units.length !== 0) {
    teams = units.filter((team) => {
      if (team.unitType) {
        return team;
      }
      return null;
    });
    depts = units.filter((dept) => {
      if (!dept.unitType) {
        return dept;
      }
      return null;
    });

    check = units
      .map((teamCheck) => {
        if (teamCheck.unitType) {
          return teamCheck.parentUnit.unitId;
        }
        return null;
      })
      .filter((teamCheck) => {
        if (teamCheck) {
          return teamCheck;
        }
        return null;
      });
    const setCheckTeam = new Set(check);
    const checkTeam = [...setCheckTeam];

    processing = {
      teams: teams,
      depts: depts,
      check: checkTeam,
    };

    return processing;
  }
};
export const Admin = () => {
  const [emp, setEmp] = useState();
  const [units, setUnits] = useState([]);
  const [check, setCheck] = useState(false);
  const [tabValue, setTabValue] = useState(1);
  const [resignations, setResignations] = useState();
  const [searchName, setSearchName] = useState();
  const [selectValue, setSelectValue] = useState(1);
  function checkFnc() {
    setCheck(!check);
  }
  let processingData = {
    deptId: null,
    teamId: null,
  };
  useEffect(() => {
    api.getEmp().then((res) => {
      console.log(res.data);
      setEmp(
        res.data.filter((data) => {
          if (data.authority !== 'ROLE_ADMIN') {
            return data;
          }
        })
      );
    });

    api.getUnit().then((res) => {
      setUnits(res.data);
    });
  }, [check, tabValue === 1]);

  useEffect(() => {
    api.getResignation().then((res) => {
      setResignations(res.data);
    });
  }, [check, tabValue === 2]);

  processingData = units && unitProcessing(units);
  return (
    <div className={style.Container}>
      <div />
      <div className={style.item}>
        <Box sx={{ display: 'flex' }} justifyContent="space-between">
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => {
              setSelectValue(1);

              setTabValue(newValue);
            }}>
            <Tab label="재직자" value={1}></Tab>
            <Tab label="퇴사자" value={2}></Tab>
          </Tabs>
          <Box sx={{ width: '23%' }} display="flex" justifyContent="space-around">
            {tabValue === 1 && (
              <Fragment>
                <Select
                  size="small"
                  sx={{ marginRight: '2%' }}
                  value={selectValue}
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                  }}>
                  <MenuItem value={1}>직원명</MenuItem>
                  <MenuItem value={2}>직급</MenuItem>
                  <MenuItem value={3}>부서</MenuItem>
                  <MenuItem value={4}>팀</MenuItem>
                </Select>
                <Input
                  sx={{ paddingLeft: '2%', width: '50%' }}
                  id="searchInput"
                  placeholder="검색어를 입력하세요"
                />
              </Fragment>
            )}
            {tabValue === 2 && <Input id="searchInput" placeholder="이름을 입력하세요" />}
            <Button
              variant="outlined"
              size="medium"
              style={{
                borderRadius: '5%',
                fontWeight: '700',
                fontSize: '13px',
                margin: '10px',
              }}
              onClick={() => {
                setSearchName(document.getElementById('searchInput').value);
                document.getElementById('searchInput').value = null;
              }}>
              <Search /> 검색
            </Button>
          </Box>
        </Box>
        <div>
          {tabValue === 1 ? (
            !searchName ? (
              <Incumbent processingData={processingData} checkFnc={checkFnc} emp={emp} />
            ) : (
              handleSelectValue(selectValue, processingData, checkFnc, emp, searchName)
            )
          ) : (
            <Resignation resignations={resignations} searchName={searchName} />
          )}
        </div>
      </div>
    </div>
  );
};
