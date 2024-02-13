import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';


const LayoutPublic = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default LayoutPublic;