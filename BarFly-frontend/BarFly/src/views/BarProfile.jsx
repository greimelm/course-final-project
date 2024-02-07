import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

const BarProfile = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/selection');
    };

return (
    // Zeigt Name, Adresse, Öffnungszeiten, Bild, Beschreibung (detailedDescription)
    // Button um zu Favoriten hinzuzufügen (muss account haben)
    // Button um Tour damit zu kreieren => Weiterleitung zu createTour mit 1. Station-Übergabe
    <>
        <Typography variant='h2'>Willkomen</Typography>
        <Button onClick={handleClick} variant='contained'>
            Zur Selection
        </Button>
    </>
);
};

export default BarProfile;