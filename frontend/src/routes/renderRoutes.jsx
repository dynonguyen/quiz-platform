import { PageResult } from '@cads-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';
import errorImgSrc from '~/assets/img/internal-error.svg';
import AuthProtect from '~/components/guard/AuthProtect';
import GuestProtect from '~/components/guard/GuestProtect';
import MainLayout from '~/components/layout/MainLayout';

const renderRoutes = (routes = []) => {
  return routes.map((route, index) => {
    const { path, exact, element, isProtect, layout } = route;
    const Guard = isProtect ? AuthProtect : GuestProtect;
    const Layout = layout === false ? React.Fragment : layout || MainLayout;

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
        errorElement={
          <PageResult variant="500" illustration={<img src={errorImgSrc} />} />
        }
      />
    );
  });
};

export default renderRoutes;
