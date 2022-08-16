import axios from 'axios';

const url = 'http://localhost:8080/';
export const employee = () => {
  axios.get();
};

export const updateEmp = (data) => {
  axios.put(`/api/admin/emp/${data.empNum}`, data).then((response) => {});
};
