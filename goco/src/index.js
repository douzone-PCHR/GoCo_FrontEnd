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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/goco" element={<Main />} />
      <Route path="" element={ }/>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
