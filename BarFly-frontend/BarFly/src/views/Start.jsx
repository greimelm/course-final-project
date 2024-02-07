import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

const Start = () => {

    const navigate = useNavigate();

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
        <Button onClick={handleClick} variant='contained'>
            Zur Selection
        </Button>
    </>
);
};

export default Start;