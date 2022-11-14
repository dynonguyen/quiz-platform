import {
  createTheme as cadsCreateTheme,
  ThemeProvider as CadsThemeProvider
} from '@cads-ui/core';
import '@cads-ui/core/index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

const themeOverride = {
  palette: {
    action: {
      hover: 'rgba(0, 0, 0, 0.45)'
    }
  }
};

function ThemeConfig({ children }) {
  const muiTheme = React.useMemo(() => createTheme(), []);
  const cadsTheme = React.useMemo(
    () => cadsCreateTheme(muiTheme, themeOverride),
    []
  );

  return (
    <CadsThemeProvider theme={cadsTheme}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </CadsThemeProvider>
  );
}

export default ThemeConfig;
