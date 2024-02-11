import { useNavigate } from 'react-router-dom';

import { Button, Typography, Grid, TextField, Fab, Container } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useForm from '../hooks/useForm';
import useStore from '../stores/useStore';

import SelectionGrid from '../components/layout/SelectionGrid';

const Selection = () => {
    const { generatetour, error } = useStore((state) => state);
    const navigate = useNavigate();

    const { formState, handleChange } = useForm({
        tourName: 'MeineTour',
        city: 'MeineStadt'
      });

    const handleClick = () => {
        navigate('/start');
        
    };

    const handleGenerate = () => {

        generatetour(submitForm);
    };

return (
  // kommt von Start, Stadt wird übergeben
  // Namen geben optional, nur wenn Tour ausgewählt & gespeichert wird
  // über Buttons werden Kategorien ausgewählt & in Array übergeben
  // Tour wird daraus generiert mit generateTour aus tourcontroller
  // Weiterleitug auf GeneratedTour
    <>
        <Typography variant='h3'>Wähle Kategorien</Typography>

        <Grid container spacing={2} sx={{ mt: 4 }}>
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
        <Fab color='primary'>
          <ArrowBackIcon />
        </Fab>

        <Button onClick={handleGenerate} variant='contained'>
            Tour generieren
        </Button>
        </Container>
    </>
);
};

export default Selection;