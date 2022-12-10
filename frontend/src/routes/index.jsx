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

const GroupPage = lazy(() => import('~/pages/Group'));
const NewGroupPage = lazy(() => import('~/pages/Group/New'));
const JoinedGroupPage = lazy(() => import('~/pages/Group/Joined'));
const JoinGroupPage = lazy(() => import('~/pages/Group/Join'));
const ListGroupPage = lazy(() => import('~/pages/Group/List'));

const ManageGroupPage = lazy(() => import('~/pages/Group/Manage'));
const GroupNewsPage = lazy(() => import('~/pages/Group/Manage/News'));
const DeleteGroupPage = lazy(() => import('~/pages/Group/Manage/Delete'));
const LeaveGroupPage = lazy(() => import('~/pages/Group/Manage/Leave'));
const GroupMembersPage = lazy(() => import('~/pages/Group/Manage/Members'));
const GroupPracticesPage = lazy(() => import('~/pages/Group/Manage/Practices'));
const GroupGeneralPage = lazy(() => import('~/pages/Group/Manage/General'));

const PresentationPage = lazy(() => import('~/pages/Presentation'));
const PresentationManagePage = lazy(() =>
  import('~/pages/Presentation/Manage')
);

const routes = [
  // Home page
  {
    path: PATH.HOME,
    exact: true,
    isProtect: false,
    element: <HomePage />
  },
  // Login
  {
    path: PATH.LOGIN,
    exact: true,
    isProtect: false,
    element: <LoginPage />
  },
  // Register
  {
    path: PATH.REGISTER,
    exact: true,
    isProtect: false,
    element: <RegisterPage />
  },
  // Account setting
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
  // Group
  {
    path: PATH.GROUP.ROOT,
    exact: false,
    isProtect: true,
    element: <GroupPage />,
    nested: [
      {
        path: PATH.GROUP.NEW,
        element: <NewGroupPage />,
        exact: true,
        isNested: true
      },
      {
        path: PATH.GROUP.JOINED,
        element: <JoinedGroupPage />,
        exact: true,
        isNested: true
      },
      {
        path: PATH.GROUP.LIST,
        element: <ListGroupPage />,
        exact: true,
        isNested: true
      }
    ]
  },
  {
    path: PATH.GROUP.JOIN,
    exact: true,
    isProtect: true,
    layout: false,
    element: <JoinGroupPage />
  },
  {
    path: PATH.MANAGE_GROUP.GENERAL,
    element: <ManageGroupPage />,
    exact: false,
    isProtect: true,
    nested: [
      {
        path: PATH.MANAGE_GROUP.GENERAL,
        element: <GroupGeneralPage />,
        exact: true,
        isNested: true
      },
      {
        path: PATH.MANAGE_GROUP.NEWS,
        element: <GroupNewsPage />,
        exact: true,
        isNested: true
      },
      {
        path: PATH.MANAGE_GROUP.MEMBERS,
        element: <GroupMembersPage />,
        exact: true,
        isNested: true
      },
      {
        path: PATH.MANAGE_GROUP.PRACTICES,
        element: <GroupPracticesPage />,
        exact: true,
        isNested: true
      },
      {
        path: PATH.MANAGE_GROUP.DELETE,
        element: <DeleteGroupPage />,
        exact: true,
        isNested: true
      },
      {
        path: PATH.MANAGE_GROUP.LEAVE,
        element: <LeaveGroupPage />,
        exact: true,
        isNested: true
      }
    ]
  },
  // Presentation
  {
    path: PATH.PRESENTATION.ROOT,
    element: <PresentationPage />,
    exact: true,
    isProtect: false
  },
  {
    path: PATH.PRESENTATION.MANAGE,
    element: <PresentationManagePage />,
    exact: false,
    isProtect: false,
    layout: false
  },
  // 404
  {
    path: PATH.NOTFOUND,
    exact: true,
    isProtect: false,
    element: <NotFoundPage />
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
