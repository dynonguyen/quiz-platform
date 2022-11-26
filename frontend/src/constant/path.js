export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ACTIVITY: '/activity',
  GROUP: {
    ROOT: '/group',
    NEW: '/group/new',
    LIST: '/group/list',
    JOINED: '/group/joined',
    JOIN: '/group/join'
  },
  MANAGE_GROUP: {
    ROOT: '/group/manage',
    GENERAL: '/group/manage/:groupId',
    DELETE: '/group/manage/:groupId/delete',
    MEMBERS: '/group/manage/:groupId/members',
    NEWS: '/group/manage/:groupId/news',
    PRACTICES: '/group/manage/:groupId/practices'
  },
  SETTINGS: {
    ROOT: '/settings',
    PROFILE: '/settings/profile',
    UPDATE_PASSWORD: '/settings/update-password',
    ACTIVATION: '/settings/activation',
    PROFILE: '/settings/profile'
  },
  QUIZ: {
    ROOT: '/quiz',
    NEW: '/quiz/new'
  },
  NOTFOUND: '/not-found'
};
