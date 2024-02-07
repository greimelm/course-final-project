import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

const CreateTour = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/selection');
    };

return (
    // kommt von BarProfil und hat eine Bar als erste Station in Tour "dabei"
    // Stadt der Tour ist daher schon festgelegt, Kategorien können noch ausgewählt werden
    // TODO alle Bars anzeigen die auf Kategorien zutreffen?
    <>
        <Typography variant='h2'>Willkomen</Typography>
        <Button onClick={handleClick} variant='contained'>
            Zur Selection
        </Button>
    </>
);
};

export default CreateTour;