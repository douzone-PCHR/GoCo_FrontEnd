import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Footer from './component/Footer';
import Header from './component/Header';
import { Admin } from './page/admin/Admin';
import Login from './page/auth/Login';
import Signup from './page/auth/Signup';
import FindId from './page/auth/FindId';
import ShowId from './page/auth/ShowId';
import FindPwd from './page/auth/FindPwd';
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
import Main from './page/Main';
import HeaderFooter from './HeaderFooter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderFooter />}>
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

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/showid" element={<ShowId />} />
        <Route path="/findpwd" element={<FindPwd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
