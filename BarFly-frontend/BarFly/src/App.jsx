import "./App.css";
import { useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import useStore from "../src/stores/useStore.js";

import { routesPublic, routesPrivate } from "../src/routes";

import theme from "../src/utils/theme.js";
import { ThemeProvider } from "@mui/material";

const App = () => {
  const { userObj, checkToken } = useStore((state) => state);

  useEffect(() => {
    checkToken();
  }, []);

  console.log(userObj);
  

  const router = createBrowserRouter(userObj ? routesPrivate : routesPublic);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
