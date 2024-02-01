import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

const FavTours = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/selection');
    };

return (
    <>
        <Typography variant='h2'>Willkomen</Typography>
        <Button onClick={handleClick} variant='contained'>
            Zur Selection
        </Button>
    </>
);
};

export default FavTours;