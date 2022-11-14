import { GlobalLoading } from '@cads-ui/core';
import { Suspense } from 'react';
import { Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoadingScreen from './components/LoadingScreen';
import ThemeConfig from './components/ThemeConfig';
import routes from './routes';
import renderRoutes from './routes/renderRoutes';

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
