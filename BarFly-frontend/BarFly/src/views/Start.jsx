import { useState } from "react";
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


const Start = () => {
  const { city } = useStore((state) => state);
  const [ selectedCity, setSelectedCity] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(event.target.inputProps); //kein zugriff
  };

  const handleClick = () => {
    navigate("/selection");
  };

  // a list of cities from signed up bars (replaced by a sample list for now)
  const cities = [
    { label: "Wien" },
    { label: "Hamburg" },
    { label: "Berlin" },
    { label: "Graz" },
    { label: "Regensburg" }
  ];

  return (
    <>
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
              onChange={handleChange}
            />
          )}
        />
        <Button onClick={handleClick} variant="contained" sx={{flexGrow: 0, m: '2rem'}}>
          Zur Selection
        </Button>
      </Container>

    </>
  );
};

export default Start;
