import axios from 'axios';
const instance = axios.create({
  baseURL: '',
  headers: {
    Authrozation: 'Bearer ' + document.cookie,
  },
});
const url = 'http://localhost:8080/commute/1';
// export default function commuteAPI() {
//   axios.get(url).then((response) => {
//     console.log(response);
//   });
// }

export default function commuteAPI() {
  // console.log(url);
  console.log(document.cookie);
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
}
