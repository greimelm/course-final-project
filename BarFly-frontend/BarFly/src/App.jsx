import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from '../src/routes';

const App = () => {
  // user token in appstore checken

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
