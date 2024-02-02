import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

const Start = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/selection');
    };

return (
    <>
        <Typography variant='h2'>Willkommen</Typography>
        <Button onClick={handleClick} variant='contained'>
            Zur Selection
        </Button>
    </>
);
};

export default Start;