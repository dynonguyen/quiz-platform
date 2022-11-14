import {
  createTheme as cadsCreateTheme,
  ThemeProvider as CadsThemeProvider
} from '@cads-ui/core';
import '@cads-ui/core/index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

function ThemeConfig({ children }) {
  const cadsTheme = React.useMemo(() => cadsCreateTheme(), []);
  const muiTheme = React.useMemo(() => createTheme(cadsTheme), []);

  return (
    <CadsThemeProvider theme={cadsTheme}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </CadsThemeProvider>
  );
}

export default ThemeConfig;
