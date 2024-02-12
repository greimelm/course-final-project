import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: '100vw'
            }
        }
    },
    palette: {
        primary: {
            main: '#372549',
            light: '#774C60',
            contrastText: '#EACDC2'
        },
        secondary: {
            main: '#B75D69',
            light: '#67527a',
            contrastText: '#EACDC2'
        },
        error: {
            main: '#7e2a3a'
        },
        background: {
            paper: '#EACDC2',
            default: '#EACDC2'
        }
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 18,
        h1: {
            fontFamily: 'Italiana, sans-serif'
        },
        h2: {
            fontFamily: 'Italiana, sans-serif'
        },
        h3: {
            fontFamily: 'Italiana, sans-serif'
        },
        h4: {
            fontFamily: 'Italiana, sans-serif'
        }
    }
});

export default theme;