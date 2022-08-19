import axios from 'axios';

const url = 'http://localhost:8080/api/admin/unit';
export const getUnitAPI = (setUnit) => {
  axios.get(url).then((response) => {
    setUnit(response.data);
  });
};

//팀 추가 시 emp에도 팀장의 정보가 입력돼야함.
export const insertUnitAPI = (unitName, parentUnitId, mgrNum, empTeamMembers, setTeamEmp) => {
  let unit = {};
  //팀 일 경우
  if (parentUnitId) {
    unit = {
      unitName: unitName,
      parentUnit: {
        unitId: parentUnitId,
      },
      mgrNum: mgrNum, //매니저
      empNum: empTeamMembers, // 리스트형태
    };
  } else {
    unit.unitName = unitName;
  }
  if (!mgrNum == !parentUnitId) {
    axios.post(url, unit).then();
  } else {
    console.log('잘못된 입력');
  }

  setTeamEmp && setTeamEmp([]);
};

//유닛(부서/팀) 삭제
export const deleteUnitAPI = (unitId) => {
  axios.delete(url + `/${unitId}`);
};
