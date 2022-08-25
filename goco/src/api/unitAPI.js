import axios from 'axios';

const url = 'http://localhost:8080/api/admin/unit';
export const getUnitsAPI = (setUnit) => {
  axios.get(url).then((response) => {
    setUnit(response.data);
  });
};

//팀 추가 시 emp에도 팀장의 정보가 입력돼야함.
export const insertUnitAPI = async (
  unitName,
  parentUnitId,
  mgrNum,
  empTeamMembers,
  setEmpTeamMembers
) => {
  let unit = {};
  // 팀 일 경우
  parentUnitId
    ? (unit = {
        unitName: unitName,
        parentUnit: {
          unitId: parentUnitId,
        },
        managerNum: mgrNum, //매니저
        employeeList: empTeamMembers, // 리스트형태
      })
    : (unit = { unitName: unitName });

  //매니저 번호가 없고 부서가 없을경우 or 부서가 있고(팀인 경우) 매니저가있을 경우
  if (!mgrNum === !parentUnitId) {
    return await axios.post(url, unit).then((response) => {
      return response.data;
    });
  } else {
    console.log('잘못된 입력');
  }
  setEmpTeamMembers && setEmpTeamMembers({ userRoles: [] });
};

//유닛(부서/팀) 삭제
export const deleteUnitAPI = async (unitId, type) => {
  return await axios.delete(url + `/${type}/${unitId}`).then((response) => {
    return response.data;
  });
};

export const updateUnitAPI = async (unitId, unitName) => {
  const unit = {
    unitName: unitName,
  };
  return await axios.put(url + `/${unitId}`, unit).then((response) => {
    console.log(response.data);
    return response.data;
  });
};
