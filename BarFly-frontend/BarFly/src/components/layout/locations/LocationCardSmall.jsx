import { Button, Avatar, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import useStore from '../../../stores/useStore';

const LocationCardSmall = (props) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/locations/' + props._id);
    };

    return (
        <Box>
            <Avatar alt={props.name} src={props.photo.url} />
            <Button onClick={handleClick} size="small">
                Zum Barprofil
            </Button>
            
        </Box>
    );
};

export default LocationCardSmall;