
// id = logged in user id
// ownedBars = await Location.find({owner: id})
// falls nicht leer -> button "My Bars" in Nav anzeigen


import { useState, useEffect } from 'react';
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
  Popover,
  Button
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/BarFlyLogolight.png';

import { ExpandMore } from '@mui/icons-material';

import useStore from '../../stores/useStore';


const Nav = () => {
//   userObj, aus state
  const { userObj, logout } = useStore((state) => state);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



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
            onClick={() => navigate('/start')}
          />
          
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Tooltip title={`User-Bereich von ${userObj.nickname}`}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ExpandMore sx={{color: '#EACDC2', mr: '1vw' }}/>
              </IconButton>
            </Tooltip>
            <Typography variant='subtitle1'sx={{mr:'1rem'}}>
                  {userObj.nickname}
                </Typography>
              <Avatar alt={userObj.firstName + ' ' + userObj.lastName} src={userObj.photo.url} />
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

              
              {userObj.hasBars.length > 0 &&
              <>
               <MenuItem
                onClick={handleClick}
              >
                <Typography textAlign="center">Meine Bars</Typography>
              </MenuItem>
                <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'right',
                }}
              >
                {userObj.hasBars.map((location, index) => (
                <Button variant='outlined' key={index}  onClick={navigate(`/locations/${location._id}`)}>{location.name}</Button>
                ))}
              </Popover>
              
            </>
              }

              <MenuItem
                onClick={() => {
                  navigate(`/fav-bars/${userObj._id}`);
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Meine Lieblingsbars</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  navigate(`/fav-tours/${userObj._id}`);
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