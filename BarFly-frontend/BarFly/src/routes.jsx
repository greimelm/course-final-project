import { Navigate } from 'react-router-dom';

import LayoutPublic from './components/layout/LayoutPublic';
import LayoutPrivate from './components/layout/LayoutPrivate';

// TODO relative paths
import Start from './views/Start';
import UserSignup from './views/UserSignup';
import UserLogin from './views/UserLogin';
import UserProfile from './views/UserProfile';
import EditUserProfile from './views/EditUserProfile';
import Selection from './views/Selection';
// import CreateTour from './views/CreateTour';
import GeneratedTours from './views/GeneratedTours';
// import Home from './views/Home';
import FavBars from './views/FavBars';
import FavTours from './views/FavTours';
import LocationSignup from './views/LocationSignup';
import BarProfile from './views/BarProfile';


// 
// TODO redirect bei routen, die es nicht gibt
// 

const routesPublic = [
    {
        path: '',
        element: <LayoutPublic />,
        children: [
           
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
            },
            {
                path: '*',
                element: <Navigate to='/start' />
            }
        ]
    }
];

const routesPrivate = [
    {
        path: '',
        element: <LayoutPrivate />,
        children: [
            // {
            //     path: '/home',
            //     element: <Home /> to be continued
            // },
            {
                path: '/user',
                element: <UserProfile />
            },
            {
                path: '/user-edit',
                element: <EditUserProfile />
            },
            {
                path: '/bar',
                element: <BarProfile />
            },
            {
                path: '/bar-signup',
                element: <LocationSignup />
            },
            // {
            //     path: '/create-tour',
            //     element: <CreateTour />  to be continued
            // },
            
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
                element: <Navigate to='/user' />
            }
        ]
    }
];

export { routesPublic, routesPrivate };