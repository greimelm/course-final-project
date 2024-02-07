import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

const TourProfile = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/selection');
    };

return (
    // kommt von u. A. GeneratedTour
    // Listet Bar Profile auf
    <>
        <Typography variant='h2'>Willkomen</Typography>
        <Button onClick={handleClick} variant='contained'>
            Zur Selection
        </Button>
    </>
);
};

export default TourProfile;