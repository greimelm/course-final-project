import { useNavigate } from 'react-router-dom';

import { Button, Typography, Grid, TextField, Fab, Container, Box } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useForm from '../hooks/useForm';
import useStore from '../stores/useStore';

import Logo from '../assets/BarFlyLogopurple.png';

import SelectionGrid from '../components/layout/SelectionGrid';

const Selection = () => {
    const { generatetour, categoryArr, error, remembertourname } = useStore((state) => state);
    const navigate = useNavigate();

    const { formState, handleChange } = useForm({
        tourName: '',
        city: ''
      });

    const handleClick = () => {
        navigate('/start');
    };

    const handleGenerate = () => {
      remembertourname(formState.tourName);
      console.log(formState.tourName);
      generatetour(categoryArr);
      navigate('/generated-tour');
    };

return (
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
              value="Wien"
              // value={formState.city}
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