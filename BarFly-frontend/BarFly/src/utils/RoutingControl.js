import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';

const RoutingControl = () => {
    const map = useMap();
    useEffect(() => {
        L.Routing.control({
            waypoints: [
                L.LatLng(48.2184021, 16.3806289),
                L.LatLng(48.2116623, 16.3737121)
            ]
        }).addTo(map);
    }, []);
    // waypoints were already added to the map - no need to render anything
    return null;
};

export default RoutingControl;