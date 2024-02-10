import { Navigate } from 'react-router-dom';

// TODO relative paths
import Start from './views/Start';
import UserSignup from './views/UserSignup';
import UserLogin from './views/UserLogin';
import Selection from './views/Selection';
import CreateTour from './views/CreateTour';
import GeneratedTours from './views/GeneratedTours';
import Home from './views/Home';
import FavBars from './views/FavBars';
import FavTours from './views/FavTours';
import UserProfile from './views/UserProfile';
import BarProfile from './views/BarProfile';


// 
// TODO redirect bei routen, die es nicht gibt
// 

const routesPublic = [
    // {
        // layout fehlt
        // path: '',
        // children: [
            // path: '/' does not have an element? obwohl Start
            {
                path: 'start',
                element: <Start />
            },
            {
                path: 'user-signup',
                element: <UserSignup />
            },
            {
                path: 'user-login',
                element: <UserLogin />
            },
            {
                path: 'selection',
                element: <Selection />
            },
            {
                path: 'generated-tour',
                element: <GeneratedTours />
            },
            {
                path: '/',
                element: <Navigate to='/start' />
            }
        // ]
    // }
];

const routesPrivate = [
    {
        path: '',
        children: [
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
                path: '/fav-bars',
                element: <FavBars />
            },
            {
                path: '/fav-tours',
                element: <FavTours />
            },
            // {
            //     path: '*',
            //     element: <Navigate to='/' />
            // }
        ]
    }
];

export { routesPublic, routesPrivate };