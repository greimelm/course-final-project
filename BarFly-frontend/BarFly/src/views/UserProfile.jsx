import { useState } from 'react';

import { useNavigate } from "react-router-dom";

import {
  Container,
  Box,
  Button,
  Typography,
  Paper
} from "@mui/material";

import PictureSlider from "../components/layout/PictureSlider";
import DeleteUserDialog from '../components/layout/DeleteUserDialog';

import useStore from '../stores/useStore';

const UserProfile = () => {
  const { userObj, deleteUser } = useStore((state) => state);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);


  const [open, setOpen] = useState(false);

  const handleDeleteUser = () => {
    deleteUser();
    setOpen(false);
  };


  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h2" sx={{ mb: "3rem" }}>
        Hallo {userObj.nickname}
      </Typography>

      <DeleteUserDialog
          open={open}
          handleClose={() => setOpen(false)}
          handleDeleteUser={handleDeleteUser}
        />

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            p: "2rem",
            m: "2rem",
          }}
        >
          <Button variant="contained" onClick={() => navigate('/fav-bars')}>
            see all fav bars
          </Button>
          <PictureSlider />
          <Button variant="contained" onClick={() => navigate('/fav-tours')}>
            see all fav tours
          </Button>
          <PictureSlider />
        </Paper>
        <Paper sx={{ display: "flex", flexDirection: "column", m: "2rem" }}>
          <Button variant="contained" sx={{ m: "2rem" }} >
            edit profile
          </Button>
          <Button variant="contained" sx={{ m: "2rem" }} >
            register my bar
          </Button>
          <Button variant="contained" color="error" sx={{ m: "2rem" }} onClick={() => setOpen(true)}>
            delete profile
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserProfile;
