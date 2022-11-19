import { GlobalLoading } from '@cads-ui/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { Routes } from 'react-router-dom';
import InitWrapper from './components/InitWrapper';
import LoadingScreen from './components/LoadingScreen';
import ThemeConfig from './components/ThemeConfig';
import ServerError from './pages/ServerError';
import store from './redux/store';
import routes from './routes';
import renderRoutes from './routes/renderRoutes';

// -----------------------------
function App() {
  return (
    <ErrorBoundary FallbackComponent={ServerError}>
      <ThemeConfig>
        <GlobalLoading />
        <Provider store={store}>
          <InitWrapper>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>{renderRoutes(routes)}</Routes>
            </Suspense>
          </InitWrapper>
        </Provider>
      </ThemeConfig>
    </ErrorBoundary>
  );
}

export default App;
