import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import NavPublic from './NavPublic';
import Footer from './Footer';


const LayoutPublic = () => {
  return (
    <>
      <NavPublic />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutPublic;