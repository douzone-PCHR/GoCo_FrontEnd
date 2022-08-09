import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Main from './page/Main';
import Search from './page/Search';
import Signup from './page/Signup';
import NotFound from './page/NotFound';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {' '}
        {/* 헤더와 푸터를 모두에게 뿌려줘야하기때문에 outlet으로 설정 */}
        <Route path="/" element={<Login />} />
        <Route path="/search" index element={<Search />} />
        <Route path="/signup" index element={<Signup />} />
        <Route path="/goco" index element={<Main />} />
        <Route path="*" index element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
