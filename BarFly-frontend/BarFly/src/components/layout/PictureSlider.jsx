import React, { useState } from 'react';

import { SwipeableDrawer, Button, Box, Typography } from '@mui/material';

import Logo from '../../assets/favicon-32x32-purple.png';


// function PictureSlider() {
// // const { userObj } = useStore((state) => state);
// // get photos from favourite bars/tours from refs in user
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);



//   const nextSlide = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
//   };

//   const prevSlide = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//   };

//   return (
//     <Box sx={{ position: 'relative', width: '50%' }}>
//       <Button sx={{ left:'1rem', position: 'absolute', transform: 'translateY(-50%)'}} onClick={prevSlide}>{'<'}</Button>
//       <img src={images[currentImageIndex]} alt="Slide" sx={{ maxWidth:'5vw'}} />
//       <Button sx={{ right:'1rem', position: 'absolute', transform: 'translateY(-50%)'}} onClick={nextSlide}>{'>'}</Button>
//     </Box>
//   );
// }




const PictureSlider = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  //   example images
  const images = [Logo, Logo, Logo, Logo, Logo, Logo];

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Slider</Button>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            width: '100vw',
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button onClick={prevSlide}>Prev</Button>
          <img
            src={images[activeIndex]}
            alt={`Slide ${activeIndex}`}
            style={{ maxWidth: '80%', maxHeight: '80%' }}
          />
          <Button onClick={nextSlide}>Next</Button>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="caption">
            {activeIndex + 1} / {images.length}
          </Typography>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default PictureSlider;