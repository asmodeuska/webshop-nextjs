import '../styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from "../utils/SnackbarUtils";
import React from 'react';
import PropTypes from 'prop-types';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  body: {
    outerHeight: '100%',
    innerHeight: '100%',
  },
  typography: {
    h3: {
      fontSize: '1.5rem',
    },
  },
  palette: {
    primary: {
      main: '#00a896',
    },
    secondary: {
      main: '#017e91',
    },
    neutral: {
      main: '#f0f3bd',
    },
    google: {
      main: '#4285F4',
    },
    white: {
      main: '#ffffff',
    },
    grey : {
      main: grey[700]
    }
  },
  link: {
    color: '#ffffff',
  },
  spaceing: 8,

});


export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={3}>
        <SnackbarUtilsConfigurator />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SnackbarProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}