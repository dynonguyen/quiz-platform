import { PageResult } from '@cads-ui/core';
import { lazy } from 'react';
import notFoundSrc from '~/assets/img/not-found.svg';
const HomePage = lazy(() => import('~/pages/Home'));
const RegisterPage = lazy(() => import('~/pages/Register'));

const routes = [
  {
    path: '/',
    exact: true,
    isProtect: false,
    element: <HomePage />
  },
  {
    path: '/login',
    exact: true,
    isProtect: false,
    element: <>Login</>
  },
  {
    path: '/register',
    exact: true,
    isProtect: false,
    element: <RegisterPage />
  },
  {
    path: '*',
    exact: false,
    isProtect: false,
    element: (
      <PageResult variant="404" illustration={<img src={notFoundSrc} />} />
    )
  }
];

export default routes;
