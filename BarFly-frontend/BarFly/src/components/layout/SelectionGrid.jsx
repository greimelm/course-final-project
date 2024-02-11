import { useState, useEffect } from 'react';

import {
    Button,
    Grid,
    Box,
    Typography
  } from "@mui/material";

// import useStore from "../stores/useStore.js";

// import useForm from "../hooks/useForm";

const SelectionGrid = () => {
    // const { categoryArr } = useStore((state) => state);

    const buttonClick = () => {
        console.log('click');
    }
    

    return (
        <Box sx={{m:'1rem'}}>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={2.5}>
                    <Button
                    variant='outlined'
                    value='rooftop'
                    onClick={buttonClick}
                    >
                        Rooftop
                    </Button>
                </Grid>
                <Grid item xs={2.5}>
                    <Button
                    variant='outlined'
                    value='rooftop'
                    onClick={buttonClick}
                    >
                        Rooftop
                    </Button>
                </Grid>
                <Grid item xs={2.5}>
                    <Button
                    variant='outlined'
                    value='rooftop'
                    onClick={buttonClick}
                    >
                        Rooftop
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={2.5}>
                    <Button
                    variant='outlined'
                    value='rooftop'
                    onClick={buttonClick}
                    >
                        Rooftop
                    </Button>
                </Grid>
                <Grid item xs={2.5}>
                    <Button
                    variant='outlined'
                    value='rooftop'
                    onClick={buttonClick}
                    >
                        Rooftop
                    </Button>
                </Grid>
                <Grid item xs={2.5}>
                    <Button
                    variant='outlined'
                    value='rooftop'
                    onClick={buttonClick}
                    >
                        Rooftop
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={2.5}>
                    <Button
                    variant='outlined'
                    value='rooftop'
                    onClick={buttonClick}
                    >
                        Rooftop
                    </Button>
                </Grid>
                <Grid item xs={2.5}>
                    <Button
                    variant='outlined'
                    value='rooftop'
                    onClick={buttonClick}
                    >
                        Rooftop
                    </Button>
                </Grid>
                <Grid item xs={2.5}>
                    <Button
                    variant='outlined'
                    value='rooftop'
                    onClick={buttonClick}
                    >
                        Rooftop
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SelectionGrid;