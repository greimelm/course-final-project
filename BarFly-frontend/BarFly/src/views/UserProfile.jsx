import { useState } from 'react';

import { useNavigate } from "react-router-dom";

import {
  Container,
  Box,
  Button,
  Typography,
  Paper,
  Popover,
} from "@mui/material";

import PictureSlider from "../components/layout/PictureSlider";

import EditUserProfile from '../components/layout/EditUserProfile';
import ChangePassword from '../components/layout/ChangePassword';

const UserProfile = () => {
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const example = {
    firstName: "Manu",
    lastName: "Greimel",
    nickname: "manu123",
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h2" sx={{ mb: "3rem" }}>
        Hallo {example.nickname}
      </Typography>
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
          <Button variant="contained" onClick={() => navigate("/fav-bars")}>
            see all fav bars
          </Button>
          <PictureSlider />
          <Button variant="contained" onClick={() => navigate("/fav-tours")}>
            see all fav tours
          </Button>
          <PictureSlider />
        </Paper>
        <Paper sx={{ display: "flex", flexDirection: "column", m: "2rem" }}>
          <Button variant="contained" sx={{ m: "2rem" }} onClick={() => {handleClick(); setIsEdit(true);}}>
            edit profile
          </Button>
          <Button variant="contained" sx={{ m: "2rem" }} onClick={() => {handleClick(); setIsEdit(false);}}>
            change password
          </Button>
          <Button variant="contained" sx={{ m: "2rem" }}>
            register my bar
          </Button>
          <Button variant="contained" color="error" sx={{ m: "2rem" }}>
            delete profile
          </Button>
        </Paper>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
        {isEdit ? 
          <EditUserProfile />
          :
          <ChangePassword />
        }
        </Popover>
      </Box>
    </Container>
  );
};

export default UserProfile;
