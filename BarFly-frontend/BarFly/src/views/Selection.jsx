import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

const Selection = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/generated-tour');
    };

return (
    <>
        <Typography variant='h2'>Willkomen</Typography>
        <Button onClick={handleClick} variant='contained'>
            Tour berechnen
        </Button>
    </>
);
};

export default Selection;