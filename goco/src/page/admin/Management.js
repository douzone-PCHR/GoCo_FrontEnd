import { MoreHoriz, Search } from '@mui/icons-material';
import {
  Button,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Box,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import * as api from '../../api/index';
import { UnitModalComponent } from '../../component/Management/UnitModalComponent';
import { DeptModal } from '../../component/modal/DeptModal';
import styled from '../../CSS/admin.module.css';
import { handleChangePage } from '../../util/PaginationTable';
export const Management = () => {
  const [units, setUnits] = useState();
  const [insertBtn, setInsertBtn] = useState(false);
  const [dept, setDept] = useState();
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(true);
  const [handleModal, setHandleModal] = useState(false);
  const resultDepts = [];
  const teams = [];
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  function render() {
    setCheck(!check);
  }

  useEffect(() => {
    api.getUnit().then((res) => {
      setUnits(res.data);
    });
  }, [check, open, handleModal]);

  units &&
    units.map((unit) => {
      if (!unit.unitType) {
        resultDepts.push(unit);
      } else {
        teams.push(unit);
      }
      return unit;
    });

  return (
    <Fragment>
      <Box className={styled.Container}>
        <Box />
        <Box className={styled.item}>
          <Box className={styled.btn}></Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">부서</TableCell>
                  <TableCell colSpan={10} align="center">
                    팀
                  </TableCell>
                  <TableCell padding="none" align="right">
                    <Button
                      color="info"
                      variant="contained"
                      onClick={() => {
                        setInsertBtn(true);
                      }}>
                      부서추가
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultDepts &&
                  (rowsPerPage > 0
                    ? resultDepts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : resultDepts
                  ).map((dept) => {
                    let count = 0;
                    let teamStore = [];
                    return (
                      <TableRow key={dept.unitId}>
                        <TableCell align="center">
                          <Chip
                            color="primary"
                            label={dept.unitName}
                            sx={{ minWidth: '60%' }}></Chip>
                        </TableCell>
                        {teams &&
                          teams.map((team) => {
                            if (dept.unitName === team.parentUnit.unitName) {
                              ++count;
                            }
                            if (count >= 4 && dept.unitName === team.parentUnit.unitName) {
                              teamStore.push(team.unitName);
                            }
                            return count < 4 && dept.unitName === team.parentUnit.unitName ? (
                              <TableCell key={team.unitId} align="center">
                                <Chip label={team.unitName}></Chip>
                              </TableCell>
                            ) : null;
                          })}
                        {count > 3 && (
                          <TableCell>
                            <Tooltip
                              placement="right"
                              title={
                                <Box style={{ whiteSpace: 'pre-line' }} sx={{ fontSize: '15px' }}>
                                  {teamStore.join(' / ')}
                                </Box>
                              }>
                              <MoreHoriz sx={{ verticalAlign: 'middle' }} />
                            </Tooltip>
                          </TableCell>
                        )}
                        <TableCell align="right" colSpan={20} padding="none">
                          <IconButton
                            onClick={() => {
                              setOpen(true);
                              setDept(dept);
                            }}>
                            <Search />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={resultDepts?.length || 1}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(e, page) => handleChangePage(page, setPage)}
            />
          </TableContainer>
        </Box>
        <Box />
      </Box>
      <DeptModal insertBtn={insertBtn} setInsertBtn={setInsertBtn} render={render} />
      <UnitModalComponent
        open={open}
        setOpen={setOpen}
        teams={teams}
        dept={dept}
        handleModal={handleModal}
        setHandleModal={setHandleModal}
        render={render}
        check={check}
      />
    </Fragment>
  );
};
