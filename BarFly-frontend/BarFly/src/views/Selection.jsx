import { useNavigate } from 'react-router-dom';

import { Button, Typography, Grid, TextField, Fab, Container, Box } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useForm from '../hooks/useForm';
import useStore from '../stores/useStore';

import Logo from '../assets/BarFlyLogoPurple.png';

import SelectionGrid from '../components/layout/SelectionGrid';

const Selection = () => {
    const { generatetour, city, categoryArr, error } = useStore((state) => state);
    const navigate = useNavigate();

    const { formState, handleChange } = useForm({
        tourName: '',
        city: ''
      });

    const handleClick = () => {
        navigate('/start');
        
    };

    const handleGenerate = () => {

        console.log(categoryArr);
    };

return (
  // kommt von Start, Stadt wird übergeben
  // Namen geben optional, nur wenn Tour ausgewählt & gespeichert wird
  // über Buttons werden Kategorien ausgewählt & in Array übergeben
  // Tour wird daraus generiert mit generateTour aus tourcontroller
  // Weiterleitug auf GeneratedTour
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '90vw'}}>
      <Container sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Typography variant='h3'>Wähle Kategorien</Typography>

        <img
            src={Logo}
            alt="BarFly logo"
            style={{ height: '20vh', cursor: 'pointer' }}
            onClick={() => navigate('/start')} //or home if logged in
          />
      </Container>

        <Grid container spacing={2} justifyContent={'space-evenly'} sx={{ mt: 4 }}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Name"
              name="tourName"
              autoFocus
              value={formState.tourName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Stadt"
              name="city"
              value={formState.city}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <SelectionGrid />

        <Container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}} >
        <Fab color='primary' onClick={handleClick}>
          <ArrowBackIcon />
        </Fab>

        <Button onClick={handleGenerate} variant='contained'>
            Tour generieren
        </Button>
        </Container>
    </Box>
);
};

export default Selection;