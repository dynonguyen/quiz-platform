import React, { Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';
import { ToastContainer } from 'react-toastify';
import ThemeConfig from './components/ThemeConfig';
import { Routes } from 'react-router-dom';
import renderRoutes from './routes/renderRoutes';
import routes from './routes';
import { GlobalLoading } from '@cads-ui/core';

// -----------------------------
import 'react-toastify/dist/ReactToastify.css';
import '@cads-ui/core/override/react-toastify.css';

// -----------------------------
function App() {
  return (
    <ThemeConfig>
      <ToastContainer />
      <GlobalLoading />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>{renderRoutes(routes)}</Routes>
      </Suspense>
    </ThemeConfig>
  );
}

export default App;
