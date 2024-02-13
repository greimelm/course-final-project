
// id = logged in user id
// ownedBars = await Location.find({owner: id})
// falls nicht leer -> button "My Bars" in Nav anzeigen


import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Divider,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/BarFlyLogolight.png';

import { ExpandMore } from '@mui/icons-material';

import useStore from '../../stores/useStore';


const Nav = () => {
//   userObj, aus state
  const { userObj, logout } = useStore((state) => state);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <>
    <Container position="absolute" >
    <AppBar >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

        <img
            src={Logo}
            alt="BarFly logo"
            style={{ height: '12vh', cursor: 'pointer' }}
            onClick={() => navigate('/start')} //or home if logged in
          />
          
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Tooltip title={'Member-Bereich von Manu'}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ExpandMore sx={{color: '#EACDC2', mr: '1vw' }}/>
                {/* <Avatar alt={userObj.firstName + ' ' + userObj.lastName} src={userObj.photo.url} /> */}
              </IconButton>
            </Tooltip>
            <Typography variant='subtitle1'>
                  nickname
                </Typography>
            <Avatar sx={{ bgcolor: 'secondary.main', m: '1rem' }} />
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  navigate('/user-profile');
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Mein Profil</Typography>
              </MenuItem>

              {/* TODO optionales Feld */}

              {/* <MenuItem
                onClick={() => {
                  navigate('/fav-bars');
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Meine Bars</Typography>
              </MenuItem> */}

              <MenuItem
                onClick={() => {
                  navigate('/fav-bars');
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Meine Lieblingsbars</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  navigate('/fav-tours');
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Meine Bartours</Typography>
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={() => {
                  logout();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Container>
    </>
  );
};

export default Nav;