import axios from 'axios';
const url = 'http://localhost:8080/commute';
// export default function commuteAPI() {
//   axios.get(url).then((response) => {
//     console.log(response);
//   });
// }

export const commuteAPI = () => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${document.cookie.substring(6)}`,
    },
    url: url,
  };
  axios(options).then((data) => {
    console.log(data);
  });
};

export const commuteGet = (setData) => {
  axios
    .get(`http://localhost:8080/api/admin/commute`, {
      headers: {
        // Authorization: `Bearer ${document.cookie.substring(6)}`,
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzgyMTUyNTB9.Wr1zSNM461xnCE7nNZDY332zlYAQyZYYMz28yl-ZZM5uibq7xJsROrO2Nyj0OFXMc-CpcbGjC7POHcOs4xLNLg`,
      },
    })
    .then((response) => {
      setData(response.data);
    });
};
