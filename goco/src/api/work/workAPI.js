import axios from "axios";
import { useState } from "react";

// export const getWorkListData = async () => {
//   await axios
//     .get("http://localhost:8080/work", {
//       headers: {
//         "access-control-allow-origin": "true",
//         Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NjAzMjUyMDV9.cxefj3OA80c8bUNJuR90o0LSilPrssbIqgUGeue3s_QsavERIwjoZex_KQ22njzkSBwAeM2aZeP6cOfYJ8wwlw`,
//       },
//     })
//     .then((response) => {
//       console.log(response.data);
//     });
// };

export const getEmployeeList = async (setEmp) => {
  await axios
    .get("http://localhost:8080/api/work/emplist", {
      headers: {
        "access-control-allow-origin": "true",
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NjA2NzY4NTN9.t5bsh_dxyELOx2rmLehTzsZAWlZOPY0Qs9MuN52RofFN7s-q1ch0K_8yNL14aNTVR85w7rZADyIGMldONAB4nQ`,
      },
    })
    .then((response) => {
      setEmp(response.data);
    });
};

export const loginDefaultValue = async (setLoginEmp) => {
  await axios
    .get("http://localhost:8080/api/user/me", {
      headers: {
        "access-control-allow-origin": "true",
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NjA2NzY4NTN9.t5bsh_dxyELOx2rmLehTzsZAWlZOPY0Qs9MuN52RofFN7s-q1ch0K_8yNL14aNTVR85w7rZADyIGMldONAB4nQ`,
      },
    })
    .then((response) => {
      setLoginEmp(response.data);
    });
};
