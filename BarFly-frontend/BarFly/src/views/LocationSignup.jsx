import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Alert,
  Fab,
} from "@mui/material";

import LocalBarIcon from "@mui/icons-material/LocalBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStore from "../stores/useStore";

import useForm from "../hooks/useForm";
import ImageUploader from "../components/common/ImageUploader";

import SelectionGrid from "../components/layout/SelectionGrid";

//
// ccheck all comments
//

const LocationSignup = () => {
  // getting state from store
  const { locationsignup, newLocation, userObj, categoryArr, error } = useStore((state) => state);

  const { formState, handleChange } = useForm({
    name: "",
    email: "",
    street: "",
    zip: "",
    city: "",
    photo: null,
    openingHours: "",
    menu:"",
    contact:"",
    reservationLink:"",
    smallDescription:"",
    detailedDescription:""
  });

  const navigate = useNavigate();

  const clearForm = () => {
    const clearedFormState = Object.fromEntries(
      Object.keys(formState).map((key) => [key, ""])
    );
    console.log(clearedFormState);
    handleChange({ target: { name: "", value: clearedFormState } });
  };

  useEffect(() => {
    console.log("newLocation wurde geändert", newLocation);
    if (newLocation) {
      clearForm;
    }
  }, [newLocation]);

  const handleSignup = () => {

    const submitForm = new FormData();

    Object.entries(formState).forEach(([key, value]) => {
      submitForm.append(key, value);
    });

    submitForm.append("owner", userObj._id);

    console.log(categoryArr);

    const categoryString = categoryArr.join(', ');

    console.log(categoryString);

    submitForm.append('categories', categoryString);
   

    console.log(submitForm);
    
    locationsignup(submitForm);
  };

  return (
    <>
      <Box
        sx={{
          my: "8rem",
          mx: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LocalBarIcon />
        </Avatar>

        <Typography variant="h4">Bar registrieren</Typography>

        {newLocation && (
          <Alert severity="success" sx={{ minWidth: "100%" }}>
            {`Gratulation, ${newLocation.name} wurde erfolgreich angelegt!`}
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Name"
              name="name"
              autoFocus
              value={formState.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Wie können wir Dich per email erreichen?"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Adresse"
              name="street"
              value={formState.street}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Postleitzahl"
              name="zip"
              value={formState.zip}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Ort"
              name="city"
              value={formState.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Optionaler Link zu Deinem Online-Menü"
              name="menu"
              value={formState.menu}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Optionale Kontakdaten für Gäste"
              name="contact"
              value={formState.contact}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Optionaler Link zur Online-Reservierung"
              name="reservationLink"
              value={formState.reservationLink}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              multiline
              required
              label="Beschreibung Deiner Bar in <500 Zeichen"
              name="smallDescription"
              value={formState.smallDescription}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              multiline
              required
              label="Beschreibung Deiner Bar in <10.000 Zeichen"
              name="detailedDescription"
              value={formState.detailedDescription}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Bitte Öffnungszeiten angeben"
              name="openingHours"
              value={formState.openingHours}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid sx={{ m: "2rem"}}>
          <ImageUploader handleChange={handleChange} photo={formState.photo} />
        </Grid>
            <Typography variant='body1' >Bitte gib Kategorien an um deine Bar leichter einordnen und bei Suchen anzeigen zu können.</Typography>
        <SelectionGrid />

        {error && (
          <Alert severity="error" sx={{ minWidth: "100%" }}>
            {error.message}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "row", alignItems:'center' }}>
        <Fab
            color="primary"
            onClick={() => navigate(`/user/${userObj._id}`)}
            sx={{ mr: "4rem" }}
          >
            <ArrowBackIcon />
          </Fab>
          <Button
            onClick={handleSignup}
            variant="contained"
            sx={{ my: "2rem" }}
          >
            Jetzt registrieren
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LocationSignup;
