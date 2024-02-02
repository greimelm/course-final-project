import './App.css'
import { useEffect } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import useStore from '../src/stores/useStore.js';

import { routesPublic, routesPrivate } from '../src/routes';

const App = () => {
  const { userObj, checkToken } = useStore((state) => state);

  useEffect(() => {
    checkToken();
  }, []);

  console.log(userObj);
  // const router = createBrowserRouter(userObj ? routesPrivate : routesPublic);
  const router = createBrowserRouter(routesPublic);

  return <RouterProvider router={router} />;
};

export default App;
