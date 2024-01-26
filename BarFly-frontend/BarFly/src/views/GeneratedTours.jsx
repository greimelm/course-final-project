import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

const GeneratedTour = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    };

return (
    <>
        <Typography variant='h2'>Willkomen</Typography>
        <Button onClick={handleClick} variant='contained'>
            Home
        </Button>
    </>
);
};

export default GeneratedTour;