import { Typography, Link } from '@mui/material';

const Footer = (props) => {
  return (
    <Typography variant="body1" align="center" sx={{ mt: 7, mb: 4 }} {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        BarFly
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Footer;