import { useState, useEffect } from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Link,
  Alert,
} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import useStore from "../stores/useStore";

import useForm from "../hooks/useForm";
import ImageUploader from "../components/common/ImageUploader";

// footer component
// ImageUploader?

// 
// ccheck all comments
// 

const UserSignup = () => {
  // getting state from store
  const { usersignup, newUser, error } = useStore((state) => state);

  const [warning, setWarning] = useState();

  const { formState, handleChange } = useForm({
    // default form bzw beispiel
    firstName: "Maxima",
    lastName: "Musterfrau",
    nickname: "beispiel123",
    password: "",
    passwordConfirm: "",
    email: "maxima@irgendwas.at",
    street: "Neubaugasse 12",
    zip: "1070",
    city: "Wien",
    photo: null,
    birthDay: 1,
    birthMonth: 1,
    birthYear: 1964
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("newUser wurde geändert", newUser);
    if (newUser) {
      navigate("/user-login");
    }
  }, [newUser]);

  const handleSignup = () => {
    // check for password confirmation (are passwords the same?)
    if (formState.password !== formState.passwordConfirm) {
      setTimeout(() => {
        setWarning(null);
      }, 5000);
      return setWarning("Kennwörter stimmen leider nicht überein");
    }

    const submitForm = new FormData();

    Object.entries(formState).forEach(([key, value]) => {
      submitForm.append(key, value);
    });

    console.log(submitForm);
    // funktion aus store
    usersignup(submitForm);
  };

  return (
    <>
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Meine Bar registrieren
        </Typography>
        <Typography component="h1" variant="h5">
          Registrieren
        </Typography>

        {newUser && (
          <Alert severity="success" sx={{ minWidth: "100%" }}>
            {`Gratulation, ${newUser.nickname} wurde erfolgreich angelegt!`}
          </Alert>
        )}

        {warning && (
          <Alert severity="warning" sx={{ minWidth: "100%" }}>
            {warning}
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Nickname"
              name="nickname"
              autoFocus
              value={formState.nickname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Email-Adresse"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              required
              type="password"
              label="Kennwort"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              required
              type="password"
              label="Kennwort-Bestätigung"
              name="passwordConfirm"
              value={formState.passwordConfirm}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Vorname"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Nachname"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              fullWidth
              required
              label="Tag"
              name="birthDay"
              value={formState.birthDay}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              fullWidth
              required
              label="Monat"
              name="birthMonth"
              value={formState.birthMonth}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              required
              label="Jahr"
              name="birthYear"
              value={formState.birthYear}
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

          <Grid item xs={12}>
            <ImageUploader
              handleChange={handleChange}
              photo={formState.photo}
            />
          </Grid>
        </Grid>

        {error && (
          <Typography variant="h6" sx={{ color: "darkred" }}>
            {error.message}
          </Typography>
        )}

        <Button
          onClick={handleSignup}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Jetzt registrieren
        </Button>

        <Link component={RouterLink} to="/user-login" variant="body2">
          Sie haben bereits ein Konto? Hier geht es zum Login
        </Link>

      </Box>
      {/* Footer */}
    </>
  );
};

export default UserSignup;