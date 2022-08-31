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
  //팀
  parentUnitId
    ? (unit = {
        unitName: unitName,
        parentUnit: {
          unitId: parentUnitId,
        },
        managerNum: mgrNum, //매니저
        employeeList: empTeamMembers, // 리스트형태
      })
    : //부서
      (unit = { unitName: unitName });
  // 일단 저장
  return await axios.post(`/api/admin/unit`, unit).then((response) => {
    setEmpTeamMembers && setEmpTeamMembers({ userRoles: [] });
    return response.data;
  });
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

// import axios from 'axios';

// const url = 'http://localhost:8080/api/admin/unit';
// export const getUnitsAPI = (setUnit) => {
//   axios.get(url).then((response) => {
//     setUnit(response.data);
//   });
// };

// //팀 추가 시 emp에도 팀장의 정보가 입력돼야함.
// export const insertUnitAPI = async (
//   unitName,
//   parentUnitId,
//   mgrNum,
//   empTeamMembers,
//   setEmpTeamMembers
// ) => {
//   let unit = {};
//   // 팀 일 경우
//   parentUnitId
//     ? (unit = {
//         unitName: unitName,
//         parentUnit: {
//           unitId: parentUnitId,
//         },
//         managerNum: mgrNum, //매니저
//         employeeList: empTeamMembers, // 리스트형태
//       })
//     : (unit = { unitName: unitName });
//   axios.put(``)
// };

// //유닛(부서/팀) 삭제
// export const deleteUnitAPI = async (unitId, type) => {
//   return await axios.delete(url + `/${type}/${unitId}`).then((response) => {
//     return response.data;
//   });
// };

// export const updateUnitAPI = async (unitId, unitName) => {
//   const unit = {
//     unitName: unitName,
//   };
//   return await axios.put(url + `/${unitId}`, unit).then((response) => {
//     console.log(response.data);
//     return response.data;
//   });
// };
