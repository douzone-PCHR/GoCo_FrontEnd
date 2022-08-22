import axios from 'axios';

const urlNoticeBoard = 'http://localhost:8080/api/user/board/notice';
export const NoticeBoardAPI = async (setData, setShowData) => {
  await axios
    .get(urlNoticeBoard)
    .then((response) => {
      setData(response.data);
      setShowData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const urlFreeBoard = 'http://localhost:8080/api/user/board';
export const FreeBoardAPI = async (setData, setShowData) => {
  await axios
    .get(urlFreeBoard)
    .then((response) => {
      setData(response.data);
      setShowData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
