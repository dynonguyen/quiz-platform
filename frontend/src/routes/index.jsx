import { PageResult } from '@cads-ui/core';
import { lazy } from 'react';
import notFoundSrc from '~/assets/img/not-found.svg';
import { PATH } from '~/constant/path';
const HomePage = lazy(() => import('~/pages/Home'));
const RegisterPage = lazy(() => import('~/pages/Register'));
const LoginPage = lazy(() => import('~/pages/Login'));

const routes = [
  {
    path: PATH.HOME,
    exact: true,
    isProtect: false,
    element: <HomePage />
  },
  {
    path: PATH.LOGIN,
    exact: true,
    isProtect: false,
    element: <LoginPage />
  },
  {
    path: PATH.REGISTER,
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
