import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './component/Footer';
import Header from './component/Header';
import Main from './page/Main';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Main /> */}
      <Footer />
    </>
  );
}

export default App;
