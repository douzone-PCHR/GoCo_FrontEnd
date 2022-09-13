import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Admin } from './page/admin/Admin';
import App from './App';
import Login from './page/auth/Login';
import Signup from './page/auth/Signup';
import FindId from './page/auth/FindId';
import ShowId from './page/auth/ShowId';
import FindPwd from './page/auth/FindPwd';
import Main from './page/Main';
import UserUpdate from './page/employee/UserUpdate';
import NotFound from './page/NotFound';
import Approve from './page/employee/Approve/Approve';
import ManagerApprove from './page/manager/Approve/ManagerApprove';
import { Management } from './page/admin/Management';
import ManagerMain from './page/manager/ManagerMain';
import Myteamcurrentstatus from './page/manager/Myteamcurrentstatus';
import Board from './page/board/Board';
import BoardInsert from './page/board/BoardInsert';
import BoardSelect from './page/board/BoardSelect';
import BoardUpdate from './page/board/BoardUpdate';
import PrivateRoute from './util/PrivateRoute';
import AuthorityRoute from './util/AuthorityRoute';
import AdminRoute from './util/AdminRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
const access = document.cookie;
const authority = localStorage.getItem('authority');
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" index element={<Signup />} />
        <Route path="/findid" index element={<FindId />} />
        <Route path="/showid" index element={<ShowId />} />
        <Route path="/findpwd" index element={<FindPwd />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/management" element={<Management />} />
        <Route path="/manager" index element={<ManagerMain />} />
        <Route path="/approveteam" element={<ManagerApprove />} />
        <Route path="/userupdate" index element={<UserUpdate />} />
        <Route path="/goco" index element={<Main />} />
        <Route path="/currentStatus" index element={<Myteamcurrentstatus />} />
        <Route path="*" index element={<NotFound />} />
        <Route path="/approve" element={<Approve />} />
        <Route path="/board" element={<Board />} />
        <Route path="/boardinsert" element={<BoardInsert />} />
        <Route path="/boardselect/:boardId" element={<BoardSelect />} />
        <Route path="/BoardUpdate/:boardId" element={<BoardUpdate />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
