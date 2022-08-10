import axios from 'axios';

// const url = 'http://localhost:8080/auth';
export default function loginAPI(id, password) {
  axios
    .post('/api/login', {
      empId: id,
      password: password,
    })
    .then((response) => {
      // document.cookie = `Token=${response.data.accessToken}; expires=Thu, 18 Dec 2023 12:00:00 UTC`;
    });
}
