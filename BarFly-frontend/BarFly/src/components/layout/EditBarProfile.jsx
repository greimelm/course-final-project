import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Alert
} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import useStore from "../../stores/useStore";

import useForm from "../../hooks/useForm";
import ImageUploader from "../common/ImageUploader";


// 
// ccheck all comments
// 

const EditBarProfile = () => {
  // getting state from store
  const { editProfile, userObj, error, success } = useStore((state) => state);

  const [warning, setWarning] = useState();

  const { formState, handleChange } = useForm({
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    nickname: userObj.nickname,
    password: "",
    passwordConfirm: "",
    email: userObj.email,
    street: userObj.street,
    zip: userObj.zip,
    city: userObj.city,
    photo: null,
    birthDay: userObj.birthDay,
    birthMonth: userObj.birthMonth,
    birthYear: userObj.birthYear
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("user wurde geändert", userObj);
    if (userObj) {
      navigate("/user-login");
    }
  }, [userObj]);

  const handleEdit = () => {
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
    editProfile(submitForm);
  };

  return (
    <>
      <Box
        sx={{
          m: '8rem',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>

        <Typography variant='h4'>
          Update account
        </Typography>

        {success && (
          <Alert severity="success" sx={{ minWidth: "100%" }}>
            {`Gratulation, ${userObj.nickname} wurde erfolgreich angelegt!`}
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
          <Typography variant="h6" sx={{ color: "error" }}>
            {error.message}
          </Typography>
        )}

        <Button
          onClick={handleEdit}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          update profile
        </Button>

      </Box>
     
    </>
  );
};

export default EditBarProfile;