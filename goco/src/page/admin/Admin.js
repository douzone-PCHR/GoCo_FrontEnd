import { Box, Button, Input, MenuItem, Select, Tab, Tabs } from '@mui/material';
import style from '../../CSS/admin.module.css';
import { TableCellComponent } from '../../component/Admin/TableCellComponent';
import { Fragment, useEffect, useRef, useState } from 'react';
import { AdminTableHead } from '../../component/Admin/TableHead';
import * as api from '../../api/index';
import { Incumbent } from '../../component/Admin/Incumbent.js';
import { getUser } from '../../component/auth/Login/sessionLogin';
import { Resignation } from '../../component/Admin/Resignation';
const handleSelectValue = (selectValue, processingData, checkFnc, emp) => {
  switch (selectValue) {
    case 1:
      return <Incumbent processingData={processingData} checkFnc={checkFnc} emp={emp} />;
    case 2:
      return <Incumbent processingData={processingData} checkFnc={checkFnc} emp={emp} />;
    case 3:
      return <Incumbent processingData={processingData} checkFnc={checkFnc} emp={emp} />;
    case 4:
      return <Incumbent processingData={processingData} checkFnc={checkFnc} emp={emp} />;
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
      })
      .filter((teamCheck) => {
        if (teamCheck) {
          return teamCheck;
        }
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
      setEmp(res.data);
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
          <Box>
            {tabValue === 1 && (
              <Fragment>
                <Select
                  value={selectValue}
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                  }}>
                  <MenuItem value={1}>사원명</MenuItem>
                  <MenuItem value={2}>직급</MenuItem>
                  <MenuItem value={3}>부서</MenuItem>
                  <MenuItem value={4}>팀</MenuItem>
                </Select>
                <Input id="searchInput" placeholder="검색어를 입력하세요" />
              </Fragment>
            )}
            {tabValue === 2 && <Input id="searchInput" placeholder="이름을 입력하세요" />}
            <Button
              onClick={() => {
                setSearchName(document.getElementById('searchInput').value);
                document.getElementById('searchInput').value = null;
              }}>
              검색
            </Button>
          </Box>
        </Box>
        <div>
          {tabValue === 1 ? (
            !searchName ? (
              <Incumbent processingData={processingData} checkFnc={checkFnc} emp={emp} />
            ) : (
              handleSelectValue(selectValue, processingData, checkFnc, emp)
            )
          ) : (
            <Resignation resignations={resignations} searchName={searchName} />
          )}
        </div>
      </div>
    </div>
  );
};
