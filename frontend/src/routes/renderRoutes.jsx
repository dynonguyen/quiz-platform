import { PageResult } from '@cads-ui/core';
import { Route } from 'react-router-dom';
import errorImgSrc from '~/assets/img/internal-error.svg';
import AuthProtect from '~/components/guard/AuthProtect';
import GuestProtect from '~/components/guard/GuestProtect';

const renderRoutes = (routes = []) => {
  return routes.map((route, index) => {
    const { path, exact, element, isProtect } = route;
    const Guard = isProtect ? AuthProtect : GuestProtect;

    return (
      <Route
        key={index}
        exact={exact}
        path={path}
        element={<Guard>{element}</Guard>}
        errorElement={
          <PageResult variant="500" illustration={<img src={errorImgSrc} />} />
        }
      />
    );
  });
};

export default renderRoutes;
