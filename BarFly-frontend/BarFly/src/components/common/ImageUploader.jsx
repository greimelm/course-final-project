import { useState, useRef, useEffect } from 'react';

import { Button, Typography } from '@mui/material';

/**
 * Globale Komponente um ein Foto von lokalen Laufwerken zu laden, mit Vorschaubild
 * @prop {Function} handleChange damit kann das neue Foto in den Formulare-State geschrieben werden
 * @prop {BinaryData} photo Blob des Fotos.
 */
const ImageUploader = (props) => {
  const { handleChange, photo } = props;
  const refPhoto = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!photo) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      // wandelt binäry Daten in base64-Format um (filereader.result)
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(photo);
  }, [photo]);

  const handleImageUpload = () => {
    refPhoto.current.click();
  };

  return (
    <>
      <input
        ref={refPhoto}
        type="file"
        name="photo"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <Button onClick={handleImageUpload}>Foto auswählen</Button>
      <br />
      {previewUrl ? (
        <img src={previewUrl} alt="Vorschau-Photo" style={{ height: '200px' }} />
      ) : (
        <Typography variant="body2">Bitte Foto auswählen</Typography>
      )}
    </>
  );
};

export default ImageUploader;