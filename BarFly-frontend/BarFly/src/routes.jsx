import { Navigate } from 'react-router-dom';

// relative paths
import Start from './views/Start';
import Selection from './views/Selection';
import Home from './views/Home';
import UserProfile from './views/UserProfile';
import GeneratedTour from './views/GeneratedTours';
import BarProfile from './views/BarProfile';

const routes = [
    {
        path: '',
        children: [
            {
                path: '/',
                element: <Start />
            },
            {
                path: '/selection',
                element: <Selection />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/user',
                element: <UserProfile />
            },
            {
                path: '/bar',
                element: <BarProfile />
            },
            // {
            //     path: '/tour',
            //     element: <TourProfile />
            // },
            {
                path: '/create-tour',
                element: <CreateTour />
            },
            {
                path: '/generated-tour',
                element: <GeneratedTour />
            },
            {
                path: '/fav-bars',
                element: <FavBars />
            },
            {
                path: '/fav-tours',
                element: <FavTours />
            },
            {
                path: '*',
                element: <Navigate to='/' />
            }
        ]
    }
];

export { routes };