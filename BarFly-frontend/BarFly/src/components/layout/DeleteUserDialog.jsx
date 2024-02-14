import * as React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';


const DeleteUserDialog = (props) => {
    const { open, handleClose, handleDeleteUser } = props;
    return (
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Bestätigung</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bist Du sicher, dass Du Deinen Account unwiderruflich löschen?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Abbrechen</Button>
            <Button onClick={handleDeleteUser}>Ja, bitte löschen</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  
  export default DeleteUserDialog;