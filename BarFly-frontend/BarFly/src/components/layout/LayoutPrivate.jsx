import { Outlet } from 'react-router-dom';

import Nav from '../layout/Nav';
import Footer from '../layout/Footer';

const LayoutPrivate = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutPrivate;