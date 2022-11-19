import { Fragment, lazy } from 'react';
import { Route } from 'react-router-dom';
import AuthProtect from '~/components/guard/AuthProtect';
import GuestProtect from '~/components/guard/GuestProtect';
import MainLayout from '~/components/layout/MainLayout';
const ServerErrorPage = lazy(() => import('~/pages/ServerError'));

const renderRoutes = (routes = []) => {
  return routes.map((route, index) => {
    const {
      path,
      exact,
      element,
      isProtect,
      layout,
      isNested = false,
      nested
    } = route;
    const Guard = isNested ? Fragment : isProtect ? AuthProtect : GuestProtect;
    const Layout = isNested
      ? Fragment
      : layout === false
      ? Fragment
      : layout || MainLayout;

    return (
      <Route
        key={index}
        exact={exact}
        path={path}
        element={
          <Guard>
            <Layout>{element}</Layout>
          </Guard>
        }
        errorElement={<ServerErrorPage />}
      >
        {nested && renderRoutes(nested)}
      </Route>
    );
  });
};

export default renderRoutes;
