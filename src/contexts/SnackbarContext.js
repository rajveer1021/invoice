import React, { createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const closeSnackbarWithDelay = (delay) => {
    setTimeout(() => {
      setSnackbarOpen(false);
    }, delay);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar, closeSnackbarWithDelay }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => useContext(SnackbarContext);