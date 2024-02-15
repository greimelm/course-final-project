import { Typography, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import useStore from '../../../stores/useStore';



const LocationCardSmall = (props) => {


    // TO BE developed and implemented
    const navigate = useNavigate();

   

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
        <img
            src={props.photo}
            alt={props.name} 
            style={{ height: '5vh', cursor: 'pointer' }}
         
          />
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h5'>{props.name}</Typography>
                <Typography variant='body1'>{props.openingHours}</Typography>
                <Typography variant='body1'>{props.address}</Typography>
            </Box>
        </Box>
    );
};

export default LocationCardSmall;