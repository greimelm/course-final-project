import { useNavigate } from 'react-router-dom';

import { Button, Typography, Paper, Box, Container } from '@mui/material';

import Logo from '../assets/BarFlyLogopurple.png';

const BarProfile = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/selection');
    };

return (
    // Zeigt Name, Adresse, Öffnungszeiten, Bild, Beschreibung (detailedDescription)
    // Button um zu Favoriten hinzuzufügen (muss account haben)
    // Button um Tour damit zu kreieren => Weiterleitung zu createTour mit 1. Station-Übergabe
    <Container>
       <Paper elevation={3} sx={{display:'flex', flexDirection:'row', m:'3rem', p:'2rem'}}>
        <img 
        src={Logo}
        alt="BarFly logo"
        style={{ height: '12vh', cursor: 'pointer' }}
        />
        <Box sx={{display:'flex', flexDirection:'column', m:'3rem', p:'2rem'}}>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent: 'space-evenly', m:'3rem', p:'2rem'}}>
            <Typography variant='h3'>Bar name</Typography>
            <Typography variant='body1'>address</Typography>
            <Typography variant='body1'>opening hours</Typography>
            </Box>
            <Typography variant='body1'>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </Typography>
                <Box sx={{display:'flex', flexDirection:'row', justifyContent: 'space-evenly', m:'3rem', p:'2rem'}}>
                <Button variant='contained'>contact</Button>
                <Button variant='contained'>menu</Button>
                <Button variant='contained'>book a table</Button>
                </Box>
        </Box>
       </Paper>
    </Container>
);
};

export default BarProfile;