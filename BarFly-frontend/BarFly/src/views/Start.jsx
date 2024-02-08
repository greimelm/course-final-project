import { useNavigate } from 'react-router-dom';

import { Button, Typography, InputBase } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { styled, alpha } from '@mui/material/styles';

const Start = () => {

    const navigate = useNavigate();


    // 
    // google maps place search MUI instead
    // 
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));


    const handleClick = () => {
        navigate('/selection');
    };

return (
    <>
    {/* Header (Logo links, Buttons Registrierung & Login rechts)
        Typography: Willkommen! o.Ä.
        Auswahl/suche nach Stadt
        Footer (anders für Startseite mit Beispielbildern)
    */}
        <Typography variant='h2'>Willkommen</Typography>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        <Button onClick={handleClick} variant='contained'>
            Zur Selection
        </Button>
    </>
);
};

export default Start;