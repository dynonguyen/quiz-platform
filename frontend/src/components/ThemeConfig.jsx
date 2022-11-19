import {
  createTheme as cadsCreateTheme,
  ThemeProvider as CadsThemeProvider
} from '@cads-ui/core';
import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { ToastContainer } from 'react-toastify';

// -----------------------------
import '@cads-ui/core/index.css';
import '@cads-ui/core/override/react-toastify.css';
import 'react-toastify/dist/ReactToastify.css';

// -----------------------------
function ThemeConfig({ children }) {
  const cadsTheme = React.useMemo(() => cadsCreateTheme(), []);
  const muiTheme = React.useMemo(() => createTheme(cadsTheme), []);

  return (
    <CadsThemeProvider theme={cadsTheme}>
      <ToastContainer
        autoClose={5000}
        draggable={false}
        limit={2}
        position="bottom-right"
      />
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </CadsThemeProvider>
  );
}

export default ThemeConfig;
