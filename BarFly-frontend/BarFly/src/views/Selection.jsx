import { useNavigate } from 'react-router-dom';

import useForm from '../hooks/useForm';
import useStore from '../stores/useStore';

import { Button, Typography, Grid, TextField } from '@mui/material';

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
    <>
        <Typography variant='h2'>Willkomen</Typography>

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

        <Button onClick={handleGenerate} variant='contained'>
            Tour generieren
        </Button>
        <Button onClick={handleClick} variant='contained'>
            Zurück
        </Button>
    </>
);
};

export default Selection;