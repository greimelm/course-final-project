import {
  AppBar,
  Button,
  Container,
  Box
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import useStore from '../../stores/useStore';

import Logo from '../../assets/BarFlyLogolight.png';


const NavPublic = () => {
  const { clearerror } = useStore((state) => state);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/start');
    clearerror();
  };

  return (
    <>
    <Container position="absolute" >
    <AppBar sx={{ display:'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
    <img
            src={Logo}
            alt="BarFly logo"
            style={{ height: '12vh', cursor: 'pointer', marginLeft:'3rem'}}
            onClick={handleClick} //or home if logged in
          />
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <Button variant='outlined' sx={{ color:'#EACDC2', mr:'3rem'}}onClick={() => navigate('/user-signup')}>Sign up</Button>
        <Button variant='outlined' sx={{ color:'#EACDC2', mr:'3rem'}}onClick={() => navigate('/user-login')}>Log in</Button>
      </Box>
    </AppBar>
    </Container>
    </>
  );
};

export default NavPublic;