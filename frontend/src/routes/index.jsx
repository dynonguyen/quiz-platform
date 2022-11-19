import { lazy } from 'react';
import { PATH } from '~/constant/path';
const HomePage = lazy(() => import('~/pages/Home'));
const RegisterPage = lazy(() => import('~/pages/Register'));
const LoginPage = lazy(() => import('~/pages/Login'));
const NotFoundPage = lazy(() => import('~/pages/NotFound'));
const SettingsPage = lazy(() => import('~/pages/Settings'));
const ProfilePage = lazy(() => import('~/pages/Settings/Profile'));
const ActivationPage = lazy(() => import('~/pages/Settings/Activation'));
const UpdatePasswordPage = lazy(() =>
  import('~/pages/Settings/UpdatePassword')
);

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
    path: PATH.SETTINGS.ROOT,
    exact: false,
    isProtect: true,
    element: <SettingsPage />,
    nested: [
      {
        path: PATH.SETTINGS.PROFILE,
        element: <ProfilePage />,
        exact: true,
        isNested: true
      },
      {
        path: PATH.SETTINGS.ACTIVATION,
        element: <ActivationPage />,
        exact: true,
        isNested: true
      },
      {
        path: PATH.SETTINGS.UPDATE_PASSWORD,
        element: <UpdatePasswordPage />,
        exact: true,
        isNested: true
      }
    ]
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
