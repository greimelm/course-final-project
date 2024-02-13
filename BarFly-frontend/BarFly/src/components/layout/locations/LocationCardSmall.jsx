import { Typography, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import useStore from '../../../stores/useStore';

const LocationCardSmall = (props) => {

    const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate('/locations/' + props._id);
    // };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
        <img
            src={props.photo}
            alt={props.name} //TODO maybe change to literal string
            style={{ height: '5vh', cursor: 'pointer' }}
          //  onClick={() => navigate('/location/{props.id}')} navigate to Bar Profile
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