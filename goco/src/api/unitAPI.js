import axios from 'axios';

const url = 'http://localhost:8080/api/admin/unit';
export const getUnit = (setUnit) => {
  axios.get(url).then((response) => {
    setUnit(response.data);
  });
};
