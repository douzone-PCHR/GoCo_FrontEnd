import { Edit, Search } from '@mui/icons-material';
import {
  Button,
  Chip,
  IconButton,
  Modal,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
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
    <>
      <div className={styled.Container}>
        <div />
        <div className={styled.item}>
          <div className={styled.btn}></div>
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
                            return dept.unitName === team.parentUnit.unitName ? (
                              <TableCell key={team.unitId} align="center">
                                <Chip label={team.unitName}></Chip>
                              </TableCell>
                            ) : null;
                          })}
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
        </div>
        <div />
      </div>
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
    </>
  );
};
