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


const Header = () => {
  const { userObj, logout } = useStore((state) => state);

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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/');
                }}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/outbox');
                }}
              >
                <Typography textAlign="center">Postausgang</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/hearts');
                }}
              >
                <Typography textAlign="center">Herzen</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <FavoriteIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Italiana',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate('/');
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            {/* 
            // 
            // TODO respektive Navigation zu favourite bars und tours
             */}
            {/* <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate('/outbox');
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Postausgang
            </Button>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate('/hearts');
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Herzen
            </Button> */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={'Member-Bereich von ' + user.firstName + ' ' + user.lastName}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.firstName + ' ' + user.lastName} src={user.photo.url} />
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
                  navigate('/edit-profile');
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Profildaten ändern</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  navigate('/change-password');
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Kennwort ändern</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  togglePaused();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">
                  {user.paused ? 'Fortsetzen' : 'Pausieren'}
                </Typography>
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={() => {
                  setOpen(true);
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center" sx={{ color: 'darkred' }}>
                  Member löschen
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

export default Header;
