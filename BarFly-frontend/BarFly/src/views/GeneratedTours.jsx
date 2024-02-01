import { useNavigate } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import { Button, Typography } from '@mui/material';

import RoutingControl from '../utils/RoutingControl';

const GeneratedTours = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    };

    // test markers
    // const markers = [
    //     {
    //         id: 1,
    //         geocode: [48.2184021, 16.3806289],
    //         popUp: "Hammond Bar"
    //     },
    //     {
    //         id: 2,
    //         geocode: [48.2116623, 16.3737121],
    //         popUp: "Josef Bar"
    //     },
    // ];


return (
    <>
        <Typography variant='h2'>Willkomen</Typography>
        {/* decimal coordinates for default center */}
        <MapContainer center={[48.208354, 16.372504]} zoom={13} style={{ height: '80vh', width: '80vw'}}>
            {/* <TileLayer 
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}

            
            <TileLayer
             maxZoom={19}
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
             url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            />

            {/*
            {markers.map(marker => (
                <Marker key={marker.id} position={marker.geocode}>
                    {/* display any html inside popup! */}
                    {/* <Popup><h3>{marker.popUp}</h3></Popup>
                </Marker> 
            ))} 
            */}
            <RoutingControl />


        </MapContainer>
        <Button onClick={handleClick} variant='contained'>
            Home
        </Button>
    </>
);
};

export default GeneratedTours;