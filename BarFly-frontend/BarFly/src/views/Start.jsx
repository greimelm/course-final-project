import { useNavigate } from "react-router-dom";

import {
  Button,
  Typography,
  Autocomplete,
  TextField,
  Box,
  Container
} from "@mui/material";

import useStore from "../stores/useStore";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";

const Start = () => {
  const navigate = useNavigate();

  //
  // TODO: write chosen city in zustand
  //

  const handleClick = () => {
    navigate("/selection");
  };

  const cities = [
    { label: "Vienna" },
    { label: "Vilnius" },
    { label: "Villach" },
  ];

  return (
    <>
      {/* Header (Logo links, Buttons Registrierung & Login rechts)
        Typography: Willkommen! o.Ä.
        Auswahl/suche nach Stadt
        Footer (anders für Startseite mit Beispielbildern)
    */}

      <Nav />
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h2" sx={{ mb: '5vh'}}>Willkommen</Typography>
        <Typography variant="h4" sx={{ mb: '3vh'}}>Wähle eine Stadt</Typography>
        <Autocomplete
          sx={{ width: '25vw' }}
          options={cities}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box
              key={option.label}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a city"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
        <Button onClick={handleClick} variant="contained" sx={{flexGrow: 0, m: '2rem'}}>
          Zur Selection
        </Button>
      </Container>

      <Footer />
    </>
  );
};

export default Start;
