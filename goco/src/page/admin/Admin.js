import { Pagination, Tab, Table, TableBody, Tabs } from '@mui/material';
import style from '../../CSS/admin.module.css';
import { TableCellComponent } from '../../component/Admin/TableCellComponent';
import { Fragment, useEffect, useState } from 'react';
import { AdminTableHead } from '../../component/Admin/TableHead';
import { getEmp, getResignationAPI } from '../../api/employeeAPI';
import { getUnitsAPI } from '../../api/unitAPI';
import { Incumbent } from '../../component/Admin/Incumbent.js';
import { getUser } from '../../component/auth/Login/sessionLogin';
import { Resignation } from '../../component/Admin/Resignation';
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
  function checkFnc() {
    setCheck(!check);
  }
  let processingData = {
    deptId: null,
    teamId: null,
  };
  useEffect(() => {
    getEmp(setEmp, null);
    getUnitsAPI(setUnits);
  }, [check, tabValue === 1]);

  useEffect(() => {
    getResignationAPI(setResignations);
  }, [check, tabValue === 2]);

  processingData = units && unitProcessing(units);
  return (
    <div className={style.Container}>
      <div className={style.item}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => {
            setTabValue(newValue);
          }}>
          <Tab label="재직자" value={1}></Tab>
          <Tab label="퇴사자" value={2}></Tab>
        </Tabs>
        <div>
          {tabValue === 1 ? (
            <Incumbent processingData={processingData} checkFnc={checkFnc} emp={emp} />
          ) : (
            <Resignation resignations={resignations} />
          )}
        </div>
      </div>
      <div />
    </div>
  );
};
