import { Link as RouterLink, redirect, useNavigate } from "react-router-dom";

import useStore from "../stores/useStore";
import {
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Link,
  Container
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Footer?

const UserLogin = () => {
  const { userlogin, userObj, error } = useStore((state) => state);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    userlogin(data.get("login"), data.get("password"));

    if (userObj) {
      return navigate("/start");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          Login
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="login"
          label="Email-Adresse oder Nickname"
          name="login"
          autoComplete="login"
          autoFocus
          defaultValue=""
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          defaultValue=""
        />

        {error && (
          <Typography variant="h6" sx={{ color: "darkred" }}>
            {error.message}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Anmelden
        </Button>

        <Link component={RouterLink} to="/user-signup" variant="body2">
          Noch keine Zugangsdaten? Jetzt registrieren
        </Link>
      </Box>
    </Container>
  );
};

export default UserLogin;
