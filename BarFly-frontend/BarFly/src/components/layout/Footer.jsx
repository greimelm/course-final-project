import { Typography, Link } from '@mui/material';

const Footer = (props) => {
  return (
    <Typography variant="body1" align="center" sx={{ mt: 7, mb: 4 }} {...props}>
      {' © '}
      <Link color='#372549' href="https://github.com/manumuffin/final-wifi-project">
        BarFly
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Footer;