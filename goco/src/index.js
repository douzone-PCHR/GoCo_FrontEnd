import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './page/auth/Login';
import Search from './page/Search';
import Signup from './page/auth/Signup';
import FindId from './page/auth/FindId';
import ShowId from './page/auth/ShowId';
import FindPwd from './page/auth/FindPwd';
import Main from './page/Main';
import NotFound from './page/NotFound';
import Approve from './page/employee/Approve/Approve';
import ManagerApprove from './page/manager/Approve/ManagerApprove';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* 헤더와 푸터를 모두에게 뿌려줘야하기때문에 outlet으로 설정 */}
        {/* 로그인 이후에 대한 컴포넌트는 조건을 따져서 뿌려지던지 아니던지 해야함. */}
        <Route path="/" element={<Login />} />
        <Route path="/search" index element={<Search />} />
        <Route path="/signup" index element={<Signup />} />
        <Route path="/FindId" index element={<FindId />} />
        <Route path="/ShowId" index element={<ShowId />} />
        <Route path="/FindPwd" index element={<FindPwd />} />
        <Route path="/goco" index element={<Main />} />
        <Route path="*" index element={<NotFound />} />
        <Route path="/approve" element={<Approve />} />
        <Route path="/approveteam" element={<ManagerApprove />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
