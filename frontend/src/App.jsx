import { GlobalLoading } from '@cads-ui/core';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Routes } from 'react-router-dom';
import axiosClient from './apis/axiosClient';
import LoadingScreen from './components/LoadingScreen';
import ThemeConfig from './components/ThemeConfig';
import store from './redux/store';
import routes from './routes';
import renderRoutes from './routes/renderRoutes';

// -----------------------------
function App() {
  React.useEffect(() => {
    (async function () {
      try {
        const res = await axiosClient.post('/abc?q=1', { name: '123' });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
