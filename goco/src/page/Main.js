import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { commuteAPI } from '../api/commuteAPI';
import Footer from '../component/Footer';
import Header from '../component/Header';

export default function Main({ replace }) {
  commuteAPI();
  console.log(replace);
  return <div>Main</div>;
}
