import React from 'react';
import {
  createTheme as cadsCreateTheme,
  ThemeProvider as CadsThemeProvider
} from '@cads-ui/core';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';

// -----------------------------
import 'react-toastify/dist/ReactToastify.css';
import '@cads-ui/core/index.css';
import '@cads-ui/core/override/react-toastify.css';

// -----------------------------
function ThemeConfig({ children }) {
  const cadsTheme = React.useMemo(() => cadsCreateTheme(), []);
  const muiTheme = React.useMemo(() => createTheme(cadsTheme), []);

  return (
    <CadsThemeProvider theme={cadsTheme}>
      <ToastContainer />
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </CadsThemeProvider>
  );
}

export default ThemeConfig;
