import { GlobalLoading } from '@cads-ui/core';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Routes } from 'react-router-dom';
import InitWrapper from './components/InitWrapper';
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
        <InitWrapper>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>{renderRoutes(routes)}</Routes>
          </Suspense>
        </InitWrapper>
      </Provider>
    </ThemeConfig>
  );
}

export default App;
