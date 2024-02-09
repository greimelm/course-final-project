
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
  Button,
  Tooltip,
  MenuItem,
  Divider,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/BarFlyLogopurple.png';

import { Menu as MenuIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

import useStore from '../../stores/useStore';


const Nav = () => {
//   userObj, aus state
    const {  logout } = useStore((state) => state);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);

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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={Logo}
            alt="Lonely hearts logo"
            style={{ height: '50px', marginRight: '80px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={'Member-Bereich von Manu'}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar  />
              </IconButton>
            </Tooltip>
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
                <Typography textAlign="center">My profile</Typography>
              </MenuItem>

              <MenuItem >
                <Typography textAlign="center">My Bars</Typography>
              </MenuItem>

              <MenuItem>
                <Typography textAlign="center">
                  Fav Bars
                </Typography>
              </MenuItem>

              <MenuItem>
                <Typography textAlign="center">
                  Fav Tours
                </Typography>
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={() => {
                  logout();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Abmelden</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;