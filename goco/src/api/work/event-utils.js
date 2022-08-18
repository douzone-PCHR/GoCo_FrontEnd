import axios from "axios";

let wordData = [];
export const workGetData = async (setGetWorkList, getEmpNum) => {
  const response = await axios.get(
    `http://localhost:8080/api/work?empNum=${getEmpNum}`,
    {
      headers: {
        "access-control-allow-origin": "true",
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJreWoxMTExMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NjA0NjM3MDF9.AjO8QQfvdXlmsJhUNGeC2snOY-on8UKepqZpoG2lCAmlYLGwl0QuAHQZf4cbHQxyypFTmkwuEg2ypU--a6YxHA`,
      },
    }
  );
  let filterData = response.data.filter(
    (work) => work.workStartDate !== null && work.workEndDate !== null
  );

  filterData.forEach((element) => {
    wordData.push({
      id: element.workId,
      title: element.workContent,
      start: element.workStartDate,
    });
  });

  setGetWorkList(wordData);
};

export let INITIAL_EVENTS = [
  {
    id: 1111,
    title: "All-day event",
    start: "20220815",
  },
  {
    id: 22222,
    title: "Timed event",
    start: "20220815",
  },
];

// let data = workGetData(emp);
// data.then((work) => {
//   work.map((works) => {
//     INITIAL_EVENTS = [...INITIAL_EVENTS, works];
//   });
// });
