import { useNavigate } from 'react-router-dom';
import { Paper, Button } from '@mui/material';

import LocationCardSmall from './locations/LocationCardSmall';

const TourCard = (props) => {
    
    const navigate = useNavigate();

    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', m: '1rem', p: '1rem'}}>
            {props.props.map((location, index) => (
                <LocationCardSmall
                key={index}
                name={location.name}
                openingHours={location.openingHours}
                address={location.address}
                photo={location.photo}
                />
            ))}
            <Button
                variant='contained'
                onClick={() => navigate('/tours')} // entsprechende tour
                sx={{ m: '0.5rem'}}
                >view tour</Button>
        </Paper>
    );
};

export default TourCard;