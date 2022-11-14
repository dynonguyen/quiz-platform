import { GlobalLoading } from '@cads-ui/core';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Routes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import ThemeConfig from './components/ThemeConfig';
import store from './redux/store';
import routes from './routes';
import renderRoutes from './routes/renderRoutes';

// -----------------------------
function App() {
  return (
    <ThemeConfig>
      <GlobalLoading />
      <Provider store={store}>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>{renderRoutes(routes)}</Routes>
        </Suspense>
      </Provider>
    </ThemeConfig>
  );
}

export default App;
