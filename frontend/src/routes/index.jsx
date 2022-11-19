import { lazy } from 'react';
import { PATH } from '~/constant/path';
const HomePage = lazy(() => import('~/pages/Home'));
const RegisterPage = lazy(() => import('~/pages/Register'));
const LoginPage = lazy(() => import('~/pages/Login'));
const NotFoundPage = lazy(() => import('~/pages/NotFound'));

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
    layout: false,
    element: <LoginPage />
  },
  {
    path: PATH.REGISTER,
    exact: true,
    isProtect: false,
    layout: false,
    element: <RegisterPage />
  },
  {
    path: '*',
    exact: false,
    isProtect: false,
    layout: false,
    element: <NotFoundPage />
  }
];

export default routes;
