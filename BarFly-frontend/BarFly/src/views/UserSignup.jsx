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

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import useStore from "../stores/useStore";

import useForm from "../hooks/useForm";
import ImageUploader from "../components/common/ImageUploader";

//
// ccheck all comments
//

const UserSignup = () => {
  // getting state from store
  const { usersignup, newUser, error } = useStore((state) => state);

  const [warning, setWarning] = useState();

  const { formState, handleChange } = useForm({
    // default form bzw beispiel
    firstName: "",
    lastName: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    email: "",
    street: "",
    zip: "",
    city: "",
    photo: null,
    birthDay: "",
    birthMonth: "",
    birthYear: "",
  });

  const navigate = useNavigate();

  // newUser equals success in this view

  const clearForm = () => {
    const clearedFormState = Object.fromEntries(
      Object.keys(formState).map((key) => [key, ""])
    );
    console.log(clearedFormState);
    handleChange({ target: { name: "", value: clearedFormState } });
  };

  useEffect(() => {
    console.log("newUser wurde geändert", newUser);
    if (newUser) {
      clearForm;
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

    console.log(formState.photo);
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
          my: "8rem",
          mx: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>

        <Typography variant="h4">Account erstellen</Typography>

        {newUser && (
          <>
          <Alert severity="success" sx={{ minWidth: "100%" }}>
            {`Gratulation, ${newUser.nickname} wurde erfolgreich registriert!`}
          </Alert>
          <Alert severity="success" sx={{ minWidth: "100%" }}>
            {`Aktiviere Deinen Account über die Email, die wir Dir geschickt haben!`}
          </Alert>
          </>
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
        </Grid>
        <Grid sx={{ m: "2rem" }}>
          <ImageUploader handleChange={handleChange} photo={formState.photo} />
        </Grid>

        {error && (
          <Alert severity="error" sx={{ minWidth: "100%" }}>
            {error.message}
          </Alert>
        )}

        <Button onClick={handleSignup} variant="contained" sx={{ my: "2rem" }}>
          Jetzt registrieren
        </Button>

        <Link
          component={RouterLink}
          to="/user-login"
          variant="body2"
          sx={{ mb: "2rem" }}
        >
          Sie haben bereits ein Konto? Hier geht es zum Login
        </Link>
      </Box>
    </>
  );
};

export default UserSignup;
