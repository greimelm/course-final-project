import { useNavigate } from 'react-router-dom';
import { Paper, Button } from '@mui/material';

import LocationCardSmall from './locations/LocationCardSmall';

const TourCard = (props) => {

    
    console.log(props.props);
    

    // const bars = [
    //     { name: "Hannelore Bar", openingHours: "Mo-So 18pm-3am", address: "Taborstraße 33, 1010 Wien"},
    //     { name: "Hammond Bar", openingHours: "Mo-So 18pm-3am", address: "Taborstraße 33, 1010 Wien"},
    //     { name: "Hammond Bar", openingHours: "Mo-So 18pm-3am", address: "Taborstraße 33, 1010 Wien"}
    // ];

    const navigate = useNavigate();

    return (
        <Paper sx={{ display: 'flex', flexDirection: 'row', m: '1rem', p: '1rem'}}>
            {props.props.map((location, index) => (
                <LocationCardSmall key={index} name={location.name} openingHours={location.openingHours} address={location.address}  />
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